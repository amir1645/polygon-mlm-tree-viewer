// اتصال به کیف پول و مدیریت ژنولوژی
let web3;
let userAccount;
let contract;

// آدرس و ABI قرارداد
const CONTRACT_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"message","type":"string"}],"name":"DebugMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"EntryFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"poolType","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ManualWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"contributor ","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"MinerPoolContribution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"MinerTokensBought","type":"event"},{"anonymous":false,"inputs" :[{"indexed":false,"internalType":"string","name":"poolType","type":"string"}],"name":"NoEligibleUsers","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"upline","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"bool","name":"placeOnLeft","type":"bool"}],"name":"Registered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address" ,"name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"UserMigrated","type":"event"},{"inputs":[],"name":"CYCLE_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ENTRY_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256" }],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_CYCLE_BALANCES","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINER_BUY_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PTOKEN_CONTRACT","o utputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"userId","type":"uint256"}],"name":"_getSpecialUserInfoForMigrateToNewFork","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"leftCount","type":"uint256"},{"internalType":"uint256","name":"rightCount","type":"uint256"},{"internalType":"uint256","name":"saveLeft","type":"uint256"},{"internalType":"uint256","name":"saveRight","type":"uint256"},{"internalType":"uint256","name":"balanceCount","type":"uint256"},{"internalType":"address","name":"upline","type":"address"},{"internalType":"uint256","name":"specialBalanceCount","type":"uint256"},{"internalType":"uint256","name":"totalMinerRewards","type":"uint256"},{"internalType":"uint256","name":"entryPrice","type":"uint256"},{"internalType":"bool","name":"isMiner","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyMinerTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contributeToMine rPool","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"distributeMinerTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"eligiblePoolUserCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eligibleSpecialUserCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinerStats","outputs":[{"internalType":"uint256","name":"checkedOutPaidCount","type":"uint256"},{"internalType":"uint256","name":"eligibleInProgressCount","type":"uint256"},{"internalType":"uint256","name":"totalRemain","type":"uint256"},{"internalType":"uint256","name":"networkerCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"getMinerStatsByPercent","outputs":[{"internalType":"uint256","name":"usersAbovePercent","type":"uint256"},{"internalType":"uint256","name":"totalRemaining","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getS pecialPoolParticipants","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"userId","type":"uint256"}],"name":"getUserDirects","outputs":[{"internalType":"uint256","name":"leftId","type":"uint256"},{"internalType":"uint256","name":"rightId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"uplineId","type":"uint256"},{"internalType":"uint256","name":"leftCount","type":"uint256"},{"internalType":"uint256","name":"rightCount","type":"uint256"},{"internalType":"uint256","name":"saveLeft","type":"uint256"},{"internalType":"uint256","name":"saveRight","type":"uint256"},{"internalType":"uint256","name":"balanceCount","type":"uint256"},{"internalType":"uint256","name":"specialBalanceCount","type":"uint256"},{"internalType":"uint256","name":"totalMinerRewards","type":"uint256"},{"internalType":"uint256","name":"entryPrice","type":"uint256"},{"internalType":"bool","name":"isMiner","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"day","type":"uint8"}],"name":"isCurrentTimeMatchToDay","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPoolWithdrawable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastMinerBuyTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPoolWithdrawTime ","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minerTokenPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"userWallet","type":"address"},{"internalType":"uint256","name":"uplineId","type":"uint256"},{"internalType":"address","name":"leftChildAddress","type":"address"},{"internalType":"address","name":"rightChildAddress","type":"address"},{"internalType":"uint256","name":"oldLeftCount","type":"uint256"},{"internalType":"uint256","name":"oldRightCount","type":"uint256"},{"internalType":"uint256","name":"oldLeftSave","type":"uint256"},{"internalType":"uint256","name":"oldRightSave","type":"uint256"}],"name":"mpu","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pendingMinerFunds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolBalance","outputs":[{"internalType":"uint256","name ":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolPointCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"uplineCode","type":"uint256"},{"internalType":"bool","name":"placeOnLeft","type":"bool"}],"name":"register","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"specialPointCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"specialRewardPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"updateEntryFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawSpecials","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// رویداد اتصال کیف پول
document.getElementById('connectWallet').addEventListener('click', connectWallet);

