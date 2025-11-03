// Dados dos Imbuements
const imbuementsData = [
    {
        imbuement: "Blockade (Skill Shield)",
        imbuement_img: "images/iconsimbui/shield.gif",
        basic_qty: "20", basic_item: "Piece of Scarab Shell", basic_img: "images/itensimbui/piece_of_scarab_shell.gif",
        intricate_qty: "25", intricate_item: "Brimstone Shell", intricate_img: "images/itensimbui/brimstone_shell.gif",
        powerful_qty: "25", powerful_item: "Frazzle Skin", powerful_img: "images/itensimbui/frazzle_skin.gif",
        categoria: "Aumento de Skill"
    },
    // ... outros imbuements
];

// Inicializar quando a aba for carregada
document.addEventListener('DOMContentLoaded', function() {
    initializeImbuements();
});

function initializeImbuements() {
    const searchInput = document.getElementById('imbuement-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterImbuements);
        populateImbuementsTable(imbuementsData);
    }
}

// ... (restante das funções específicas do imbuements)
