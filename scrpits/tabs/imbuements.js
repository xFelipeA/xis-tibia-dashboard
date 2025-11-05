class ImbuementsTab {
    constructor() {
        this.imbuementsData = [];
        this.filteredData = [];
        this.init();
    }

    init() {
        this.loadImbuementsData();
        this.render();
        this.setupEventListeners();
    }

    loadImbuementsData() {
        // This would be the same data structure from your Python code
        // Simplified for example
        this.imbuementsData = [
            {
                "imbuement": "Blockade (Skill Shield)",
                "categoria": "Aumento de Skill",
                "basic": { "qty": "20", "item": "Piece of Scarab Shell" },
                "intricate": { "qty": "25", "item": "Brimstone Shell" },
                "powerful": { "qty": "25", "item": "Frazzle Skin" }
            },
            // ... more imbuements data
        ];
        this.filteredData = [...this.imbuementsData];
    }

    render() {
        const tabElement = document.getElementById('imbuements-tab');
        
        tabElement.innerHTML = `
            <div class="imbuements-container">
                <div class="search-section">
                    <h3>🔍 Buscar Imbuement</h3>
                    <input type="text" id="imbuement-search" 
                           placeholder="Digite o nome do imbuement, item ou categoria..." 
                           class="search-input">
                </div>
                
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
                        <tbody id="imbuements-tbody">
                            <!-- Table rows will be populated here -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        this.renderTable();
    }

    renderTable() {
        const tbody = document.getElementById('imbuements-tbody');
        tbody.innerHTML = '';

        this.filteredData.forEach(imb => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="imbuement-header">
                        <span class="imbuement-name">${imb.imbuement}</span>
                    </div>
                </td>
                <td class="text-center">${imb.categoria}</td>
                <td class="text-center">
                    <div class="tier-item">
                        <div class="qty">${imb.basic.qty}</div>
                        <div class="item-name">${imb.basic.item}</div>
                    </div>
                </td>
                <td class="text-center">
                    <div class="tier-item">
                        <div class="qty">${imb.intricate.qty}</div>
                        <div class="item-name">${imb.intricate.item}</div>
                    </div>
                </td>
                <td class="text-center">
                    <div class="tier-item">
                        <div class="qty">${imb.powerful.qty}</div>
                        <div class="item-name">${imb.powerful.item}</div>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    setupEventListeners() {
        const searchInput = document.getElementById('imbuement-search');
        searchInput.addEventListener('input', (e) => {
            this.filterImbuements(e.target.value);
        });
    }

    filterImbuements(searchText) {
        if (!searchText) {
            this.filteredData = [...this.imbuementsData];
        } else {
            const searchLower = searchText.toLowerCase();
            this.filteredData = this.imbuementsData.filter(imb => 
                imb.imbuement.toLowerCase().includes(searchLower) ||
                imb.categoria.toLowerCase().includes(searchLower) ||
                imb.basic.item.toLowerCase().includes(searchLower) ||
                imb.intricate.item.toLowerCase().includes(searchLower) ||
                imb.powerful.item.toLowerCase().includes(searchLower)
            );
        }
        this.renderTable();
    }
}
