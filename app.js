// Contract ABI و آدرس (همان قبلی)
const CONTRACT_ABI = [...]; // ABI کامل از قبل

const CONTRACT_ADDRESS = "0x166dd205590240c90ca4e0e545ad69db47d8f22f";

let web3;
let contract;
let userAccount;
let userInfo = {};
let loadedNodes = new Map();

const connectWalletBtn = document.getElementById('connectWallet');
const walletAddressSpan = document.getElementById('walletAddress');
const userInfoDiv = document.getElementById('userInfo');
const treeContainer = document.getElementById('treeContainer');
const currentUserIdSpan = document.getElementById('currentUserId');

window.addEventListener('load', async () => {
    console.log('Application initialized');
    
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        try {
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                userAccount = accounts[0];
                updateWalletUI();
                await loadUserInfo();
            }
        } catch (error) {
            console.log('No connected accounts found');
        }
    } else {
        connectWalletBtn.disabled = true;
        connectWalletBtn.textContent = 'کیف پول یافت نشد';
    }
});

connectWalletBtn.addEventListener('click', async () => {
    try {
        connectWalletBtn.textContent = 'در حال اتصال...';
        connectWalletBtn.disabled = true;
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        
        updateWalletUI();
        await loadUserInfo();
        
    } catch (error) {
        console.error('Error connecting wallet:', error);
        connectWalletBtn.textContent = '🔗 اتصال کیف پول';
        connectWalletBtn.disabled = false;
    }
});

function updateWalletUI() {
    const shortAddress = userAccount.substring(0, 6) + '...' + userAccount.substring(userAccount.length - 4);
    walletAddressSpan.textContent = shortAddress;
    connectWalletBtn.textContent = 'اتصال برقرار شد';
    connectWalletBtn.disabled = true;
}

async function loadUserInfo() {
    try {
        userInfoDiv.innerHTML = '<p>در حال بارگذاری اطلاعات کاربری...</p>';
        
        const result = await contract.methods.getUserInfo(userAccount).call();
        
        userInfo = {
            id: result.id.toString(),
            uplineId: result.uplineId.toString(),
            leftCount: result.leftCount.toString(),
            rightCount: result.rightCount.toString(),
            saveLeft: result.saveLeft.toString(),
            saveRight: result.saveRight.toString(),
            balanceCount: result.balanceCount.toString(),
            specialBalanceCount: result.specialBalanceCount.toString(),
            totalMinerRewards: result.totalMinerRewards.toString(),
            entryPrice: result.entryPrice.toString(),
            isMiner: result.isMiner
        };
        
        displayUserInfo();
        currentUserIdSpan.textContent = userInfo.id;
        
        await loadInitialGenealogy(userInfo.id);
        
    } catch (error) {
        console.error('Error loading user info:', error);
        loadDemoData();
    }
}

function displayUserInfo() {
    userInfoDiv.innerHTML = `
        <div class="info-item">
            <span class="info-label">شناسه کاربری:</span>
            <span class="info-value">${userInfo.id}</span>
        </div>
        <div class="info-item">
            <span class="info-label">شناسه آپلاین:</span>
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
            <span class="info-label">تعداد بالانس:</span>
            <span class="info-value">${userInfo.balanceCount}</span>
        </div>
        <div class="info-item">
            <span class="info-label">وضعیت ماینر:</span>
            <span class="info-value">${userInfo.isMiner ? '✅ بله' : '❌ خیر'}</span>
        </div>
    `;
}

async function loadInitialGenealogy(rootId) {
    try {
        treeContainer.innerHTML = '<p>در حال بارگذاری ساختار هرمی...</p>';
        
        const rootNode = await createNodeData(rootId, true);
        loadedNodes.set(rootId, rootNode);
        
        await loadDirectChildren(rootNode);
        
        renderPyramidTree();
        
    } catch (error) {
        console.error('Error loading pyramid tree:', error);
        loadDemoPyramid();
    }
}

