// Contract ABI
const CONTRACT_ABI = [
    {
        "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{"indexed": false, "internalType": "string", "name": "message", "type": "string"}],
        "name": "DebugMessage",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{"indexed": false, "internalType": "uint256", "name": "newFee", "type": "uint256"}],
        "name": "EntryFeeUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
            {"indexed": false, "internalType": "string", "name": "poolType", "type": "string"},
            {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "ManualWithdraw",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "contributor", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "MinerPoolContribution",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
            {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
        ],
        "name": "MinerTokensBought",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{"indexed": false, "internalType": "string", "name": "poolType", "type": "string"}],
        "name": "NoEligibleUsers",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "previousOwner", "type": "address"},
            {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
            {"indexed": true, "internalType": "address", "name": "upline", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "id", "type": "uint256"},
            {"indexed": false, "internalType": "bool", "name": "placeOnLeft", "type": "bool"}
        ],
        "name": "Registered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "id", "type": "uint256"}
        ],
        "name": "UserMigrated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "CYCLE_DURATION",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ENTRY_FEE",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MAX_CYCLE_BALANCES",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MINER_BUY_INTERVAL",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PTOKEN_CONTRACT",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "userId", "type": "uint256"}],
        "name": "_getSpecialUserInfoForMigrateToNewFork",
        "outputs": [
            {"internalType": "uint256", "name": "id", "type": "uint256"},
            {"internalType": "address", "name": "userAddress", "type": "address"},
            {"internalType": "uint256", "name": "leftCount", "type": "uint256"},
            {"internalType": "uint256", "name": "rightCount", "type": "uint256"},
            {"internalType": "uint256", "name": "saveLeft", "type": "uint256"},
            {"internalType": "uint256", "name": "saveRight", "type": "uint256"},
            {"internalType": "uint256", "name": "balanceCount", "type": "uint256"},
            {"internalType": "address", "name": "upline", "type": "address"},
            {"internalType": "uint256", "name": "specialBalanceCount", "type": "uint256"},
            {"internalType": "uint256", "name": "totalMinerRewards", "type": "uint256"},
            {"internalType": "uint256", "name": "entryPrice", "type": "uint256"},
            {"internalType": "bool", "name": "isMiner", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "buyMinerTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contributeToMinerPool",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "distributeMinerTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "eligiblePoolUserCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "eligibleSpecialUserCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMinerStats",
        "outputs": [
            {"internalType": "uint256", "name": "checkedOutPaidCount", "type": "uint256"},
            {"internalType": "uint256", "name": "eligibleInProgressCount", "type": "uint256"},
            {"internalType": "uint256", "name": "totalRemain", "type": "uint256"},
            {"internalType": "uint256", "name": "networkerCount", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "percent", "type": "uint256"}],
        "name": "getMinerStatsByPercent",
        "outputs": [
            {"internalType": "uint256", "name": "usersAbovePercent", "type": "uint256"},
            {"internalType": "uint256", "name": "totalRemaining", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getSpecialPoolParticipants",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTokenPrice",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
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
    },
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
        "inputs": [{"internalType": "uint8", "name": "day", "type": "uint8"}],
        "name": "isCurrentTimeMatchToDay",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isPoolWithdrawable",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lastMinerBuyTime",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lastPoolWithdrawTime",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "minerTokenPool",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "id", "type": "uint256"},
            {"internalType": "address", "name": "userWallet", "type": "address"},
            {"internalType": "uint256", "name": "uplineId", "type": "uint256"},
            {"internalType": "address", "name": "leftChildAddress", "type": "address"},
            {"internalType": "address", "name": "rightChildAddress", "type": "address"},
            {"internalType": "uint256", "name": "oldLeftCount", "type": "uint256"},
            {"internalType": "uint256", "name": "oldRightCount", "type": "uint256"},
            {"internalType": "uint256", "name": "oldLeftSave", "type": "uint256"},
            {"internalType": "uint256", "name": "oldRightSave", "type": "uint256"}
        ],
        "name": "mpu",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pendingMinerFunds",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "poolBalance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "poolPointCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "uplineCode", "type": "uint256"},
            {"internalType": "bool", "name": "placeOnLeft", "type": "bool"}
        ],
        "name": "register",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "specialPointCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "specialRewardPool",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalUsers",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "newFee", "type": "uint256"}],
        "name": "updateEntryFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawPool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawSpecials",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

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
const userModal = document.getElementById('userModal');
const modalUserInfo = document.getElementById('modalUserInfo');
const closeModal = document.querySelector('.close');

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

