class ProfitTab {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.entries = [];
        this.init();
    }

    async init() {
        const data = this.dataManager.getProfitData();
        this.entries = data.entries || [];
        this.render();
        this.setupEventListeners();
    }

    render() {
        const tabElement = document.getElementById('farm-tab');
        
        tabElement.innerHTML = `
            <div class="farm-container">
                <div class="card">
                    <div class="card-header">
                        <h3>🤑 Controle de Farm e Lucro</h3>
                    </div>
                    <div class="card-body">
                        <!-- Quick Add Section -->
                        <div class="add-profit-section">
                            <h4>Adicionar Profit</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Data:</label>
                                    <input type="date" id="profit-date" class="form-control" value="${this.getTodayDate()}">
                                </div>
                                <div class="form-group">
                                    <label>Profit:</label>
                                    <input type="text" id="profit-amount" class="form-control" 
                                           placeholder="Ex: 38000000 ou 38kk">
                                    <small class="text-muted" id="profit-preview"></small>
                                </div>
                                <div class="form-group">
                                    <label>Notas:</label>
                                    <input type="text" id="profit-notes" class="form-control" 
                                           placeholder="Notas (opcional)">
                                </div>
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <button id="add-profit-btn" class="btn btn-success">➕ Adicionar</button>
                                </div>
                            </div>
                        </div>

                        <!-- Profit Table -->
                        <div class="table-section">
                            <table class="table" id="profit-table">
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Profit</th>
                                        <th>Notas</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="profit-tbody">
                                    <!-- Table rows will be populated here -->
                                </tbody>
                            </table>
                        </div>

                        <!-- TC Calculator -->
                        <div class="calculator-section">
                            <h4>🧮 Calculadora de TC</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Preço do TC:</label>
                                    <input type="text" id="tc-price" class="form-control" 
                                           placeholder="Ex: 39200 ou 39,2k">
                                    <small class="text-muted" id="tc-preview"></small>
                                </div>
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <button id="calculate-tc-btn" class="btn btn-info">Calcular TC</button>
                                </div>
                                <div class="form-group">
                                    <label>Resultado:</label>
                                    <div id="tc-result" class="calculation-result"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Summary -->
                        <div class="summary-section">
                            <div class="summary-card">
                                <h4>Resumo Total</h4>
                                <div id="total-profit" class="total-amount">Total: 0</div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="action-buttons">
                            <button id="edit-profit-btn" class="btn btn-warning">✏️ Editar</button>
                            <button id="remove-profit-btn" class="btn btn-danger">🗑️ Remover</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.renderTable();
        this.updateSummary();
    }

    renderTable() {
        const tbody = document.getElementById('profit-tbody');
        tbody.innerHTML = '';

        this.entries.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.dataset.index = index;
            
            const displayDate = this.formatDisplayDate(entry.date);
            const displayProfit = this.formatHumanReadable(entry.profit_raw);
            
            row.innerHTML = `
                <td>${displayDate}</td>
                <td>${displayProfit}</td>
                <td>${entry.notes || ''}</td>
                <td>
                    <input type="checkbox" class="profit-checkbox" data-index="${index}">
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    setupEventListeners() {
        // Add profit
        document.getElementById('add-profit-btn').addEventListener('click', () => {
            this.addProfit();
        });

        // Calculate TC
        document.getElementById('calculate-tc-btn').addEventListener('click', () => {
            this.calculateTC();
        });

        // Edit profit
        document.getElementById('edit-profit-btn').addEventListener('click', () => {
            this.editSelectedProfit();
        });

        // Remove profit
        document.getElementById('remove-profit-btn').addEventListener('click', () => {
            this.removeSelectedProfit();
        });

        // Real-time previews
        document.getElementById('profit-amount').addEventListener('input', (e) => {
            this.updateProfitPreview(e.target.value);
        });

        document.getElementById('tc-price').addEventListener('input', (e) => {
            this.updateTCPreview(e.target.value);
        });

        // Double-click to edit
        document.getElementById('profit-table').addEventListener('dblclick', (e) => {
            const row = e.target.closest('tr');
            if (row && row.dataset.index) {
                this.editProfit(parseInt(row.dataset.index));
            }
        });
    }

    addProfit() {
        const dateInput = document.getElementById('profit-date');
        const amountInput = document.getElementById('profit-amount');
        const notesInput = document.getElementById('profit-notes');

        const date = dateInput.value;
        const amountText = amountInput.value.trim();
        const notes = notesInput.value.trim();

        if (!amountText) {
            alert('Digite um valor de profit válido!');
            return;
        }

        const profitRaw = this.parseHumanNumber(amountText);
        if (profitRaw <= 0) {
            alert('Digite um valor de profit válido (ex: 38000000 ou 38kk)');
            return;
        }

        const entry = {
            date: date,
            profit_raw: profitRaw,
            notes: notes
        };

        this.entries.push(entry);
        this.saveData();

        // Clear inputs
        amountInput.value = '';
        notesInput.value = '';
        document.getElementById('profit-preview').textContent = '';

        this.renderTable();
        this.updateSummary();

        console.log('✅ Nova entrada de profit adicionada:', profitRaw);
    }

    editSelectedProfit() {
        const checkedBoxes = document.querySelectorAll('.profit-checkbox:checked');
        if (checkedBoxes.length !== 1) {
            alert('Selecione exatamente um registro para editar.');
            return;
        }

        const index = parseInt(checkedBoxes[0].dataset.index);
        this.editProfit(index);
    }

    editProfit(index) {
        const entry = this.entries[index];
        
        const newDate = prompt('Data (YYYY-MM-DD):', entry.date);
        const newAmount = prompt('Profit (número):', entry.profit_raw.toString());
        const newNotes = prompt('Notas:', entry.notes || '');

        if (newDate === null || newAmount === null) return;

        const profitRaw = parseInt(newAmount);
        if (isNaN(profitRaw) || profitRaw <= 0) {
            alert('Profit inválido!');
            return;
        }

        this.entries[index] = {
            date: newDate,
            profit_raw: profitRaw,
            notes: newNotes
        };

        this.saveData();
        this.renderTable();
        this.updateSummary();

        console.log('✅ Entrada editada:', index);
    }

    removeSelectedProfit() {
        const checkedBoxes = document.querySelectorAll('.profit-checkbox:checked');
        if (checkedBoxes.length === 0) {
            alert('Selecione pelo menos um registro para remover.');
            return;
        }

        if (!confirm(`Tem certeza que deseja remover ${checkedBoxes.length} registro(s)?`)) {
            return;
        }

        // Remove in reverse order to maintain correct indices
        const indices = Array.from(checkedBoxes)
            .map(cb => parseInt(cb.dataset.index))
            .sort((a, b) => b - a);

        let removedCount = 0;
        indices.forEach(index => {
            this.entries.splice(index, 1);
            removedCount++;
        });

        this.saveData();
        this.renderTable();
        this.updateSummary();

        console.log(`✅ ${removedCount} entradas removidas`);
    }

    calculateTC() {
        const priceText = document.getElementById('tc-price').value.trim();
        if (!priceText) {
            alert('Digite o preço do Tibia Coin!');
            return;
        }

        const price = this.parseHumanNumber(priceText);
        if (price <= 0) {
            alert('Preço do TC inválido!');
            return;
        }

        const totalProfit = this.entries.reduce((sum, entry) => sum + entry.profit_raw, 0);
        if (totalProfit <= 0) {
            alert('Nenhum profit registrado!');
            return;
        }

        const tcExact = Math.floor(totalProfit / price);
        const tcRounded = Math.floor(tcExact / 25) * 25; // Round down to multiple of 25
        const remainderValue = totalProfit - (tcRounded * price);
        const remainderK = Math.floor(remainderValue / 1000);

        const resultElement = document.getElementById('tc-result');
        resultElement.innerHTML = `
            <div class="alert alert-info">
                <strong>Resultado:</strong><br>
                Você farmou <strong>${this.formatInt(tcRounded)} TC</strong><br>
                E sobrou <strong>${this.formatInt(remainderK)}k</strong>
            </div>
        `;

        console.log('✅ Cálculo TC realizado:', { tcRounded, remainderK });
    }

    updateProfitPreview(text) {
        const preview = document.getElementById('profit-preview');
        const value = this.parseHumanNumber(text);
        preview.textContent = value ? this.formatHumanReadable(value) : '';
    }

    updateTCPreview(text) {
        const preview = document.getElementById('tc-preview');
        const value = this.parseHumanNumber(text);
        preview.textContent = value ? this.formatHumanReadable(value) : '';
    }

    updateSummary() {
        const total = this.entries.reduce((sum, entry) => sum + entry.profit_raw, 0);
        const totalElement = document.getElementById('total-profit');
        totalElement.textContent = `Total: ${this.formatInt(total)} (${this.formatHumanReadable(total)})`;
    }

    // Utility Methods
    parseHumanNumber(text) {
        if (!text) return 0;
        
        text = text.toLowerCase().replace(/\s/g, '');
        
        if (text.endsWith('kk')) {
            const num = parseFloat(text.slice(0, -2)) || 0;
            return Math.floor(num * 1000000);
        } else if (text.endsWith('k')) {
            const num = parseFloat(text.slice(0, -1)) || 0;
            return Math.floor(num * 1000);
        } else if (text.endsWith('m')) {
            const num = parseFloat(text.slice(0, -1)) || 0;
            return Math.floor(num * 1000000);
        } else {
            // Remove dots and commas, then parse
            const cleanText = text.replace(/[.,]/g, '');
            return parseInt(cleanText) || 0;
        }
    }

    formatHumanReadable(n) {
        if (n >= 1000000) {
            if (n % 1000000 === 0) {
                return `${n / 1000000}kk`;
            }
            return `${(n / 1000000).toFixed(2)}kk`.replace('.', ',');
        } else if (n >= 1000) {
            if (n % 1000 === 0) {
                return `${n / 1000}k`;
            }
            return `${(n / 1000).toFixed(1)}k`.replace('.', ',');
        }
        return this.formatInt(n);
    }

    formatInt(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }

    formatDisplayDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    saveData() {
        const data = { entries: this.entries };
        this.dataManager.setProfitData(data);
    }
}
