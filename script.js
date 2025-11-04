// Tab Manager
class TabManager {
    constructor() {
        this.currentTab = 'imbuements';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTabContent('imbuements');
        this.updateStatus('✅ Sistema inicializado e pronto');
    }

    bindEvents() {
        // Tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // About modal
        const aboutBtn = document.getElementById('about-btn');
        const aboutModal = document.getElementById('about-modal');
        const closeModal = document.querySelector('.close-modal');

        aboutBtn.addEventListener('click', () => {
            aboutModal.classList.add('active');
        });

        closeModal.addEventListener('click', () => {
            aboutModal.classList.remove('active');
        });

        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.remove('active');
            }
        });

        // Quit button
        document.getElementById('quit-btn').addEventListener('click', () => {
            if (confirm('Deseja realmente sair?')) {
                this.updateStatus('🔴 Sistema finalizado');
                setTimeout(() => {
                    document.body.innerHTML = `
                        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: var(--primary); color: var(--accent); font-size: 24px;">
                            ✅ Xis Tibia Dashboard - Sistema Finalizado
                        </div>
                    `;
                }, 1000);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        this.switchTab('imbuements');
                        break;
                    case '2':
                        e.preventDefault();
                        this.switchTab('services');
                        break;
                    case '3':
                        e.preventDefault();
                        this.switchTab('farm');
                        break;
                }
            }
            
            if (e.key === 'Escape') {
                aboutModal.classList.remove('active');
            }
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update current tab
        this.currentTab = tabName;
        
        // Load tab content
        this.loadTabContent(tabName);
        
        // Update status
        this.updateStatus(`✅ Aba ${this.getTabDisplayName(tabName)} carregada`);
    }

    loadTabContent(tabName) {
        const tabContent = document.getElementById('tab-content');
        
        // Show loading
        tabContent.innerHTML = `
            <div class="tab-loading">
                <div class="loading-spinner"></div>
                <p>Carregando ${this.getTabDisplayName(tabName)}...</p>
            </div>
        `;

        // Load content based on tab
        setTimeout(() => {
            switch(tabName) {
                case 'imbuements':
                    this.loadImbuementsTab();
                    break;
                case 'services':
                    this.loadServicesTab();
                    break;
                case 'farm':
                    this.loadFarmTab();
                    break;
                case 'loot':
                    this.loadLootTab();
                    break;
                case 'drops':
                    this.loadDropsTab();
                    break;
                case 'timers':
                    this.loadTimersTab();
                    break;
                case 'passwords':
                    this.loadPasswordsTab();
                    break;
                default:
                    this.loadDefaultTab();
            }
        }, 300);
    }

    loadImbuementsTab() {
        const tabContent = document.getElementById('tab-content');
        
        tabContent.innerHTML = `
            <div class="tab-content-inner">
                <!-- Barra de Busca -->
                <div class="search-section">
                    <div class="search-group">
                        <label>🔍 Buscar Imbuement:</label>
                        <input type="text" id="imbuement-search" 
                               placeholder="Digite o nome do imbuement, item ou categoria...">
                    </div>
                </div>

                <!-- Tabela de Imbuements -->
                <div class="table-container">
                    <table class="imbuements-table">
                        <thead>
                            <tr>
                                <th>Imbuement</th>
                                <th>Categoria</th>
                                <th>Basic</th>
                                <th>Intricate</th>
                                <th>Powerful</th>
                            </tr>
                        </thead>
                        <tbody id="imbuements-table-body">
                            <!-- Dados carregados via JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // Initialize imbuements
        if (window.imbuementsModule) {
            window.imbuementsModule.initializeImbuements();
        } else {
            console.error('Módulo de imbuements não carregado!');
            this.updateStatus('❌ Erro ao carregar imbuements');
        }
    }

    loadServicesTab() {
        const tabContent = document.getElementById('tab-content');
        tabContent.innerHTML = `
            <div class="tab-placeholder">
                <h2>🔧 Services</h2>
                <p>Gerenciador de services - Em desenvolvimento</p>
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="feature-icon">⚔️</div>
                        <div class="feature-title">Services de Boss</div>
                        <div class="feature-desc">Agendamento e controle de services de bosses</div>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🛡️</div>
                        <div class="feature-title">Services de Quest</div>
                        <div class="feature-desc">Organização de services de quests</div>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">💰</div>
                        <div class="feature-title">Services de Farm</div>
                        <div class="feature-desc">Controle de services de farm</div>
                    </div>
                </div>
            </div>
        `;
    }

    loadFarmTab() {
        const tabContent = document.getElementById('tab-content');
        tabContent.innerHTML = `
            <div class="tab-placeholder">
                <h2>🤑 Farm</h2>
                <p>Controle de farm e lucro - Em desenvolvimento</p>
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="feature-icon">📊</div>
                        <div class="feature-title">Estatísticas</div>
                        <div class="feature-desc">Acompanhamento detalhado de farm</div>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">💸</div>
                        <div class="feature-title">Lucro</div>
                        <div class="feature-desc">Cálculo automático de lucro</div>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">⏱️</div>
                        <div class="feature-title">Tempo</div>
                        <div class="feature-desc">Controle de tempo de farm</div>
                    </div>
                </div>
            </div>
        `;
    }

    loadLootTab() {
        const tabContent = document.getElementById('tab-content');
        tabContent.innerHTML = `
            <div class="tab-placeholder">
                <h2>💰 Divisão de Loot</h2>
                <p>Calculadora de divisão de loot - Em desenvolvimento</p>
            </div>
        `;
    }

    loadDropsTab() {
        const tabContent = document.getElementById('tab-content');
        tabContent.innerHTML = `
            <div class="tab-placeholder">
                <h2>⚖️ Divisão de Drops</h2>
                <p>Controle de divisão de drops raros - Em desenvolvimento</p>
            </div>
        `;
    }

    loadTimersTab() {
        const tabContent = document.getElementById('tab-content');
        tabContent.innerHTML = `
            <div class="tab-placeholder">
                <h2>⏰ Timers</h2>
                <p>Timers úteis para Tibia - Em desenvolvimento</p>
            </div>
        `;
    }

    loadPasswordsTab() {
        const tabContent = document.getElementById('tab-content');
        tabContent.innerHTML = `
            <div class="tab-placeholder">
                <h2>🔑 Senhas</h2>
                <p>Gerenciador seguro de senhas - Em desenvolvimento</p>
            </div>
        `;
    }

    loadDefaultTab() {
        const tabContent = document.getElementById('tab-content');
        tabContent.innerHTML = `
            <div class="tab-placeholder">
                <h2>🚀 Xis Tibia Dashboard</h2>
                <p>Selecione uma aba para começar a usar as ferramentas</p>
            </div>
        `;
    }

    getTabDisplayName(tabName) {
        const names = {
            'imbuements': 'Imbuements',
            'services': 'Services',
            'farm': 'Farm',
            'loot': 'Divisão de Loot',
            'drops': 'Divisão de Drops',
            'timers': 'Timers',
            'passwords': 'Senhas'
        };
        return names[tabName] || tabName;
    }

    updateStatus(message) {
        const statusText = document.getElementById('status-text');
        if (statusText) {
            statusText.textContent = message;
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    window.tabManager = new TabManager();
    
    // Update tab count
    const tabCount = document.getElementById('tab-count');
    if (tabCount) {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabCount.textContent = `${tabButtons.length} abas disponíveis`;
    }
    
    console.log('🚀 Xis Tibia Dashboard inicializado com sucesso!');
});
