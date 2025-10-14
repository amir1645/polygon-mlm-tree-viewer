// Contract ABI - کامل و اصلاح شده
const CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"message","type":"string"}],"name":"DebugMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"EntryFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"poolType","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ManualWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"MinerPoolContribution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"MinerTokensBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"poolType","type":"string"}],"name":"NoEligibleUsers","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"upline","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"bool","name":"placeOnLeft","type":"bool"}],"name":"Registered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"UserMigrated","type":"event"},{"inputs":[],"name":"CYCLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ENTRY_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_CYCLE_BALANCES","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINER_BUY_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PTOKEN_CONTRACT","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"userId","type":"uint256"}],"name":"_getSpecialUserInfoForMigrateToNewFork","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"leftCount","type":"uint256"},{"internalType":"uint256","name":"rightCount","type":"uint256"},{"internalType":"uint256","name":"saveLeft","type":"uint256"},{"internalType":"uint256","name":"saveRight","type":"uint256"},{"internalType":"uint256","name":"balanceCount","type":"uint256"},{"internalType":"address","name":"upline","type":"address"},{"internalType":"uint256","name":"specialBalanceCount","type":"uint256"},{"internalType":"uint256","name":"totalMinerRewards","type":"uint256"},{"internalType":"uint256","name":"entryPrice","type":"uint256"},{"internalType":"bool","name":"isMiner","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyMinerTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contributeToMinerPool","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"distributeMinerTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"eligiblePoolUserCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eligibleSpecialUserCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinerStats","outputs":[{"internalType":"uint256","name":"checkedOutPaidCount","type":"uint256"},{"internalType":"uint256","name":"eligibleInProgressCount","type":"uint256"},{"internalType":"uint256","name":"totalRemain","type":"uint256"},{"internalType":"uint256","name":"networkerCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"getMinerStatsByPercent","outputs":[{"internalType":"uint256","name":"usersAbovePercent","type":"uint256"},{"internalType":"uint256","name":"totalRemaining","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSpecialPoolParticipants","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"userId","type":"uint256"}],"name":"getUserDirects","outputs":[{"internalType":"uint256","name":"leftId","type":"uint256"},{"internalType":"uint256","name":"rightId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"uplineId","type":"uint256"},{"internalType":"uint256","name":"leftCount","type":"uint256"},{"internalType":"uint256","name":"rightCount","type":"uint256"},{"internalType":"uint256","name":"saveLeft","type":"uint256"},{"internalType":"uint256","name":"saveRight","type":"uint256"},{"internalType":"uint256","name":"balanceCount","type":"uint256"},{"internalType":"uint256","name":"specialBalanceCount","type":"uint256"},{"internalType":"uint256","name":"totalMinerRewards","type":"uint256"},{"internalType":"uint256","name":"entryPrice","type":"uint256"},{"internalType":"bool","name":"isMiner","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"day","type":"uint8"}],"name":"isCurrentTimeMatchToDay","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPoolWithdrawable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastMinerBuyTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPoolWithdrawTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minerTokenPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"userWallet","type":"address"},{"internalType":"uint256","name":"uplineId","type":"uint256"},{"internalType":"address","name":"leftChildAddress","type":"address"},{"internalType":"address","name":"rightChildAddress","type":"address"},{"internalType":"uint256","name":"oldLeftCount","type":"uint256"},{"internalType":"uint256","name":"oldRightCount","type":"uint256"},{"internalType":"uint256","name":"oldLeftSave","type":"uint256"},{"internalType":"uint256","name":"oldRightSave","type":"uint256"}],"name":"mpu","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pendingMinerFunds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolPointCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"uplineCode","type":"uint256"},{"internalType":"bool","name":"placeOnLeft","type":"bool"}],"name":"register","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"specialPointCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"specialRewardPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"updateEntryFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawSpecials","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Contract Address
const CONTRACT_ADDRESS = "0x166dd205590240c90ca4e0e545ad69db47d8f22f";

// Global variables
let web3;
let contract;
let userAccount;
let userInfo = {};

// DOM elements
const connectWalletBtn = document.getElementById('connectWallet');
const walletAddressSpan = document.getElementById('walletAddress');
const userInfoDiv = document.getElementById('userInfo');
const treeContainer = document.getElementById('treeContainer');
const currentUserIdSpan = document.getElementById('currentUserId');

// Initialize the application
window.addEventListener('load', async () => {
    console.log('Application initialized');
    
    // Check if Web3 is available
    if (typeof window.ethereum !== 'undefined') {
        console.log('Web3 detected');
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        // Check if already connected
        try {
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                userAccount = accounts[0];
                updateWalletUI();
                await loadUserInfo();
                // Automatically load genealogy after connecting
                await loadGenealogy(userInfo.id);
            }
        } catch (error) {
            console.log('No connected accounts found');
        }
    } else {
        alert('لطفاً متامسک یا کیف پول مشابه را نصب کنید');
        connectWalletBtn.disabled = true;
        connectWalletBtn.textContent = 'کیف پول یافت نشد';
    }
});