// Close modal handler
closeModal.addEventListener('click', () => {
    userModal.style.display = 'none';
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
        
        // Build genealogy structure with 3 generations
        const genealogy = await buildGenealogy(rootId, 3);
        
        // Render genealogy
        renderGenealogy(genealogy);
        
    } catch (error) {
        console.error('Error loading genealogy:', error);
        treeContainer.innerHTML = '<p>خطا در بارگذاری ژنولوژی شبکه</p>';
    }
}

// Recursive function to build genealogy structure
async function buildGenealogy(userId, generations, currentGeneration = 0) {
    if (currentGeneration >= generations) {
        return null;
    }
    
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
            userInfoData = { leftCount: 0, rightCount: 0, balanceCount: 0 };
        }
        
        const member = {
            id: userId,
            leftCount: userInfoData.leftCount,
            rightCount: userInfoData.rightCount,
            balanceCount: userInfoData.balanceCount,
            isCurrentUser: userId === userInfo.id,
            left: null,
            right: null
        };
        
        // Recursively build left and right subtrees
        if (leftId > 0) {
            member.left = await buildGenealogy(leftId, generations, currentGeneration + 1);
        }
        
        if (rightId > 0) {
            member.right = await buildGenealogy(rightId, generations, currentGeneration + 1);
        }
        
        return member;
    } catch (error) {
        console.error(`Error building genealogy for user ${userId}:`, error);
        return {
            id: userId,
            leftCount: 0,
            rightCount: 0,
            balanceCount: 0,
            isCurrentUser: userId === userInfo.id,
            left: null,
            right: null
        };
    }
}

// Get user address by ID
async function getUserAddressById(userId) {
    // For the root user (current user), we already have the address
    if (userId == userInfo.id) {
        return userAccount;
    }
    
    // For other users, we'll try to get the address from the special user info function
    try {
        const specialInfo = await contract.methods._getSpecialUserInfoForMigrateToNewFork(userId).call();
        return specialInfo.userAddress;
    } catch (error) {
        console.error(`Error getting address for user ${userId}:`, error);
        // Return a placeholder address if we can't get the real one
        return '0x0000000000000000000000000000000000000000';
    }
}

// Render genealogy in the UI
function renderGenealogy(genealogy) {
    if (!genealogy) {
        treeContainer.innerHTML = '<p>هیچ داده‌ای برای نمایش وجود ندارد</p>';
        return;
    }
    
    // Create genealogy container
    const genealogyElement = document.createElement('div');
    genealogyElement.className = 'genealogy';
    
    // Render genealogy generations
    const generations = getGenealogyGenerations(genealogy);
    
    generations.forEach((generation, generationIndex) => {
        const generationElement = document.createElement('div');
        generationElement.className = 'generation';
        
        generation.forEach(member => {
            if (member) {
                const memberElement = createMemberElement(member);
                generationElement.appendChild(memberElement);
            } else {
                // Add empty placeholder for missing members
                const emptyElement = document.createElement('div');
                emptyElement.className = 'member-node empty';
                emptyElement.style.visibility = 'hidden';
                emptyElement.innerHTML = '<div class="member-id">-</div>';
                generationElement.appendChild(emptyElement);
            }
        });
        
        genealogyElement.appendChild(generationElement);
    });
    
    treeContainer.innerHTML = '';
    treeContainer.appendChild(genealogyElement);
}

