class TimersTab {
    constructor(soundManager) {
        this.soundManager = soundManager;
        this.timers = {};
        this.shortcuts = {};
        this.init();
    }

    async init() {
        this.shortcuts = this.loadShortcuts();
        this.render();
        this.setupEventListeners();
        this.setupTimers();
    }

    render() {
        const tabElement = document.getElementById('timers-tab');
        
        tabElement.innerHTML = `
            <div class="timers-container">
                <div class="card">
                    <div class="card-header">
                        <h3>⏰ Timers para Gameplay</h3>
                    </div>
                    <div class="card-body">
                        <!-- Status Display -->
                        <div id="shortcuts-status" class="shortcuts-status">
                            <!-- Status will be populated here -->
                        </div>

                        <!-- Timers Grid -->
                        <div class="timers-grid">
                            <!-- Timer 1: Chagorz - Vermiath -->
                            <div class="timer-card" id="timer1-card">
                                <div class="timer-header">
                                    <h4>Chagorz - Vermiath</h4>
                                </div>
                                <div class="timer-display">
                                    <div class="time" id="timer1-time">01:30</div>
                                </div>
                                <div class="timer-controls">
                                    <button class="btn btn-success timer-start" data-timer="timer1">Iniciar</button>
                                    <button class="btn btn-warning timer-stop" data-timer="timer1" disabled>Parar</button>
                                    <button class="btn btn-secondary timer-reset" data-timer="timer1">Resetar</button>
                                </div>
                            </div>

                            <!-- Timer 2: Bakragore -->
                            <div class="timer-card" id="timer2-card">
                                <div class="timer-header">
                                    <h4>Bakragore</h4>
                                </div>
                                <div class="timer-display">
                                    <div class="time" id="timer2-main-time">01:30</div>
                                    <div class="extra-time" id="timer2-extra-time">Extra: 00</div>
                                </div>
                                <div class="timer-controls">
                                    <button class="btn btn-success timer-start" data-timer="timer2">Iniciar</button>
                                    <button class="btn btn-warning timer-stop" data-timer="timer2" disabled>Parar</button>
                                    <button class="btn btn-secondary timer-reset" data-timer="timer2">Resetar</button>
                                </div>
                            </div>

                            <!-- Timer 3: Peixinho - Soulwar -->
                            <div class="timer-card" id="timer3-card">
                                <div class="timer-header">
                                    <h4>Peixinho - Soulwar</h4>
                                </div>
                                <div class="timer-display">
                                    <div class="time" id="timer3-time">02:00</div>
                                </div>
                                <div class="timer-controls">
                                    <button class="btn btn-success timer-start" data-timer="timer3">Iniciar</button>
                                    <button class="btn btn-warning timer-stop" data-timer="timer3" disabled>Parar</button>
                                    <button class="btn btn-secondary timer-reset" data-timer="timer3">Resetar</button>
                                </div>
                            </div>

                            <!-- Timer 4: Potion Timer -->
                            <div class="timer-card" id="potion-timer-card">
                                <div class="timer-header">
                                    <h4>Timer Potion (10min)</h4>
                                </div>
                                <div class="timer-display">
                                    <div class="time" id="potion-timer-time">10:00</div>
                                </div>
                                <div class="timer-controls">
                                    <button class="btn btn-success timer-start" data-timer="potion">Iniciar</button>
                                    <button class="btn btn-warning timer-stop" data-timer="potion" disabled>Parar</button>
                                    <button class="btn btn-secondary timer-reset" data-timer="potion">Resetar</button>
                                </div>
                            </div>

                            <!-- Timer 5: Cupcake Timer -->
                            <div class="timer-card" id="cupcake-timer-card">
                                <div class="timer-header">
                                    <h4>Timer Cupcake (10min)</h4>
                                </div>
                                <div class="timer-display">
                                    <div class="time" id="cupcake-timer-time">10:00</div>
                                </div>
                                <div class="timer-controls">
                                    <button class="btn btn-success timer-start" data-timer="cupcake">Iniciar</button>
                                    <button class="btn btn-warning timer-stop" data-timer="cupcake" disabled>Parar</button>
                                    <button class="btn btn-secondary timer-reset" data-timer="cupcake">Resetar</button>
                                </div>
                            </div>

                            <!-- Timer 6: Steak Timer -->
                            <div class="timer-card" id="steak-timer-card">
                                <div class="timer-header">
                                    <h4>Timer Blessed Steak (10min)</h4>
                                </div>
                                <div class="timer-display">
                                    <div class="time" id="steak-timer-time">10:00</div>
                                </div>
                                <div class="timer-controls">
                                    <button class="btn btn-success timer-start" data-timer="steak">Iniciar</button>
                                    <button class="btn btn-warning timer-stop" data-timer="steak" disabled>Parar</button>
                                    <button class="btn btn-secondary timer-reset" data-timer="steak">Resetar</button>
                                </div>
                            </div>

                            <!-- Timer 7: Direction Timer -->
                            <div class="timer-card direction-timer" id="direction-timer-card">
                                <div class="timer-header">
                                    <h4>Timer Direção (Raficular)</h4>
                                </div>
                                <div class="timer-display">
                                    <div class="direction" id="direction-display">NORTE</div>
                                    <div class="direction-countdown" id="direction-countdown">5</div>
                                </div>
                                <div class="timer-controls">
                                    <button class="btn btn-success timer-start" data-timer="direction">Iniciar</button>
                                    <button class="btn btn-warning timer-stop" data-timer="direction" disabled>Parar</button>
                                    <button class="btn btn-secondary timer-reset" data-timer="direction">Resetar</button>
                                </div>
                            </div>
                        </div>

                        <!-- Global Controls -->
                        <div class="global-controls">
                            <button id="start-all-btn" class="btn btn-success">Iniciar Todos</button>
                            <button id="stop-all-btn" class="btn btn-warning">Parar Todos</button>
                            <button id="reset-all-btn" class="btn btn-secondary">Resetar Todos</button>
                            <button id="shortcuts-config-btn" class="btn btn-info">Configurar Atalhos</button>
                        </div>

                        <!-- Instructions -->
                        <div class="instructions">
                            <p>💡 Clique em 'Configurar Atalhos' para definir teclas personalizadas</p>
                            <p>✅ Funciona mesmo com o programa em segundo plano!</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Shortcuts Configuration Modal -->
            <div id="shortcuts-modal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div id="shortcuts-modal-content">
                        <!-- Modal content will be populated dynamically -->
                    </div>
                </div>
            </div>
        `;

        this.updateStatusDisplay();
    }

