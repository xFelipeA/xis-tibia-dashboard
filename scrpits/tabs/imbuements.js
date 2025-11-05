class ImbuementsTab {
    constructor() {
        this.imbuementsData = [];
        this.filteredData = [];
        this.iconMapping = {};
        this.itemMapping = {};
        this.init();
    }

    init() {
        this.setupImageMappings();
        this.loadImbuementsData();
        this.render();
        this.setupEventListeners();
    }

    setupImageMappings() {
        // Mapeamento dos ícones de imbuements
        this.iconMapping = {
            'Blockade (Skill Shield)': 'shield.gif',
            'Scorch (Elemental Damage)': 'danofire.gif',
            'Venom (Elemental Damage)': 'danopoison.gif',
            'Frost (Elemental Damage)': 'danoice.gif',
            'Electrify (Elemental Damage)': 'danoenergy.gif',
            'Curse (Elemental Damage)': 'danodeath.gif',
            'Vampirism (Life Leech)': 'lifeleech.gif',
            'Void (Mana Leech)': 'manaleech.gif',
            'Strike (Critical Hit)': 'critico.gif',
            'Swiftness (Speed)': 'speed.gif',
            'Epiphany (Magic Level)': 'magiclevel.gif',
            'Featherweight (Capacity)': 'cap.gif',
            'Bash (Skill Club)': 'club.gif',
            'Slash (Skill Sword)': 'sword.gif',
            'Chop (Skill Axe)': 'axe.gif',
            'Precision (Skill Distance)': 'distance.gif',
            'Paralysis Removal': 'removeparalyze.gif',
            'First Aid (Paralysis Removal)': 'first.gif',
            'Quara Scale (Protection Physical)': 'shield.gif',
            'Dragon Hide (Protection Fire)': 'protfire.gif',
            'Ice Scale (Protection Ice)': 'protice.gif',
            'Cloud Fabric (Protection Energy)': 'protenergy.gif',
            'Demon Presence (Protection Death)': 'protdeath.gif',
            'Snake Skin (Protection Earth)': 'protpoison.gif',
            'Demon Shield (Protection Holy)': 'protholy.gif'
        };

        // Mapeamento dos itens (sem extensão, será adicionada automaticamente)
        this.itemMapping = {
            'Piece of Scarab Shell': 'Piece_of_Scarab_Shell',
            'Brimstone Shell': 'Brimstone_Shell',
            'Frazzle Skin': 'Frazzle_Skin',
            'Blazing Bone': 'Blazing_Bone',
            'Demon Horn': 'Demon_Horn',
            'Crystallized Anger': 'Crystallized_Anger',
            'Poisonous Slime': 'Poisonous_Slime',
            'Slime Heart': 'Slime_Heart',
            'Petrified Scream': 'Petrified_Scream',
            'Frosty Heart': 'Frosty_Heart',
            'Winter Wolf Fur': 'Winter_Wolf_Fur',
            'Thick Fur': 'Thick_Fur',
            'Energy Vein': 'Energy_Vein',
            'Wyrm Scale': 'Wyrm_Scale',
            'War Crystal': 'War_Crystal',
            'Piece of Dead Brain': 'Piece_of_Dead_Brain',
            'Demonic Skeletal Hand': 'Demonic_Skeletal_Hand',
            'Vampire Teeth': 'Vampire_Teeth',
            'Bloody Pincers': 'Bloody_Pincers',
            'Silencer Claws': 'Silencer_Claws',
            'Some Grimeleech Wings': 'Some_Grimeleech_Wings',
            'Cultish Robe': 'Cultish_Robe',
            'Mystical Hourglass': 'Mystical_Hourglass',
            'Broken Shamanic Staff': 'Broken_Shamanic_Staff',
            'Goosebump Leather': 'Goosebump_Leather',
            'Protective Charm': 'Protective_Charm',
            'Sabretooth': 'Sabretooth',
            'Cyclops Toe': 'Cyclops_Toe',
            'Ogre Nose Ring': 'Ogre_Nose_Ring',
            'Warmaster Wristguards': 'Warmasters_Wristguards',
            'Rope Belt': 'Rope_Belt',
            'Elven Scouting Glass': 'Elven_Scouting_Glass',
            'Metal Spike': 'Metal_Spike',
            'Orc Tooth': 'Orc_Tooth',
            'Battle Stone': 'Battle_Stone',
            'Compass': 'Compass',
            'Draken Sulphur': 'Draken_Sulphur',
            'Vexclaw Talon': 'Vexclaw_Talon',
            'Green Dragon Scale': 'Green_Dragon_Scale',
            'Green Dragon Leather': 'Green_Dragon_Leather',
            'Fiery Heart': 'Fiery_Heart',
            'Crawler Head Plating': 'Crawler_Head_Plating',
            'Brimstone Fangs': 'Brimstone_Fangs',
            'Wyvern Talisman': 'Wyvern_Talisman',
            'Deepling Warts': 'Deepling_Warts',
            'Swamp Grass': 'Swamp_Grass',
            'Pile of Grave Earth': 'Pile_of_Grave_Earth',
            'Polar Bear Paw': 'Polar_Bear_Paw',
            'Waspoid Wing': 'Waspoid_Wing',
            'Gloom Wolf Fur': 'Gloom_Wolf_Fur',
            'Fairy Wings': 'Fairy_Wings',
            'Little Bowl of Myrrh': 'Little_Bowl_of_Myrrh',
            'Elvish Talisman': 'Elvish_Talisman',
            'Snake Skin': 'Snake_Skin',
            'Wereboar Hooves': 'Wereboar_Hooves',
            'Piece of Swampling Wood': 'Piece_of_Swampling_Wood',
            'Rorc Feather': 'Rorc_Feather',
            'Peacock Feather Fan': 'Peacock_Feather_Fan',
            'Seacrest Hair': 'Seacrest_Hair',
            'Flask of Embalming Fluid': 'Flask_of_Embalming_Fluid',
            'Cultish Mask': 'Cultish_Mask',
            'Strand of Medusa Hair': 'Strand_of_Medusa_Hair',
            'Lions Mane': 'Lions_Mane',
            'Mantassin Tail': 'Mantassin_Tail',
            'Hellspawn Tail': 'Hellspawn_Tail',
            'Damselfly Wing': 'Damselfly_Wing',
            'Quill': 'Quill',
            'Elven Hoof': 'Elven_Hoof',
            'Tarantula Egg': 'Tarantula_Egg',
            'Moohtant Horn': 'Moohtant_Horn',
            'Moohtah Shell': 'Moohtah_Shell',
            'GoldBrocaded Cloth': 'GoldBrocaded_Cloth'
        };
    }

    loadImbuementsData() {
        // Dados completos dos imbuements do Tibia
        this.imbuementsData = [
            {
                "imbuement": "Blockade (Skill Shield)",
                "categoria": "Aumento de Skill",
                "basic": { "qty": "20", "item": "Piece of Scarab Shell" },
                "intricate": { "qty": "25", "item": "Brimstone Shell" },
                "powerful": { "qty": "25", "item": "Frazzle Skin" }
            },
            {
                "imbuement": "Scorch (Elemental Damage)",
                "categoria": "Dano Elemental",
                "basic": { "qty": "25", "item": "Blazing Bone" },
                "intricate": { "qty": "20", "item": "Demon Horn" },
                "powerful": { "qty": "15", "item": "Crystallized Anger" }
            },
            {
                "imbuement": "Venom (Elemental Damage)",
                "categoria": "Dano Elemental",
                "basic": { "qty": "25", "item": "Poisonous Slime" },
                "intricate": { "qty": "20", "item": "Slime Heart" },
                "powerful": { "qty": "15", "item": "Petrified Scream" }
            },
            {
                "imbuement": "Frost (Elemental Damage)",
                "categoria": "Dano Elemental",
                "basic": { "qty": "25", "item": "Frosty Heart" },
                "intricate": { "qty": "20", "item": "Winter Wolf Fur" },
                "powerful": { "qty": "15", "item": "Thick Fur" }
            },
            {
                "imbuement": "Electrify (Elemental Damage)",
                "categoria": "Dano Elemental",
                "basic": { "qty": "25", "item": "Energy Vein" },
                "intricate": { "qty": "20", "item": "Wyrm Scale" },
                "powerful": { "qty": "15", "item": "War Crystal" }
            },
            {
                "imbuement": "Curse (Elemental Damage)",
                "categoria": "Dano Elemental",
                "basic": { "qty": "25", "item": "Piece of Dead Brain" },
                "intricate": { "qty": "20", "item": "Demonic Skeletal Hand" },
                "powerful": { "qty": "15", "item": "Petrified Scream" }
            },
            {
                "imbuement": "Vampirism (Life Leech)",
                "categoria": "Life Leech",
                "basic": { "qty": "25", "item": "Vampire Teeth" },
                "intricate": { "qty": "15", "item": "Bloody Pincers" },
                "powerful": { "qty": "5", "item": "Piece of Dead Brain" }
            },
            {
                "imbuement": "Void (Mana Leech)",
                "categoria": "Mana Leech",
                "basic": { "qty": "25", "item": "Silencer Claws" },
                "intricate": { "qty": "15", "item": "Some Grimeleech Wings" },
                "powerful": { "qty": "5", "item": "Cultish Robe" }
            },
            {
                "imbuement": "Strike (Critical Hit)",
                "categoria": "Critical Hit",
                "basic": { "qty": "20", "item": "Mystical Hourglass" },
                "intricate": { "qty": "15", "item": "Broken Shamanic Staff" },
                "powerful": { "qty": "10", "item": "Crystallized Anger" }
            },
            {
                "imbuement": "Swiftness (Speed)",
                "categoria": "Speed",
                "basic": { "qty": "25", "item": "Goosebump Leather" },
                "intricate": { "qty": "20", "item": "Protective Charm" },
                "powerful": { "qty": "15", "item": "Sabretooth" }
            },
            {
                "imbuement": "Epiphany (Magic Level)",
                "categoria": "Aumento de Skill",
                "basic": { "qty": "25", "item": "Cyclops Toe" },
                "intricate": { "qty": "20", "item": "Ogre Nose Ring" },
                "powerful": { "qty": "15", "item": "Warmaster Wristguards" }
            },
            {
                "imbuement": "Featherweight (Capacity)",
                "categoria": "Capacity",
                "basic": { "qty": "25", "item": "Rope Belt" },
                "intricate": { "qty": "20", "item": "Elven Scouting Glass" },
                "powerful": { "qty": "15", "item": "Metal Spike" }
            },
            {
                "imbuement": "Bash (Skill Club)",
                "categoria": "Aumento de Skill",
                "basic": { "qty": "25", "item": "Orc Tooth" },
                "intricate": { "qty": "20", "item": "Battle Stone" },
                "powerful": { "qty": "15", "item": "Warmaster Wristguards" }
            },
            {
                "imbuement": "Slash (Skill Sword)",
                "categoria": "Aumento de Skill",
                "basic": { "qty": "25", "item": "Compass" },
                "intricate": { "qty": "20", "item": "Draken Sulphur" },
                "powerful": { "qty": "15", "item": "Warmaster Wristguards" }
            },
            {
                "imbuement": "Chop (Skill Axe)",
                "categoria": "Aumento de Skill",
                "basic": { "qty": "25", "item": "Vexclaw Talon" },
                "intricate": { "qty": "20", "item": "Green Dragon Scale" },
                "powerful": { "qty": "15", "item": "Warmaster Wristguards" }
            },
            {
                "imbuement": "Precision (Skill Distance)",
                "categoria": "Aumento de Skill",
                "basic": { "qty": "25", "item": "Green Dragon Leather" },
                "intricate": { "qty": "20", "item": "Fiery Heart" },
                "powerful": { "qty": "15", "item": "Warmaster Wristguards" }
            },
            {
                "imbuement": "Dragon Hide (Protection Fire)",
                "categoria": "Protection",
                "basic": { "qty": "25", "item": "Crawler Head Plating" },
                "intricate": { "qty": "20", "item": "Brimstone Fangs" },
                "powerful": { "qty": "5", "item": "Wyvern Talisman" }
            },
            {
                "imbuement": "Snake Skin (Protection Earth)",
                "categoria": "Protection",
                "basic": { "qty": "25", "item": "Deepling Warts" },
                "intricate": { "qty": "20", "item": "Swamp Grass" },
                "powerful": { "qty": "5", "item": "Pile of Grave Earth" }
            },
            {
                "imbuement": "Ice Scale (Protection Ice)",
                "categoria": "Protection",
                "basic": { "qty": "25", "item": "Polar Bear Paw" },
                "intricate": { "qty": "20", "item": "Waspoid Wing" },
                "powerful": { "qty": "5", "item": "Gloom Wolf Fur" }
            },
            {
                "imbuement": "Cloud Fabric (Protection Energy)",
                "categoria": "Protection",
                "basic": { "qty": "25", "item": "Fairy Wings" },
                "intricate": { "qty": "20", "item": "Little Bowl of Myrrh" },
                "powerful": { "qty": "5", "item": "Elvish Talisman" }
            },
            {
                "imbuement": "Demon Presence (Protection Death)",
                "categoria": "Protection",
                "basic": { "qty": "25", "item": "Snake Skin" },
                "intricate": { "qty": "20", "item": "Wereboar Hooves" },
                "powerful": { "qty": "5", "item": "Piece of Swampling Wood" }
            },
            {
                "imbuement": "Demon Shield (Protection Holy)",
                "categoria": "Protection",
                "basic": { "qty": "25", "item": "Rorc Feather" },
                "intricate": { "qty": "20", "item": "Peacock Feather Fan" },
                "powerful": { "qty": "5", "item": "Seacrest Hair" }
            },
            {
                "imbuement": "First Aid (Paralysis Removal)",
                "categoria": "Paralysis Removal",
                "basic": { "qty": "25", "item": "Flask of Embalming Fluid" },
                "intricate": { "qty": "20", "item": "Cultish Mask" },
                "powerful": { "qty": "15", "item": "Strand of Medusa Hair" }
            },
            {
                "imbuement": "Quara Scale (Protection Physical)",
                "categoria": "Protection",
                "basic": { "qty": "25", "item": "Lions Mane" },
                "intricate": { "qty": "20", "item": "Mantassin Tail" },
                "powerful": { "qty": "5", "item": "Hellspawn Tail" }
            }
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
                        <img src="images/iconsimbui/${this.getImbuementIcon(imb.imbuement)}" 
                             alt="${imb.imbuement}" 
                             class="imbuement-icon"
                             onerror="this.style.display='none'">
                        <span class="imbuement-name">${imb.imbuement}</span>
                    </div>
                </td>
                <td class="text-center">${imb.categoria}</td>
                <td class="text-center">
                    <div class="tier-item">
                        <div class="qty">${imb.basic.qty}</div>
                        <img src="images/itensimbui/${this.getItemImage(imb.basic.item)}" 
                             alt="${imb.basic.item}" 
                             class="tier-item-image"
                             onerror="this.style.display='none'">
                        <div class="item-name">${imb.basic.item}</div>
                    </div>
                </td>
                <td class="text-center">
                    <div class="tier-item">
                        <div class="qty">${imb.intricate.qty}</div>
                        <img src="images/itensimbui/${this.getItemImage(imb.intricate.item)}" 
                             alt="${imb.intricate.item}" 
                             class="tier-item-image"
                             onerror="this.style.display='none'">
                        <div class="item-name">${imb.intricate.item}</div>
                    </div>
                </td>
                <td class="text-center">
                    <div class="tier-item">
                        <div class="qty">${imb.powerful.qty}</div>
                        <img src="images/itensimbui/${this.getItemImage(imb.powerful.item)}" 
                             alt="${imb.powerful.item}" 
                             class="tier-item-image"
                             onerror="this.style.display='none'">
                        <div class="item-name">${imb.powerful.item}</div>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    getImbuementIcon(imbuementName) {
        return this.iconMapping[imbuementName] || 'default.gif';
    }

    getItemImage(itemName) {
        const mappedName = this.itemMapping[itemName];
        return mappedName ? `${mappedName}.gif` : `${itemName.replace(/\s+/g, '_')}.gif`;
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