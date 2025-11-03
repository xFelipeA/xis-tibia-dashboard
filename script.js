// Dados dos Imbuements
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
    // ... (adicionar todos os outros imbuements do seu código)
];

// Função para criar widget de tier
function createTierWidget(qty, itemName, imgPath) {
    return `
        <div class="tier-widget">
            <div class="tier-qty">${qty}</div>
            <img src="${imgPath}" alt="${itemName}" class="tier-img" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
            <div class="tier-name" style="display: none;">${itemName}</div>
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

// Inicializar quando a aba for carregada
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('imbuement-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterImbuements);
        populateImbuementsTable(imbuementsData);
    }
});
