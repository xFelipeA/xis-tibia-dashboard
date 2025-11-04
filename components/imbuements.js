// Módulo de Imbuements
const imbuementsModule = (function() {
    // Dados completos dos Imbuements
    const imbuementsData = [
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
            intricate_qty: "15", intricate_item: "Broken Shamanic Staff", intricate_img: "images/itensimbui/broken_shamanic_staff.gif",
            powerful_qty: "15", powerful_item: "Strand of Medusa Hair", powerful_img: "images/itensimbui/strand_of_medusa_hair.gif",
            categoria: "Aumento de Skill"
        },
        {
            imbuement: "Precision (Skill Distance)",
            imbuement_img: "images/iconsimbui/distance.gif",
            basic_qty: "25", basic_item: "Elven Scouting Glass", basic_img: "images/itensimbui/elven_scouting_glass.gif",
            intricate_qty: "20", intricate_item: "Elven Hoof", intricate_img: "images/itensimbui/elven_hoof.gif",
            powerful_qty: "10", powerful_item: "Metal Spike", powerful_img: "images/itensimbui/metal_spike.gif",
            categoria: "Aumento de Skill"
        },
        {
            imbuement: "Slash (Skill Sword)",
            imbuement_img: "images/iconsimbui/sword.gif",
            basic_qty: "25", basic_item: "Lion's Mane", basic_img: "images/itensimbui/lions_mane.gif",
            intricate_qty: "25", intricate_item: "Mooh'tah Shell", intricate_img: "images/itensimbui/moohtah_shell.gif",
            powerful_qty: "5", powerful_item: "War Crystal", powerful_img: "images/itensimbui/war_crystal.gif",
            categoria: "Aumento de Skill"
        },
        {
            imbuement: "Bash (Skill Club)",
            imbuement_img: "images/iconsimbui/club.gif",
            basic_qty: "20", basic_item: "Cyclops Toe", basic_img: "images/itensimbui/cyclops_toe.gif",
            intricate_qty: "15", intricate_item: "Ogre Nose Ring", intricate_img: "images/itensimbui/ogre_nose_ring.gif",
            powerful_qty: "10", powerful_item: "Warmaster's Wristguards", powerful_img: "images/itensimbui/warmasters_wristguards.gif",
            categoria: "Aumento de Skill"
        },
        {
            imbuement: "Punch (Skill First)",
            imbuement_img: "images/iconsimbui/first.gif",
            basic_qty: "25", basic_item: "Tarantula Egg", basic_img: "images/itensimbui/tarantula_egg.gif",
            intricate_qty: "20", intricate_item: "Mantassin Tail", intricate_img: "images/itensimbui/mantassin_tail.gif",
            powerful_qty: "15", powerful_item: "Gold-Brocaded Cloth", powerful_img: "images/itensimbui/gold_brocaded_cloth.gif",
            categoria: "Aumento de Skill"
        },
        {
            imbuement: "Featherweight (Cap)",
            imbuement_img: "images/iconsimbui/cap.gif",
            basic_qty: "20", basic_item: "Fairy Wings", basic_img: "images/itensimbui/fairy_wings.gif",
            intricate_qty: "10", intricate_item: "Little Bowl of Myrrh", intricate_img: "images/itensimbui/little_bowl_of_myrrh.gif",
            powerful_qty: "5", powerful_item: "Goosebump Leather", powerful_img: "images/itensimbui/goosebump_leather.gif",
            categoria: "Suporte"
        },
        {
            imbuement: "Strike (Dano Crítico)",
            imbuement_img: "images/iconsimbui/critico.gif",
            basic_qty: "20", basic_item: "Protective Charm", basic_img: "images/itensimbui/protective_charm.gif",
            intricate_qty: "25", intricate_item: "Sabretooth", intricate_img: "images/itensimbui/sabretooth.gif",
            powerful_qty: "5", powerful_item: "Vexclaw Talon", powerful_img: "images/itensimbui/vexclaw_talon.gif",
            categoria: "Suporte"
        },
        {
            imbuement: "Swiftness (Speed)",
            imbuement_img: "images/iconsimbui/speed.gif",
            basic_qty: "15", basic_item: "Damselfly Wing", basic_img: "images/itensimbui/damselfly_wing.gif",
            intricate_qty: "25", intricate_item: "Compass", intricate_img: "images/itensimbui/compass.gif",
            powerful_qty: "20", powerful_item: "Waspoid Wing", powerful_img: "images/itensimbui/waspoid_wing.gif",
            categoria: "Suporte"
        },
        {
            imbuement: "Vampirism (Life Leech)",
            imbuement_img: "images/iconsimbui/lifeleech.gif",
            basic_qty: "25", basic_item: "Vampire Teeth", basic_img: "images/itensimbui/vampire_teeth.gif",
            intricate_qty: "15", intricate_item: "Bloody Pincers", intricate_img: "images/itensimbui/bloody_pincers.gif",
            powerful_qty: "5", powerful_item: "Piece of Dead Brain", powerful_img: "images/itensimbui/piece_of_dead_brain.gif",
            categoria: "Suporte"
        },
        {
            imbuement: "Vibrancy (Remove Paralyze)",
            imbuement_img: "images/iconsimbui/removeparalyze.gif",
            basic_qty: "20", basic_item: "Wereboar Hooves", basic_img: "images/itensimbui/wereboar_hooves.gif",
            intricate_qty: "15", intricate_item: "Crystallized Anger", intricate_img: "images/itensimbui/crystallized_anger.gif",
            powerful_qty: "5", powerful_item: "Quill", powerful_img: "images/itensimbui/quill.gif",
            categoria: "Suporte"
        },
        {
            imbuement: "Void (Mana Leech)",
            imbuement_img: "images/iconsimbui/manaleech.gif",
            basic_qty: "25", basic_item: "Rope Belt", basic_img: "images/itensimbui/rope_belt.gif",
            intricate_qty: "25", intricate_item: "Silencer Claws", intricate_img: "images/itensimbui/silencer_claws.gif",
            powerful_qty: "5", powerful_item: "Some Grimeleech Wings", powerful_img: "images/itensimbui/some_grimeleech_wings.gif",
            categoria: "Suporte"
        },
        {
            imbuement: "Cloud Fabric (Proteção de Energy)",
            imbuement_img: "images/iconsimbui/protenergy.gif",
            basic_qty: "20", basic_item: "Wyvern Talisman", basic_img: "images/itensimbui/wyvern_talisman.gif",
            intricate_qty: "15", intricate_item: "Crawler Head Plating", intricate_img: "images/itensimbui/crawler_head_plating.gif",
            powerful_qty: "10", powerful_item: "Wyrm Scale", powerful_img: "images/itensimbui/wyrm_scale.gif",
            categoria: "Proteção Elemental"
        },
        {
            imbuement: "Demon Presence (Proteção de Holy)",
            imbuement_img: "images/iconsimbui/protholy.gif",
            basic_qty: "25", basic_item: "Cultish Robe", basic_img: "images/itensimbui/cultish_robe.gif",
            intricate_qty: "25", intricate_item: "Cultish Mask", intricate_img: "images/itensimbui/cultish_mask.gif",
            powerful_qty: "20", powerful_item: "Hellspawn Tail", powerful_img: "images/itensimbui/hellspawn_tail.gif",
            categoria: "Proteção Elemental"
        },
        {
            imbuement: "Dragon Hide (Proteção de Fire)",
            imbuement_img: "images/iconsimbui/protfire.gif",
            basic_qty: "20", basic_item: "Green Dragon Leather", basic_img: "images/itensimbui/green_dragon_leather.gif",
            intricate_qty: "10", intricate_item: "Blazing Bone", intricate_img: "images/itensimbui/blazing_bone.gif",
            powerful_qty: "5", powerful_item: "Draken Sulphur", powerful_img: "images/itensimbui/draken_sulphur.gif",
            categoria: "Proteção Elemental"
        },
        {
            imbuement: "Lich Shroud (Proteção de Death)",
            imbuement_img: "images/iconsimbui/protdeath.gif",
            basic_qty: "25", basic_item: "Flask of Embalming Fluid", basic_img: "images/itensimbui/flask_of_embalming_fluid.gif",
            intricate_qty: "20", intricate_item: "Gloom Wolf Fur", intricate_img: "images/itensimbui/gloom_wolf_fur.gif",
            powerful_qty: "5", powerful_item: "Mystical Hourglass", powerful_img: "images/itensimbui/mystical_hourglass.gif",
            categoria: "Proteção Elemental"
        },
        {
            imbuement: "Quara Scale (Proteção de Ice)",
            imbuement_img: "images/iconsimbui/protice.gif",
            basic_qty: "25", basic_item: "Winter Wolf Fur", basic_img: "images/itensimbui/winter_wolf_fur.gif",
            intricate_qty: "15", intricate_item: "Thick Fur", intricate_img: "images/itensimbui/thick_fur.gif",
            powerful_qty: "10", powerful_item: "Deepling Warts", powerful_img: "images/itensimbui/deepling_warts.gif",
            categoria: "Proteção Elemental"
        },
        {
            imbuement: "Snake Skin (Proteção de Poison)",
            imbuement_img: "images/iconsimbui/protpoison.gif",
            basic_qty: "25", basic_item: "Piece of Swampling Wood", basic_img: "images/itensimbui/piece_of_swampling_wood.gif",
            intricate_qty: "20", intricate_item: "Snake Skin", intricate_img: "images/itensimbui/snake_skin.gif",
            powerful_qty: "10", powerful_item: "Brimstone Fangs", powerful_img: "images/itensimbui/brimstone_fangs.gif",
            categoria: "Proteção Elemental"
        },
        {
            imbuement: "Reap (Dano de Death)",
            imbuement_img: "images/iconsimbui/danodeath.gif",
            basic_qty: "25", basic_item: "Pile of Grave Earth", basic_img: "images/itensimbui/pile_of_grave_earth.gif",
            intricate_qty: "20", intricate_item: "Demonic Skeletal Hand", intricate_img: "images/itensimbui/demonic_skeletal_hand.gif",
            powerful_qty: "5", powerful_item: "Petrified Scream", powerful_img: "images/itensimbui/petrified_scream.gif",
            categoria: "Dano Elemental"
        },
        {
            imbuement: "Electrify (Dano de Energy)",
            imbuement_img: "images/iconsimbui/danoenergy.gif",
            basic_qty: "25", basic_item: "Rorc Feather", basic_img: "images/itensimbui/rorc_feather.gif",
            intricate_qty: "5", intricate_item: "Peacock Feather Fan", intricate_img: "images/itensimbui/peacock_feather_fan.gif",
            powerful_qty: "1", powerful_item: "Energy Vein", powerful_img: "images/itensimbui/energy_vein.gif",
            categoria: "Dano Elemental"
        },
        {
            imbuement: "Venom (Dano de Poison)",
            imbuement_img: "images/iconsimbui/danopoison.gif",
            basic_qty: "25", basic_item: "Swamp Grass", basic_img: "images/itensimbui/swamp_grass.gif",
            intricate_qty: "20", intricate_item: "Poisonous Slime", intricate_img: "images/itensimbui/poisonous_slime.gif",
            powerful_qty: "2", powerful_item: "Slime Heart", powerful_img: "images/itensimbui/slime_heart.gif",
            categoria: "Dano Elemental"
        },
        {
            imbuement: "Frost (Dano de Ice)",
            imbuement_img: "images/iconsimbui/danoice.gif",
            basic_qty: "25", basic_item: "Frosty Heart", basic_img: "images/itensimbui/frosty_heart.gif",
            intricate_qty: "10", intricate_item: "Seacrest Hair", intricate_img: "images/itensimbui/seacrest_hair.gif",
            powerful_qty: "5", powerful_item: "Polar Bear Paw", powerful_img: "images/itensimbui/polar_bear_paw.gif",
            categoria: "Dano Elemental"
        },
        {
            imbuement: "Scorch (Dano de Fire)",
            imbuement_img: "images/iconsimbui/danofire.gif",
            basic_qty: "25", basic_item: "Fiery Heart", basic_img: "images/itensimbui/fiery_heart.gif",
            intricate_qty: "5", intricate_item: "Green Dragon Scale", intricate_img: "images/itensimbui/green_dragon_scale.gif",
            powerful_qty: "
