class SenhasTab {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.chars = [];
        this.senhasOcultas = true;
        this.searchFilter = '';
        this.init();
    }

    async init() {
        this.chars = this.dataManager.getCharsData();
        this.render();
        this.setupEventListeners();
    }

    render() {
        const tabElement = document.getElementById('senhas-tab');
        
        tabElement.innerHTML = `
            <div class="senhas-container">
                <div class="card">
                    <div class="card-header">
                        <h3>🔑 Gerenciador de Senhas</h3>
                    </div>
                    <div class="card-body">
                        <!-- Search Bar -->
                        <div class="search-section">
                            <input type="text" id="char-search" class="form-control" 
                                   placeholder="🔍 Buscar Char...">
                        </div>

                        <!-- Add Char Form -->
                        <div class="add-char-section">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Char:</label>
                                    <input type="text" id="char-name" class="form-control" 
                                           placeholder="Nome do char">
                                </div>
                                <div class="form-group">
                                    <label>Login:</label>
                                    <input type="text" id="char-login" class="form-control" 
                                           placeholder="Número da conta">
                                </div>
                                <div class="form-group">
                                    <label>Senha:</label>
                                    <input type="password" id="char-password" class="form-control" 
                                           placeholder="Senha">
                                </div>
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <button id="add-char-btn" class="btn btn-success">
                                        💾 Adicionar Char
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Toggle Passwords Button -->
                        <div class="toggle-section">
                            <button id="toggle-senhas-btn" class="btn btn-secondary">
                                ${this.senhasOcultas ? '👁️ Mostrar Senhas' : '👁️ Ocultar Senhas'}
                            </button>
                        </div>

                        <!-- Chars List -->
                        <div class="chars-list" id="chars-list">
                            <!-- Chars will be populated here -->
                        </div>
                    </div>
                </div>

                <!-- Edit Char Modal -->
                <div id="edit-char-modal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <div id="edit-char-content">
                            <!-- Edit content will be populated dynamically -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.renderCharsList();
    }

    renderCharsList() {
        const charsList = document.getElementById('chars-list');
        
        if (this.chars.length === 0) {
            charsList.innerHTML = `
                <div class="empty-state">
                    <p>Nenhum char cadastrado ainda.</p>
                    <p>Adicione seu primeiro char usando o formulário acima.</p>
                </div>
            `;
            return;
        }

        const filteredChars = this.searchFilter ? 
            this.chars.filter(char => 
                char.char.toLowerCase().includes(this.searchFilter.toLowerCase())
            ) : this.chars;

        if (filteredChars.length === 0) {
            charsList.innerHTML = `
                <div class="empty-state">
                    <p>Nenhum char encontrado para "${this.searchFilter}".</p>
                </div>
            `;
            return;
        }

        charsList.innerHTML = filteredChars.map((char, index) => `
            <div class="char-item ${index % 2 === 0 ? 'even' : 'odd'}">
                <div class="char-header">
                    <span class="char-name">🧙 ${char.char}</span>
                </div>
                
                <div class="char-details">
                    <div class="detail-row">
                        <span class="detail-label">👤 Login:</span>
                        <span class="detail-value">${this.senhasOcultas ? '*'.repeat(char.login.length) : char.login}</span>
                        <button class="btn-copy" data-text="${char.login}" data-type="login">
                            📋 Copiar
                        </button>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">🔒 Senha:</span>
                        <span class="detail-value ${this.senhasOcultas ? '' : 'password-visible'}">
                            ${this.senhasOcultas ? '*'.repeat(char.senha.length) : char.senha}
                        </span>
                        <button class="btn-copy" data-text="${char.senha}" data-type="password">
                            📋 Copiar
                        </button>
                    </div>
                </div>

                <div class="char-actions">
                    <button class="btn-edit" data-index="${this.chars.indexOf(char)}">
                        ✏️ Editar
                    </button>
                    <button class="btn-remove" data-char="${char.char}">
                        🗑️ Remover
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Search
        document.getElementById('char-search').addEventListener('input', (e) => {
            this.searchFilter = e.target.value;
            this.renderCharsList();
        });

        // Add char
        document.getElementById('add-char-btn').addEventListener('click', () => {
            this.addChar();
        });

        // Toggle passwords
        document.getElementById('toggle-senhas-btn').addEventListener('click', () => {
            this.toggleSenhas();
        });

        // Copy buttons
        document.getElementById('chars-list').addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-copy')) {
                this.copyToClipboard(e.target.dataset.text, e.target);
            }
        });

        // Edit buttons
        document.getElementById('chars-list').addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-edit')) {
                const index = parseInt(e.target.dataset.index);
                this.editChar(index);
            }
        });

        // Remove buttons
        document.getElementById('chars-list').addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const charName = e.target.dataset.char;
                this.removeChar(charName);
            }
        });

        // Modal close
        document.querySelector('#edit-char-modal .close').addEventListener('click', () => {
            this.closeEditModal();
        });

        window.addEventListener('click', (e) => {
            const modal = document.getElementById('edit-char-modal');
            if (e.target === modal) {
                this.closeEditModal();
            }
        });

        // Enter key to add char
        document.getElementById('char-password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addChar();
            }
        });
    }

    addChar() {
        const nameInput = document.getElementById('char-name');
        const loginInput = document.getElementById('char-login');
        const passwordInput = document.getElementById('char-password');

        const charName = nameInput.value.trim();
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();

        if (!charName || !login || !password) {
            alert('Preencha todos os campos!');
            return;
        }

        // Check if char already exists
        if (this.chars.some(char => char.char.toLowerCase() === charName.toLowerCase())) {
            alert(`O char "${charName}" já existe na lista!`);
            return;
        }

        const newChar = {
            char: charName,
            login: login,
            senha: password
        };

        this.chars.push(newChar);
        this.saveData();

        // Clear inputs
        nameInput.value = '';
        loginInput.value = '';
        passwordInput.value = '';

        this.renderCharsList();

        console.log('✅ Char adicionado:', charName);
    }

    editChar(index) {
        const char = this.chars[index];
        const modal = document.getElementById('edit-char-modal');
        const modalContent = document.getElementById('edit-char-content');

        modalContent.innerHTML = `
            <h2>Editar Char: ${char.char}</h2>
            <form id="edit-char-form" class="edit-char-form">
                <div class="form-group">
                    <label>Char:</label>
                    <input type="text" id="edit-char-name" class="form-control" 
                           value="${char.char}" readonly>
                    <small class="text-muted">(Nome do char não pode ser alterado)</small>
                </div>

                <div class="form-group">
                    <label>Login:</label>
                    <input type="text" id="edit-char-login" class="form-control" 
                           value="${char.login}" required>
                </div>

                <div class="form-group">
                    <label>Senha:</label>
                    <input type="text" id="edit-char-password" class="form-control" 
                           value="${char.senha}" required>
                </div>

                <div class="form-buttons">
                    <button type="submit" class="btn btn-success">Salvar</button>
                    <button type="button" class="btn btn-secondary" onclick="app.tabComponents.senhas.closeEditModal()">
                        Cancelar
                    </button>
                </div>
            </form>
        `;

        document.getElementById('edit-char-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEditedChar(index);
        });

        modal.style.display = 'block';
    }

    saveEditedChar(index) {
        const loginInput = document.getElementById('edit-char-login');
        const passwordInput = document.getElementById('edit-char-password');

        const newLogin = loginInput.value.trim();
        const newPassword = passwordInput.value.trim();

        if (!newLogin || !newPassword) {
            alert('Login e senha não podem estar vazios!');
            return;
        }

        this.chars[index].login = newLogin;
        this.chars[index].senha = newPassword;
        this.saveData();

        this.renderCharsList();
        this.closeEditModal();

        console.log('✅ Char editado:', this.chars[index].char);
    }

    removeChar(charName) {
        if (!confirm(`Tem certeza que deseja remover o char "${charName}"?`)) {
            return;
        }

        this.chars = this.chars.filter(char => char.char !== charName);
        this.saveData();
        this.renderCharsList();

        console.log('✅ Char removido:', charName);
    }

    toggleSenhas() {
        this.senhasOcultas = !this.senhasOcultas;
        
        const toggleBtn = document.getElementById('toggle-senhas-btn');
        toggleBtn.textContent = this.senhasOcultas ? '👁️ Mostrar Senhas' : '👁️ Ocultar Senhas';
        
        this.renderCharsList();
    }

    copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            this.animateCopyButton(button);
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.animateCopyButton(button);
        });
    }

    animateCopyButton(button) {
        const originalText = button.textContent;
        const originalBackground = button.style.backgroundColor;

        button.textContent = '✅ Copiado!';
        button.style.backgroundColor = '#4CAF50';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = originalBackground;
            button.disabled = false;
        }, 1500);
    }

    closeEditModal() {
        document.getElementById('edit-char-modal').style.display = 'none';
    }

    saveData() {
        this.dataManager.setCharsData(this.chars);
    }
}