async function createNodeData(userId, isCurrentUser = false) {
    try {
        const directs = await contract.methods.getUserDirects(userId).call();
        
        const node = {
            id: userId,
            leftId: directs.leftId.toString(),
            rightId: directs.rightId.toString(),
            isCurrentUser: isCurrentUser,
            isExpanded: false,
            children: {},
            isLoading: false
        };
        
        if (isCurrentUser) {
            const userAddress = await getUserAddressById(userId);
            if (userAddress !== '0x0000000000000000000000000000000000000000') {
                const userInfoData = await contract.methods.getUserInfo(userAddress).call();
                node.leftCount = userInfoData.leftCount.toString();
                node.rightCount = userInfoData.rightCount.toString();
                node.balanceCount = userInfoData.balanceCount.toString();
                node.isMiner = userInfoData.isMiner;
            }
        }
        
        return node;
    } catch (error) {
        console.error(`Error creating node data for ${userId}:`, error);
        return createDemoNode(userId, isCurrentUser);
    }
}

async function loadDirectChildren(parentNode) {
    const promises = [];
    
    if (parentNode.leftId !== "0") {
        promises.push(loadChildNode(parentNode.leftId, 'left', parentNode));
    }
    
    if (parentNode.rightId !== "0") {
        promises.push(loadChildNode(parentNode.rightId, 'right', parentNode));
    }
    
    await Promise.all(promises);
}

async function loadChildNode(childId, side, parentNode) {
    try {
        if (!loadedNodes.has(childId)) {
            const childNode = await createNodeData(childId);
            loadedNodes.set(childId, childNode);
        }
        
        const childNode = loadedNodes.get(childId);
        childNode.side = side; // اضافه کردن جهت چپ/راست
        parentNode.children[side] = childNode;
        
    } catch (error) {
        console.error(`Error loading child node ${childId}:`, error);
    }
}

// تابع جدید برای رندر کردن هرم
function renderPyramidTree() {
    const rootNode = loadedNodes.get(userInfo.id);
    if (!rootNode) return;
    
    const pyramidHTML = generatePyramidHTML(rootNode, 0);
    treeContainer.innerHTML = `
        <div class="pyramid-tree">
            ${pyramidHTML}
        </div>
    `;
    
    attachNodeEventListeners();
}

// تولید HTML برای هرم
function generatePyramidHTML(node, level) {
    const hasLeftChild = node.leftId !== "0";
    const hasRightChild = node.rightId !== "0";
    const hasChildren = hasLeftChild || hasRightChild;
    
    // کلاس‌های اضافی بر اساس جهت
    const sideClass = node.side === 'left' ? 'left-child' : node.side === 'right' ? 'right-child' : '';
    
    let html = `
        <div class="pyramid-level level-${level}">
            <div class="member-node ${node.isCurrentUser ? 'current-user' : ''} ${hasChildren ? 'has-children' : ''} ${node.isExpanded ? 'expanded' : ''} ${sideClass}" 
                 data-node-id="${node.id}">
                ${node.side === 'left' ? '<div class="side-label left-label">👈 چپ</div>' : ''}
                ${node.side === 'right' ? '<div class="side-label right-label">👉 راست</div>' : ''}
                
                <div class="member-id">
                    ${node.id} 
                    ${node.isCurrentUser ? '👤' : ''} 
                    ${node.isMiner ? '⛏️' : ''}
                    ${hasChildren ? (node.isExpanded ? ' ▼' : ' ▶') : ''}
                </div>
                ${node.leftCount ? `
                <div class="member-stats">چپ: ${node.leftCount}</div>
                <div class="member-stats">راست: ${node.rightCount}</div>
                <div class="member-stats">بالانس: ${node.balanceCount}</div>
                ` : ''}
                ${node.isLoading ? '<div class="loading">در حال بارگذاری...</div>' : ''}
            </div>
        </div>
    `;
    
    // اگر گره expand شده، فرزندانش رو در سطح بعدی نمایش بده
    if (node.isExpanded && hasChildren) {
        let childrenHTML = '<div class="pyramid-level connection-lines">';
        
        // اضافه کردن خطوط اتصال
        if (hasLeftChild && hasRightChild) {
            childrenHTML += `
                <div class="connection-line diagonal-left" style="top: -30px; right: 50%; height: 80px;"></div>
                <div class="connection-line diagonal-right" style="top: -30px; left: 50%; height: 80px;"></div>
            `;
        }
        
        childrenHTML += '</div>';
        
        childrenHTML += `<div class="pyramid-level level-${level + 1}">`;
        
        if (hasLeftChild) {
            const leftChild = node.children.left;
            childrenHTML += leftChild ? generatePyramidHTML(leftChild, level + 1) : 
                `<div class="member-node loading-node">در حال بارگذاری...</div>`;
        } else {
            childrenHTML += `<div class="member-node empty-node">خالی</div>`;
        }
        
        if (hasRightChild) {
            const rightChild = node.children.right;
            childrenHTML += rightChild ? generatePyramidHTML(rightChild, level + 1) : 
                `<div class="member-node loading-node">در حال بارگذاری...</div>`;
        } else {
            childrenHTML += `<div class="member-node empty-node">خالی</div>`;
        }
        
        childrenHTML += '</div>';
        
        html += childrenHTML;
    }
    
    return html;
}

