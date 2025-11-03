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
        this.startHealthCheck();
    }

    setupEventListeners() {
        // Eventos dos botões de aba
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // Modal About
        document.getElementById('about-btn').addEventListener('click', () => {
            this.showAboutModal();
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            this.hideAboutModal();
        });

        document.getElementById('about-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('about-modal')) {
                this.hideAboutModal();
            }
        });

        // Botão Sair
        document.getElementById('quit-btn').addEventListener('click', () => {
            this.quitApplication();
        });
    }

    async loadTab(tabName) {
        try {
            this.showLoading();
            
            // Carrega o HTML da aba
            const response = await fetch(`components/${tabName}.html`);
            if (!response.ok) throw new Error(`Erro ${response.status}`);
            
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
            
            // Inicializa a aba específica
            this.initializeTab(tabName);
            
            // Atualiza status
            this.updateStatus(`✅ ${this.getTabDisplayName(tabName)} - Carregado`);
            
        } catch (error) {
            console.error(`Erro ao carregar aba ${tabName}:`, error);
            this.showErrorTab(tabName, error);
        }
    }

    async loadTabScript(tabName) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `components/${tabName}.js`;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Script ${tabName}.js não encontrado`));
            document.body.appendChild(script);
        });
    }

    initializeTab(tabName) {
        // Chama função de inicialização específica de cada aba
        const initFunction = window[`initialize${this.capitalizeFirst(tabName)}`];
        if (typeof initFunction === 'function') {
            initFunction();
        }
    }

    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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

    showLoading() {
        document.getElementById('tab-content').innerHTML = `
            <div class="tab-loading">
                <div class="loading-spinner"></div>
                <p>Carregando...</p>
            </div>
        `;
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
        this.updateStatus(`❌ Erro na aba ${this.getTabDisplayName(tabName)}`);
    }

    showAboutModal() {
        document.getElementById('about-modal').classList.add('active');
    }

    hideAboutModal() {
        document.getElementById('about-modal').classList.remove('active');
    }

    quitApplication() {
        if (confirm('Deseja realmente sair do Xis Tibia Dashboard?')) {
            this.updateStatus('👋 Encerrando aplicação...');
            // Em uma PWA real, isso fecharia o app
            setTimeout(() => {
                alert('Aplicação encerrada. Em uma PWA real, o app seria fechado.');
            }, 1000);
        }
    }

    startHealthCheck() {
        // Simula verificação de saúde da aplicação
        setInterval(() => {
            const statusDot = document.querySelector('.status-dot');
            if (statusDot) {
                statusDot.style.backgroundColor = 'var(--success)';
                statusDot.style.boxShadow = '0 0 10px var(--success)';
            }
        }, 5000);
    }
}

// Inicializar quando a página carregar
let tabManager;
document.addEventListener('DOMContentLoaded', () => {
    tabManager = new TabManager();
});