// تابع اتصال به کیف پول
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // درخواست اتصال حساب
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            
            // ایجاد نمونه Web3
            web3 = new Web3(window.ethereum);
            
            // ایجاد نمونه قرارداد
            contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            
            // به‌روزرسانی رابط کاربری
            updateUI();
            
            // بارگذاری اطلاعات کاربر و ژنولوژی
            await loadUserInfo();
            await loadGenealogyTree();
            
        } catch (error) {
            console.error('خطا در اتصال به کیف پول:', error);
            alert('خطا در اتصال به کیف پول. لطفاً دوباره تلاش کنید.');
        }
    } else {
        alert('لطفاً متامسک یا کیف پول مناسب را نصب کنید.');
    }
}

// تابع به‌روزرسانی رابط کاربری
function updateUI() {
    const walletAddress = document.getElementById('walletAddress');
    const shortAddress = userAccount.substring(0, 6) + '...' + userAccount.substring(userAccount.length - 4);
    walletAddress.textContent = shortAddress;
    
    document.getElementById('connectWallet').textContent = 'اتصال برقرار شد';
    document.getElementById('connectWallet').disabled = true;
}

// تابع بارگذاری اطلاعات کاربر
async function loadUserInfo() {
    try {
        // فراخوانی تابع قرارداد برای دریافت اطلاعات کاربر
        const userInfo = await contract.methods.getUserInfo(userAccount).call();
        
        // به‌روزرسانی بخش اطلاعات کاربری
        const userInfoContainer = document.getElementById('userInfo');
        userInfoContainer.innerHTML = `
            <div class="info-item">
                <span class="info-label">شناسه کاربر:</span>
                <span class="info-value">${userInfo.id || 'نامشخص'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">شناسه آپلاین:</span>
                <span class="info-value">${userInfo.uplineId || 'ندارد'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">تعداد زیرمجموعه‌های چپ:</span>
                <span class="info-value">${userInfo.leftCount || '0'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">تعداد زیرمجموعه‌های راست:</span>
                <span class="info-value">${userInfo.rightCount || '0'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">ذخیره چپ:</span>
                <span class="info-value">${userInfo.saveLeft || '0'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">ذخیره راست:</span>
                <span class="info-value">${userInfo.saveRight || '0'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">تعداد بالانس:</span>
                <span class="info-value">${userInfo.balanceCount || '0'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">تعداد بالانس ویژه:</span>
                <span class="info-value">${userInfo.specialBalanceCount || '0'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">پاداش‌های ماینر:</span>
                <span class="info-value">${web3.utils.fromWei(userInfo.totalMinerRewards || '0', 'ether')} ETH</span>
            </div>
            <div class="info-item">
                <span class="info-label">قیمت ورود:</span>
                <span class="info-value">${web3.utils.fromWei(userInfo.entryPrice || '0', 'ether')} ETH</span>
            </div>
            <div class="info-item">
                <span class="info-label">وضعیت ماینر:</span>
                <span class="info-value">${userInfo.isMiner ? '✅ فعال' : '❌ غیرفعال'}</span>
            </div>
        `;
        
        // به‌روزرسانی شناسه کاربر فعلی
        document.getElementById('currentUserId').textContent = userInfo.id || 'نامشخص';
        
    } catch (error) {
        console.error('خطا در دریافت اطلاعات کاربر:', error);
        document.getElementById('userInfo').innerHTML = '<p>خطا در دریافت اطلاعات کاربر. ممکن است کاربر ثبت‌نام نکرده باشد.</p>';
    }
}

