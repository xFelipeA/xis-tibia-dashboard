class DataManager {
    constructor() {
        this.storagePrefix = 'xis_tibia_';
    }

    async init() {
        console.log('📁 Inicializando DataManager...');
        await this.ensureDefaultData();
    }

    async ensureDefaultData() {
        const defaultData = {
            config: { tc_real: 0 },
            chars_data: [],
            services_data: { personagens: {} },
            drops_data: [],
            parcelas_data: {},
            profit_data: { entries: [] },
            shortcuts: {}
        };

        for (const [key, defaultValue] of Object.entries(defaultData)) {
            if (!this.get(key)) {
                this.set(key, defaultValue);
            }
        }
    }

    get(key) {
        try {
            const data = localStorage.getItem(this.storagePrefix + key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Erro ao recuperar dados para ${key}:`, error);
            return null;
        }
    }

    set(key, data) {
        try {
            localStorage.setItem(this.storagePrefix + key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Erro ao salvar dados para ${key}:`, error);
            return false;
        }
    }

    remove(key) {
        try {
            localStorage.removeItem(this.storagePrefix + key);
            return true;
        } catch (error) {
            console.error(`Erro ao remover dados para ${key}:`, error);
            return false;
        }
    }

    // Specific data methods
    getConfig() {
        return this.get('config') || { tc_real: 0 };
    }

    setConfig(config) {
        return this.set('config', config);
    }

    getCharsData() {
        return this.get('chars_data') || [];
    }

    setCharsData(data) {
        return this.set('chars_data', data);
    }

    getServicesData() {
        return this.get('services_data') || { personagens: {} };
    }

    setServicesData(data) {
        return this.set('services_data', data);
    }

    getDropsData() {
        return this.get('drops_data') || [];
    }

    setDropsData(data) {
        return this.set('drops_data', data);
    }

    getParcelasData() {
        return this.get('parcelas_data') || {};
    }

    setParcelasData(data) {
        return this.set('parcelas_data', data);
    }

    getProfitData() {
        return this.get('profit_data') || { entries: [] };
    }

    setProfitData(data) {
        return this.set('profit_data', data);
    }

    getShortcuts() {
        return this.get('shortcuts') || {};
    }

    setShortcuts(data) {
        return this.set('shortcuts', data);
    }
}
