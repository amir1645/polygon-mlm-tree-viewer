[file name]: app.js
[file content begin]
// Contract ABI - کامل
const CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"message","type":"string"}],"name":"DebugMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"EntryFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"poolType","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ManualWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"MinerPoolContribution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"MinerTokensBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"poolType","type":"string"}],"name":"NoEligibleUsers","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"upline","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"bool","name":"placeOnLeft","type":"bool"}],"name":"Registered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"UserMigrated","type":"event"},{"inputs":[],"name":"CYCLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ENTRY_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_CYCLE_BALANCES","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINER_BUY_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PTOKEN_CONTRACT","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"userId","type":"uint256"}],"name":"_getSpecialUserInfoForMigrateToNewFork","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"leftCount","type":"uint256"},{"internalType":"uint256","name":"rightCount","type":"uint256"},{"internalType":"uint256","name":"saveLeft","type":"uint256"},{"internalType":"uint256","name":"saveRight","type":"uint256"},{"internalType":"uint256","name":"balanceCount","type":"uint256"},{"internalType":"address","name":"upline","type":"address"},{"internalType":"uint256","name":"specialBalanceCount","type":"uint256"},{"internalType":"uint256","name":"totalMinerRewards","type":"uint256"},{"internalType":"uint256","name":"entryPrice","type":"uint256"},{"internalType":"bool","name":"isMiner","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyMinerTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contributeToMinerPool","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"distributeMinerTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"eligiblePoolUserCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eligibleSpecialUserCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinerStats","outputs":[{"internalType":"uint256","name":"checkedOutPaidCount","type":"uint256"},{"internalType":"uint256","name":"eligibleInProgressCount","type":"uint256"},{"internalType":"uint256","name":"totalRemain","type":"uint256"},{"internalType":"uint256","name":"networkerCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"getMinerStatsByPercent","outputs":[{"internalType":"uint256","name":"usersAbovePercent","type":"uint256"},{"internalType":"uint256","name":"totalRemaining","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSpecialPoolParticipants","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"userId","type":"uint256"}],"name":"getUserDirects","outputs":[{"internalType":"uint256","name":"leftId","type":"uint256"},{"internalType":"uint256","name":"rightId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"uplineId","type":"uint256"},{"internalType":"uint256","name":"leftCount","type":"uint256"},{"internalType":"uint256","name":"rightCount","type":"uint256"},{"internalType":"uint256","name":"saveLeft","type":"uint256"},{"internalType":"uint256","name":"saveRight","type":"uint256"},{"internalType":"uint256","name":"balanceCount","type":"uint256"},{"internalType":"uint256","name":"specialBalanceCount","type":"uint256"},{"internalType":"uint256","name":"totalMinerRewards","type":"uint256"},{"internalType":"uint256","name":"entryPrice","type":"uint256"},{"internalType":"bool","name":"isMiner","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"day","type":"uint8"}],"name":"isCurrentTimeMatchToDay","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPoolWithdrawable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastMinerBuyTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPoolWithdrawTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minerTokenPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"userWallet","type":"address"},{"internalType":"uint256","name":"uplineId","type":"uint256"},{"internalType":"address","name":"leftChildAddress","type":"address"},{"internalType":"address","name":"rightChildAddress","type":"address"},{"internalType":"uint256","name":"oldLeftCount","type":"uint256"},{"internalType":"uint256","name":"oldRightCount","type":"uint256"},{"internalType":"uint256","name":"oldLeftSave","type":"uint256"},{"internalType":"uint256","name":"oldRightSave","type":"uint256"}],"name":"mpu","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pendingMinerFunds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolPointCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"uplineCode","type":"uint256"},{"internalType":"bool","name":"placeOnLeft","type":"bool"}],"name":"register","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"specialPointCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"specialRewardPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"updateEntryFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawSpecials","outputs":[],"stateMutability":"nonpayable","type":"function"}];

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
        treeContainer.innerHTML = '<p>در حال بارگذاری ژنولوژی...</p>';
        
        const rootNode = await createNodeData(rootId, true);
        loadedNodes.set(rootId, rootNode);
        
        await loadDirectChildren(rootNode);
        
        renderPyramidTree();
        
    } catch (error) {
        console.error('Error loading initial genealogy:', error);
        loadDemoGenealogy();
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
        parentNode.children[side] = childNode;
        
    } catch (error) {
        console.error(`Error loading child node ${childId}:`, error);
    }
}

