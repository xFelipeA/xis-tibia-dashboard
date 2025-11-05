class ServicesTab {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.config = {};
        this.data = {};
        this.personagemAtual = null;
        this.init();
    }

    async init() {
        this.config = this.dataManager.getConfig();
        this.data = this.dataManager.getServicesData();
        
        if (Object.keys(this.data.personagens).length === 0) {
            this.createExampleData();
        }

        this.render();
        this.setupEventListeners();
    }

    createExampleData() {
        const today = new Date().toLocaleDateString('pt-BR');
        
        this.data.personagens = {
            "Personagem 1": {
                "valor_hora": 225,
                "registros": [
                    {
                        "data": today,
                        "xp": "35985217",
                        "tempo": "3:00",
                        "tc": 225,
                        "pago": false,
                        "status_pagamento": "pendente",
                        "num_pessoas": 2,
                        "pagamentos": [
                            {"pessoa": "Cliente A", "tc": 113, "pago": false, "data_pagamento": ""},
                            {"pessoa": "Cliente B", "tc": 112, "pago": false, "data_pagamento": ""}
                        ]
                    }
                ]
            }
        };
        
        this.saveData();
    }

    render() {
        const tabElement = document.getElementById('services-tab');
        
        tabElement.innerHTML = `
            <div class="services-container">
                <div class="config-section">
                    <h3>Configuração do TC</h3>
                    <div class="config-controls">
                        <label>Valor de 250TC (R$):</label>
                        <input type="number" id="tc-real-input" value="${this.config.tc_real}" step="0.01" min="0">
                        <button id="update-tc-btn" class="btn btn-info">Definir Valor TC</button>
                    </div>
                </div>

                <div class="control-section">
                    <button id="add-char-btn" class="btn btn-info">+ Personagem</button>
                    <button id="remove-char-btn" class="btn btn-danger">- Personagem</button>
                    <button id="delete-entries-btn" class="btn btn-danger">Excluir Selecionados</button>
                    <button id="add-dates-btn" class="btn btn-info">+ Datas</button>
                </div>

                <div class="tabs-section">
                    <div class="personagem-tabs" id="personagem-tabs">
                        <!-- Personagem tabs will be populated here -->
                    </div>
                    <div class="tab-content" id="personagem-content">
                        <!-- Personagem content will be populated here -->
                    </div>
                </div>

                <div class="finance-section">
                    <h3>💰 Resumo Financeiro</h3>
                    <div id="finance-content">
                        <!-- Finance content will be populated here -->
                    </div>
                </div>
            </div>
        `;

        this.renderPersonagens();
        this.renderFinanceiro();
    }

    renderPersonagens() {
        const tabsContainer = document.getElementById('personagem-tabs');
        const contentContainer = document.getElementById('personagem-content');
        
        tabsContainer.innerHTML = '';
        contentContainer.innerHTML = '';

        Object.keys(this.data.personagens).forEach((nome, index) => {
            // Create tab button
            const tabBtn = document.createElement('button');
            tabBtn.className = `personagem-tab-btn ${index === 0 ? 'active' : ''}`;
            tabBtn.textContent = nome;
            tabBtn.dataset.personagem = nome;
            tabBtn.addEventListener('click', () => this.switchPersonagem(nome));
            tabsContainer.appendChild(tabBtn);

            // Create tab content
            if (index === 0) {
                this.personagemAtual = nome;
                this.renderPersonagemContent(nome, contentContainer);
            }
        });
    }

    renderPersonagemContent(nome, container) {
        const personagem = this.data.personagens[nome];
        
        container.innerHTML = `
            <div class="personagem-content active">
                <h4>${nome}</h4>
                <table class="personagem-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>XP</th>
                            <th>Tempo</th>
                            <th>TC</th>
                            <th>Status</th>
                            <th>Pagadores</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${personagem.registros.map(registro => `
                            <tr>
                                <td>${registro.data}</td>
                                <td>${registro.xp}</td>
                                <td>${registro.tempo}</td>
                                <td>${registro.tc}</td>
                                <td class="status-${registro.status_pagamento}">
                                    ${this.getStatusText(registro.status_pagamento)}
                                </td>
                                <td>
                                    ${registro.pagamentos.map(p => 
                                        `${p.pessoa} ${p.pago ? '✅' : '❌'}`
                                    ).join(' | ')}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="personagem-totals">
                    <div class="total-item">
                        <strong>XP TOTAL:</strong> 
                        <span>${this.calculateTotalXP(personagem.registros)}</span>
                    </div>
                    <div class="total-item">
                        <strong>TC TOTAL:</strong> 
                        <span>${this.calculateTotalTC(personagem.registros)}</span>
                    </div>
                    <div class="total-item">
                        <strong>TC RECEBIDO:</strong> 
                        <span>${this.calculateTCRecebido(personagem.registros)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderFinanceiro() {
        const financeContainer = document.getElementById('finance-content');
        
        // Calculate financial summary
        let totalTC = 0;
        let totalTCRecebido = 0;
        let totalBRL = 0;

        const financeHTML = Object.keys(this.data.personagens).map(nome => {
            const personagem = this.data.personagens[nome];
            const tcPersonagem = this.calculateTotalTC(personagem.registros);
            const tcRecebido = this.calculateTCRecebido(personagem.registros);
            const brlPersonagem = (tcPersonagem * this.config.tc_real) / 250;

            totalTC += tcPersonagem;
            totalTCRecebido += tcRecebido;
            totalBRL += brlPersonagem;

            return `
                <div class="finance-item">
                    <div class="finance-header">
                        <strong>${nome}</strong>
                        <span class="finance-tc">TC: ${tcPersonagem}</span>
                    </div>
                    <div class="finance-details">
                        <span>Recebido: ${tcRecebido} TC</span>
                        <span>Valor: R$ ${brlPersonagem.toFixed(2)}</span>
                    </div>
                </div>
            `;
        }).join('');

        financeContainer.innerHTML = `
            <div class="finance-summary">
                ${financeHTML}
            </div>
            <div class="finance-totals">
                <div class="total-item">
                    <strong>Total TC:</strong> ${totalTC}
                </div>
                <div class="total-item">
                    <strong>TC Recebido:</strong> ${totalTCRecebido}
                </div>
                <div class="total-item">
                    <strong>Total R$:</strong> ${totalBRL.toFixed(2)}
                </div>
            </div>
            <button id="manage-payments-btn" class="btn btn-info">Gerenciar Pagamentos</button>
        `;
    }

    setupEventListeners() {
        document.getElementById('update-tc-btn').addEventListener('click', () => {
            this.updateTCValue();
        });

        document.getElementById('add-char-btn').addEventListener('click', () => {
            this.addPersonagem();
        });

        document.getElementById('remove-char-btn').addEventListener('click', () => {
            this.removePersonagem();
        });

        document.getElementById('manage-payments-btn').addEventListener('click', () => {
            this.managePayments();
        });
    }

    updateTCValue() {
        const tcInput = document.getElementById('tc-real-input');
        const newValue = parseFloat(tcInput.value);
        
        if (!isNaN(newValue) && newValue >= 0) {
            this.config.tc_real = newValue;
            this.dataManager.setConfig(this.config);
            this.renderFinanceiro();
            alert(`Valor de 250 TC definido para: R$ ${newValue.toFixed(2)}`);
        } else {
            alert('Por favor, insira um valor numérico válido');
        }
    }

    addPersonagem() {
        const nome = prompt('Nome do novo personagem:');
        if (nome && !this.data.personagens[nome]) {
            this.data.personagens[nome] = {
                valor_hora: 225,
                registros: []
            };
            this.saveData();
            this.renderPersonagens();
        } else if (nome) {
            alert('Personagem já existe!');
        }
    }

    removePersonagem() {
        if (this.personagemAtual && confirm(`Remover o personagem '${this.personagemAtual}'?`)) {
            delete this.data.personagens[this.personagemAtual];
            this.saveData();
            this.renderPersonagens();
            this.renderFinanceiro();
        }
    }

    managePayments() {
        // Implementation for payment management
        alert('Funcionalidade de gerenciamento de pagamentos será implementada aqui');
    }

    switchPersonagem(nome) {
        this.personagemAtual = nome;
        this.renderPersonagemContent(nome, document.getElementById('personagem-content'));
        
        // Update active tab
        document.querySelectorAll('.personagem-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-personagem="${nome}"]`).classList.add('active');
    }

    // Helper methods
    calculateTotalXP(registros) {
        return registros.reduce((total, reg) => total + (parseInt(reg.xp) || 0), 0);
    }

    calculateTotalTC(registros) {
        return registros.reduce((total, reg) => total + (reg.tc || 0), 0);
    }

    calculateTCRecebido(registros) {
        return registros.reduce((total, reg) => {
            return total + reg.pagamentos.reduce((pagTotal, pag) => 
                pagTotal + (pag.pago ? pag.tc : 0), 0);
        }, 0);
    }

    getStatusText(status) {
        const statusMap = {
            'total': '✅ Pago',
            'parcial': '🟡 Parcial',
            'pendente': '❌ Pendente'
        };
        return statusMap[status] || '❌ Pendente';
    }

    saveData() {
        this.dataManager.setServicesData(this.data);
    }
}
