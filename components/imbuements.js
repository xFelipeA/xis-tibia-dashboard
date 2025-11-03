// Dados completos dos Imbuements (igual ao seu Python)
const imbuementsData = [
    // Aumento de Skill
    {
        imbuement: "Blockade (Skill Shield)",
        imbuement_img: "images/iconsimbui/shield.gif",
        basic_qty: "20", basic_item: "Piece of Scarab Shell", basic_img: "images/itensimbui/piece_of_scarab_shell.gif",
        intricate_qty: "25", intricate_item: "Brimstone Shell", intricate_img: "images/itensimbui/brimstone_shell.gif",
        powerful_qty: "25", powerful_item: "Frazzle Skin", powerful_img: "images/itensimbui/frazzle_skin.gif",
        categoria: "Aumento de Skill"
    },
    {
        imbuement: "Chop (Skill Axe)",
        imbuement_img: "images/iconsimbui/axe.gif",
        basic_qty: "20", basic_item: "Orc Tooth", basic_img: "images/itensimbui/orc_tooth.gif",
        intricate_qty: "25", intricate_item: "Battle Stone", intricate_img: "images/itensimbui/battle_stone.gif",
        powerful_qty: "20", powerful_item: "Moohtant Horn", powerful_img: "images/itensimbui/moohtant_horn.gif",
        categoria: "Aumento de Skill"
    },
    {
        imbuement: "Epiphany (Skill Magic Level)",
        imbuement_img: "images/iconsimbui/magiclevel.gif",
        basic_qty: "25", basic_item: "Elvish Talisman", basic_img: "images/itensimbui/elvish_talisman.gif",
        intricate_qty: "15", intricate_item: "Broken Shamanic Staff", basic_img: "images/itensimbui/broken_shamanic_staff.gif",
        powerful_qty: "15", powerful_item: "Strand of Medusa Hair", powerful_img: "images/itensimbui/strand_of_medusa_hair.gif",
        categoria: "Aumento de Skill"
    },
    // ... (ADICIONE AQUI TODOS OS OUTROS IMBUEMENTS DO SEU CÓDIGO PYTHON)
    // Copie exatamente a mesma estrutura de dados
];

// Função para criar widget de tier
function createTierWidget(qty, itemName, imgPath) {
    return `
        <div class="tier-widget">
            <div class="tier-qty">${qty}</div>
            <img src="${imgPath}" alt="${itemName}" class="tier-img" 
                 onerror="this.style.display='none'">
            <div class="tier-name">${itemName}</div>
        </div>
    `;
}

// Função para criar header do imbuement
function createImbuementHeader(imb) {
    return `
        <div class="imbuement-header">
            <img src="${imb.imbuement_img}" alt="${imb.imbuement}" class="imbuement-icon"
                 onerror="this.style.display='none'">
            <div class="imbuement-name">${imb.imbuement}</div>
        </div>
    `;
}

// Função para popular a tabela
function populateImbuementsTable(data) {
    const tbody = document.getElementById('imbuements-table-body');
    tbody.innerHTML = '';

    data.forEach(imb => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${createImbuementHeader(imb)}</td>
            <td><strong>${imb.categoria}</strong></td>
            <td>${createTierWidget(imb.basic_qty, imb.basic_item, imb.basic_img)}</td>
            <td>${createTierWidget(imb.intricate_qty, imb.intricate_item, imb.intricate_img)}</td>
            <td>${createTierWidget(imb.powerful_qty, imb.powerful_item, imb.powerful_img)}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Função de busca
function filterImbuements() {
    const searchText = document.getElementById('imbuement-search').value.toLowerCase();
    
    if (!searchText) {
        populateImbuementsTable(imbuementsData);
        return;
    }
    
    const filteredData = imbuementsData.filter(imb => 
        imb.imbuement.toLowerCase().includes(searchText) ||
        imb.categoria.toLowerCase().includes(searchText) ||
        imb.basic_item.toLowerCase().includes(searchText) ||
        imb.intricate_item.toLowerCase().includes(searchText) ||
        imb.powerful_item.toLowerCase().includes(searchText)
    );
    
    populateImbuementsTable(filteredData);
}

// Função de inicialização chamada pelo TabManager
function initializeImbuements() {
    const searchInput = document.getElementById('imbuement-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterImbuements);
        populateImbuementsTable(imbuementsData);
        console.log('✅ Imbuements carregado com sucesso!');
    }
}
