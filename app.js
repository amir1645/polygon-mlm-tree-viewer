// Contract ABI and Address (همان کد قبلی)
const CONTRACT_ABI = [...]; // ABI کامل از کد قبلی
const CONTRACT_ADDRESS = "0x166dd205590240c90ca4e0e545ad69db47d8f22f";

// Global variables
let web3;
let contract;
let userAccount;
let userInfo = {};
let treeData = {};
let treeSvg, treeG, zoom, treeLayout;
let currentDepth = 4;
let expandedNodes = new Set();

// DOM elements
const connectWalletBtn = document.getElementById('connectWallet');
const walletAddressSpan = document.getElementById('walletAddress');
const userInfoDiv = document.getElementById('userInfo');
const treeContainer = document.getElementById('treeContainer');
const currentUserIdSpan = document.getElementById('currentUserId');
const expandAllBtn = document.getElementById('expandAll');
const collapseAllBtn = document.getElementById('collapseAll');
const resetViewBtn = document.getElementById('resetView');
const fullscreenBtn = document.getElementById('fullscreen');
const exportTreeBtn = document.getElementById('exportTree');
const depthControl = document.getElementById('depthControl');
const depthValue = document.getElementById('depthValue');
const userModal = document.getElementById('userModal');
const modalUserInfo = document.getElementById('modalUserInfo');
const closeModal = document.querySelector('.close');
const viewNetworkBtn = document.getElementById('viewNetwork');
const closeModalBtn = document.getElementById('closeModal');

// Network stats elements
const totalUsersSpan = document.getElementById('totalUsers');
const minerUsersSpan = document.getElementById('minerUsers');
const totalBalanceSpan = document.getElementById('totalBalance');
const currentLevelSpan = document.getElementById('currentLevel');
const nodeCountSpan = document.getElementById('nodeCount');
const minerCountSpan = document.getElementById('minerCount');

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
                await loadNetworkStats();
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
    
    // Initialize event listeners
    initializeEventListeners();
});

// Initialize event listeners
function initializeEventListeners() {
    // Connect wallet button handler
    connectWalletBtn.addEventListener('click', connectWallet);
    
    // Tree control buttons
    expandAllBtn.addEventListener('click', expandAllNodes);
    collapseAllBtn.addEventListener('click', collapseAllNodes);
    resetViewBtn.addEventListener('click', resetTreeView);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    exportTreeBtn.addEventListener('click', exportTreeAsImage);
    
    // Depth control
    depthControl.addEventListener('input', function() {
        currentDepth = parseInt(this.value);
        depthValue.textContent = currentDepth;
        if (userInfo.id) {
            loadGenealogy(userInfo.id);
        }
    });
    
    // Modal handlers
    closeModal.addEventListener('click', closeUserModal);
    closeModalBtn.addEventListener('click', closeUserModal);
    viewNetworkBtn.addEventListener('click', viewSelectedUserNetwork);
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === userModal) {
            closeUserModal();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (treeData && Object.keys(treeData).length > 0) {
            createTreeVisualization(treeData);
        }
    }, 250));
}

// Connect wallet function
async function connectWallet() {
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
        await loadNetworkStats();
        
        // Automatically load genealogy after connecting
        await loadGenealogy(userInfo.id);
        
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('خطا در اتصال کیف پول: ' + error.message);
        connectWalletBtn.textContent = '🔗 اتصال کیف پول';
        connectWalletBtn.disabled = false;
    }
}

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

// Load network statistics
async function loadNetworkStats() {
    try {
        const totalUsers = await contract.methods.totalUsers().call();
        const eligiblePoolUserCount = await contract.methods.eligiblePoolUserCount().call();
        const poolBalance = await contract.methods.poolBalance().call();
        
        totalUsersSpan.textContent = totalUsers;
        minerUsersSpan.textContent = eligiblePoolUserCount;
        totalBalanceSpan.textContent = web3.utils.fromWei(poolBalance, 'ether') + ' MATIC';
    } catch (error) {
        console.error('Error loading network stats:', error);
    }
}