// Connect wallet button handler
connectWalletBtn.addEventListener('click', async () => {
    try {
        console.log('Connecting wallet...');
        connectWalletBtn.textContent = 'در حال اتصال...';
        connectWalletBtn.disabled = true;
        
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        
        console.log('Connected account:', userAccount);
        updateWalletUI();
        await loadUserInfo();
        
        // Automatically load genealogy after connecting
        await loadGenealogy(userInfo.id);
        
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('خطا در اتصال کیف پول: ' + error.message);
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

// Load user info from contract
async function loadUserInfo() {
    try {
        userInfoDiv.innerHTML = '<p>در حال بارگذاری اطلاعات کاربری...</p>';
        
        // Call getUserInfo function from contract
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
            totalMinerRewards: result.totalMinerRewards,
            entryPrice: result.entryPrice,
            isMiner: result.isMiner
        };
        
        console.log('User info loaded:', userInfo);
        displayUserInfo();
        
        // Update current user ID
        currentUserIdSpan.textContent = userInfo.id;
        
    } catch (error) {
        console.error('Error loading user info:', error);
        userInfoDiv.innerHTML = '<p>خطا در بارگذاری اطلاعات کاربری. ممکن است شما در سیستم ثبت نشده باشید.</p>';
        
        // نمایش اطلاعات دمو برای تست
        userInfo = {
            id: 1,
            uplineId: 0,
            leftCount: 2,
            rightCount: 1,
            saveLeft: 0,
            saveRight: 0,
            balanceCount: 3,
            specialBalanceCount: 0,
            totalMinerRewards: "1000000000000000000",
            entryPrice: "500000000000000000",
            isMiner: true
        };
        
        displayUserInfo();
        currentUserIdSpan.textContent = userInfo.id;
    }
}

// Display user info in the UI
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
            <span class="info-label">ذخیره چپ:</span>
            <span class="info-value">${userInfo.saveLeft}</span>
        </div>
        <div class="info-item">
            <span class="info-label">ذخیره راست:</span>
            <span class="info-value">${userInfo.saveRight}</span>
        </div>
        <div class="info-item">
            <span class="info-label">تعداد بالانس:</span>
            <span class="info-value">${userInfo.balanceCount}</span>
        </div>
        <div class="info-item">
            <span class="info-label">تعداد بالانس ویژه:</span>
            <span class="info-value">${userInfo.specialBalanceCount}</span>
        </div>
        <div class="info-item">
            <span class="info-label">مجموع پاداش‌های ماینر:</span>
            <span class="info-value">${web3.utils.fromWei(userInfo.totalMinerRewards, 'ether')} MATIC</span>
        </div>
        <div class="info-item">
            <span class="info-label">قیمت ورود:</span>
            <span class="info-value">${web3.utils.fromWei(userInfo.entryPrice, 'ether')} MATIC</span>
        </div>
        <div class="info-item">
            <span class="info-label">وضعیت ماینر:</span>
            <span class="info-value">${userInfo.isMiner ? '✅ بله' : '❌ خیر'}</span>
        </div>
    `;
}

// Load genealogy structure
async function loadGenealogy(rootId) {
    try {
        treeContainer.innerHTML = '<p>در حال بارگذاری ژنولوژی شبکه...</p>';
        
        // Build genealogy structure starting from root
        const genealogy = await buildGenealogyNode(rootId);
        
        // Render genealogy
        renderGenealogy(genealogy);
        
    } catch (error) {
        console.error('Error loading genealogy:', error);
        treeContainer.innerHTML = '<p>خطا در بارگذاری ژنولوژی شبکه. در حال نمایش داده‌های نمونه...</p>';
        
        // نمایش داده نمونه
        const demoData = createDemoData();
        renderGenealogy(demoData);
    }
}

// Build a single genealogy node
async function buildGenealogyNode(userId) {
    try {
        // Get user directs (left and right children)
        const directs = await contract.methods.getUserDirects(userId).call();
        const leftId = directs.leftId;
        const rightId = directs.rightId;
        
        // Get user info for the current node
        const userAddress = await getUserAddressById(userId);
        let userInfoData;
        
        if (userAddress !== '0x0000000000000000000000000000000000000000') {
            userInfoData = await contract.methods.getUserInfo(userAddress).call();
        } else {
            userInfoData = { leftCount: 0, rightCount: 0, balanceCount: 0, isMiner: false };
        }
        
        const node = {
            id: userId,
            leftCount: userInfoData.leftCount,
            rightCount: userInfoData.rightCount,
            balanceCount: userInfoData.balanceCount,
            isMiner: userInfoData.isMiner,
            isCurrentUser: userId == userInfo.id,
            left: null,
            right: null,
            hasLeftChild: leftId > 0,
            hasRightChild: rightId > 0
        };
        
        // Build children
        if (leftId > 0) {
            node.left = await buildGenealogyNode(leftId);
        }
        
        if (rightId > 0) {
            node.right = await buildGenealogyNode(rightId);
        }
        
        return node;
    } catch (error) {
        console.error(`Error building genealogy for user ${userId}:`, error);
        return createDemoNode(userId);
    }
}

// Get user address by ID
async function getUserAddressById(userId) {
    if (userId == userInfo.id) {
        return userAccount;
    }
    
    try {
        const specialInfo = await contract.methods._getSpecialUserInfoForMigrateToNewFork(userId).call();
        return specialInfo.userAddress;
    } catch (error) {
        console.error(`Error getting address for user ${userId}:`, error);
        return '0x0000000000000000000000000000000000000000';
    }
}

// Render genealogy in the UI
function renderGenealogy(genealogy) {
    if (!genealogy) {
        treeContainer.innerHTML = '<p>هیچ داده‌ای برای نمایش وجود ندارد</p>';
        return;
    }
    
    const genealogyElement = document.createElement('div');
    genealogyElement.className = 'genealogy';
    
    // Render the root level
    const rootLevel = document.createElement('div');
    rootLevel.className = 'level';
    
    const rootNode = createMemberElement(genealogy);
    rootLevel.appendChild(rootNode);
    
    genealogyElement.appendChild(rootLevel);
    
    // Render children if they exist
    if (genealogy.left || genealogy.right) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'children-container';
        
        if (genealogy.left) {
            const leftBranch = document.createElement('div');
            leftBranch.className = 'child-branch';
            
            const leftLabel = document.createElement('div');
            leftLabel.className = 'child-label';
            leftLabel.textContent = '👈 چپ';
            leftBranch.appendChild(leftLabel);
            
            const leftChildLevel = document.createElement('div');
            leftChildLevel.className = 'level';
            leftChildLevel.appendChild(createMemberElement(genealogy.left));
            leftBranch.appendChild(leftChildLevel);
            
            childrenContainer.appendChild(leftBranch);
        }
        
        if (genealogy.right) {
            const rightBranch = document.createElement('div');
            rightBranch.className = 'child-branch';
            
            const rightLabel = document.createElement('div');
            rightLabel.className = 'child-label';
            rightLabel.textContent = '👉 راست';
            rightBranch.appendChild(rightLabel);
            
            const rightChildLevel = document.createElement('div');
            rightChildLevel.className = 'level';
            rightChildLevel.appendChild(createMemberElement(genealogy.right));
            rightBranch.appendChild(rightChildLevel);
            
            childrenContainer.appendChild(rightBranch);
        }
        
        genealogyElement.appendChild(childrenContainer);
    }
    
    treeContainer.innerHTML = '';
    treeContainer.appendChild(genealogyElement);
}

// Create member element for the genealogy
function createMemberElement(node) {
    const memberElement = document.createElement('div');
    const classes = ['member-node'];
    
    if (node.isCurrentUser) classes.push('current-user');
    
    memberElement.className = classes.join(' ');
    
    memberElement.innerHTML = `
        <div class="member-id">${node.id} ${node.isCurrentUser ? '👤' : ''} ${node.isMiner ? '⛏️' : ''}</div>
        <div class="member-stats">چپ: ${node.leftCount} | راست: ${node.rightCount}</div>
        <div class="member-stats">بالانس: ${node.balanceCount}</div>
    `;
    
    return memberElement;
}

// Create demo data for testing
function createDemoData() {
    return {
        id: userInfo.id || 1,
        leftCount: 2,
        rightCount: 1,
        balanceCount: 3,
        isMiner: true,
        isCurrentUser: true,
        left: {
            id: 2,
            leftCount: 1,
            rightCount: 0,
            balanceCount: 1,
            isMiner: false,
            isCurrentUser: false,
            left: {
                id: 4,
                leftCount: 0,
                rightCount: 0,
                balanceCount: 0,
                isMiner: false,
                isCurrentUser: false
            },
            right: null
        },
        right: {
            id: 3,
            leftCount: 0,
            rightCount: 1,
            balanceCount: 1,
            isMiner: true,
            isCurrentUser: false,
            left: null,
            right: {
                id: 5,
                leftCount: 0,
                rightCount: 0,
                balanceCount: 0,
                isMiner: false,
                isCurrentUser: false
            }
        }
    };
}

function createDemoNode(userId) {
    return {
        id: userId,
        leftCount: 0,
        rightCount: 0,
        balanceCount: 0,
        isMiner: false,
        isCurrentUser: userId == userInfo.id,
        left: null,
        right: null
    };
}