// Configuration
const CONTRACT_ADDRESS = "0x166dd205590240c90ca4e0e545ad69db47d8f22f";
const CONTRACT_ABI = [
    "function getUserInfo(address user) view returns (uint256 id, uint256 uplineId, uint256 leftCount, uint256 rightCount, uint256 saveLeft, uint256 saveRight, uint256 balanceCount, uint256 specialBalanceCount, uint256 totalMinerRewards, uint256 entryPrice, bool isMiner)",
    "function getUserDirects(uint256 userId) view returns (uint256 leftId, uint256 rightId)",
    "function totalUsers() view returns (uint256)",
    "event Registered(address indexed user, address indexed upline, uint256 id, bool placeOnLeft)"
];

class MLMTreeViewer {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.userAddress = null;
        this.treeData = null;
        this.svg = null;
        this.zoom = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkWalletConnection();
    }

    bindEvents() {
        document.getElementById('connectWallet').addEventListener('click', () => this.connectWallet());
        document.getElementById('disconnectWallet').addEventListener('click', () => this.disconnectWallet());
        document.getElementById('zoomIn').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoomOut').addEventListener('click', () => this.zoomOut());
        document.getElementById('resetView').addEventListener('click', () => this.resetView());
    }

    async checkWalletConnection() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                await this.handleWalletConnected(accounts[0]);
            }
        }
    }

    async connectWallet() {
        try {
            if (!window.ethereum) {
                throw new Error('لطفا متامسک یا کیف پول مشابه را نصب کنید');
            }

            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });

            await this.handleWalletConnected(accounts[0]);

            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    this.disconnectWallet();
                } else {
                    this.handleWalletConnected(accounts[0]);
                }
            });

        } catch (error) {
            this.showError('خطا در اتصال کیف پول: ' + error.message);
        }
    }

    async handleWalletConnected(address) {
        this.userAddress = address;
        
        // Update UI
        document.getElementById('walletSection').classList.add('d-none');
        document.getElementById('connectedWallet').classList.remove('d-none');
        document.getElementById('walletAddress').textContent = 
            `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

        // Initialize provider and contract
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = await this.provider.getSigner();
        this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer);

        // Load user data and tree
        await this.loadUserData();
        await this.loadTreeVisualization();
    }

    disconnectWallet() {
        this.userAddress = null;
        this.provider = null;
        this.signer = null;
        this.contract = null;
        
        // Reset UI
        document.getElementById('walletSection').classList.remove('d-none');
        document.getElementById('connectedWallet').classList.add('d-none');
        document.getElementById('userInfoSection').classList.add('d-none');
        document.getElementById('treeSection').classList.add('d-none');
        
        // Clear tree visualization
        const treeContainer = document.getElementById('treeVisualization');
        treeContainer.innerHTML = '';
    }

    async loadUserData() {
        try {
            this.showLoading(true);
            
            const userInfo = await this.contract.getUserInfo(this.userAddress);
            
            const userInfoHTML = `
                <div class="col-md-3">
                    <div class="stat-card">
                        <div class="stat-number">${userInfo.id.toString()}</div>
                        <div class="stat-label">شناسه کاربری</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-card" style="background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);">
                        <div class="stat-number">${userInfo.leftCount.toString()}</div>
                        <div class="stat-label">اعضای چپ</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-card" style="background: linear-gradient(135deg, #1cc88a 0%, #13855c 100%);">
                        <div class="stat-number">${userInfo.rightCount.toString()}</div>
                        <div class="stat-label">اعضای راست</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-card" style="background: linear-gradient(135deg, #f6c23e 0%, #dda20a 100%);">
                        <div class="stat-number">${userInfo.balanceCount.toString()}</div>
                        <div class="stat-label">تعداد بالانس</div>
                    </div>
                </div>
            `;
            
            document.getElementById('userInfoContent').innerHTML = userInfoHTML;
            document.getElementById('userInfoSection').classList.remove('d-none');
            
        } catch (error) {
            this.showError('خطا در دریافت اطلاعات کاربر: ' + error.message);
        } finally {
            this.showLoading(false);
        }
    }

    async loadTreeVisualization() {
        try {
            this.showLoading(true);
            
            // Build tree data starting from current user
            this.treeData = await this.buildTreeData(this.userAddress);
            
            // Create D3 tree visualization
            this.createTreeVisualization();
            
            document.getElementById('treeSection').classList.remove('d-none');
            
        } catch (error) {
            this.showError('خطا در ایجاد نمودار درختی: ' + error.message);
        } finally {
            this.showLoading(false);
        }
    }

    async buildTreeData(userAddress, depth = 0, maxDepth = 3) {
        if (depth >= maxDepth) return null;

        try {
            const userInfo = await this.contract.getUserInfo(userAddress);
            const directs = await this.contract.getUserDirects(userInfo.id);

            const node = {
                name: `User ${userInfo.id}`,
                id: userInfo.id.toString(),
                address: userAddress,
                leftCount: userInfo.leftCount.toString(),
                rightCount: userInfo.rightCount.toString(),
                balanceCount: userInfo.balanceCount.toString(),
                isCurrent: userAddress.toLowerCase() === this.userAddress.toLowerCase(),
                children: []
            };

            // Recursively build left branch
            if (directs.leftId !== 0) {
                const leftUserAddress = await this.getUserAddressById(directs.leftId);
                if (leftUserAddress) {
                    const leftChild = await this.buildTreeData(leftUserAddress, depth + 1, maxDepth);
                    if (leftChild) {
                        leftChild.branch = 'left';
                        node.children.push(leftChild);
                    }
                }
            }

            // Recursively build right branch
            if (directs.rightId !== 0) {
                const rightUserAddress = await this.getUserAddressById(directs.rightId);
                if (rightUserAddress) {
                    const rightChild = await this.buildTreeData(rightUserAddress, depth + 1, maxDepth);
                    if (rightChild) {
                        rightChild.branch = 'right';
                        node.children.push(rightChild);
                    }
                }
            }

            return node;

        } catch (error) {
            console.error('Error building tree node:', error);
            return null;
        }
    }

    async getUserAddressById(userId) {
        // Note: This is a simplified approach. In a real contract, you might need
        // a mapping from ID to address. This is a placeholder implementation.
        try {
            // For demo purposes, we'll return a placeholder
            // In production, you'd need to call a contract function to get address from ID
            return `0x${userId.toString().padStart(40, '0')}`;
        } catch (error) {
            console.error('Error getting user address:', error);
            return null;
        }
    }

    createTreeVisualization() {
        const container = document.getElementById('treeVisualization');
        container.innerHTML = '';

        const width = container.clientWidth;
        const height = container.clientHeight;

        this.svg = d3.select('#treeVisualization')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const g = this.svg.append('g');

        // Create tree layout
        const treeLayout = d3.tree()
            .size([height - 100, width - 200]);

        const hierarchy = d3.hierarchy(this.treeData);
        const treeData = treeLayout(hierarchy);

        // Add zoom capability
        this.zoom = d3.zoom()
            .scaleExtent([0.1, 2])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        this.svg.call(this.zoom);

        // Create links
        const links = g.selectAll('.link')
            .data(treeData.links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x)
            );

        // Create nodes
        const nodes = g.selectAll('.node')
            .data(treeData.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.y},${d.x})`);

        // Add circles to nodes
        nodes.append('circle')
            .attr('class', d => {
                let className = 'node-circle';
                if (d.data.isCurrent) {
                    className += ' node-current';
                } else if (d.data.branch === 'left') {
                    className += ' node-left';
                } else if (d.data.branch === 'right') {
                    className += ' node-right';
                }
                return className;
            })
            .attr('r', 25)
            .on('click', (event, d) => this.nodeClicked(d));

        // Add text to nodes
        nodes.append('text')
            .attr('class', 'node-text')
            .attr('dy', 4)
            .text(d => d.data.id)
            .on('click', (event, d) => this.nodeClicked(d));

        // Add tooltips
        nodes.append('title')
            .text(d => 
                `User ${d.data.id}\nLeft: ${d.data.leftCount}\nRight: ${d.data.rightCount}\nBalance: ${d.data.balanceCount}`
            );

        // Center the tree
        const bounds = g.node().getBBox();
        const fullWidth = width;
        const fullHeight = height;
        const widthScale = (fullWidth - 200) / bounds.width;
        const heightScale = (fullHeight - 100) / bounds.height;
        const scale = Math.min(widthScale, heightScale) * 0.8;

        const transform = d3.zoomIdentity
            .translate(fullWidth / 2, fullHeight / 2)
            .scale(scale)
            .translate(-bounds.x - bounds.width / 2, -bounds.y - bounds.height / 2);

        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, transform);
    }

    nodeClicked(node) {
        console.log('Node clicked:', node.data);
        // You can implement additional functionality here
        // like showing detailed user information or expanding/collapsing branches
    }

    zoomIn() {
        this.svg.transition()
            .duration(300)
            .call(this.zoom.scaleBy, 1.3);
    }

    zoomOut() {
        this.svg.transition()
            .duration(300)
            .call(this.zoom.scaleBy, 0.7);
    }

    resetView() {
        const container = document.getElementById('treeVisualization');
        const width = container.clientWidth;
        const height = container.clientHeight;

        const g = this.svg.select('g');
        const bounds = g.node().getBBox();
        
        const widthScale = (width - 200) / bounds.width;
        const heightScale = (height - 100) / bounds.height;
        const scale = Math.min(widthScale, heightScale) * 0.8;

        const transform = d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(scale)
            .translate(-bounds.x - bounds.width / 2, -bounds.y - bounds.height / 2);

        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, transform);
    }

    showLoading(show) {
        const loadingElement = document.getElementById('loadingSpinner');
        if (show) {
            loadingElement.classList.remove('d-none');
        } else {
            loadingElement.classList.add('d-none');
        }
    }

    showError(message) {
        alert(message); // In production, use a better notification system
        console.error(message);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MLMTreeViewer();
});

// Handle page refresh and navigation
window.addEventListener('beforeunload', () => {
    // Cleanup if needed
});