// Load genealogy structure
async function loadGenealogy(rootId) {
    try {
        showTreeLoading();
        
        // Build genealogy structure starting from root
        treeData = await buildTreeData(rootId, currentDepth);
        
        // Update tree info
        updateTreeInfo(treeData);
        
        // Render genealogy
        createTreeVisualization(treeData);
        
        hideTreeLoading();
        
    } catch (error) {
        console.error('Error loading genealogy:', error);
        treeContainer.innerHTML = '<p>خطا در بارگذاری ژنولوژی شبکه</p>';
        hideTreeLoading();
    }
}

// Show loading spinner
function showTreeLoading() {
    document.getElementById('treeLoading').style.display = 'block';
    document.getElementById('treeVisualization').style.opacity = '0.3';
}

// Hide loading spinner
function hideTreeLoading() {
    document.getElementById('treeLoading').style.display = 'none';
    document.getElementById('treeVisualization').style.opacity = '1';
}

// Build tree data for D3 visualization
async function buildTreeData(rootId, maxDepth = 4) {
    const rootNode = await buildGenealogyNode(rootId, 0, maxDepth);
    return rootNode;
}

// Build a genealogy node with binary tree structure
async function buildGenealogyNode(userId, depth = 0, maxDepth = 4) {
    if (depth > maxDepth) return null;
    
    try {
        // Get user directs (left and right children)
        const directs = await contract.methods.getUserDirects(userId).call();
        const leftId = parseInt(directs.leftId);
        const rightId = parseInt(directs.rightId);
        
        // Get user info for the current node
        const userAddress = await getUserAddressById(userId);
        let userInfoData;
        
        if (userAddress !== '0x0000000000000000000000000000000000000000') {
            userInfoData = await contract.methods.getUserInfo(userAddress).call();
        } else {
            userInfoData = { 
                leftCount: 0, 
                rightCount: 0, 
                balanceCount: 0, 
                isMiner: false 
            };
        }
        
        const node = {
            id: userId,
            name: `کاربر ${userId}`,
            leftCount: parseInt(userInfoData.leftCount),
            rightCount: parseInt(userInfoData.rightCount),
            balanceCount: parseInt(userInfoData.balanceCount),
            isMiner: userInfoData.isMiner,
            isCurrentUser: parseInt(userId) === parseInt(userInfo.id),
            depth: depth,
            children: [],
            hasLeftChild: leftId > 0,
            hasRightChild: rightId > 0,
            leftId: leftId,
            rightId: rightId
        };
        
        // Build left child
        if (leftId > 0) {
            const leftChild = await buildGenealogyNode(leftId, depth + 1, maxDepth);
            if (leftChild) {
                leftChild.side = 'left';
                node.children.push(leftChild);
            }
        } else if (depth < maxDepth) {
            // Add empty node for visualization
            node.children.push({
                id: `empty-left-${userId}`,
                name: 'موقعیت خالی',
                leftCount: 0,
                rightCount: 0,
                balanceCount: 0,
                isMiner: false,
                isCurrentUser: false,
                isEmpty: true,
                depth: depth + 1,
                children: [],
                side: 'left'
            });
        }
        
        // Build right child
        if (rightId > 0) {
            const rightChild = await buildGenealogyNode(rightId, depth + 1, maxDepth);
            if (rightChild) {
                rightChild.side = 'right';
                node.children.push(rightChild);
            }
        } else if (depth < maxDepth) {
            // Add empty node for visualization
            node.children.push({
                id: `empty-right-${userId}`,
                name: 'موقعیت خالی',
                leftCount: 0,
                rightCount: 0,
                balanceCount: 0,
                isMiner: false,
                isCurrentUser: false,
                isEmpty: true,
                depth: depth + 1,
                children: [],
                side: 'right'
            });
        }
        
        return node;
    } catch (error) {
        console.error(`Error building node for user ${userId}:`, error);
        return {
            id: userId,
            name: `کاربر ${userId} (خطا)`,
            leftCount: 0,
            rightCount: 0,
            balanceCount: 0,
            isMiner: false,
            isCurrentUser: parseInt(userId) === parseInt(userInfo.id),
            depth: depth,
            children: [],
            isEmpty: false,
            hasLeftChild: false,
            hasRightChild: false
        };
    }
}

