// Sistema de Carregamento de Abas
class TabManager {
    constructor() {
        this.currentTab = 'imbuements';
        this.loadedTabs = new Set();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTab('imbuements');
    }

    setupEventListeners() {
        // Eventos dos botões de aba
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // Outros eventos (modal, etc)
        document.getElementById('about-btn').addEventListener('click', () => {
            this.showAboutModal();
        });

        document.getElementById('quit-btn').addEventListener('click', () => {
            this.quitApplication();
        });
    }

    async loadTab(tabName) {
        try {
            // Carrega o HTML da aba
            const response = await fetch(`components/${tabName}.html`);
            const html = await response.text();
            
            // Insere no conteúdo da aba
            document.getElementById('tab-content').innerHTML = html;
            
            // Atualiza botões ativos
            this.updateActiveTab(tabName);
            
            // Carrega o JavaScript específico da aba (se existir)
            if (!this.loadedTabs.has(tabName)) {
                await this.loadTabScript(tabName);
                this.loadedTabs.add(tabName);
            }
            
            // Atualiza status
            this.updateStatus(`✅ ${this.getTabDisplayName(tabName)} - Carregado`);
            
        } catch (error) {
            console.error(`Erro ao carregar aba ${tabName}:`, error);
            this.showErrorTab(tabName, error);
        }
    }

    async loadTabScript(tabName) {
        try {
            const script = document.createElement('script');
            script.src = `components/${tabName}.js`;
            document.body.appendChild(script);
        } catch (error) {
            console.warn(`Script da aba ${tabName} não encontrado`);
        }
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        this.loadTab(tabName);
    }

    updateActiveTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
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
        document.getElementById('status-text').textContent = message;
    }

    showErrorTab(tabName, error) {
        document.getElementById('tab-content').innerHTML = `
            <div class="error-tab">
                <h2>❌ Erro ao carregar ${this.getTabDisplayName(tabName)}</h2>
                <p>${error.message}</p>
                <button onclick="tabManager.loadTab('${tabName}')" class="btn-retry">
                    🔄 Tentar Novamente
                </button>
            </div>
        `;
    }

    showAboutModal() {
        // código do modal
    }

    quitApplication() {
        // código de saída
    }
}

// Inicializar quando a página carregar
let tabManager;
document.addEventListener('DOMContentLoaded', () => {
    tabManager = new TabManager();
});
