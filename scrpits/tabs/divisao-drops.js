class DivisaoDropsTab {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.drops = [];
        this.filteredDrops = [];
        this.parcelasData = {};
        this.currentFilters = {
            item: '',
            player: '',
            status: 'Todos'
        };
        this.init();
    }

    async init() {
        this.drops = this.dataManager.getDropsData();
        this.parcelasData = this.dataManager.getParcelasData();
        this.filteredDrops = [...this.drops];
        this.render();
        this.setupEventListeners();
    }

    render() {
        const tabElement = document.getElementById('divisao-drops-tab');
        
        tabElement.innerHTML = `
            <div class="drops-container">
                <div class="card">
                    <div class="card-header">
                        <h3>⚖️ Divisão de Drops</h3>
                    </div>
                    <div class="card-body">
                        <!-- Filters -->
                        <div class="filters-section">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Filtrar por item:</label>
                                    <input type="text" id="filter-item" class="form-control" 
                                           placeholder="Filtrar por item...">
                                </div>
                                <div class="form-group">
                                    <label>Filtrar por player:</label>
                                    <input type="text" id="filter-player" class="form-control" 
                                           placeholder="Filtrar por player...">
                                </div>
                                <div class="form-group">
                                    <label>Filtrar por status:</label>
                                    <select id="filter-status" class="form-control">
                                        <option value="Todos">Todos</option>
                                        <option value="Falta Vender">Falta Vender</option>
                                        <option value="Vendido">Vendido</option>
                                        <option value="Parcelado">Parcelado</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <button id="clear-filters-btn" class="btn btn-secondary">
                                        Limpar Filtros
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Drops Table -->
                        <div class="table-section">
                            <table class="table" id="drops-table">
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Item</th>
                                        <th>Players</th>
                                        <th>Valor de Venda</th>
                                        <th>Valor Para Cada</th>
                                        <th>Quem Dropou</th>
                                        <th>Com quem está o item</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="drops-tbody">
                                    <!-- Table rows will be populated here -->
                                </tbody>
                            </table>
                        </div>

                        <!-- Action Buttons -->
                        <div class="action-buttons">
                            <button id="add-drop-btn" class="btn btn-success">Adicionar Drop</button>
                            <button id="edit-drop-btn" class="btn btn-warning">Editar Drop</button>
                            <button id="delete-drop-btn" class="btn btn-danger">Excluir Drop</button>
                            <button id="manage-parcelas-btn" class="btn btn-info">Gerenciar Parcelas</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Add/Edit Drop Modal -->
            <div id="drop-modal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div id="drop-modal-content">
                        <!-- Modal content will be populated dynamically -->
                    </div>
                </div>
            </div>
        `;

        this.renderTable();
    }

    renderTable() {
        const tbody = document.getElementById('drops-tbody');
        tbody.innerHTML = '';

        this.filteredDrops.forEach((drop, index) => {
            const row = document.createElement('tr');
            row.dataset.index = index;
            
            const statusColor = this.getStatusColor(drop.Status);
            const statusText = this.getStatusText(drop.Status);
            const dropId = this.getDropId(drop);
            const parcelasInfo = this.parcelasData[dropId];
            
            let acoesText = ' - ';
            if (drop.Status === 'Parcelado' && parcelasInfo) {
                if (parcelasInfo.finalizado) {
                    acoesText = '✓ Finalizado';
                } else {
                    const parcelasPagas = parcelasInfo.parcelas_pagas || 0;
                    const totalParcelas = parcelasInfo.total_parcelas || 0;
                    acoesText = `🔄 ${parcelasPagas}/${totalParcelas}`;
                }
            }

            row.innerHTML = `
                <td style="background-color: ${statusColor}; color: ${drop.Status === 'Falta Vender' ? 'white' : 'black'}">
                    ${drop.Data}
                </td>
                <td style="background-color: ${statusColor}; color: ${drop.Status === 'Falta Vender' ? 'white' : 'black'}">
                    ${drop.Item.replace(/_/g, ' ')}
                </td>
                <td style="background-color: ${statusColor}; color: ${drop.Status === 'Falta Vender' ? 'white' : 'black'}">
                    ${drop.Players}
                </td>
                <td style="background-color: ${statusColor}; color: ${drop.Status === 'Falta Vender' ? 'white' : 'black'}">
                    ${drop['Valor de Venda']}
                </td>
                <td style="background-color: ${statusColor}; color: ${drop.Status === 'Falta Vender' ? 'white' : 'black'}">
                    ${drop['Valor Para Cada']}
                </td>
                <td style="background-color: ${statusColor}; color: ${drop.Status === 'Falta Vender' ? 'white' : 'black'}">
                    ${drop['Quem Dropou']}
                </td>
                <td style="background-color: ${statusColor}; color: ${drop.Status === 'Falta Vender' ? 'white' : 'black'}">
                    ${drop['Com quem está o item']}
                </td>
                <td style="background-color: ${statusColor}; color: ${drop.Status === 'Falta Vender' ? 'white' : 'black'}">
                    ${statusText}
                </td>
                <td style="background-color: ${statusColor}; color: ${drop.Status === 'Falta Vender' ? 'white' : 'black'}">
                    ${acoesText}
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    setupEventListeners() {
        // Filters
        document.getElementById('filter-item').addEventListener('input', (e) => {
            this.currentFilters.item = e.target.value;
            this.applyFilters();
        });

        document.getElementById('filter-player').addEventListener('input', (e) => {
            this.currentFilters.player = e.target.value;
            this.applyFilters();
        });

        document.getElementById('filter-status').addEventListener('change', (e) => {
            this.currentFilters.status = e.target.value;
            this.applyFilters();
        });

        document.getElementById('clear-filters-btn').addEventListener('click', () => {
            this.clearFilters();
        });

        // Action buttons
        document.getElementById('add-drop-btn').addEventListener('click', () => {
            this.showAddDropModal();
        });

        document.getElementById('edit-drop-btn').addEventListener('click', () => {
            this.editSelectedDrop();
        });

        document.getElementById('delete-drop-btn').addEventListener('click', () => {
            this.deleteSelectedDrop();
        });

        document.getElementById('manage-parcelas-btn').addEventListener('click', () => {
            this.manageParcelas();
        });

        // Table double-click to edit
        document.getElementById('drops-table').addEventListener('dblclick', (e) => {
            const row = e.target.closest('tr');
            if (row && row.dataset.index !== undefined) {
                this.editDrop(parseInt(row.dataset.index));
            }
        });

        // Modal close
        document.querySelector('#drop-modal .close').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('drop-modal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    applyFilters() {
        const { item, player, status } = this.currentFilters;
        
        this.filteredDrops = this.drops.filter(drop => {
            const matchesItem = item ? drop.Item.toLowerCase().includes(item.toLowerCase()) : true;
            const matchesPlayer = player ? drop.Players.toLowerCase().includes(player.toLowerCase()) : true;
            const matchesStatus = status === 'Todos' ? true : drop.Status === status;
            
            return matchesItem && matchesPlayer && matchesStatus;
        });
        
        this.renderTable();
    }

    clearFilters() {
        document.getElementById('filter-item').value = '';
        document.getElementById('filter-player').value = '';
        document.getElementById('filter-status').value = 'Todos';
        
        this.currentFilters = { item: '', player: '', status: 'Todos' };
        this.filteredDrops = [...this.drops];
        this.renderTable();
    }

    showAddDropModal(dropData = null) {
        const modal = document.getElementById('drop-modal');
        const modalContent = document.getElementById('drop-modal-content');
        
        const isEdit = !!dropData;
        const title = isEdit ? 'Editar Drop' : 'Adicionar Drop';
        
        modalContent.innerHTML = `
            <h2>${title}</h2>
            <form id="drop-form" class="drop-form">
                <div class="form-group">
                    <label>Data:</label>
                    <input type="text" id="drop-date" class="form-control" 
                           value="${isEdit ? dropData.Data : this.getTodayDate()}">
                </div>
                
                <div class="form-group">
                    <label>Item Selecionado:</label>
                    <div id="selected-item" class="selected-item">
                        ${isEdit ? dropData.Item.replace(/_/g, ' ') : 'Nenhum item selecionado'}
                    </div>
                    <button type="button" id="show-items-btn" class="btn btn-secondary">
                        Selecionar Item
                    </button>
                </div>

                <div class="form-group">
                    <label>Players (separados por |):</label>
                    <input type="text" id="drop-players" class="form-control" 
                           value="${isEdit ? dropData.Players : ''}"
                           placeholder="Ex: Player1 | Player2 | Player3">
                </div>

                <div class="form-group">
                    <label>Valor de Venda:</label>
                    <input type="text" id="drop-valor" class="form-control" 
                           value="${isEdit ? dropData['Valor de Venda'] : ''}"
                           placeholder="Ex: 25kk (25.000.000)">
                </div>

                <div class="form-group">
                    <label>Quem Dropou:</label>
                    <input type="text" id="drop-dropper" class="form-control" 
                           value="${isEdit ? dropData['Quem Dropou'] : ''}">
                </div>

                <div class="form-group">
                    <label>Com quem está o item:</label>
                    <input type="text" id="drop-holder" class="form-control" 
                           value="${isEdit ? dropData['Com quem está o item'] : ''}">
                </div>

                <div class="form-group">
                    <label>Status:</label>
                    <select id="drop-status" class="form-control">
                        <option value="Falta Vender" ${isEdit && dropData.Status === 'Falta Vender' ? 'selected' : ''}>
                            Falta Vender
                        </option>
                        <option value="Vendido" ${isEdit && dropData.Status === 'Vendido' ? 'selected' : ''}>
                            Vendido
                        </option>
                        <option value="Parcelado" ${isEdit && dropData.Status === 'Parcelado' ? 'selected' : ''}>
                            Parcelado
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Valor Para Cada:</label>
                    <div id="valor-cada" class="valor-cada">
                        ${isEdit ? dropData['Valor Para Cada'] : '0'}
                    </div>
                </div>

                <div class="form-buttons">
                    <button type="submit" class="btn btn-success">Salvar</button>
                    <button type="button" class="btn btn-secondary" onclick="app.tabComponents.divisaoDrops.closeModal()">
                        Cancelar
                    </button>
                </div>
            </form>

            <!-- Items Selection Modal (would be implemented separately) -->
            <div id="items-modal" class="modal" style="display: none;">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h3>Selecionar Item</h3>
                    <div id="items-grid">
                        <!-- Items would be populated here from available images -->
                    </div>
                </div>
            </div>
        `;

        // Setup form submission
        document.getElementById('drop-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveDrop(dropData);
        });

        // Setup real-time calculation
        document.getElementById('drop-valor').addEventListener('input', () => {
            this.calculateValorCada();
        });

        document.getElementById('drop-players').addEventListener('input', () => {
            this.calculateValorCada();
        });

        modal.style.display = 'block';
    }

    calculateValorCada() {
        const valorText = document.getElementById('drop-valor').value.trim();
        const playersText = document.getElementById('drop-players').value.trim();
        const valorCadaElement = document.getElementById('valor-cada');

        if (!valorText || !playersText) {
            valorCadaElement.textContent = '0';
            return;
        }

        const valorTotal = this.convertValue(valorText);
        const players = playersText.split('|').map(p => p.trim()).filter(p => p);
        
        if (players.length > 0 && valorTotal > 0) {
            const valorPorPlayer = valorTotal / players.length;
            valorCadaElement.textContent = this.formatValue(valorPorPlayer);
        } else {
            valorCadaElement.textContent = '0';
        }
    }

    saveDrop(originalData) {
        const formData = {
            Data: document.getElementById('drop-date').value.trim(),
            Item: document.getElementById('selected-item').textContent,
            Players: document.getElementById('drop-players').value.trim(),
            'Valor de Venda': document.getElementById('drop-valor').value.trim(),
            'Quem Dropou': document.getElementById('drop-dropper').value.trim(),
            'Com quem está o item': document.getElementById('drop-holder').value.trim(),
            Status: document.getElementById('drop-status').value,
            'Valor Para Cada': document.getElementById('valor-cada').textContent
        };

        // Validation
        if (!formData.Item || formData.Item === 'Nenhum item selecionado') {
            alert('Selecione um item!');
            return;
        }

        if (!formData.Players) {
            alert('O campo Players é obrigatório!');
            return;
        }

        if (['Vendido', 'Parcelado'].includes(formData.Status) && !formData['Valor de Venda']) {
            alert('O campo Valor de Venda é obrigatório para status Vendido ou Parcelado!');
            return;
        }

        if (originalData) {
            // Editing existing drop
            const index = this.drops.findIndex(drop => 
                drop.Data === originalData.Data && 
                drop.Item === originalData.Item && 
                drop.Players === originalData.Players
            );
            
            if (index !== -1) {
                this.drops[index] = formData;
            }
        } else {
            // Adding new drop
            this.drops.push(formData);
        }

        this.saveData();
        this.renderTable();
        this.closeModal();

        console.log('✅ Drop salvo com sucesso:', formData);
    }

    editSelectedDrop() {
        const selectedRow = this.getSelectedRow();
        if (!selectedRow) {
            alert('Selecione um drop para editar.');
            return;
        }

        const index = parseInt(selectedRow.dataset.index);
        this.editDrop(index);
    }

    editDrop(index) {
        const drop = this.filteredDrops[index];
        this.showAddDropModal(drop);
    }

    deleteSelectedDrop() {
        const selectedRow = this.getSelectedRow();
        if (!selectedRow) {
            alert('Selecione um drop para excluir.');
            return;
        }

        if (!confirm('Tem certeza que deseja excluir este drop?')) {
            return;
        }

        const index = parseInt(selectedRow.dataset.index);
        const drop = this.filteredDrops[index];
        const dropId = this.getDropId(drop);

        // Remove from main array
        const mainIndex = this.drops.findIndex(d => this.getDropId(d) === dropId);
        if (mainIndex !== -1) {
            this.drops.splice(mainIndex, 1);
        }

        // Remove parcelas data if exists
        if (this.parcelasData[dropId]) {
            delete this.parcelasData[dropId];
        }

        this.saveData();
        this.renderTable();

        console.log('✅ Drop excluído:', drop);
    }

    manageParcelas() {
        const selectedRow = this.getSelectedRow();
        if (!selectedRow) {
            alert('Selecione um drop parcelado para gerenciar.');
            return;
        }

        const index = parseInt(selectedRow.dataset.index);
        const drop = this.filteredDrops[index];

        if (drop.Status !== 'Parcelado') {
            alert('Esta função só está disponível para drops com status Parcelado.');
            return;
        }

        // Implementation for parcelas management would go here
        alert('Gerenciamento de parcelas será implementado aqui');
    }

    getSelectedRow() {
        // This would need a selection mechanism - for now using first row
        return document.querySelector('#drops-tbody tr');
    }

    getDropId(drop) {
        return `${drop.Data}_${drop.Item}_${drop.Players}`;
    }

    getStatusColor(status) {
        const colors = {
            'Vendido': '#43b581',
            'Parcelado': '#ffa500',
            'Falta Vender': '#23272a'
        };
        return colors[status] || '#23272a';
    }

    getStatusText(status) {
        const texts = {
            'Vendido': '✅ Pago',
            'Parcelado': '🟡 Parcial',
            'Falta Vender': '❌ Pendente'
        };
        return texts[status] || '❌ Pendente';
    }

    getTodayDate() {
        return new Date().toLocaleDateString('pt-BR');
    }

    convertValue(text) {
        // Convert values like "25kk" to 25000000
        text = text.toLowerCase().replace(/\s/g, '');
        
        if (text.endsWith('kk')) {
            const num = parseFloat(text.slice(0, -2)) || 0;
            return Math.floor(num * 1000000);
        } else if (text.endsWith('k')) {
            const num = parseFloat(text.slice(0, -1)) || 0;
            return Math.floor(num * 1000);
        } else {
            const cleanText = text.replace(/[.,]/g, '');
            return parseInt(cleanText) || 0;
        }
    }

    formatValue(value) {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(2)}kk`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}k`;
        } else {
            return value.toString();
        }
    }

    closeModal() {
        document.getElementById('drop-modal').style.display = 'none';
    }

    saveData() {
        this.dataManager.setDropsData(this.drops);
        this.dataManager.setParcelasData(this.parcelasData);
    }
}
