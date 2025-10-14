// فقط تابع‌های render رو عوض می‌کنیم، بقیه کد مثل قبل

// تابع renderTree به جای renderPyramidTree
function renderTree() {
    const rootNode = loadedNodes.get(userInfo.id);
    if (!rootNode) return;
    
    const treeHTML = generateTreeHTML(rootNode, 0);
    treeContainer.innerHTML = `
        <div class="binary-tree">
            ${treeHTML}
        </div>
    `;
    
    attachNodeEventListeners();
}

// تولید HTML برای درخت باینری
function generateTreeHTML(node, level) {
    const hasLeftChild = node.leftId !== "0";
    const hasRightChild = node.rightId !== "0";
    const hasChildren = hasLeftChild || hasRightChild;
    
    // کلاس‌های جهت
    const branchClass = node.side === 'left' ? 'left-branch' : node.side === 'right' ? 'right-branch' : '';
    
    let html = `
        <div class="tree-level level-${level}">
            <div class="tree-node ${node.isCurrentUser ? 'current-user' : ''} ${hasChildren ? 'has-children' : ''} ${node.isExpanded ? 'expanded' : ''} ${branchClass}" 
                 data-node-id="${node.id}">
                ${node.side === 'left' ? '<div class="side-indicator left-side">👈 چپ</div>' : ''}
                ${node.side === 'right' ? '<div class="side-indicator right-side">👉 راست</div>' : ''}
                
                <div class="node-id">
                    ${node.id} 
                    ${node.isCurrentUser ? '👤' : ''} 
                    ${node.isMiner ? '⛏️' : ''}
                    ${hasChildren ? (node.isExpanded ? ' ▼' : ' ▶') : ''}
                </div>
                ${node.leftCount ? `
                <div class="node-stats">چپ: ${node.leftCount}</div>
                <div class="node-stats">راست: ${node.rightCount}</div>
                <div class="node-stats">بالانس: ${node.balanceCount}</div>
                ` : ''}
                ${node.isLoading ? '<div class="loading">در حال بارگذاری...</div>' : ''}
            </div>
        </div>
    `;
    
    // اگر گره expand شده، فرزندانش رو نمایش بده
    if (node.isExpanded && hasChildren) {
        html += `<div class="children-level level-${level}">`;
        
        if (hasLeftChild) {
            const leftChild = node.children.left;
            html += leftChild ? generateTreeHTML(leftChild, level + 1) : 
                `<div class="tree-node loading-node">در حال بارگذاری...</div>`;
        } else {
            html += `<div class="tree-node empty-node">موقعیت خالی</div>`;
        }
        
        if (hasRightChild) {
            const rightChild = node.children.right;
            html += rightChild ? generateTreeHTML(rightChild, level + 1) : 
                `<div class="tree-node loading-node">در حال بارگذاری...</div>`;
        } else {
            html += `<div class="tree-node empty-node">موقعیت خالی</div>`;
        }
        
        html += '</div>';
    }
    
    return html;
}

// در تابع loadInitialGenealogy هم renderTree صدا زده بشه
async function loadInitialGenealogy(rootId) {
    try {
        treeContainer.innerHTML = '<p>در حال بارگذاری ساختار درختی...</p>';
        
        const rootNode = await createNodeData(rootId, true);
        loadedNodes.set(rootId, rootNode);
        
        await loadDirectChildren(rootNode);
        
        renderTree(); // اینجا تغییر کرد
        
    } catch (error) {
        console.error('Error loading tree:', error);
        loadDemoTree();
    }
}

// تابع دمو هم آپدیت بشه
function loadDemoTree() {
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
    renderTree(); // اینجا هم تغییر کرد
}

// بقیه توابع دقیقاً مثل قبل باقی می‌مونن...
// [کدهای قبلی بدون تغییر]