// Get user address by ID
async function getUserAddressById(userId) {
    // For the root user (current user), we already have the address
    if (parseInt(userId) === parseInt(userInfo.id)) {
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

// Create tree visualization with D3
function createTreeVisualization(data) {
    // Clear previous visualization
    d3.select("#treeVisualization").html("");
    
    if (!data || !data.id) {
        treeContainer.innerHTML = '<p>هیچ داده‌ای برای نمایش وجود ندارد</p>';
        return;
    }
    
    // Container dimensions
    const container = document.getElementById("treeVisualization");
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create SVG
    treeSvg = d3.select("#treeVisualization")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]);
    
    // Main group for zoom/pan
    treeG = treeSvg.append("g");
    
    // Create tree layout
    treeLayout = d3.tree()
        .size([height - 100, width - 200])
        .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);
    
    // Create hierarchy
    const root = d3.hierarchy(data);
    const treeNodes = treeLayout(root);
    
    // Calculate node statistics
    const nodeCount = treeNodes.descendants().length;
    const minerCount = treeNodes.descendants().filter(d => d.data.isMiner && !d.data.isEmpty).length;
    
    // Update tree info
    currentLevelSpan.textContent = currentDepth;
    nodeCountSpan.textContent = nodeCount;
    minerCountSpan.textContent = minerCount;
    
    // Draw links (connections between nodes)
    const links = treeG.selectAll(".link")
        .data(treeNodes.links())
        .enter()
        .append("path")
        .attr("class", d => {
            const isLeft = d.target.data.side === 'left';
            return `link ${isLeft ? 'left-branch' : 'right-branch'}`;
        })
        .attr("d", d3.linkVertical()
            .x(d => d.x)
            .y(d => d.y)
        );
    
    // Create node groups
    const nodes = treeG.selectAll(".node")
        .data(treeNodes.descendants())
        .enter()
        .append("g")
        .attr("class", d => {
            let className = "node";
            if (d.data.isCurrentUser) className += " current-user";
            else if (d.data.isMiner) className += " miner";
            else if (d.data.isEmpty) className += " empty";
            else className += " regular";
            return className;
        })
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .on("click", function(event, d) {
            event.stopPropagation();
            if (!d.data.isEmpty) {
                showNodeDetails(d.data);
            }
        })
        .on("mouseover", function(event, d) {
            if (!d.data.isEmpty) {
                showNodeTooltip(event, d.data);
            }
        })
        .on("mouseout", hideNodeTooltip);
    
    // Add circles for nodes
    nodes.append("circle")
        .attr("r", d => {
            if (d.data.isCurrentUser) return 20;
            if (d.data.isMiner) return 15;
            if (d.data.isEmpty) return 10;
            return 12;
        });
    
    // Add user ID text
    nodes.append("text")
        .attr("dy", d => {
            if (d.data.isCurrentUser) return 5;
            return 4;
        })
        .attr("text-anchor", "middle")
        .text(d => {
            if (d.data.isEmpty) return "❌";
            return d.data.id;
        })
        .style("font-size", d => {
            if (d.data.isCurrentUser) return "14px";
            if (d.data.isEmpty) return "12px";
            return "12px";
        })
        .style("font-weight", "bold")
        .style("fill", d => {
            if (d.data.isCurrentUser) return "white";
            if (d.data.isEmpty) return "var(--gray)";
            return "var(--dark)";
        });
    
    // Add special icons
    nodes.filter(d => d.data.isCurrentUser && !d.data.isEmpty)
        .append("text")
        .attr("dy", 25)
        .attr("text-anchor", "middle")
        .text("👤")
        .style("font-size", "16px");
    
    nodes.filter(d => d.data.isMiner && !d.data.isCurrentUser && !d.data.isEmpty)
        .append("text")
        .attr("dy", 25)
        .attr("text-anchor", "middle")
        .text("⛏️")
        .style("font-size", "14px");
    
    // Add stats for current user and important nodes
    nodes.filter(d => (d.data.isCurrentUser || d.depth <= 2) && !d.data.isEmpty)
        .append("text")
        .attr("class", "node-label")
        .attr("dy", 35)
        .attr("text-anchor", "middle")
        .text(d => `چپ:${d.data.leftCount} راست:${d.data.rightCount}`)
        .style("font-size", "10px")
        .style("fill", "var(--gray)");
    
    // Setup zoom behavior
    zoom = d3.zoom()
        .scaleExtent([0.1, 3])
        .on("zoom", (event) => {
            treeG.attr("transform", event.transform);
        });
    
    treeSvg.call(zoom);
    
    // Initial zoom to fit
    const bounds = treeG.node().getBBox();
    const fullWidth = bounds.width;
    const fullHeight = bounds.height;
    const scale = Math.min(width / fullWidth, height / fullHeight) * 0.8;
    
    const transform = d3.zoomIdentity
        .translate(width / 2 - (bounds.x + bounds.width / 2) * scale, 
                  height / 2 - (bounds.y + bounds.height / 2) * scale)
        .scale(scale);
    
    treeSvg.call(zoom.transform, transform);
}

