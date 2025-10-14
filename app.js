// اتصال به کیف پول و مدیریت ژنولوژی
let web3;
let userAccount;
let contract;

// آدرس و ABI قرارداد (فرضی)
const CONTRACT_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const CONTRACT_ABI = [
    // ABI قرارداد اینجا قرار می‌گیرد
];

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
        // فراخوانی توابع قرارداد برای دریافت اطلاعات کاربر
        const userInfo = await contract.methods.getUserInfo(userAccount).call();
        
        // به‌روزرسانی بخش اطلاعات کاربری
        const userInfoContainer = document.getElementById('userInfo');
        userInfoContainer.innerHTML = `
            <div class="info-item">
                <span class="info-label">شناسه کاربر:</span>
                <span class="info-value">${userInfo.id || 'نامشخص'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">سطح:</span>
                <span class="info-value">${userInfo.level || '0'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">تعداد زیرمجموعه‌ها:</span>
                <span class="info-value">${userInfo.referrals || '0'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">تعداد زیرمجموعه‌های مستقیم:</span>
                <span class="info-value">${userInfo.directReferrals || '0'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">درآمد کل:</span>
                <span class="info-value">${userInfo.totalEarnings || '0'} واحد</span>
            </div>
        `;
        
        // به‌روزرسانی شناسه کاربر فعلی
        document.getElementById('currentUserId').textContent = userInfo.id || userAccount;
        
    } catch (error) {
        console.error('خطا در دریافت اطلاعات کاربر:', error);
    }
}

// تابع بارگذاری درخت ژنولوژی
async function loadGenealogyTree() {
    try {
        // فراخوانی تابع قرارداد برای دریافت ساختار ژنولوژی
        const genealogyData = await contract.methods.getUserGenealogy(userAccount).call();
        
        // نمایش درخت ژنولوژی
        renderGenealogyTree(genealogyData);
        
    } catch (error) {
        console.error('خطا در دریافت ژنولوژی:', error);
        document.getElementById('treeContainer').innerHTML = '<p>خطا در بارگذاری ژنولوژی. لطفاً دوباره تلاش کنید.</p>';
    }
}

// تابع رندر درخت ژنولوژی به صورت هرمی باینری
function renderGenealogyTree(data) {
    const treeContainer = document.getElementById('treeContainer');
    
    // اگر داده‌ای وجود ندارد
    if (!data || !data.root) {
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
    const nodeClass = `pyramid-node ${isCurrentUser ? 'current-user' : ''} ${hasChildren ? 'has-children' : ''}`;
    
    return `
        <div class="${nodeClass}" data-address="${node.address}" data-level="${level}">
            <div class="member-id">${node.id || 'نامشخص'}</div>
            <div class="member-stats">
                زیرمجموعه: ${node.referrals || 0} | سطح: ${node.level || 0}
            </div>
            ${hasChildren ? '<div class="loading">در حال بارگذاری...</div>' : ''}
        </div>
    `;
}

// تابع اضافه کردن رویداد کلیک برای نودها
function addNodeClickEvents() {
    const nodes = document.querySelectorAll('.pyramid-node.has-children');
    
    nodes.forEach(node => {
        node.addEventListener('click', async function() {
            const address = this.getAttribute('data-address');
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
            await loadChildren(address, level, this);
        });
    });
}

// تابع بارگذاری فرزندان یک نود
async function loadChildren(address, level, nodeElement) {
    try {
        // فراخوانی قرارداد برای دریافت فرزندان
        const childrenData = await contract.methods.getUserChildren(address).call();
        
        // نمایش فرزندان
        displayChildren(childrenData, level, nodeElement);
        
    } catch (error) {
        console.error('خطا در بارگذاری فرزندان:', error);
        nodeElement.querySelector('.loading').textContent = 'خطا در بارگذاری';
    }
}

// تابع نمایش فرزندان
function displayChildren(childrenData, level, nodeElement) {
    // حذف پیام بارگذاری
    const loadingElement = nodeElement.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }
    
    // در اینجا کد نمایش فرزندان اضافه می‌شود
    // این بخش بستگی به ساختار داده‌ای قرارداد دارد
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
        root: {
            id: "USER001",
            address: "0x123...",
            level: 3,
            referrals: 15,
            left: {
                id: "USER002",
                address: "0x124...",
                level: 2,
                referrals: 7,
                left: {
                    id: "USER004",
                    address: "0x126...",
                    level: 1,
                    referrals: 3
                },
                right: {
                    id: "USER005",
                    address: "0x127...",
                    level: 1,
                    referrals: 2
                }
            },
            right: {
                id: "USER003",
                address: "0x125...",
                level: 2,
                referrals: 6,
                left: {
                    id: "USER006",
                    address: "0x128...",
                    level: 1,
                    referrals: 4
                },
                right: {
                    id: "USER007",
                    address: "0x129...",
                    level: 1,
                    referrals: 1
                }
            }
        }
    };
    
    renderGenealogyTree(sampleData);
}

// برای نمایش نمونه در صورت نیاز
// loadSampleData();