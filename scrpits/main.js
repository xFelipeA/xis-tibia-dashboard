class XisTibiaDashboard {
    constructor() {
        this.currentTab = 'inicio';
        this.tabComponents = {};
        this.dataManager = new DataManager();
        this.soundManager = new SoundManager();
        
        this.init();
    }

    async init() {
        await this.dataManager.init();
        this.setupEventListeners();
        this.loadTab('inicio');
        this.updateSystemStatus();
        
        console.log('✅ Xis Tibia Dashboard iniciado com sucesso!');
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Header buttons
        document.getElementById('about-btn').addEventListener('click', () => {
            this.showAboutModal();
        });

        document.getElementById('quit-btn').addEventListener('click', () => {
            this.confirmQuit();
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('about-modal');
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // System health check
        setInterval(() => {
            this.updateSystemStatus();
        }, 5000);
    }

    switchTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Hide all tab panes
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Load tab content if not already loaded
        this.loadTab(tabName);

        this.currentTab = tabName;
    }

    async loadTab(tabName) {
        const tabElement = document.getElementById(`${tabName}-tab`);
        
        if (tabElement.getAttribute('data-loaded') !== 'true') {
            try {
                switch(tabName) {
                    case 'inicio':
                        this.tabComponents.inicio = new InicioTab();
                        break;
                    case 'imbuements':
                        this.tabComponents.imbuements = new ImbuementsTab();
                        break;
                    case 'services':
                        this.tabComponents.services = new ServicesTab(this.dataManager);
                        break;
                    case 'farm':
                        this.tabComponents.farm = new ProfitTab(this.dataManager);
                        break;
                    case 'divisao-loot':
                        this.tabComponents.divisaoLoot = new LootTab();
                        break;
                    case 'divisao-drops':
                        this.tabComponents.divisaoDrops = new DivisaoDropsTab(this.dataManager);
                        break;
                    case 'timers':
                        this.tabComponents.timers = new TimersTab(this.soundManager);
                        break;
                    case 'senhas':
                        this.tabComponents.senhas = new SenhasTab(this.dataManager);
                        break;
                }
                tabElement.setAttribute('data-loaded', 'true');
            } catch (error) {
                console.error(`Erro ao carregar aba ${tabName}:`, error);
                tabElement.innerHTML = `
                    <div class="error-tab">
                        <h3>❌ Erro na aba ${tabName}</h3>
                        <p>${error.message}</p>
                        <button class="btn btn-info" onclick="app.retryLoadTab('${tabName}')">
                            🔄 Tentar Recarregar
                        </button>
                    </div>
                `;
            }
        }

        this.updateLoadedTabsCount();
    }

    retryLoadTab(tabName) {
        const tabElement = document.getElementById(`${tabName}-tab`);
        tabElement.removeAttribute('data-loaded');
        tabElement.innerHTML = '';
        this.loadTab(tabName);
    }

    updateSystemStatus() {
        const statusLabel = document.getElementById('status-label');
        statusLabel.textContent = '✅ Sistema estável - Todas as abas funcionando';
    }

    updateLoadedTabsCount() {
        const loadedTabs = document.querySelectorAll('.tab-pane[data-loaded="true"]').length;
        document.getElementById('loaded-tabs').textContent = `${loadedTabs} abas carregadas`;
    }

    showAboutModal() {
        const modal = document.getElementById('about-modal');
        const aboutContent = document.querySelector('.about-content');
        
        aboutContent.innerHTML = `
            <h3>Xis Tibia Dashboard</h3>
            <p>Versão Web 1.0</p>
            <p>Uma ferramenta completa para jogadores de Tibia</p>
            <p>Desenvolvido para a comunidade</p>
            <hr>
            <p><b>Como usar:</b></p>
            <ul>
                <li><b>Navegação por abas</b>: Clique nas abas para acessar diferentes funcionalidades</li>
                <li><b>Dados salvos automaticamente</b>: Todas as informações são salvas localmente</li>
                <li><b>Responsivo</b>: Funciona em desktop e mobile</li>
            </ul>
            <p><b>Funcionalidades:</b></p>
            <ul>
                <li>✨ Imbuements - Calculadora de imbuements</li>
                <li>🔧 Services - Gerenciador de services</li>
                <li>🤑 Farm - Controle de farm e lucro</li>
                <li>💰 Divisão de Loot - Calculadora de loot</li>
                <li>⚖️ Divisão de Drops - Controle de drops</li>
                <li>⏰ Timers - Timers úteis</li>
                <li>🔑 Senhas - Gerenciador de senhas</li>
            </ul>
            <p><b>Status:</b> ✅ Sistema estável e otimizado para web</p>
        `;
        
        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('about-modal').style.display = 'none';
    }

    confirmQuit() {
        if (confirm('Deseja realmente sair do Xis Tibia Dashboard?')) {
            this.quitApplication();
        }
    }

    quitApplication() {
        console.log('🔄 Encerrando aplicação...');
        // Clean up resources
        if (this.tabComponents.timers) {
            this.tabComponents.timers.cleanup();
        }
        // Close the window/tab
        window.close();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new XisTibiaDashboard();
});
