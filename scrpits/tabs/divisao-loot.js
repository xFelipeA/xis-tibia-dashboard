class LootTab {
    constructor() {
        this.partyData = null;
        this.playerCheckboxes = [];
        this.excludedPlayers = [];
        this.currentResultText = '';
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const tabElement = document.getElementById('divisao-loot-tab');
        
        tabElement.innerHTML = `
            <div class="loot-container">
                <div class="loot-layout">
                    <!-- Left Column - Analyzer Input -->
                    <div class="analyzer-column">
                        <div class="card">
                            <div class="card-header">
                                <h3>Analyzer da Party</h3>
                            </div>
                            <div class="card-body">
                                <textarea id="analyzer-input" class="analyzer-textarea" 
                                          placeholder="Cole aqui o Analyzer da party..."></textarea>
                                <div class="analyzer-buttons">
                                    <button id="process-loot-btn" class="btn btn-success">
                                        Processar Divisão de Loot
                                    </button>
                                    <button id="reset-loot-btn" class="btn btn-secondary">
                                        Resetar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Middle Column - Player Selection -->
                    <div class="players-column">
                        <div class="card" id="players-card" style="display: none;">
                            <div class="card-header">
                                <h3>Remover Jogadores</h3>
                            </div>
                            <div class="card-body">
                                <div id="players-checkboxes">
                                    <!-- Player checkboxes will be populated here -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column - Results -->
                    <div class="results-column">
                        <div class="card">
                            <div class="card-header">
                                <h3>Resultado</h3>
                            </div>
                            <div class="card-body">
                                <div id="results-content" class="results-content">
                                    <p class="text-muted">Processe o analyzer para ver os resultados...</p>
                                </div>
                                <button id="copy-all-btn" class="btn btn-info" style="display: none;">
                                    Copiar Tudo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        document.getElementById('process-loot-btn').addEventListener('click', () => {
            this.processLoot();
        });

        document.getElementById('reset-loot-btn').addEventListener('click', () => {
            this.resetAll();
        });

        document.getElementById('copy-all-btn').addEventListener('click', () => {
            this.copyAllToClipboard();
        });
    }

    processLoot() {
        const analyzerText = document.getElementById('analyzer-input').value;
        const partyData = this.parseAnalyzer(analyzerText);
        
        if (!partyData) {
            this.showResultText('Erro ao processar dados. Verifique o formato do Analyzer.');
            return;
        }

        this.partyData = partyData;
        this.setupPlayerSelection(partyData.players);
        this.calculateLootSplit(partyData, []);
    }

    parseAnalyzer(text) {
        try {
            // Extract general session data
            const lootMatch = text.match(/Loot:\s*([\d,]+)/);
            const suppliesMatch = text.match(/Supplies:\s*([\d,]+)/);
            const balanceMatch = text.match(/Balance:\s*([\d,-]+)/);
            const sessionMatch = text.match(/Session:\s*([\d:]+)h/);

            const players = [];
            let currentPlayer = null;

            const lines = text.split('\n');
            
            for (const line of lines) {
                const trimmedLine = line.trim();
                
                // Check if it's a player line (doesn't start with data keywords)
                if (trimmedLine && 
                    !trimmedLine.startsWith("Session") && 
                    !trimmedLine.startsWith("Loot:") && 
                    !trimmedLine.startsWith("Supplies:") && 
                    !trimmedLine.startsWith("Balance:") && 
                    !trimmedLine.startsWith("Loot Type:") &&
                    !trimmedLine.startsWith("Damage:") &&
                    !trimmedLine.startsWith("Healing:") &&
                    !trimmedLine.startsWith("Session data:")) {
                    
                    // If we have a current player, add to list
                    if (currentPlayer) {
                        players.push(currentPlayer);
                    }
                    
                    // New player
                    currentPlayer = {
                        name: trimmedLine.replace(" (Leader)", "").trim(),
                        loot: 0,
                        supplies: 0,
                        balance: 0,
                        damage: 0,
                        healing: 0,
                        leader: trimmedLine.includes("(Leader)")
                    };
                } else if (currentPlayer) {
                    // Extract player data
                    if (trimmedLine.includes("Loot:")) {
                        const match = trimmedLine.match(/Loot:\s*([\d,-]+)/);
                        if (match) {
                            currentPlayer.loot = parseInt(match[1].replace(/,/g, '').replace(/-/g, '')) || 0;
                        }
                    } else if (trimmedLine.includes("Supplies:")) {
                        const match = trimmedLine.match(/Supplies:\s*([\d,-]+)/);
                        if (match) {
                            currentPlayer.supplies = parseInt(match[1].replace(/,/g, '').replace(/-/g, '')) || 0;
                        }
                    } else if (trimmedLine.includes("Balance:")) {
                        const match = trimmedLine.match(/Balance:\s*([\d,-]+)/);
                        if (match) {
                            const balanceStr = match[1].replace(/,/g, '');
                            currentPlayer.balance = balanceStr.startsWith('-') ? 
                                -parseInt(balanceStr.slice(1)) : parseInt(balanceStr);
                        }
                    } else if (trimmedLine.includes("Damage:")) {
                        const match = trimmedLine.match(/Damage:\s*([\d,-]+)/);
                        if (match) {
                            currentPlayer.damage = parseInt(match[1].replace(/,/g, '')) || 0;
                        }
                    } else if (trimmedLine.includes("Healing:")) {
                        const match = trimmedLine.match(/Healing:\s*([\d,-]+)/);
                        if (match) {
                            currentPlayer.healing = parseInt(match[1].replace(/,/g, '')) || 0;
                        }
                    }
                }
            }

            // Add the last player
            if (currentPlayer) {
                players.push(currentPlayer);
            }

            if (!lootMatch || players.length === 0) {
                return null;
            }

            return {
                total_loot: parseInt(lootMatch[1].replace(/,/g, '')),
                total_supplies: suppliesMatch ? parseInt(suppliesMatch[1].replace(/,/g, '')) : 0,
                total_balance: balanceMatch ? parseInt(balanceMatch[1].replace(/,/g, '')) : 0,
                session: sessionMatch ? sessionMatch[1] : "00:00",
                players: players
            };
        } catch (error) {
            console.error('Erro no parse do analyzer:', error);
            return null;
        }
    }

    setupPlayerSelection(players) {
        const playersContainer = document.getElementById('players-checkboxes');
        const playersCard = document.getElementById('players-card');
        
        playersContainer.innerHTML = '';
        this.playerCheckboxes = [];

        players.forEach(player => {
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'player-checkbox';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `player-${player.name}`;
            checkbox.value = player.name;
            
            const label = document.createElement('label');
            label.htmlFor = `player-${player.name}`;
            label.textContent = player.name;

            checkboxDiv.appendChild(checkbox);
            checkboxDiv.appendChild(label);
            playersContainer.appendChild(checkboxDiv);

            checkbox.addEventListener('change', () => {
                this.updateCalculation();
            });

            this.playerCheckboxes.push(checkbox);
        });

        playersCard.style.display = 'block';
    }

    updateCalculation() {
        if (!this.partyData) return;

        const excludedPlayers = this.playerCheckboxes
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        this.calculateLootSplit(this.partyData, excludedPlayers);
    }

    calculateLootSplit(data, excludedPlayers) {
        try {
            const activePlayers = data.players.filter(p => !excludedPlayers.includes(p.name));
            
            if (activePlayers.length < 1) {
                this.showResultText('É necessário pelo menos 1 jogador para fazer a divisão.');
                return;
            }

            // Calculate individual profit (loot - supplies)
            activePlayers.forEach(player => {
                player.profit = player.loot - player.supplies;
            });

            // Calculate total real profit
            const totalProfit = activePlayers.reduce((sum, player) => sum + player.profit, 0);
            
            // Calculate quota per player
            const profitPerPlayer = totalProfit / activePlayers.length;
            
            // Calculate differences
            const payers = [];    // Players who must pay (profit > quota)
            const receivers = []; // Players who must receive (profit < quota)

            activePlayers.forEach(player => {
                const difference = player.profit - profitPerPlayer;
                if (difference > 0) {
                    payers.push({
                        name: player.name,
                        amount: difference,
                        original_profit: player.profit
                    });
                } else if (difference < 0) {
                    receivers.push({
                        name: player.name,
                        amount: -difference,  // Positive amount needed
                        original_profit: player.profit
                    });
                }
            });

            // Sort by amount (highest first)
            payers.sort((a, b) => b.amount - a.amount);
            receivers.sort((a, b) => b.amount - a.amount);

            // Process transactions
            const payments = [];

            receivers.forEach(receiver => {
                let amountNeeded = receiver.amount;
                
                payers.forEach(payer => {
                    if (payer.amount <= 0) return;

                    const transferAmount = Math.min(amountNeeded, payer.amount);
                    
                    if (transferAmount > 0) {
                        const transferText = `transfer ${this.formatValue(transferAmount)} to ${receiver.name}`;
                        payments.push({
                            display_text: `${payer.name} to pay ${this.formatValue(transferAmount)} to ${receiver.name}`,
                            transfer_text: transferText,
                            copiable_text: `${payer.name} to pay ${this.formatValue(transferAmount)} to ${receiver.name} (Bank: ${transferText})`
                        });

                        amountNeeded -= transferAmount;
                        payer.amount -= transferAmount;
                    }

                    if (amountNeeded <= 0) return;
                });
            });

            // Calculate statistics
            const sessionParts = data.session.split(':');
            const sessionMinutes = parseInt(sessionParts[0]) * 60 + parseInt(sessionParts[1]);
            const profitPerHour = sessionMinutes > 0 ? 
                Math.floor(profitPerPlayer * 60 / sessionMinutes) : 0;

            // Damage split - ordered descending
            const totalDamage = activePlayers.reduce((sum, p) => sum + p.damage, 0);
            const damageSplit = activePlayers
                .map(p => ({
                    name: p.name,
                    percent: totalDamage > 0 ? (p.damage / totalDamage * 100) : 0
                }))
                .sort((a, b) => b.percent - a.percent)
                .map(item => `${item.name} - ${item.percent.toFixed(1)}%`);

            // Find top damage and top healing
            const topDamage = activePlayers.reduce((max, p) => p.damage > max.damage ? p : max, activePlayers[0]);
            const topHealing = activePlayers.reduce((max, p) => p.healing > max.healing ? p : max, activePlayers[0]);

            // Build result for copying
            const resultLines = [
                `Total Loot: ${this.formatValue(activePlayers.reduce((sum, p) => sum + p.loot, 0))}`,
                `Total Supplies: ${this.formatValue(activePlayers.reduce((sum, p) => sum + p.supplies, 0))}`,
                `Total Profit: ${this.formatValue(totalProfit)}`,
                `Players: ${activePlayers.length}`,
                '',
                ...(payments.length > 0 ? [
                    '=== TRANSACTIONS ===',
                    ...payments.map(p => p.copiable_text),
                    ''
                ] : []),
                `Total profit: ${this.formatValue(totalProfit)} which is: ${this.formatValue(profitPerPlayer)} for each player.`,
                ...(sessionMinutes > 0 ? [
                    `Session duration: ${data.session}h, which is: ${this.formatValue(profitPerHour)} for each player per hour.`
                ] : []),
                '',
                `Top Damage: ${topDamage.name} - ${this.formatValue(topDamage.damage)}`,
                `Top Healing: ${topHealing.name} - ${this.formatValue(topHealing.healing)}`,
                '',
                `Damage Split: ${damageSplit.join(', ')}.`,
                ...(excludedPlayers.length > 0 ? [
                    `Players excluded: ${excludedPlayers.join(', ')}`
                ] : [])
            ];

            this.currentResultText = resultLines.join('\n');
            this.renderResults({
                activePlayers,
                totalProfit,
                profitPerPlayer,
                profitPerHour,
                session: data.session,
                payments,
                damageSplit,
                topDamage,
                topHealing,
                excludedPlayers
            });

        } catch (error) {
            this.showResultText(`Erro no cálculo: ${error.message}`);
        }
    }

    renderResults(data) {
        const resultsContent = document.getElementById('results-content');
        const copyAllBtn = document.getElementById('copy-all-btn');

        resultsContent.innerHTML = `
            <div class="results-section">
                <h4 class="neon-text">=== BASIC INFO ===</h4>
                <div class="result-item">
                    <strong>Total Loot:</strong> ${this.formatValue(data.activePlayers.reduce((sum, p) => sum + p.loot, 0))}
                </div>
                <div class="result-item">
                    <strong>Total Supplies:</strong> ${this.formatValue(data.activePlayers.reduce((sum, p) => sum + p.supplies, 0))}
                </div>
                <div class="result-item">
                    <strong>Total Profit:</strong> ${this.formatValue(data.totalProfit)}
                </div>
                <div class="result-item">
                    <strong>Players:</strong> ${data.activePlayers.length}
                </div>
            </div>

            ${data.payments.length > 0 ? `
                <div class="results-section">
                    <h4 class="neon-text">=== TRANSACTIONS ===</h4>
                    ${data.payments.map(payment => `
                        <div class="payment-item">
                            <span>${payment.display_text}</span>
                            <button class="btn btn-sm btn-secondary copy-payment-btn" 
                                    data-text="${payment.transfer_text}">
                                Copiar
                            </button>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            <div class="results-section">
                <div class="result-item">
                    <strong>Total profit:</strong> ${this.formatValue(data.totalProfit)} which is: ${this.formatValue(data.profitPerPlayer)} for each player.
                </div>
                ${data.session !== "00:00" ? `
                    <div class="result-item">
                        <strong>Session duration:</strong> ${data.session}h, which is: ${this.formatValue(data.profitPerHour)} for each player per hour.
                    </div>
                ` : ''}
            </div>

            <div class="results-section">
                <div class="result-item">
                    <strong>Top Damage:</strong> ${data.topDamage.name} - ${this.formatValue(data.topDamage.damage)}
                </div>
                <div class="result-item">
                    <strong>Top Healing:</strong> ${data.topHealing.name} - ${this.formatValue(data.topHealing.healing)}
                </div>
            </div>

            <div class="results-section">
                <div class="result-item">
                    <strong>Damage Split:</strong> ${data.damageSplit.join(', ')}.
                </div>
            </div>

            ${data.excludedPlayers.length > 0 ? `
                <div class="results-section">
                    <div class="result-item">
                        <strong>Players excluded:</strong> ${data.excludedPlayers.join(', ')}
                    </div>
                </div>
            ` : ''}
        `;

        // Add event listeners to copy buttons
        resultsContent.querySelectorAll('.copy-payment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const text = e.target.dataset.text;
                this.copyToClipboard(text);
                this.animateCopyButton(e.target);
            });
        });

        copyAllBtn.style.display = 'block';
    }

    showResultText(text) {
        const resultsContent = document.getElementById('results-content');
        const copyAllBtn = document.getElementById('copy-all-btn');
        
        resultsContent.innerHTML = `<p>${text}</p>`;
        copyAllBtn.style.display = 'none';
        this.currentResultText = text;
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Texto copiado para a área de transferência');
        }).catch(err => {
            console.error('Erro ao copiar texto:', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        });
    }

    copyAllToClipboard() {
        if (this.currentResultText) {
            this.copyToClipboard(this.currentResultText);
        }
    }

    animateCopyButton(button) {
        const originalText = button.textContent;
        button.textContent = '✅ Copiado!';
        button.classList.add('btn-success');
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('btn-success');
            button.disabled = false;
        }, 1500);
    }

    resetAll() {
        document.getElementById('analyzer-input').value = '';
        document.getElementById('players-card').style.display = 'none';
        document.getElementById('players-checkboxes').innerHTML = '';
        document.getElementById('results-content').innerHTML = 
            '<p class="text-muted">Processe o analyzer para ver os resultados...</p>';
        document.getElementById('copy-all-btn').style.display = 'none';
        
        this.partyData = null;
        this.playerCheckboxes = [];
        this.excludedPlayers = [];
        this.currentResultText = '';
    }

    formatValue(value) {
        if (Math.abs(value) >= 1000000) {
            const formatted = `${(value / 1000000).toFixed(2)}kk`;
            return formatted.replace('.', '.');
        } else if (Math.abs(value) >= 1000) {
            return `${Math.floor(value / 1000)}k`;
        } else {
            return value.toString();
        }
    }
}
