class SoundManager {
    constructor() {
        this.sounds = new Map();
        this.audioContext = null;
        this.isEnabled = true;
        
        this.init();
    }

    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Preload common sounds
            const soundFiles = {
                '10sec': 'sounds/10sec.wav',
                '321': 'sounds/321.wav',
                '12': 'sounds/12.wav',
                '9': 'sounds/9.wav',
                '5': 'sounds/5.wav',
                '20': 'sounds/20.wav',
                'beep': 'sounds/beep.wav'
            };

            for (const [name, file] of Object.entries(soundFiles)) {
                await this.loadSound(name, file);
            }
        } catch (error) {
            console.warn('Audio não suportado ou desabilitado:', error);
            this.isEnabled = false;
        }
    }

    async loadSound(name, url) {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            this.sounds.set(name, audioBuffer);
        } catch (error) {
            console.warn(`Não foi possível carregar o som ${name}:`, error);
        }
    }

    playSound(name) {
        if (!this.isEnabled || !this.sounds.has(name)) {
            return;
        }

        try {
            const source = this.audioContext.createBufferSource();
            source.buffer = this.sounds.get(name);
            source.connect(this.audioContext.destination);
            source.start(0);
        } catch (error) {
            console.warn(`Erro ao tocar som ${name}:`, error);
        }
    }

    toggleEnabled() {
        this.isEnabled = !this.isEnabled;
        return this.isEnabled;
    }

    setVolume(volume) {
        // Volume control would be implemented here
        // For simplicity, we're using the default volume
    }
}
