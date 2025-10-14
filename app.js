// Contract ABI - فقط توابع ضروری
const CONTRACT_ABI = [
    {
        "inputs": [{"internalType":"address","name":"user","type":"address"}],
        "name": "getUserInfo",
        "outputs": [
            {"internalType":"uint256","name":"id","type":"uint256"},
            {"internalType":"uint256","name":"uplineId","type":"uint256"},
            {"internalType":"uint256","name":"leftCount","type":"uint256"},
            {"internalType":"uint256","name":"rightCount","type":"uint256"},
            {"internalType":"uint256","name":"saveLeft","type":"uint256"},
            {"internalType":"uint256","name":"saveRight","type":"uint256"},
            {"internalType":"uint256","name":"balanceCount","type":"uint256"},
            {"internalType":"uint256","name":"specialBalanceCount","type":"uint256"},
            {"internalType":"uint256","name":"totalMinerRewards","type":"uint256"},
            {"internalType":"uint256","name":"entryPrice","type":"uint256"},
            {"internalType":"bool","name":"isMiner","type":"bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType":"uint256","name":"userId","type":"uint256"}],
        "name": "getUserDirects",
        "outputs": [
            {"internalType":"uint256","name":"leftId","type":"uint256"},
            {"internalType":"uint256","name":"rightId","type":"uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const CONTRACT_ADDRESS = "0x166dd205590240c90ca4e0e545ad69db47d8f22f";

let web3;
let contract;
let userAccount;
let userInfo = {};

// المنت‌ها
const connectWalletBtn = document.getElementById('connectWallet');
const walletAddressSpan = document.getElementById('walletAddress');
const userInfoDiv = document.getElementById('userInfo');
const treeContainer = document.getElementById('treeContainer');
const currentUserIdSpan = document.getElementById('currentUserId');

// وقتی صفحه لود شد
window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        // بررسی اتصال قبلی
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
            userAccount = accounts[0];
            updateWalletUI();
            await loadUserInfo();
        }
    } else {
        connectWalletBtn.disabled = true;
        connectWalletBtn.textContent = 'کیف پول یافت نشد';
    }
});

// کلیک روی دکمه اتصال
connectWalletBtn.addEventListener('click', connectWallet);

async function connectWallet() {
    try {
        connectWalletBtn.textContent = 'در حال اتصال...';
        connectWalletBtn.disabled = true;
        
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        userAccount = accounts[0];
        updateWalletUI();
        await loadUserInfo();
        
    } catch (error) {
        console.error('خطا در اتصال:', error);
        connectWalletBtn.textContent = '🔗 اتصال کیف پول';
        connectWalletBtn.disabled = false;
    }
}

function updateWalletUI() {
    const shortAddress = userAccount.substring(0, 6) + '...' + userAccount.substring(38);
    walletAddressSpan.textContent = shortAddress;
    connectWalletBtn.textContent = 'اتصال برقرار شد';
    connectWalletBtn.disabled = true;
}

async function loadUserInfo() {
    try {
        userInfoDiv.innerHTML = '<p>در حال بارگذاری...</p>';
        
        const result = await contract.methods.getUserInfo(userAccount).call();
        
        userInfo = {
            id: result.id.toString(),
            uplineId: result.uplineId.toString(),
            leftCount: result.leftCount.toString(),
            rightCount: result.rightCount.toString(),
            balanceCount: result.balanceCount.toString(),
            isMiner: result.isMiner
        };
        
        displayUserInfo();
        currentUserIdSpan.textContent = userInfo.id;
        
        // لود ژنولوژی
        await loadGenealogy(userInfo.id);
        
    } catch (error) {
        console.error('خطا در بارگذاری اطلاعات:', error);
        userInfoDiv.innerHTML = '<p>خطا در بارگذاری اطلاعات کاربر</p>';
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

async function loadGenealogy(rootId) {
    try {
        treeContainer.innerHTML = '<p>در حال بارگذاری ژنولوژی...</p>';
        
        const rootNode = await buildNode(rootId);
        
        renderTree(rootNode);
        
    } catch (error) {
        console.error('خطا در بارگذاری ژنولوژی:', error);
        treeContainer.innerHTML = '<p>خطا در بارگذاری ژنولوژی</p>';
    }
}

async function buildNode(userId) {
    try {
        // دریافت اطلاعات مستقیم
        const directs = await contract.methods.getUserDirects(userId).call();
        
        const node = {
            id: userId,
            leftId: directs.leftId.toString(),
            rightId: directs.rightId.toString(),
            isCurrentUser: userId === userInfo.id
        };
        
        // اگر کاربر اصلی هست، اطلاعات کامل رو بگیر
        if (node.isCurrentUser) {
            node.leftCount = userInfo.leftCount;
            node.rightCount = userInfo.rightCount;
            node.balanceCount = userInfo.balanceCount;
            node.isMiner = userInfo.isMiner;
        }
        
        // ساخت فرزندان
        node.children = [];
        
        if (node.leftId !== "0") {
            const leftChild = await buildNode(node.leftId);
            leftChild.side = 'left';
            node.children.push(leftChild);
        }
        
        if (node.rightId !== "0") {
            const rightChild = await buildNode(node.rightId);
            rightChild.side = 'right';
            node.children.push(rightChild);
        }
        
        return node;
        
    } catch (error) {
        console.error(`خطا در ساخت گره ${userId}:`, error);
        return {
            id: userId,
            leftId: "0",
            rightId: "0",
            isCurrentUser: userId === userInfo.id,
            children: []
        };
    }
}

function renderTree(rootNode) {
    const treeHTML = generateNodeHTML(rootNode, 0);
    treeContainer.innerHTML = `
        <div class="tree">
            ${treeHTML}
        </div>
    `;
}

function generateNodeHTML(node, level) {
    const hasChildren = node.children.length > 0;
    
    let html = `
        <div class="level">
            <div class="node ${node.isCurrentUser ? 'current-user' : ''}">
                <div class="node-id">
                    ${node.id} 
                    ${node.isCurrentUser ? ' 👤' : ''} 
                    ${node.isMiner ? ' ⛏️' : ''}
                </div>
                ${node.leftCount ? `
                <div class="node-stats">چپ: ${node.leftCount}</div>
                <div class="node-stats">راست: ${node.rightCount}</div>
                <div class="node-stats">بالانس: ${node.balanceCount}</div>
                ` : ''}
            </div>
        </div>
    `;
    
    if (hasChildren) {
        html += `<div class="children">`;
        
        node.children.forEach(child => {
            html += `
                <div class="child-branch">
                    <div class="branch-label">
                        ${child.side === 'left' ? '👈 چپ' : '👉 راست'}
                    </div>
                    ${generateNodeHTML(child, level + 1)}
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    return html;
}