function renderPyramidTree() {
    const rootNode = loadedNodes.get(userInfo.id);
    if (!rootNode) return;
    
    const treeHTML = generatePyramidHTML(rootNode, 0);
    treeContainer.innerHTML = `
        <div class="genealogy-pyramid">
            ${treeHTML}
        </div>
    `;
    
    attachPyramidNodeEventListeners();
}

function generatePyramidHTML(node, level) {
    const hasLeftChild = node.leftId !== "0";
    const hasRightChild = node.rightId !== "0";
    const hasChildren = hasLeftChild || hasRightChild;
    
    // کلاس‌های اضافی برای نود
    let nodeClasses = `pyramid-node ${node.isCurrentUser ? 'current-user' : ''} ${hasChildren ? 'has-children' : ''} ${node.isExpanded ? 'expanded' : ''}`;
    if (node.isMiner) {
        nodeClasses += ' miner-node';
    }
    
    let html = `
        <div class="pyramid-level level-${level}">
            <div class="${nodeClasses}" data-node-id="${node.id}">
                <div class="member-id">
                    ${node.id} 
                    ${node.isCurrentUser ? '👤' : ''} 
                    ${node.isMiner ? '⛏️' : ''}
                    ${hasChildren ? (node.isExpanded ? ' ▼' : ' ▶') : ''}
                </div>
                ${node.leftCount ? `
                <div class="member-stats">چپ: ${node.leftCount} | راست: ${node.rightCount}</div>
                <div class="member-stats">بالانس: ${node.balanceCount}</div>
                ` : ''}
                ${node.isLoading ? '<div class="loading">در حال بارگذاری...</div>' : ''}
            </div>
        </div>
    `;
    
    if (node.isExpanded && hasChildren) {
        html += `<div class="pyramid-children level-${level}">`;
        
        if (hasLeftChild) {
            const leftChild = node.children.left;
            html += `
                <div class="pyramid-child-branch left">
                    <div class="child-label">👈 چپ</div>
                    ${leftChild ? generatePyramidHTML(leftChild, level + 1) : '<div class="loading-node">در حال بارگذاری...</div>'}
                </div>
            `;
        }
        
        if (hasRightChild) {
            const rightChild = node.children.right;
            html += `
                <div class="pyramid-child-branch right">
                    <div class="child-label">👉 راست</div>
                    ${rightChild ? generatePyramidHTML(rightChild, level + 1) : '<div class="loading-node">در حال بارگذاری...</div>'}
                </div>
            `;
        }
        
        html += '</div>';
    }
    
    return html;
}

function attachPyramidNodeEventListeners() {
    document.querySelectorAll('.pyramid-node.has-children').forEach(nodeElement => {
        nodeElement.addEventListener('click', async (e) => {
            e.stopPropagation();
            const nodeId = nodeElement.dataset.nodeId;
            await togglePyramidNodeExpansion(nodeId);
        });
    });
}

async function togglePyramidNodeExpansion(nodeId) {
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
    loadDemoGenealogy();
}

function loadDemoGenealogy() {
    const demoNodes = new Map();
    
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
        rightId: "0",
        leftCount: "1",
        rightCount: "0",
        balanceCount: "1",
        isMiner: false,
        isCurrentUser: false,
        isExpanded: false,
        children: {}
    };
    
    const rightChild = {
        id: "3",
        leftId: "0",
        rightId: "5",
        leftCount: "0",
        rightCount: "1",
        balanceCount: "1",
        isMiner: true,
        isCurrentUser: false,
        isExpanded: false,
        children: {}
    };
    
    const leftGrandchild = {
        id: "4",
        leftId: "0",
        rightId: "0",
        leftCount: "0",
        rightCount: "0",
        balanceCount: "0",
        isMiner: false,
        isCurrentUser: false,
        isExpanded: false,
        children: {}
    };
    
    const rightGrandchild = {
        id: "5",
        leftId: "0",
        rightId: "0",
        leftCount: "0",
        rightCount: "0",
        balanceCount: "0",
        isMiner: false,
        isCurrentUser: false,
        isExpanded: false,
        children: {}
    };
    
    demoNodes.set("1", rootNode);
    demoNodes.set("2", leftChild);
    demoNodes.set("3", rightChild);
    demoNodes.set("4", leftGrandchild);
    demoNodes.set("5", rightGrandchild);
    
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
[file content end]