    setupTimers() {
        // Initialize all timers
        this.timers = {
            timer1: this.createTimer('timer1', 90, this.timer1Callback.bind(this)),
            timer2: this.createComplexTimer('timer2', 90, 12, this.timer2Callback.bind(this)),
            timer3: this.createTimer('timer3', 120, this.timer3Callback.bind(this)),
            potion: this.createTimer('potion', 600, this.potionCallback.bind(this)),
            cupcake: this.createTimer('cupcake', 600, this.foodTimerCallback.bind(this)),
            steak: this.createTimer('steak', 600, this.foodTimerCallback.bind(this)),
            direction: this.createDirectionTimer('direction', this.directionCallback.bind(this))
        };
    }

    createTimer(id, totalSeconds, callback) {
        return {
            id: id,
            totalSeconds: totalSeconds,
            currentSeconds: totalSeconds,
            isRunning: false,
            interval: null,
            callback: callback,
            soundFlags: {}
        };
    }

    createComplexTimer(id, mainSeconds, extraSeconds, callback) {
        return {
            id: id,
            mainSeconds: mainSeconds,
            extraSeconds: extraSeconds,
            mainCurrent: mainSeconds,
            extraCurrent: 0,
            isRunning: false,
            cycleCount: 0,
            interval: null,
            callback: callback,
            soundFlags: {
                main10s: false,
                main3s: false,
                extra12s: false,
                extra9s: false,
                extra5s: false,
                extra3s: false
            }
        };
    }