function attachNodeEventListeners() {
    document.querySelectorAll('.member-node.has-children').forEach(nodeElement => {
        nodeElement.addEventListener('click', async (e) => {
            e.stopPropagation();
            const nodeId = nodeElement.dataset.nodeId;
            await toggleNodeExpansion(nodeId);
        });
    });
}

async function toggleNodeExpansion(nodeId) {
    const node = loadedNodes.get(nodeId);
    if (!node) return;
    
    if (node.isExpanded) {
        node.isExpanded = false;
    } else {
        node.isExpanded = true;
        node.isLoading = true;
        
        renderPyramidTree();
        
        try {
            await loadDirectChildren(node);
            node.isLoading = false;
        } catch (error) {
            console.error(`Error expanding node ${nodeId}:`, error);
            node.isLoading = false;
        }
    }
    
    renderPyramidTree();
}

async function getUserAddressById(userId) {
    try {
        if (userId === userInfo.id) return userAccount;
        
        const specialInfo = await contract.methods._getSpecialUserInfoForMigrateToNewFork(userId).call();
        return specialInfo.userAddress;
    } catch (error) {
        return '0x0000000000000000000000000000000000000000';
    }
}

function loadDemoData() {
    userInfo = {
        id: "1",
        uplineId: "0",
        leftCount: "2",
        rightCount: "1",
        saveLeft: "0",
        saveRight: "0",
        balanceCount: "3",
        specialBalanceCount: "0",
        isMiner: true
    };
    
    displayUserInfo();
    currentUserIdSpan.textContent = userInfo.id;
    loadDemoPyramid();
}

function loadDemoPyramid() {
    const demoNodes = new Map();
    
    // ساختار هرمی دمو
    const rootNode = {
        id: "1",
        leftId: "2",
        rightId: "3",
        leftCount: "2",
        rightCount: "1",
        balanceCount: "3",
        isMiner: true,
        isCurrentUser: true,
        isExpanded: false,
        children: {}
    };
    
    const leftChild = {
        id: "2",
        leftId: "4",
        rightId: "5",
        leftCount: "1",
        rightCount: "0",
        balanceCount: "1",
        isMiner: false,
        isCurrentUser: false,
        isExpanded: false,
        children: {},
        side: "left"
    };
    
    const rightChild = {
        id: "3",
        leftId: "6",
        rightId: "7",
        leftCount: "0",
        rightCount: "1",
        balanceCount: "1",
        isMiner: true,
        isCurrentUser: false,
        isExpanded: false,
        children: {},
        side: "right"
    };
    
    demoNodes.set("1", rootNode);
    demoNodes.set("2", leftChild);
    demoNodes.set("3", rightChild);
    
    loadedNodes = demoNodes;
    renderPyramidTree();
}

function createDemoNode(userId, isCurrentUser = false) {
    return {
        id: userId,
        leftId: "0",
        rightId: "0",
        isCurrentUser: isCurrentUser,
        isExpanded: false,
        children: {},
        isLoading: false
    };
}