// Contract ABI (فقط توابع مورد نیاز)
const CONTRACT_ABI = [
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getUserInfo",
        "outputs": [
            {"internalType": "uint256", "name": "id", "type": "uint256"},
            {"internalType": "uint256", "name": "uplineId", "type": "uint256"},
            {"internalType": "uint256", "name": "leftCount", "type": "uint256"},
            {"internalType": "uint256", "name": "rightCount", "type": "uint256"},
            {"internalType": "uint256", "name": "saveLeft", "type": "uint256"},
            {"internalType": "uint256", "name": "saveRight", "type": "uint256"},
            {"internalType": "uint256", "name": "balanceCount", "type": "uint256"},
            {"internalType": "uint256", "name": "specialBalanceCount", "type": "uint256"},
            {"internalType": "uint256", "name": "totalMinerRewards", "type": "uint256"},
            {"internalType": "uint256", "name": "entryPrice", "type": "uint256"},
            {"internalType": "bool", "name": "isMiner", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "userId", "type": "uint256"}],
        "name": "getUserDirects",
        "outputs": [
            {"internalType": "uint256", "name": "leftId", "type": "uint256"},
            {"internalType": "uint256", "name": "rightId", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const CONTRACT_ADDRESS = "0x166dd205590240c90ca4e0e545ad69db47d8f22f";

// Global variables
let web3;
let contract;
let userAccount;
let userInfo = {};
let nodeCache = new Map();

// DOM elements
const connectWalletBtn = document.getElementById('connectWallet');
const walletAddressSpan = document.getElementById('walletAddress');
const userInfoDiv = document.getElementById('userInfo');
const treeContainer = document.getElementById('treeContainer');
const currentUserIdSpan = document.getElementById('currentUserId');

// Initialize
window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        try {
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                userAccount = accounts[0];
                updateWalletUI();
                await loadUserInfo();
                await loadInitialTree();
            }
        } catch (error) {
            console.log('No connected accounts');
        }
    } else {
        connectWalletBtn.disabled = true;
        connectWalletBtn.textContent = 'کیف پول یافت نشد';
    }
});

// Connect wallet
connectWalletBtn.addEventListener('click', async () => {
    try {
        connectWalletBtn.textContent = 'در حال اتصال...';
        connectWalletBtn.disabled = true;
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        
        updateWalletUI();
        await loadUserInfo();
        await loadInitialTree();
        
    } catch (error) {
        alert('خطا در اتصال کیف پول');
        connectWalletBtn.textContent = '🔗 اتصال کیف پول';
        connectWalletBtn.disabled = false;
    }
});

// Update wallet UI
function updateWalletUI() {
    const shortAddress = userAccount.substring(0, 6) + '...' + userAccount.substring(userAccount.length - 4);
    walletAddressSpan.textContent = shortAddress;
    connectWalletBtn.textContent = 'اتصال برقرار شد';
    connectWalletBtn.disabled = true;
}

// Load user info
async function loadUserInfo() {
    try {
        userInfoDiv.innerHTML = '<div class="loading">در حال بارگذاری...</div>';
        
        const result = await contract.methods.getUserInfo(userAccount).call();
        
        userInfo = {
            id: result.id,
            uplineId: result.uplineId,
            leftCount: result.leftCount,
            rightCount: result.rightCount,
            saveLeft: result.saveLeft,
            saveRight: result.saveRight,
            balanceCount: result.balanceCount,
            specialBalanceCount: result.specialBalanceCount,
            totalMinerRewards: web3.utils.fromWei(result.totalMinerRewards, 'ether'),
            entryPrice: web3.utils.fromWei(result.entryPrice, 'ether'),
            isMiner: result.isMiner
        };
        
        displayUserInfo();
        currentUserIdSpan.textContent = userInfo.id;
        
    } catch (error) {
        userInfoDiv.innerHTML = '<p>خطا در بارگذاری اطلاعات کاربر</p>';
    }
}

// Display user info
function displayUserInfo() {
    userInfoDiv.innerHTML = `
        <div class="info-item">
            <span class="info-label">شناسه:</span>
            <span class="info-value">${userInfo.id}</span>
        </div>
        <div class="info-item">
            <span class="info-label">آپلاین:</span>
            <span class="info-value">${userInfo.uplineId}</span>
        </div>
        <div class="info-item">
            <span class="info-label">تعداد چپ:</span>
            <span class="info-value">${userInfo.leftCount}</span>
        </div>
        <div class="info-item">
            <span class="info-label">تعداد راست:</span>
            <span class="info-value">${userInfo.rightCount}</span>
        </div>
        <div class="info-item">
            <span class="info-label">بالانس:</span>
            <span class="info-value">${userInfo.balanceCount}</span>
        </div>
        <div class="info-item">
            <span class="info-label">ماینر:</span>
            <span class="info-value">${userInfo.isMiner ? '✅' : '❌'}</span>
        </div>
    `;
}