    createDirectionTimer(id, callback) {
        return {
            id: id,
            directions: ['NORTE', 'DIREITA', 'SUL', 'ESQUERDA'],
            currentDirection: 0,
            countdown: 5,
            isRunning: false,
            interval: null,
            callback: callback
        };
    }

    setupEventListeners() {
        // Timer controls
        document.querySelectorAll('.timer-start').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const timerId = e.target.dataset.timer;
                this.startTimer(timerId);
            });
        });

        document.querySelectorAll('.timer-stop').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const timerId = e.target.dataset.timer;
                this.stopTimer(timerId);
            });
        });

        document.querySelectorAll('.timer-reset').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const timerId = e.target.dataset.timer;
                this.resetTimer(timerId);
            });
        });

        // Global controls
        document.getElementById('start-all-btn').addEventListener('click', () => {
            this.startAllTimers();
        });

        document.getElementById('stop-all-btn').addEventListener('click', () => {
            this.stopAllTimers();
        });

        document.getElementById('reset-all-btn').addEventListener('click', () => {
            this.resetAllTimers();
        });

        document.getElementById('shortcuts-config-btn').addEventListener('click', () => {
            this.showShortcutsConfig();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcut(e);
        });

        // Modal close
        document.querySelector('#shortcuts-modal .close').addEventListener('click', () => {
            this.closeShortcutsModal();
        });

        window.addEventListener('click', (e) => {
            const modal = document.getElementById('shortcuts-modal');
            if (e.target === modal) {
                this.closeShortcutsModal();
            }
        });
    }

    startTimer(timerId) {
        const timer = this.timers[timerId];
        if (!timer || timer.isRunning) return;

        timer.isRunning = true;
        
        // Update UI
        this.updateTimerButtonState(timerId, true);
        
        // Start interval
        timer.interval = setInterval(() => {
            this.updateTimer(timerId);
        }, 1000);

        console.log(`✅ Timer ${timerId} iniciado`);
    }

    stopTimer(timerId) {
        const timer = this.timers[timerId];
        if (!timer || !timer.isRunning) return;

        timer.isRunning = false;
        clearInterval(timer.interval);
        
        // Update UI
        this.updateTimerButtonState(timerId, false);
        
        console.log(`⏹️ Timer ${timerId} parado`);
    }

    resetTimer(timerId) {
        this.stopTimer(timerId);
        
        const timer = this.timers[timerId];
        if (!timer) return;

        // Reset based on timer type
        if (timer.directions) {
            // Direction timer
            timer.currentDirection = 0;
            timer.countdown = 5;
            this.updateDirectionDisplay(timerId);
        } else if (timer.mainSeconds !== undefined) {
            // Complex timer
            timer.mainCurrent = timer.mainSeconds;
            timer.extraCurrent = 0;
            timer.cycleCount = 0;
            this.resetSoundFlags(timerId);
            this.updateComplexTimerDisplay(timerId);
        } else {
            // Simple timer
            timer.currentSeconds = timer.totalSeconds;
            this.resetSoundFlags(timerId);
            this.updateTimerDisplay(timerId);
        }

        console.log(`🔄 Timer ${timerId} resetado`);
    }

    updateTimer(timerId) {
        const timer = this.timers[timerId];
        if (!timer) return;

        if (timer.directions) {
            this.updateDirectionTimer(timerId);
        } else if (timer.mainSeconds !== undefined) {
            this.updateComplexTimer(timerId);
        } else {
            this.updateSimpleTimer(timerId);
        }
    }

    updateSimpleTimer(timerId) {
        const timer = this.timers[timerId];
        timer.currentSeconds--;

        // Check for sound triggers
        this.checkSoundTriggers(timerId);

        if (timer.currentSeconds <= 0) {
            timer.callback(timerId);
            timer.currentSeconds = timer.totalSeconds; // Auto-reset
            this.resetSoundFlags(timerId);
        }

        this.updateTimerDisplay(timerId);
    }

    updateComplexTimer(timerId) {
        const timer = this.timers[timerId];
        
        // Update main timer
        timer.mainCurrent--;
        this.checkComplexSoundTriggers(timerId);

        // Update extra timer if active
        if (timer.cycleCount >= 1 && timer.extraCurrent > 0) {
            timer.extraCurrent--;
        }

        if (timer.mainCurrent <= 0) {
            timer.callback(timerId);
        }

        this.updateComplexTimerDisplay(timerId);
    }

    updateDirectionTimer(timerId) {
        const timer = this.timers[timerId];
        timer.countdown--;

        if (timer.countdown <= 0) {
            timer.currentDirection = (timer.currentDirection + 1) % timer.directions.length;
            timer.countdown = 5;
            
            // Play direction sound
            const direction = timer.directions[timer.currentDirection].toLowerCase();
            this.soundManager.playSound(direction);
        }

        this.updateDirectionDisplay(timerId);
    }

    // Timer-specific callbacks
    timer1Callback(timerId) {
        console.log('Timer 1 completado');
        this.soundManager.playSound('321');
    }

    timer2Callback(timerId) {
        const timer = this.timers[timerId];
        timer.cycleCount++;
        
        // Reset main timer
        timer.mainCurrent = timer.mainSeconds;
        this.resetSoundFlags(timerId, ['main10s', 'main3s']);

        // Start extra timer from second execution
        if (timer.cycleCount >= 1) {
            timer.extraCurrent = timer.extraSeconds;
            this.resetSoundFlags(timerId, ['extra12s', 'extra9s', 'extra5s', 'extra3s']);
        }

        console.log('Timer 2 ciclo completado');
    }

    timer3Callback(timerId) {
        console.log('Timer 3 completado');
        this.soundManager.playSound('321');
    }

    potionCallback(timerId) {
        // Potion timer auto-resets
        console.log('Timer Potion completado - reiniciando');
        this.soundManager.playSound('beep');
    }

    foodTimerCallback(timerId) {
        // Food timers stop when complete
        this.stopTimer(timerId);
        console.log(`Timer ${timerId} completado`);
        this.soundManager.playSound('beep');
    }

    directionCallback(timerId) {
        // Direction timer continues automatically
        console.log('Direção alterada');
    }

    // Sound trigger methods
    checkSoundTriggers(timerId) {
        const timer = this.timers[timerId];
        const seconds = timer.currentSeconds;

        switch(timerId) {
            case 'timer1':
                if (seconds === 10 && !timer.soundFlags['10s']) {
                    this.soundManager.playSound('10sec');
                    timer.soundFlags['10s'] = true;
                }
                if (seconds === 3 && !timer.soundFlags['3s']) {
                    this.soundManager.playSound('321');
                    timer.soundFlags['3s'] = true;
                }
                break;
                
            case 'timer3':
                if (seconds === 20 && !timer.soundFlags['20s']) {
                    this.soundManager.playSound('20');
                    timer.soundFlags['20s'] = true;
                }
                if (seconds === 12 && !timer.soundFlags['12s']) {
                    this.soundManager.playSound('12');
                    timer.soundFlags['12s'] = true;
                }
                if (seconds === 9 && !timer.soundFlags['9s']) {
                    this.soundManager.playSound('9');
                    timer.soundFlags['9s'] = true;
                }
                if (seconds === 5 && !timer.soundFlags['5s']) {
                    this.soundManager.playSound('5');
                    timer.soundFlags['5s'] = true;
                }
                if (seconds === 3 && !timer.soundFlags['3s']) {
                    this.soundManager.playSound('321');
                    timer.soundFlags['3s'] = true;
                }
                break;
        }
    }

    checkComplexSoundTriggers(timerId) {
        const timer = this.timers[timerId];

        // Main timer sounds
        if (timer.mainCurrent === 10 && !timer.soundFlags.main10s) {
            this.soundManager.playSound('10sec');
            timer.soundFlags.main10s = true;
        }
        if (timer.mainCurrent === 3 && !timer.soundFlags.main3s) {
            this.soundManager.playSound('321');
            timer.soundFlags.main3s = true;
        }

        // Extra timer sounds
        if (timer.extraCurrent === 12 && !timer.soundFlags.extra12s) {
            this.soundManager.playSound('12');
            timer.soundFlags.extra12s = true;
        }
        if (timer.extraCurrent === 9 && !timer.soundFlags.extra9s) {
            this.soundManager.playSound('9');
            timer.soundFlags.extra9s = true;
        }
        if (timer.extraCurrent === 5 && !timer.soundFlags.extra5s) {
            this.soundManager.playSound('5');
            timer.soundFlags.extra5s = true;
        }
        if (timer.extraCurrent === 3 && !timer.soundFlags.extra3s) {
            this.soundManager.playSound('321');
            timer.soundFlags.extra3s = true;
        }
    }

    // UI Update methods
    updateTimerDisplay(timerId) {
        const timer = this.timers[timerId];
        const timeElement = document.getElementById(`${timerId}-time`);
        
        if (timeElement) {
            timeElement.textContent = this.formatTime(timer.currentSeconds);
            this.updateTimerColor(timerId, timer.currentSeconds);
        }
    }

    updateComplexTimerDisplay(timerId) {
        const timer = this.timers[timerId];
        
        const mainTimeElement = document.getElementById(`${timerId}-main-time`);
        const extraTimeElement = document.getElementById(`${timerId}-extra-time`);
        
        if (mainTimeElement) {
            mainTimeElement.textContent = this.formatTime(timer.mainCurrent);
            this.updateTimerColor(timerId, timer.mainCurrent, 'main');
        }
        
        if (extraTimeElement) {
            extraTimeElement.textContent = `Extra: ${timer.extraCurrent.toString().padStart(2, '0')}`;
            this.updateTimerColor(timerId, timer.extraCurrent, 'extra');
        }
    }

    updateDirectionDisplay(timerId) {
        const timer = this.timers[timerId];
        const directionElement = document.getElementById('direction-display');
        const countdownElement = document.getElementById('direction-countdown');
        
        if (directionElement) {
            directionElement.textContent = timer.directions[timer.currentDirection];
        }
        
        if (countdownElement) {
            countdownElement.textContent = timer.countdown.toString();
        }
    }

    updateTimerColor(timerId, seconds, type = 'main') {
        const element = type === 'main' ? 
            document.getElementById(`${timerId}-time`) || document.getElementById(`${timerId}-main-time`) :
            document.getElementById(`${timerId}-extra-time`);
            
        if (!element) return;

        if (seconds <= 10) {
            element.style.color = '#ff4444';
        } else if (seconds <= 30) {
            element.style.color = '#ffaa00';
        } else {
            element.style.color = '#4CAF50';
        }
    }

    updateTimerButtonState(timerId, isRunning) {
        const startBtn = document.querySelector(`.timer-start[data-timer="${timerId}"]`);
        const stopBtn = document.querySelector(`.timer-stop[data-timer="${timerId}"]`);
        
        if (startBtn) startBtn.disabled = isRunning;
        if (stopBtn) stopBtn.disabled = !isRunning;
    }

    // Global controls
    startAllTimers() {
        Object.keys(this.timers).forEach(timerId => {
            this.startTimer(timerId);
        });
    }

    stopAllTimers() {
        Object.keys(this.timers).forEach(timerId => {
            this.stopTimer(timerId);
        });
    }

    resetAllTimers() {
        Object.keys(this.timers).forEach(timerId => {
            this.resetTimer(timerId);
        });
    }

    // Shortcuts configuration
    showShortcutsConfig() {
        const modal = document.getElementById('shortcuts-modal');
        const modalContent = document.getElementById('shortcuts-modal-content');
        
        modalContent.innerHTML = `
            <h2>Configurar Atalhos de Teclado</h2>
            <div class="shortcuts-form">
                <p>Clique em cada campo e pressione a combinação de teclas desejada.</p>
                
                <div class="shortcut-group">
                    <h3>🕒 Timers Originais</h3>
                    ${this.createShortcutInput('timer1', 'Chagorz - Vermiath (1:30)')}
                    ${this.createShortcutInput('timer2', 'Bakragore (1:30 + 12s)')}
                    ${this.createShortcutInput('timer3', 'Peixinho - Soulwar (2:00)')}
                </div>

                <div class="shortcut-group">
                    <h3>🆕 Novos Timers</h3>
                    ${this.createShortcutInput('potion', 'Timer Potion (10min)')}
                    ${this.createShortcutInput('cupcake', 'Timer Cupcake (10min)')}
                    ${this.createShortcutInput('steak', 'Timer Blessed Steak (10min)')}
                    ${this.createShortcutInput('direction', 'Timer Direção (5s)')}
                </div>

                <div class="shortcut-group">
                    <h3>🌐 Controles Globais</h3>
                    ${this.createShortcutInput('start_all', 'Iniciar/Parar Todos')}
                    ${this.createShortcutInput('stop_all', 'Resetar Todos')}
                </div>

                <div class="form-buttons">
                    <button id="save-shortcuts-btn" class="btn btn-success">Salvar Atalhos</button>
                    <button class="btn btn-secondary" onclick="app.tabComponents.timers.closeShortcutsModal()">
                        Cancelar
                    </button>
                </div>
            </div>
        `;

        // Setup shortcut input listeners
        this.setupShortcutInputs();
        
        // Save button
        document.getElementById('save-shortcuts-btn').addEventListener('click', () => {
            this.saveShortcuts();
        });

        modal.style.display = 'block';
    }

    createShortcutInput(key, label) {
        const currentShortcut = this.shortcuts[key] || '';
        return `
            <div class="form-group">
                <label>${label}:</label>
                <div class="shortcut-input-group">
                    <input type="text" class="shortcut-input" data-key="${key}" 
                           value="${currentShortcut}" readonly placeholder="Clique e pressione a tecla...">
                    <button type="button" class="btn btn-sm btn-secondary clear-shortcut" data-key="${key}">
                        Limpar
                    </button>
                </div>
            </div>
        `;
    }

    setupShortcutInputs() {
        document.querySelectorAll('.shortcut-input').forEach(input => {
            input.addEventListener('click', (e) => {
                e.target.value = 'Pressione uma tecla...';
            });

            input.addEventListener('keydown', (e) => {
                e.preventDefault();
                const shortcut = this.getShortcutFromEvent(e);
                if (shortcut) {
                    e.target.value = shortcut;
                }
            });

            input.addEventListener('blur', (e) => {
                // Restore original value if no new key was pressed
                if (e.target.value === 'Pressione uma tecla...') {
                    const key = e.target.dataset.key;
                    e.target.value = this.shortcuts[key] || '';
                }
            });
        });

        document.querySelectorAll('.clear-shortcut').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const key = e.target.dataset.key;
                const input = document.querySelector(`.shortcut-input[data-key="${key}"]`);
                input.value = '';
            });
        });
    }

    getShortcutFromEvent(event) {
        const modifiers = [];
        if (event.ctrlKey) modifiers.push('Ctrl');
        if (event.altKey) modifiers.push('Alt');
        if (event.shiftKey) modifiers.push('Shift');
        if (event.metaKey) modifiers.push('Meta');

        // Ignore modifier-only keys
        if (['Control', 'Alt', 'Shift', 'Meta'].includes(event.key)) {
            return null;
        }

        // Map special keys
        const keyMap = {
            ' ': 'Space',
            'Escape': 'Escape',
            'Enter': 'Enter',
            'Tab': 'Tab',
            'Backspace': 'Backspace',
            'Delete': 'Delete',
            'Insert': 'Insert',
            'Home': 'Home',
            'End': 'End',
            'PageUp': 'PageUp',
            'PageDown': 'PageDown'
        };

        // Handle function keys
        let keyName;
        if (event.key.startsWith('F') && event.key.length > 1) {
            keyName = event.key;
        } else {
            keyName = keyMap[event.key] || event.key;
        }

        // Combine modifiers with key
        if (modifiers.length > 0) {
            return modifiers.join('+') + '+' + keyName;
        } else {
            return keyName;
        }
    }

    saveShortcuts() {
        const newShortcuts = {};
        
        document.querySelectorAll('.shortcut-input').forEach(input => {
            const key = input.dataset.key;
            const value = input.value.trim();
            if (value && value !== 'Pressione uma tecla...') {
                newShortcuts[key] = value;
            }
        });

        this.shortcuts = newShortcuts;
        this.saveShortcutsToStorage();
        this.updateStatusDisplay();
        this.closeShortcutsModal();

        const configuredCount = Object.keys(newShortcuts).length;
        if (configuredCount > 0) {
            alert(`✅ ${configuredCount} atalho(s) configurado(s) com sucesso!`);
        } else {
            alert('✅ Todos os atalhos foram removidos!');
        }
    }

    handleKeyboardShortcut(event) {
        const shortcut = this.getShortcutFromEvent(event);
        if (!shortcut) return;

        // Find which timer this shortcut corresponds to
        for (const [key, value] of Object.entries(this.shortcuts)) {
            if (value === shortcut) {
                event.preventDefault();
                this.executeShortcutAction(key);
                break;
            }
        }
    }

    executeShortcutAction(action) {
        switch(action) {
            case 'timer1':
            case 'timer2':
            case 'timer3':
            case 'potion':
            case 'cupcake':
            case 'steak':
            case 'direction':
                const timer = this.timers[action];
                if (timer) {
                    if (timer.isRunning) {
                        this.stopTimer(action);
                    } else {
                        this.startTimer(action);
                    }
                }
                break;
                
            case 'start_all':
                this.toggleAllTimers();
                break;
                
            case 'stop_all':
                this.resetAllTimers();
                break;
        }
    }

    toggleAllTimers() {
        const anyRunning = Object.values(this.timers).some(timer => timer.isRunning);
        if (anyRunning) {
            this.stopAllTimers();
        } else {
            this.startAllTimers();
        }
    }

    updateStatusDisplay() {
        const statusElement = document.getElementById('shortcuts-status');
        const configuredCount = Object.keys(this.shortcuts).length;

        if (configuredCount === 0) {
            statusElement.innerHTML = `
                <div class="alert alert-warning">
                    ⚠️ CONFIGURE AS TECLAS DE ATALHO PARA COMEÇAR A USAR OS TIMERS!
                </div>
            `;
        } else {
            const configuredList = Object.entries(this.shortcuts)
                .map(([key, value]) => {
                    const names = {
                        timer1: 'Chagorz - Vermiath',
                        timer2: 'Bakragore',
                        timer3: 'Peixinho - Soulwar',
                        potion: 'Timer Potion',
                        cupcake: 'Timer Cupcake',
                        steak: 'Timer Blessed Steak',
                        direction: 'Timer Direção',
                        start_all: 'Iniciar/Parar Todos',
                        stop_all: 'Resetar Todos'
                    };
                    return `✅ ${names[key]}: ${value}`;
                })
                .join('<br>');

            statusElement.innerHTML = `
                <div class="alert alert-success">
                    <strong>🎯 ATALHOS CONFIGURADOS:</strong><br>
                    ${configuredList}
                </div>
            `;
        }
    }

    // Utility methods
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    resetSoundFlags(timerId, flags = null) {
        const timer = this.timers[timerId];
        if (!timer.soundFlags) return;

        if (flags) {
            flags.forEach(flag => {
                timer.soundFlags[flag] = false;
            });
        } else {
            Object.keys(timer.soundFlags).forEach(flag => {
                timer.soundFlags[flag] = false;
            });
        }
    }

    loadShortcuts() {
        // In a real implementation, this would load from dataManager
        return {};
    }

    saveShortcutsToStorage() {
        // In a real implementation, this would save to dataManager
        console.log('Shortcuts salvos:', this.shortcuts);
    }

    closeShortcutsModal() {
        document.getElementById('shortcuts-modal').style.display = 'none';
    }

    cleanup() {
        // Stop all timers when leaving the tab
        this.stopAllTimers();
    }
}