// تابع بارگذاری درخت ژنولوژی
async function loadGenealogyTree() {
    try {
        // دریافت اطلاعات کاربر فعلی
        const userInfo = await contract.methods.getUserInfo(userAccount).call();
        
        // اگر کاربر ثبت‌نام نکرده باشد
        if (userInfo.id === '0') {
            document.getElementById('treeContainer').innerHTML = '<p>کاربر در سیستم ثبت‌نام نکرده است.</p>';
            return;
        }
        
        // ساختار داده‌ای برای درخت
        const treeData = {
            id: userInfo.id,
            address: userAccount,
            leftCount: userInfo.leftCount,
            rightCount: userInfo.rightCount,
            saveLeft: userInfo.saveLeft,
            saveRight: userInfo.saveRight,
            balanceCount: userInfo.balanceCount,
            isMiner: userInfo.isMiner,
            left: null,
            right: null
        };
        
        // دریافت اطلاعات فرزندان مستقیم
        const directChildren = await contract.methods.getUserDirects(userInfo.id).call();
        
        // اگر فرزند چپ وجود دارد
        if (directChildren.leftId !== '0') {
            treeData.left = await getUserDataById(directChildren.leftId);
        }
        
        // اگر فرزند راست وجود دارد
        if (directChildren.rightId !== '0') {
            treeData.right = await getUserDataById(directChildren.rightId);
        }
        
        // نمایش درخت ژنولوژی
        renderGenealogyTree(treeData);
        
    } catch (error) {
        console.error('خطا در دریافت ژنولوژی:', error);
        document.getElementById('treeContainer').innerHTML = '<p>خطا در بارگذاری ژنولوژی. لطفاً دوباره تلاش کنید.</p>';
    }
}

// تابع دریافت اطلاعات کاربر بر اساس شناسه
async function getUserDataById(userId) {
    try {
        // دریافت اطلاعات کاربر ویژه (با جزئیات بیشتر)
        const specialUserInfo = await contract.methods._getSpecialUserInfoForMigrateToNewFork(userId).call();
        
        // دریافت فرزندان مستقیم
        const directChildren = await contract.methods.getUserDirects(userId).call();
        
        const userData = {
            id: specialUserInfo.id,
            address: specialUserInfo.userAddress,
            leftCount: specialUserInfo.leftCount,
            rightCount: specialUserInfo.rightCount,
            saveLeft: specialUserInfo.saveLeft,
            saveRight: specialUserInfo.saveRight,
            balanceCount: specialUserInfo.balanceCount,
            isMiner: specialUserInfo.isMiner,
            left: null,
            right: null
        };
        
        // اگر فرزند چپ وجود دارد
        if (directChildren.leftId !== '0') {
            userData.left = await getUserDataById(directChildren.leftId);
        }
        
        // اگر فرزند راست وجود دارد
        if (directChildren.rightId !== '0') {
            userData.right = await getUserDataById(directChildren.rightId);
        }
        
        return userData;
        
    } catch (error) {
        console.error(`خطا در دریافت اطلاعات کاربر ${userId}:`, error);
        return null;
    }
}

// تابع رندر درخت ژنولوژی به صورت هرمی باینری
function renderGenealogyTree(data) {
    const treeContainer = document.getElementById('treeContainer');
    
    // اگر داده‌ای وجود ندارد
    if (!data) {
        treeContainer.innerHTML = '<p>هیچ داده‌ای برای نمایش وجود ندارد.</p>';
        return;
    }
    
    // ایجاد ساختار هرمی
    const pyramidHTML = createBinaryPyramid(data);
    treeContainer.innerHTML = pyramidHTML;
    
    // اضافه کردن رویداد کلیک برای نودهای دارای فرزند
    addNodeClickEvents();
}

// تابع ایجاد هرم باینری
function createBinaryPyramid(data) {
    let pyramidHTML = '<div class="genealogy-pyramid">';
    
    // ایجاد سطوح هرم
    pyramidHTML += createPyramidLevel(data, 0);
    
    pyramidHTML += '</div>';
    return pyramidHTML;
}

