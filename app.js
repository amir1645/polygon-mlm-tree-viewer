// تنظیمات DApp
const CONFIG = {
    CONTRACT_ADDRESS: "0x166dd205590240c90ca4e0e545ad69db47d8f22f",
    TOKEN_P_CONTRACT_ADDRESS: "0x82F7dBe1792436d15bdA22bB3340bD3f45D614Fa"
};

// ABI قرارداد اصلی
const CONTRACT_ABI = [
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
        "name": "buyMinerTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
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
    },
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getUserInfo",
        "outputs": [
            {"internalType": "uint256", "name": "id", "type": "uint256"},
            {"internalType": "uint256", "name": "uplineId", "type": "uint256"},
            {"internalType": "uint256", "name": "leftCount", "type": "uint256"},
            {"internalType": "uint256", "name": "rightCount", "type": "uint256"},
            {"internalType": "uint256", "name": "balanceCount", "type": "uint256"},
            {"internalType": "uint256", "name": "specialBalanceCount", "type": "uint256"},
            {"internalType": "uint256", "name": "totalMinerRewards", "type": "uint256"},
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
    },
    {
        "inputs": [],
        "name": "poolBalance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "userId", "type": "uint256"}],
        "name": "getUserInfoByUserId",
        "outputs": [
            {"internalType": "uint256", "name": "id", "type": "uint256"},
            {"internalType": "uint256", "name": "uplineId", "type": "uint256"},
            {"internalType": "uint256", "name": "leftCount", "type": "uint256"},
            {"internalType": "uint256", "name": "rightCount", "type": "uint256"},
            {"internalType": "uint256", "name": "balanceCount", "type": "uint256"},
            {"internalType": "uint256", "name": "specialBalanceCount", "type": "uint256"},
            {"internalType": "uint256", "name": "totalMinerRewards", "type": "uint256"},
            {"internalType": "bool", "name": "isMiner", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// ABI قرارداد توکن P
const TOKEN_P_ABI = [
    {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "buyPToken",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPTokenPriceInWei",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "INITIAL_BACKING",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "pTokenAmount", "type": "uint256"}
        ],
        "name": "sellPToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// متغیرهای گلوبال
let provider = null;
let signer = null;
let contract = null;
let tokenPContract = null;
let userAccount = null;

// متغیرهای گلوبال برای ژنولوژی
let currentRootId = null;
let expandedNodes = new Set();
let treeData = {};
let maxLevels = 3;

// تابع تغییر تب
function switchTab(tabName) {
    // مخفی کردن همه تب‌ها
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // غیرفعال کردن همه آیتم‌های ناوبری
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // نمایش تب انتخاب شده
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // فعال کردن آیتم ناوبری مربوطه
    event.currentTarget.classList.add('active');
    
    // بارگذاری داده‌های مربوطه
    if (contract && userAccount) {
        switch(tabName) {
            case 'user':
                fetchUserInfo();
                break;
            case 'token-p':
                updatePTokenInfo();
                break;
            case 'tree':
                displayGenealogyTree();
                break;
            case 'miner':
                updateMinerStats();
                updateWalletBalance();
                break;
            case 'withdraw':
                updateWithdrawInfo();
                break;
        }
    }
}

// تابع اتصال به کیف پول
async function connectWallet() {
    try {
        if (!window.ethereum) {
            showMessage('لطفاً MetaMask را نصب کنید', 'error');
            return;
        }

        showMessage('در حال اتصال...', 'info');
        
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAccount = await signer.getAddress();
        
        contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        tokenPContract = new ethers.Contract(CONFIG.TOKEN_P_CONTRACT_ADDRESS, TOKEN_P_ABI, signer);
        
        // نمایش اطلاعات حساب
        const accountDisplay = document.getElementById('account');
        const accountAddress = document.querySelector('.account-address');
        accountAddress.textContent = `${userAccount.substring(0, 6)}...${userAccount.substring(38)}`;
        accountDisplay.style.display = 'block';
        
        document.getElementById('connect-btn').style.display = 'none';
        document.getElementById('disconnect-btn').style.display = 'flex';
        
        // بارگذاری اطلاعات اولیه
        await updateWalletBalance();
        await updatePTokenInfo();
        await checkRegistrationStatus();
        
        showMessage('اتصال با موفقیت برقرار شد!', 'success');
        
    } catch (err) {
        console.error('Connection error:', err);
        showMessage('خطا در اتصال: ' + err.message, 'error');
    }
}

// تابع قطع اتصال
function disconnectWallet() {
    provider = null;
    signer = null;
    contract = null;
    tokenPContract = null;
    userAccount = null;
    
    document.getElementById('account').style.display = 'none';
    document.getElementById('connect-btn').style.display = 'flex';
    document.getElementById('disconnect-btn').style.display = 'none';
    
    document.getElementById('unregistered-view').style.display = 'block';
    document.getElementById('registered-view').style.display = 'none';
    
    // ریست کردن مقادیر
    document.getElementById('p-token-price').textContent = '0';
    document.getElementById('p-token-balance').textContent = '0';
    document.getElementById('p-token-value').textContent = '≈ 0 پالیگان';
    
    showMessage('اتصال قطع شد', 'info');
}

// تابع بررسی وضعیت ثبت‌نام
async function checkRegistrationStatus() {
    if (!contract || !userAccount) return;

    try {
        const user = await contract.getUserInfo(userAccount);
        
        if (user.id.toString() === '0') {
            document.getElementById('unregistered-view').style.display = 'block';
            document.getElementById('registered-view').style.display = 'none';
        } else {
            document.getElementById('unregistered-view').style.display = 'none';
            document.getElementById('registered-view').style.display = 'block';
            await fetchUserInfo();
        }
    } catch (err) {
        console.error('Error checking registration:', err);
        document.getElementById('unregistered-view').style.display = 'block';
        document.getElementById('registered-view').style.display = 'none';
    }
}

// تابع ثبت‌نام
async function register() {
    if (!contract || !userAccount) {
        showMessage('لطفاً ابتدا به کیف پول متصل شوید', 'error');
        return;
    }

    const uplineCode = document.getElementById('upline-address').value;
    const placeOnLeft = document.querySelector('input[name="place"]:checked').value === 'left';

    if (!uplineCode || isNaN(uplineCode)) {
        showMessage('لطفاً شناسه آپلاین معتبر وارد کنید', 'error');
        return;
    }

    try {
        showMessage('در حال پردازش تراکنش...', 'info');
        
        const registrationFee = ethers.utils.parseEther('350');
        const tx = await contract.register(uplineCode, placeOnLeft, {
            value: registrationFee,
            gasLimit: 300000
        });
        
        await tx.wait();
        
        showMessage('ثبت‌نام با موفقیت انجام شد!', 'success');
        await checkRegistrationStatus();
        
    } catch (err) {
        console.error('Registration error:', err);
        showMessage('خطا در ثبت‌نام: ' + (err.reason || err.message), 'error');
    }
}

// تابع دریافت اطلاعات کاربر
async function fetchUserInfo() {
    if (!contract || !userAccount) return;

    try {
        const user = await contract.getUserInfo(userAccount);
        
        document.getElementById('user-id').textContent = user.id.toString();
        document.getElementById('user-upline').textContent = user.uplineId.toString();
        document.getElementById('total-referrals').textContent = (parseInt(user.leftCount) + parseInt(user.rightCount)).toString();
        document.getElementById('balance-count').textContent = user.balanceCount.toString();
        document.getElementById('left-balance').textContent = user.leftCount.toString();
        document.getElementById('right-balance').textContent = user.rightCount.toString();
        
    } catch (err) {
        console.error('Error fetching user info:', err);
    }
}

// تابع بروزرسانی اطلاعات توکن P
async function updatePTokenInfo() {
    if (!tokenPContract || !userAccount) {
        console.log('Token contract or user account not available');
        return;
    }

    try {
        // دریافت قیمت واقعی توکن از قرارداد
        const priceInWei = await tokenPContract.getPTokenPriceInWei();
        const priceInMatic = ethers.utils.formatEther(priceInWei);
        
        // دریافت موجودی توکن کاربر
        const tokenBalance = await tokenPContract.balanceOf(userAccount);
        const decimals = await tokenPContract.decimals();
        const formattedBalance = ethers.utils.formatUnits(tokenBalance, decimals);
        
        // محاسبه ارزش کل با قیمت واقعی
        const tokenValue = parseFloat(formattedBalance) * parseFloat(priceInMatic);
        
        // قیمت اولیه ثابت - 0.00001 پالیگان (برای محاسبه درصد رشد)
        const initialPrice = 0.00001;
        const currentPriceNum = parseFloat(priceInMatic);
        
        // محاسبه درصد رشد نسبت به قیمت اولیه
        const growthPercentage = initialPrice > 0 ? 
            ((currentPriceNum - initialPrice) / initialPrice) * 100 : 0;
        
        // به‌روزرسانی UI با قیمت واقعی
        document.getElementById('p-token-price').textContent = currentPriceNum.toFixed(6);
        document.getElementById('p-token-balance').textContent = parseFloat(formattedBalance).toFixed(2);
        document.getElementById('p-token-value').textContent = `≈ ${tokenValue.toFixed(4)} پالیگان`;
        document.getElementById('growth-percentage').textContent = `${growthPercentage.toFixed(2)}%`;
        document.getElementById('initial-price').textContent = `${initialPrice.toFixed(6)} پالیگان`;
        
        // به‌روزرسانی کارت رشد
        const growthCard = document.getElementById('growth-card');
        if (growthPercentage >= 0) {
            growthCard.classList.remove('negative');
        } else {
            growthCard.classList.add('negative');
        }
        
        // به‌روزرسانی موجودی‌های بخش خرید و فروش
        await updateTokenActionBalances();
        
        console.log('Token Price:', currentPriceNum, 'Balance:', formattedBalance, 'Growth:', growthPercentage + '%');
        
    } catch (err) {
        console.error('Error updating P token info:', err);
        // نمایش اطلاعات نمونه در صورت خطا
        document.getElementById('p-token-price').textContent = '0.000010';
        document.getElementById('p-token-balance').textContent = '0.00';
        document.getElementById('p-token-value').textContent = '≈ 0 پالیگان';
        document.getElementById('growth-percentage').textContent = '0%';
        document.getElementById('initial-price').textContent = '0.000010 پالیگان';
        
        showMessage('خطا در دریافت اطلاعات توکن P', 'error');
    }
}

// تابع محاسبه تعداد توکن دریافتی برای خرید
async function calculateBuyTokens() {
    const buyAmount = parseFloat(document.getElementById('buy-amount').value);
    
    if (!buyAmount || buyAmount <= 0) {
        document.getElementById('tokens-received').textContent = '0 توکن P';
        return;
    }

    try {
        // دریافت قیمت فعلی توکن
        const priceInWei = await tokenPContract.getPTokenPriceInWei();
        const priceInMatic = parseFloat(ethers.utils.formatEther(priceInWei));
        
        // محاسبه تعداد توکن دریافتی
        const tokensReceived = buyAmount / priceInMatic;
        
        // نمایش نتایج
        document.getElementById('tokens-received').textContent = tokensReceived.toFixed(4) + ' توکن P';
        document.getElementById('current-token-price').textContent = priceInMatic.toFixed(6) + ' پالیگان';
        
    } catch (err) {
        console.error('Error calculating buy tokens:', err);
        document.getElementById('tokens-received').textContent = 'خطا در محاسبه';
    }
}

// تابع محاسبه مقدار پالیگان دریافتی برای فروش
async function calculateSellMatic() {
    const sellAmount = parseFloat(document.getElementById('sell-amount').value);
    
    if (!sellAmount || sellAmount <= 0) {
        document.getElementById('matic-received').textContent = '0 پالیگان';
        return;
    }

    try {
        // دریافت قیمت فعلی توکن
        const priceInWei = await tokenPContract.getPTokenPriceInWei();
        const priceInMatic = parseFloat(ethers.utils.formatEther(priceInWei));
        
        // محاسبه مقدار پالیگان دریافتی
        const maticReceived = sellAmount * priceInMatic;
        
        // نمایش نتایج
        document.getElementById('matic-received').textContent = maticReceived.toFixed(6) + ' پالیگان';
        document.getElementById('current-sell-price').textContent = priceInMatic.toFixed(6) + ' پالیگان';
        
    } catch (err) {
        console.error('Error calculating sell matic:', err);
        document.getElementById('matic-received').textContent = 'خطا در محاسبه';
    }
}

// تابع خرید توکن P (اصلاح شده)
async function buyPTokens() {
    if (!tokenPContract || !userAccount) {
        showMessage('لطفاً ابتدا به کیف پول متصل شوید', 'error');
        return;
    }

    const buyAmount = document.getElementById('buy-amount').value;
    
    if (!buyAmount || parseFloat(buyAmount) <= 0) {
        showMessage('لطفاً مقدار پالیگان برای خرید وارد کنید', 'error');
        return;
    }

    try {
        const balance = await provider.getBalance(userAccount);
        const balanceInMatic = parseFloat(ethers.utils.formatEther(balance));
        
        if (balanceInMatic < parseFloat(buyAmount)) {
            showMessage(`موجودی پالیگان کافی نیست. موجودی شما: ${balanceInMatic.toFixed(4)} MATIC`, 'error');
            return;
        }

        const buyAmountWei = ethers.utils.parseEther(buyAmount);
        
        showMessage('در حال خرید توکن P...', 'info');
        
        const tx = await tokenPContract.buyPToken({
            value: buyAmountWei,
            gasLimit: 200000
        });
        
        await tx.wait();
        
        showMessage(`خرید ${buyAmount} پالیگان توکن P با موفقیت انجام شد!`, 'success');
        
        // ریست کردن فیلدها
        document.getElementById('buy-amount').value = '';
        document.getElementById('tokens-received').textContent = '0 توکن P';
        
        await updatePTokenInfo();
        await updateWalletBalance();
        
    } catch (err) {
        console.error('Buy P token error:', err);
        showMessage('خطا در خرید توکن P: ' + (err.reason || err.message), 'error');
    }
}

// تابع فروش توکن P (اصلاح شده)
async function sellPTokens() {
    if (!tokenPContract || !userAccount) {
        showMessage('لطفاً ابتدا به کیف پول متصل شوید', 'error');
        return;
    }

    const sellAmount = document.getElementById('sell-amount').value;
    
    if (!sellAmount || parseFloat(sellAmount) <= 0) {
        showMessage('لطفاً مقدار توکن P برای فروش وارد کنید', 'error');
        return;
    }

    try {
        const tokenBalance = await tokenPContract.balanceOf(userAccount);
        const decimals = await tokenPContract.decimals();
        const formattedBalance = ethers.utils.formatUnits(tokenBalance, decimals);
        
        if (parseFloat(formattedBalance) < parseFloat(sellAmount)) {
            showMessage(`موجودی توکن P کافی نیست. موجودی شما: ${parseFloat(formattedBalance).toFixed(4)} PToken`, 'error');
            return;
        }

        showMessage('در حال فروش توکن P...', 'info');
        
        const sellAmountWei = ethers.utils.parseUnits(sellAmount, decimals);
        const tx = await tokenPContract.sellPToken(sellAmountWei, {
            gasLimit: 200000
        });
        
        await tx.wait();
        
        showMessage(`فروش ${sellAmount} توکن P با موفقیت انجام شد!`, 'success');
        
        // ریست کردن فیلدها
        document.getElementById('sell-amount').value = '';
        document.getElementById('matic-received').textContent = '0 پالیگان';
        
        await updatePTokenInfo();
        await updateWalletBalance();
        
    } catch (err) {
        console.error('Sell P token error:', err);
        showMessage('خطا در فروش توکن P: ' + (err.reason || err.message), 'error');
    }
}

// تابع به‌روزرسانی موجودی‌ها در بخش خرید و فروش
async function updateTokenActionBalances() {
    if (!tokenPContract || !userAccount) return;
    
    try {
        const tokenBalance = await tokenPContract.balanceOf(userAccount);
        const decimals = await tokenPContract.decimals();
        const formattedBalance = ethers.utils.formatUnits(tokenBalance, decimals);
        
        const walletBalance = await provider.getBalance(userAccount);
        const formattedWalletBalance = parseFloat(ethers.utils.formatEther(walletBalance)).toFixed(4);
        
        document.getElementById('available-tokens-sell').textContent = parseFloat(formattedBalance).toFixed(4) + ' توکن P';
        document.getElementById('available-polygon-buy').textContent = formattedWalletBalance + ' پالیگان';
        
    } catch (err) {
        console.error('Error updating token action balances:', err);
    }
}

// تابع نمایش ژنولوژی پیشرفته
async function displayGenealogyTree() {
    const treeContainer = document.getElementById('genealogy-tree');
    
    if (!contract || !userAccount) {
        treeContainer.innerHTML = `
            <div class="tree-placeholder">
                <div class="placeholder-icon">
                    <i class="fas fa-sitemap"></i>
                </div>
                <p>لطفاً ابتدا به کیف پول متصل شوید</p>
            </div>
        `;
        return;
    }

    try {
        const user = await contract.getUserInfo(userAccount);
        
        if (user.id.toString() === '0') {
            treeContainer.innerHTML = `
                <div class="tree-placeholder">
                    <div class="placeholder-icon">
                        <i class="fas fa-sitemap"></i>
                    </div>
                    <p>لطفاً ابتدا ثبت‌نام کنید</p>
                    <span>برای مشاهده ساختار ژنولوژی، ابتدا در سیستم ثبت‌نام کنید</span>
                </div>
            `;
            return;
        }

        // تنظیم ریشه درخت
        if (!currentRootId) {
            currentRootId = user.id.toString();
        }

        showMessage('در حال بارگذاری درخت ژنولوژی...', 'info');
        
        // بارگذاری داده‌های درخت
        await buildTreeData(currentRootId, maxLevels);
        
        // نمایش درخت
        const treeHTML = await renderAdvancedTree();
        treeContainer.innerHTML = treeHTML;
        
        // به‌روزرسانی آمار
        await updateGenealogyStats();
        
        showMessage('درخت ژنولوژی بارگذاری شد', 'success');
        
    } catch (err) {
        console.error('Tree display error:', err);
        treeContainer.innerHTML = `
            <div class="tree-placeholder">
                <div class="placeholder-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <p>خطا در بارگذاری ساختار درختی</p>
                <span>${err.message}</span>
            </div>
        `;
    }
}

// تابع ساخت داده‌های درخت
async function buildTreeData(rootId, levels) {
    treeData = {};
    await buildTreeRecursive(rootId, levels, 1, 'root');
}

// تابع بازگشتی برای ساخت درخت
async function buildTreeRecursive(userId, maxLevel, currentLevel, position) {
    if (currentLevel > maxLevel) return null;
    
    try {
        const userInfo = await contract.getUserInfoByUserId(userId);
        const directs = await contract.getUserDirects(userId);
        
        const node = {
            id: userId.toString(),
            uplineId: userInfo.uplineId.toString(),
            leftCount: userInfo.leftCount.toString(),
            rightCount: userInfo.rightCount.toString(),
            position: position,
            level: currentLevel,
            children: {}
        };
        
        treeData[userId] = node;
        
        // بارگذاری بازگشتی فرزندان
        if (directs.leftId.toString() !== '0') {
            node.children.left = await buildTreeRecursive(
                directs.leftId.toString(), 
                maxLevel, 
                currentLevel + 1, 
                'left'
            );
        }
        
        if (directs.rightId.toString() !== '0') {
            node.children.right = await buildTreeRecursive(
                directs.rightId.toString(), 
                maxLevel, 
                currentLevel + 1, 
                'right'
            );
        }
        
        return node;
        
    } catch (err) {
        console.error(`Error building tree for user ${userId}:`, err);
        return null;
    }
}

// تابع رندر درخت پیشرفته
async function renderAdvancedTree() {
    if (!treeData[currentRootId]) {
        return '<div class="tree-placeholder">داده‌ای برای نمایش وجود ندارد</div>';
    }
    
    let html = '<div class="advanced-tree">';
    html += await renderTreeLevel([treeData[currentRootId]], 1);
    html += '</div>';
    
    return html;
}

// تابع رندر سطح درخت
async function renderTreeLevel(nodes, level) {
    if (!nodes || nodes.length === 0) return '';
    
    let html = `<div class="tree-level level-${level}">`;
    
    // اتصالات سطح
    if (level > 1) {
        html += '<div class="level-connectors">';
        html += '<div class="level-connector"></div>';
        html += '</div>';
    }
    
    for (const node of nodes) {
        if (!node) continue;
        
        html += '<div class="tree-node">';
        html += '<div class="node-wrapper">';
        
        // اتصالات والد
        if (level > 1) {
            html += '<div class="node-connectors">';
            html += '<div class="parent-connector"></div>';
            html += '</div>';
        }
        
        // محتوای نود
        const isCurrentUser = node.id === currentRootId;
        const nodeClass = isCurrentUser ? 'current-user' : 
                         node.position === 'left' ? 'left-team' : 
                         node.position === 'right' ? 'right-team' : 'root';
        
        html += `<div class="node-content ${nodeClass}" onclick="toggleNode('${node.id}')">`;
        html += `<div class="node-id">${node.id}</div>`;
        html += `<div class="node-position">${getPositionText(node.position)}</div>`;
        html += '<div class="node-stats">';
        html += `<div class="node-stat"><span>چپ</span><span>${node.leftCount}</span></div>`;
        html += `<div class="node-stat"><span>راست</span><span>${node.rightCount}</span></div>`;
        html += '</div>';
        html += '</div>'; // node-content
        
        // دکمه گسترش
        if ((node.children && node.children.left) || (node.children && node.children.right)) {
            const isExpanded = expandedNodes.has(node.id);
            html += `<button class="expand-btn" onclick="event.stopPropagation(); toggleNode('${node.id}')">`;
            html += `<i class="fas fa-${isExpanded ? 'minus' : 'plus'}"></i>`;
            html += '</button>';
        }
        
        // اتصالات فرزندان
        if ((node.children && node.children.left) || (node.children && node.children.right)) {
            html += '<div class="child-connectors">';
            html += '<div class="child-connector"></div>';
            html += '</div>';
        }
        
        html += '</div>'; // node-wrapper
        
        // نمایش فرزندان اگر نود گسترش یافته باشد
        if (expandedNodes.has(node.id)) {
            const childNodes = [];
            if (node.children && node.children.left) childNodes.push(node.children.left);
            if (node.children && node.children.right) childNodes.push(node.children.right);
            
            if (childNodes.length > 0) {
                html += await renderTreeLevel(childNodes, level + 1);
            }
        }
        
        html += '</div>'; // tree-node
    }
    
    html += '</div>'; // tree-level
    
    return html;
}

// تابع تغییر وضعیت نود (باز/بسته کردن)
function toggleNode(nodeId) {
    if (expandedNodes.has(nodeId)) {
        expandedNodes.delete(nodeId);
    } else {
        expandedNodes.add(nodeId);
    }
    displayGenealogyTree();
}

// تابع گسترش همه نودها
function expandAllNodes() {
    Object.keys(treeData).forEach(nodeId => {
        expandedNodes.add(nodeId);
    });
    displayGenealogyTree();
    showMessage('همه نودها باز شدند', 'success');
}

// تابع بستن همه نودها
function collapseAllNodes() {
    expandedNodes.clear();
    displayGenealogyTree();
    showMessage('همه نودها بسته شدند', 'success');
}

// تابع جستجوی کاربر
async function searchUser() {
    const searchInput = document.getElementById('search-user-id');
    const userId = searchInput.value.trim();
    
    if (!userId) {
        showMessage('لطفاً شناسه کاربر را وارد کنید', 'error');
        return;
    }
    
    try {
        // بررسی وجود کاربر
        const userInfo = await contract.getUserInfoByUserId(userId);
        
        if (userInfo.id.toString() === '0') {
            showMessage('کاربر یافت نشد', 'error');
            return;
        }
        
        // تنظیم کاربر جدید به عنوان ریشه
        currentRootId = userId;
        await displayGenealogyTree();
        showMessage(`درخت ژنولوژی کاربر ${userId} بارگذاری شد`, 'success');
        
    } catch (err) {
        console.error('Search error:', err);
        showMessage('خطا در جستجوی کاربر', 'error');
    }
}

// تابع بازگشت به ریشه اصلی
async function navigateToRoot() {
    if (!contract || !userAccount) return;
    
    try {
        const user = await contract.getUserInfo(userAccount);
        currentRootId = user.id.toString();
        await displayGenealogyTree();
        showMessage('بازگشت به درخت اصلی', 'success');
    } catch (err) {
        console.error('Navigate to root error:', err);
    }
}

// تابع بارگذاری سطوح بیشتر
function loadMoreLevels() {
    maxLevels += 1;
    displayGenealogyTree();
    showMessage(`سطح ${maxLevels} بارگذاری شد`, 'info');
}

// تابع به‌روزرسانی آمار ژنولوژی
async function updateGenealogyStats() {
    if (!contract || !userAccount) return;
    
    try {
        const user = await contract.getUserInfo(userAccount);
        
        document.getElementById('total-members').textContent = 
            (parseInt(user.leftCount) + parseInt(user.rightCount)).toString();
        document.getElementById('left-members').textContent = user.leftCount.toString();
        document.getElementById('right-members').textContent = user.rightCount.toString();
        document.getElementById('current-level').textContent = 
            Object.keys(treeData).length > 0 ? Math.max(...Object.values(treeData).map(n => n.level)) : '1';
        
    } catch (err) {
        console.error('Error updating genealogy stats:', err);
    }
}

// تابع کمکی برای دریافت متن موقعیت
function getPositionText(position) {
    const positions = {
        'root': 'ریشه',
        'left': 'چپ',
        'right': 'راست'
    };
    return positions[position] || position;
}

// تابع رفرش ژنولوژی
function refreshGenealogy() {
    showMessage('در حال به‌روزرسانی ژنولوژی...', 'info');
    expandedNodes.clear();
    setTimeout(() => {
        displayGenealogyTree();
        showMessage('ژنولوژی به‌روزرسانی شد', 'success');
    }, 1000);
}

// توابع ماینر
async function buyMinerTokens() {
    if (!contract || !userAccount) {
        showMessage('لطفاً ابتدا به کیف پول متصل شوید', 'error');
        return;
    }

    try {
        showMessage('در حال خرید توکن ماینر...', 'info');
        
        const tx = await contract.buyMinerTokens({ gasLimit: 200000 });
        await tx.wait();
        
        showMessage('خرید توکن ماینر با موفقیت انجام شد!', 'success');
        await updateMinerStats();
        
    } catch (err) {
        console.error('Buy miner tokens error:', err);
        showMessage('خطا در خرید توکن ماینر: ' + (err.reason || err.message), 'error');
    }
}

async function distributeMinerTokens() {
    if (!contract || !userAccount) {
        showMessage('لطفاً ابتدا به کیف پول متصل شوید', 'error');
        return;
    }

    try {
        showMessage('در حال توزیع توکن ماینر...', 'info');
        
        const tx = await contract.distributeMinerTokens({ gasLimit: 200000 });
        await tx.wait();
        
        showMessage('توزیع توکن ماینر با موفقیت انجام شد!', 'success');
        await updateMinerStats();
        
    } catch (err) {
        console.error('Distribution error:', err);
        showMessage('خطا در توزیع توکن ماینر: ' + (err.reason || err.message), 'error');
    }
}

// تابع بروزرسانی آمار ماینر
async function updateMinerStats() {
    if (!contract || !userAccount) return;
    
    try {
        const userInfo = await contract.getUserInfo(userAccount);
        
        // نمایش وضعیت ماینر
        document.getElementById('miner-status').textContent = userInfo.isMiner ? 'فعال' : 'غیرفعال';
        
        // به‌روزرسانی وضعیت کلی ماینر
        const minerGlobalStatus = document.getElementById('miner-global-status');
        if (userInfo.isMiner) {
            minerGlobalStatus.classList.remove('inactive');
            minerGlobalStatus.querySelector('span').textContent = 'فعال';
            minerGlobalStatus.querySelector('.status-indicator').style.background = 'var(--success)';
        } else {
            minerGlobalStatus.classList.add('inactive');
            minerGlobalStatus.querySelector('span').textContent = 'غیرفعال';
            minerGlobalStatus.querySelector('.status-indicator').style.background = '#F87171';
        }
        
        // نمایش پاداش‌های ماینر
        const minerRewards = ethers.utils.formatEther(userInfo.totalMinerRewards || '0');
        document.getElementById('miner-rewards').textContent = parseFloat(minerRewards).toFixed(4) + ' PToken';
        
        // محاسبه درصد پرداخت پالیگان
        const paymentPercentage = userInfo.isMiner ? 75 : 0;
        document.getElementById('payment-percentage').textContent = paymentPercentage + '%';
        document.getElementById('polygon-progress').textContent = paymentPercentage + '%';
        document.getElementById('polygon-progress-bar').style.width = paymentPercentage + '%';
        
        // نمایش توکن‌های قابل خرید
        const availableTokens = userInfo.isMiner ? minerRewards : '0';
        document.getElementById('available-tokens').textContent = parseFloat(availableTokens).toFixed(4) + ' PToken';
        document.getElementById('available-miner-tokens').textContent = parseFloat(availableTokens).toFixed(4) + ' PToken';
        
    } catch (err) {
        console.error('Error updating miner stats:', err);
        showMessage('خطا در دریافت اطلاعات ماینر', 'error');
    }
}

// تابع بروزرسانی موجودی کیف پول
async function updateWalletBalance() {
    if (!provider || !userAccount) return;
    
    try {
        const balance = await provider.getBalance(userAccount);
        const balanceFormatted = parseFloat(ethers.utils.formatEther(balance)).toFixed(4);
        
        document.getElementById('wallet-balance').textContent = balanceFormatted + ' MATIC';
        document.getElementById('matic-balance').textContent = balanceFormatted + ' پالیگان';
        document.getElementById('polygon-balance').textContent = balanceFormatted;
        document.getElementById('available-polygon').textContent = balanceFormatted + ' پالیگان';
        
    } catch (err) {
        console.error('Error updating wallet balance:', err);
    }
}

// توابع برداشت
async function withdrawPool() {
    if (!contract || !userAccount) {
        showMessage('لطفاً ابتدا به کیف پول متصل شوید', 'error');
        return;
    }

    try {
        showMessage('در حال برداشت از استخر...', 'info');
        
        const tx = await contract.withdrawPool({ gasLimit: 200000 });
        await tx.wait();
        
        showMessage('برداشت با موفقیت انجام شد!', 'success');
        await updateWithdrawInfo();
        
    } catch (err) {
        console.error('Withdraw error:', err);
        showMessage('خطا در برداشت: ' + (err.reason || err.message), 'error');
    }
}

async function withdrawSpecials() {
    if (!contract || !userAccount) {
        showMessage('لطفاً ابتدا به کیف پول متصل شوید', 'error');
        return;
    }

    try {
        showMessage('در حال برداشت ویژه...', 'info');
        
        const tx = await contract.withdrawSpecials({ gasLimit: 200000 });
        await tx.wait();
        
        showMessage('برداشت ویژه با موفقیت انجام شد!', 'success');
        await updateWithdrawInfo();
        
    } catch (err) {
        console.error('Special withdraw error:', err);
        showMessage('خطا در برداشت ویژه: ' + (err.reason || err.message), 'error');
    }
}

// تابع بروزرسانی اطلاعات برداشت
async function updateWithdrawInfo() {
    if (!contract || !userAccount) return;
    
    try {
        const poolBalance = await contract.poolBalance();
        const userInfo = await contract.getUserInfo(userAccount);
        
        document.getElementById('pool-balance').textContent = 
            parseFloat(ethers.utils.formatEther(poolBalance)).toFixed(4);
        document.getElementById('special-balance').textContent = 
            parseFloat(ethers.utils.formatEther(userInfo.specialBalanceCount || '0')).toFixed(4);
        
        document.getElementById('pool-balance-count').textContent = userInfo.balanceCount.toString();
        document.getElementById('special-balance-count').textContent = userInfo.specialBalanceCount.toString();
        
        document.getElementById('pool-amount').textContent = parseFloat(ethers.utils.formatEther(poolBalance)).toFixed(4);
        document.getElementById('special-amount').textContent = parseFloat(ethers.utils.formatEther(userInfo.specialBalanceCount || '0')).toFixed(4);
        
    } catch (err) {
        console.error('Error updating withdraw info:', err);
    }
}

// تابع نمایش پیام
function showMessage(message, type = 'info') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.className = `message-toast ${type}`;
    messageEl.classList.add('show');
    
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 4000);
}

// رویدادهای کیف پول
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            disconnectWallet();
        } else {
            location.reload();
        }
    });
    
    window.ethereum.on('chainChanged', () => {
        location.reload();
    });
}

// بررسی وجود متامسک
if (typeof window.ethereum === 'undefined') {
    document.getElementById('connect-btn').innerHTML = '<i class="fas fa-download"></i> نصب متامسک';
    document.getElementById('connect-btn').onclick = () => {
        window.open('https://metamask.io/download.html', '_blank');
    };
}