// Load initial tree
async function loadInitialTree() {
    treeContainer.innerHTML = '<div class="loading">در حال بارگذاری شبکه...</div>';
    
    const rootNode = await createNode(userInfo.id, true);
    renderTree(rootNode);
}

// Create node with basic info
async function createNode(userId, isCurrentUser = false) {
    // Check cache first
    if (nodeCache.has(userId)) {
        return nodeCache.get(userId);
    }
    
    try {
        const directs = await contract.methods.getUserDirects(userId).call();
        
        const node = {
            id: userId,
            leftId: directs.leftId,
            rightId: directs.rightId,
            isCurrentUser: isCurrentUser,
            hasLeftChild: directs.leftId > 0,
            hasRightChild: directs.rightId > 0,
            left: null,
            right: null
        };
        
        // Cache the node
        nodeCache.set(userId, node);
        
        return node;
        
    } catch (error) {
        console.log(`Error loading node ${userId}:`, error);
        return {
            id: userId,
            leftId: 0,
            rightId: 0,
            isCurrentUser: isCurrentUser,
            hasLeftChild: false,
            hasRightChild: false,
            left: null,
            right: null
        };
    }
}

// Render tree
function renderTree(rootNode) {
    const genealogyElement = document.createElement('div');
    genealogyElement.className = 'genealogy';
    
    // Root level
    const rootLevel = document.createElement('div');
    rootLevel.className = 'level';
    rootLevel.appendChild(createNodeElement(rootNode));
    genealogyElement.appendChild(rootLevel);
    
    // Direct children
    if (rootNode.hasLeftChild || rootNode.hasRightChild) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'children-container';
        
        if (rootNode.hasLeftChild) {
            const leftBranch = createChildBranch('چپ', rootNode.leftId);
            childrenContainer.appendChild(leftBranch);
        }
        
        if (rootNode.hasRightChild) {
            const rightBranch = createChildBranch('راست', rootNode.rightId);
            childrenContainer.appendChild(rightBranch);
        }
        
        genealogyElement.appendChild(childrenContainer);
    }
    
    treeContainer.innerHTML = '';
    treeContainer.appendChild(genealogyElement);
}

// Create child branch
function createChildBranch(side, childId) {
    const branch = document.createElement('div');
    branch.className = 'child-branch';
    
    const label = document.createElement('div');
    label.className = 'child-label';
    label.textContent = side === 'چپ' ? '👈 چپ' : '👉 راست';
    branch.appendChild(label);
    
    const nodeElement = document.createElement('div');
    nodeElement.className = 'member-node';
    nodeElement.innerHTML = `
        <div class="member-id">${childId}</div>
        <div class="member-stats">کلیک برای نمایش</div>
    `;
    
    nodeElement.addEventListener('click', async () => {
        await expandNode(childId, branch);
    });
    
    branch.appendChild(nodeElement);
    
    return branch;
}

// Expand node
async function expandNode(userId, parentElement) {
    const node = await createNode(userId);
    
    // Remove existing children
    const existingChildren = parentElement.querySelector('.children-container');
    if (existingChildren) {
        existingChildren.remove();
    }
    
    // Add new children if any
    if (node.hasLeftChild || node.hasRightChild) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'children-container';
        
        if (node.hasLeftChild) {
            const leftBranch = createChildBranch('چپ', node.leftId);
            childrenContainer.appendChild(leftBranch);
        }
        
        if (node.hasRightChild) {
            const rightBranch = createChildBranch('راست', node.rightId);
            childrenContainer.appendChild(rightBranch);
        }
        
        parentElement.appendChild(childrenContainer);
    }
}

// Create node element
function createNodeElement(node) {
    const element = document.createElement('div');
    const classes = ['member-node'];
    
    if (node.isCurrentUser) classes.push('current-user');
    if (node.hasLeftChild || node.hasRightChild) classes.push('has-children');
    
    element.className = classes.join(' ');
    
    element.innerHTML = `
        <div class="member-id">${node.id} ${node.isCurrentUser ? '👤' : ''}</div>
        <div class="member-stats">
            ${node.hasLeftChild ? '👈' : ''} ${node.hasRightChild ? '👉' : ''}
        </div>
    `;
    
    if (node.hasLeftChild || node.hasRightChild) {
        element.addEventListener('click', async (e) => {
            e.stopPropagation();
            await expandNode(node.id, element.parentElement);
        });
    }
    
    return element;
}