// تابع ایجاد سطح هرم
function createPyramidLevel(node, level) {
    if (!node) return '';
    
    const levelClass = `level-${level}`;
    let levelHTML = `<div class="pyramid-level ${levelClass}">`;
    
    // اگر سطح 0 باشد (ریشه)
    if (level === 0) {
        levelHTML += createNodeHTML(node, level, true);
        levelHTML += '</div>';
        
        // اضافه کردن سطح فرزندان
        if (node.left || node.right) {
            levelHTML += '<div class="pyramid-children">';
            
            // شاخه سمت چپ
            levelHTML += '<div class="pyramid-child-branch left">';
            levelHTML += '<div class="child-label">سمت چپ</div>';
            if (node.left) {
                levelHTML += createPyramidLevel(node.left, level + 1);
            } else {
                levelHTML += '<div class="loading-node">بدون عضو</div>';
            }
            levelHTML += '</div>';
            
            // شاخه سمت راست
            levelHTML += '<div class="pyramid-child-branch right">';
            levelHTML += '<div class="child-label">سمت راست</div>';
            if (node.right) {
                levelHTML += createPyramidLevel(node.right, level + 1);
            } else {
                levelHTML += '<div class="loading-node">بدون عضو</div>';
            }
            levelHTML += '</div>';
            
            levelHTML += '</div>';
        }
        
        return levelHTML;
    }
    
    // برای سطوح دیگر
    levelHTML += createNodeHTML(node, level, false);
    levelHTML += '</div>';
    
    // اگر سطح فرد باشد (سطوح 1، 3، 5 و ...) و نود فرزند داشته باشد
    if (level % 2 === 1 && (node.left || node.right)) {
        levelHTML += '<div class="pyramid-children">';
        
        // شاخه سمت چپ
        levelHTML += '<div class="pyramid-child-branch left">';
        levelHTML += '<div class="child-label">سمت چپ</div>';
        if (node.left) {
            levelHTML += createPyramidLevel(node.left, level + 1);
        } else {
            levelHTML += '<div class="loading-node">بدون عضو</div>';
        }
        levelHTML += '</div>';
        
        // شاخه سمت راست
        levelHTML += '<div class="pyramid-child-branch right">';
        levelHTML += '<div class="child-label">سمت راست</div>';
        if (node.right) {
            levelHTML += createPyramidLevel(node.right, level + 1);
        } else {
            levelHTML += '<div class="loading-node">بدون عضو</div>';
        }
        levelHTML += '</div>';
        
        levelHTML += '</div>';
    }
    
    return levelHTML;
}

// تابع ایجاد HTML برای یک نود
function createNodeHTML(node, level, isRoot) {
    const isCurrentUser = node.address === userAccount;
    const hasChildren = node.left || node.right;
    const nodeClass = `pyramid-node ${isCurrentUser ? 'current-user' : ''} ${hasChildren ? 'has-children' : ''} ${node.isMiner ? 'miner-node' : ''}`;
    
    return `
        <div class="${nodeClass}" data-address="${node.address}" data-level="${level}" data-id="${node.id}">
            <div class="member-id">${node.id || 'نامشخص'}</div>
            <div class="member-stats">
                چپ: ${node.leftCount || 0} | راست: ${node.rightCount || 0}
                ${node.isMiner ? '<br>⛏️ ماینر' : ''}
            </div>
            ${hasChildren ? '<div class="loading">کلیک برای بارگذاری...</div>' : ''}
        </div>
    `;
}

// تابع اضافه کردن رویداد کلیک برای نودها
function addNodeClickEvents() {
    const nodes = document.querySelectorAll('.pyramid-node.has-children');
    
    nodes.forEach(node => {
        node.addEventListener('click', async function() {
            const userId = this.getAttribute('data-id');
            const level = parseInt(this.getAttribute('data-level'));
            
            // اگر نود قبلاً expand شده باشد، آن را ببند
            if (this.classList.contains('expanded')) {
                this.classList.remove('expanded');
                // در اینجا کد بستن فرزندان اضافه می‌شود
                return;
            }
            
            // علامت‌گذاری نود به عنوان expand شده
            this.classList.add('expanded');
            
            // بارگذاری فرزندان
            await loadChildren(userId, level, this);
        });
    });
}