// Get genealogy generations for rendering
function getGenealogyGenerations(genealogy) {
    const generations = [];
    
    function traverse(member, generation) {
        if (!member) return;
        
        if (!generations[generation]) {
            generations[generation] = [];
        }
        
        generations[generation].push(member);
        
        traverse(member.left, generation + 1);
        traverse(member.right, generation + 1);
    }
    
    traverse(genealogy, 0);
    
    // Fill in missing positions to maintain genealogy structure
    const maxGeneration = generations.length - 1;
    for (let i = 0; i <= maxGeneration; i++) {
        const expectedMembers = Math.pow(2, i);
        while (generations[i].length < expectedMembers) {
            generations[i].push(null);
        }
    }
    
    return generations;
}

// Create member element for the genealogy
function createMemberElement(member) {
    const memberElement = document.createElement('div');
    memberElement.className = `member-node ${member.isCurrentUser ? 'current-user' : ''}`;
    
    memberElement.innerHTML = `
        <div class="member-id">${member.id} ${member.isCurrentUser ? '👤' : ''}</div>
        <div class="member-stats">چپ: ${member.leftCount} | راست: ${member.rightCount}</div>
        <div class="member-stats">بالانس: ${member.balanceCount}</div>
    `;
    
    // Add click event to show member details and children
    memberElement.addEventListener('click', async () => {
        await showMemberDirects(member.id);
    });
    
    return memberElement;
}

// Show member directs in modal
async function showMemberDirects(memberId) {
    try {
        modalUserInfo.innerHTML = '<p>در حال بارگذاری اطلاعات...</p>';
        userModal.style.display = 'block';
        
        const directs = await contract.methods.getUserDirects(memberId).call();
        const leftId = directs.leftId;
        const rightId = directs.rightId;
        
        let leftInfo = '❌ ندارد';
        let rightInfo = '❌ ندارد';
        
        if (leftId > 0) {
            const leftAddress = await getUserAddressById(leftId);
            if (leftAddress !== '0x0000000000000000000000000000000000000000') {
                const leftUserInfo = await contract.methods.getUserInfo(leftAddress).call();
                leftInfo = `
                    <strong>شناسه: ${leftId}</strong><br>
                    چپ: ${leftUserInfo.leftCount} | راست: ${leftUserInfo.rightCount}<br>
                    بالانس: ${leftUserInfo.balanceCount}<br>
                    وضعیت: ${leftUserInfo.isMiner ? '✅ ماینر' : '❌ غیر ماینر'}
                `;
            } else {
                leftInfo = `شناسه: ${leftId} (اطلاعات کامل در دسترس نیست)`;
            }
        }
        
        if (rightId > 0) {
            const rightAddress = await getUserAddressById(rightId);
            if (rightAddress !== '0x0000000000000000000000000000000000000000') {
                const rightUserInfo = await contract.methods.getUserInfo(rightAddress).call();
                rightInfo = `
                    <strong>شناسه: ${rightId}</strong><br>
                    چپ: ${rightUserInfo.leftCount} | راست: ${rightUserInfo.rightCount}<br>
                    بالانس: ${rightUserInfo.balanceCount}<br>
                    وضعیت: ${rightUserInfo.isMiner ? '✅ ماینر' : '❌ غیر ماینر'}
                `;
            } else {
                rightInfo = `شناسه: ${rightId} (اطلاعات کامل در دسترس نیست)`;
            }
        }
        
        modalUserInfo.innerHTML = `
            <div class="info-item">
                <span class="info-label">عضو انتخاب شده:</span>
                <span class="info-value">${memberId}</span>
            </div>
            <div style="margin: 20px 0; padding: 15px; background: var(--gray-light); border-radius: var(--border-radius);">
                <h4 style="color: var(--primary); margin-bottom: 10px;">👥 اعضای زیرمجموعه:</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: white; padding: 15px; border-radius: var(--border-radius); border: 2px solid var(--primary);">
                        <strong style="color: var(--primary);">👈 عضو چپ:</strong><br>
                        ${leftInfo}
                    </div>
                    <div style="background: white; padding: 15px; border-radius: var(--border-radius); border: 2px solid var(--primary);">
                        <strong style="color: var(--primary);">👉 عضو راست:</strong><br>
                        ${rightInfo}
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading member directs:', error);
        modalUserInfo.innerHTML = '<p>خطا در بارگذاری اطلاعات عضو</p>';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === userModal) {
        userModal.style.display = 'none';
    }
});