// Show node details in modal
function showNodeDetails(nodeData) {
    modalUserInfo.innerHTML = `
        <div class="info-item">
            <span class="info-label">شناسه کاربری:</span>
            <span class="info-value">${nodeData.id}</span>
        </div>
        <div class="info-item">
            <span class="info-label">تعداد چپ:</span>
            <span class="info-value">${nodeData.leftCount}</span>
        </div>
        <div class="info-item">
            <span class="info-label">تعداد راست:</span>
            <span class="info-value">${nodeData.rightCount}</span>
        </div>
        <div class="info-item">
            <span class="info-label">تعداد بالانس:</span>
            <span class="info-value">${nodeData.balanceCount}</span>
        </div>
        <div class="info-item">
            <span class="info-label">وضعیت ماینر:</span>
            <span class="info-value">${nodeData.isMiner ? '✅ بله' : '❌ خیر'}</span>
        </div>
        <div class="info-item">
            <span class="info-label">کاربر فعلی:</span>
            <span class="info-value">${nodeData.isCurrentUser ? '✅ بله' : '❌ خیر'}</span>
        </div>
    `;
    
    // Store selected user ID for network view
    viewNetworkBtn.dataset.userId = nodeData.id;
    userModal.style.display = 'block';
}

// Show node tooltip
function showNodeTooltip(event, nodeData) {
    // Remove existing tooltip
    d3.selectAll(".node-tooltip").remove();
    
    // Create tooltip
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "node-tooltip")
        .style("opacity", 0);
    
    // Set tooltip content
    tooltip.html(`
        <strong>کاربر ${nodeData.id}</strong><br>
        چپ: ${nodeData.leftCount} | راست: ${nodeData.rightCount}<br>
        بالانس: ${nodeData.balanceCount}<br>
        ${nodeData.isMiner ? '⛏️ ماینر' : ''} ${nodeData.isCurrentUser ? '👤 شما' : ''}
    `);
    
    // Position and show tooltip
    tooltip
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px")
        .transition()
        .duration(200)
        .style("opacity", 1);
}

// Hide node tooltip
function hideNodeTooltip() {
    d3.selectAll(".node-tooltip")
        .transition()
        .duration(200)
        .style("opacity", 0)
        .remove();
}