// تابع بارگذاری فرزندان یک نود
async function loadChildren(userId, level, nodeElement) {
    try {
        // دریافت فرزندان مستقیم
        const directChildren = await contract.methods.getUserDirects(userId).call();
        
        // دریافت اطلاعات کامل فرزندان
        let leftChild = null;
        let rightChild = null;
        
        if (directChildren.leftId !== '0') {
            leftChild = await getUserDataById(directChildren.leftId);
        }
        
        if (directChildren.rightId !== '0') {
            rightChild = await getUserDataById(directChildren.rightId);
        }
        
        // نمایش فرزندان
        displayChildren(leftChild, rightChild, level, nodeElement);
        
    } catch (error) {
        console.error('خطا در بارگذاری فرزندان:', error);
        const loadingElement = nodeElement.querySelector('.loading');
        if (loadingElement) {
            loadingElement.textContent = 'خطا در بارگذاری';
        }
    }
}

// تابع نمایش فرزندان
function displayChildren(leftChild, rightChild, level, nodeElement) {
    // حذف پیام بارگذاری
    const loadingElement = nodeElement.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }
    
    // ایجاد HTML برای فرزندان
    let childrenHTML = '<div class="pyramid-children">';
    
    // شاخه سمت چپ
    childrenHTML += '<div class="pyramid-child-branch left">';
    childrenHTML += '<div class="child-label">سمت چپ</div>';
    if (leftChild) {
        childrenHTML += createPyramidLevel(leftChild, level + 1);
    } else {
        childrenHTML += '<div class="loading-node">بدون عضو</div>';
    }
    childrenHTML += '</div>';
    
    // شاخه سمت راست
    childrenHTML += '<div class="pyramid-child-branch right">';
    childrenHTML += '<div class="child-label">سمت راست</div>';
    if (rightChild) {
        childrenHTML += createPyramidLevel(rightChild, level + 1);
    } else {
        childrenHTML += '<div class="loading-node">بدون عضو</div>';
    }
    childrenHTML += '</div>';
    
    childrenHTML += '</div>';
    
    // اضافه کردن فرزندان به DOM
    nodeElement.insertAdjacentHTML('afterend', childrenHTML);
    
    // اضافه کردن رویداد کلیک برای نودهای جدید
    addNodeClickEvents();
}

// رویداد تغییر حساب در متامسک
if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', function(accounts) {
        if (accounts.length === 0) {
            // کاربر حساب خود را قطع کرده است
            location.reload();
        } else {
            // کاربر حساب خود را تغییر داده است
            userAccount = accounts[0];
            updateUI();
            loadUserInfo();
            loadGenealogyTree();
        }
    });
}

// داده‌های نمونه برای نمایش (در صورت عدم اتصال به قرارداد)
function loadSampleData() {
    const sampleData = {
        id: "USER001",
        address: "0x123...",
        leftCount: 15,
        rightCount: 12,
        saveLeft: 5,
        saveRight: 3,
        balanceCount: 8,
        isMiner: true,
        left: {
            id: "USER002",
            address: "0x124...",
            leftCount: 7,
            rightCount: 5,
            saveLeft: 2,
            saveRight: 1,
            balanceCount: 3,
            isMiner: false,
            left: {
                id: "USER004",
                address: "0x126...",
                leftCount: 3,
                rightCount: 2,
                saveLeft: 1,
                saveRight: 0,
                balanceCount: 1,
                isMiner: false
            },
            right: {
                id: "USER005",
                address: "0x127...",
                leftCount: 2,
                rightCount: 1,
                saveLeft: 0,
                saveRight: 0,
                balanceCount: 0,
                isMiner: true
            }
        },
        right: {
            id: "USER003",
            address: "0x125...",
            leftCount: 6,
            rightCount: 4,
            saveLeft: 1,
            saveRight: 2,
            balanceCount: 2,
            isMiner: false,
            left: {
                id: "USER006",
                address: "0x128...",
                leftCount: 4,
                rightCount: 3,
                saveLeft: 1,
                saveRight: 1,
                balanceCount: 1,
                isMiner: false
            },
            right: {
                id: "USER007",
                address: "0x129...",
                leftCount: 1,
                rightCount: 0,
                saveLeft: 0,
                saveRight: 0,
                balanceCount: 0,
                isMiner: false
            }
        }
    };
    
    renderGenealogyTree(sampleData);
}

// برای نمایش نمونه در صورت نیاز
// loadSampleData();