// Close user modal
function closeUserModal() {
    userModal.style.display = 'none';
}

// View selected user's network
function viewSelectedUserNetwork() {
    const userId = viewNetworkBtn.dataset.userId;
    if (userId && userId !== userInfo.id) {
        loadGenealogy(userId);
        closeUserModal();
    }
}

// Expand all nodes
async function expandAllNodes() {
    currentDepth = 6; // Maximum depth
    depthControl.value = 6;
    depthValue.textContent = '6';
    await loadGenealogy(userInfo.id);
}

// Collapse all nodes
async function collapseAllNodes() {
    currentDepth = 2; // Minimum useful depth
    depthControl.value = 2;
    depthValue.textContent = '2';
    await loadGenealogy(userInfo.id);
}

// Reset tree view
function resetTreeView() {
    if (treeSvg) {
        const container = document.getElementById("treeVisualization");
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        const bounds = treeG.node().getBBox();
        const scale = Math.min(width / bounds.width, height / bounds.height) * 0.8;
        
        const transform = d3.zoomIdentity
            .translate(width / 2 - (bounds.x + bounds.width / 2) * scale, 
                      height / 2 - (bounds.y + bounds.height / 2) * scale)
            .scale(scale);
        
        treeSvg.transition()
            .duration(750)
            .call(zoom.transform, transform);
    }
}

// Toggle fullscreen mode
function toggleFullscreen() {
    const treeContainer = document.getElementById('treeContainer');
    
    if (!document.fullscreenElement) {
        if (treeContainer.requestFullscreen) {
            treeContainer.requestFullscreen();
            treeContainer.classList.add('fullscreen');
            fullscreenBtn.textContent = '❌ خروج از تمام صفحه';
            
            // Recreate visualization after fullscreen for proper sizing
            setTimeout(() => {
                if (treeData && Object.keys(treeData).length > 0) {
                    createTreeVisualization(treeData);
                }
            }, 300);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            treeContainer.classList.remove('fullscreen');
            fullscreenBtn.textContent = '📺 تمام صفحه';
            
            // Recreate visualization after exiting fullscreen
            setTimeout(() => {
                if (treeData && Object.keys(treeData).length > 0) {
                    createTreeVisualization(treeData);
                }
            }, 300);
        }
    }
}

// Export tree as image
function exportTreeAsImage() {
    if (!treeSvg) return;
    
    // Create a temporary SVG clone
    const svgClone = treeSvg.node().cloneNode(true);
    
    // Set background
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", "#f5f7fa");
    svgClone.insertBefore(rect, svgClone.firstChild);
    
    // Convert to data URL
    const svgData = new XMLSerializer().serializeToString(svgClone);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Create download link
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `tree-genealogy-${userInfo.id}-${new Date().getTime()}.png`;
        downloadLink.href = pngUrl;
        downloadLink.click();
        
        URL.revokeObjectURL(url);
    };
    
    img.src = url;
}

// Update tree information
function updateTreeInfo(data) {
    if (!data) return;
    
    // Count nodes and miners (this would need to be calculated during tree building)
    // For now, we'll set placeholder values
    currentLevelSpan.textContent = currentDepth;
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle account changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', async (accounts) => {
        if (accounts.length === 0) {
            // User disconnected their wallet
            userAccount = null;
            connectWalletBtn.textContent = '🔗 اتصال کیف پول';
            connectWalletBtn.disabled = false;
            walletAddressSpan.textContent = 'اتصال برقرار نشده';
            userInfoDiv.innerHTML = '<p>لطفاً ابتدا کیف پول خود را متصل کنید</p>';
            treeContainer.innerHTML = '<p>برای مشاهده ژنولوژی شبکه، ابتدا کیف پول خود را متصل کنید.</p>';
        } else {
            // User switched accounts
            userAccount = accounts[0];
            updateWalletUI();
            await loadUserInfo();
            await loadNetworkStats();
            await loadGenealogy(userInfo.id);
        }
    });
}