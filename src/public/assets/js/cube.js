let colisID = '';
let zoneChoisie = '';
let niveauActuel = 1; // 1 = bas, 2 = milieu, 3 = haut
let niveaux = { bas: 0, milieu: 0, haut: 0 }; // Compteurs pour chaque niveau
let contenuZones = { bas: [], milieu: [], haut: [] }; // IDs des colis rangés

function scannerColis() {
    colisID = document.getElementById('colis').value.trim();
    if (colisID !== '') {
        document.getElementById('confirmation').innerText = '';
        alert('Colis scanné : ' + colisID);
    }
}

function choisirZone(zone) {
    if (colisID === '') {
        alert('Veuillez d\'abord scanner un colis.');
        return;
    }
    if (document.getElementById(`zone-${zone}`).classList.contains('disabled')) {
        alert('Ce niveau est désactivé.');
        return;
    }
    if (niveaux[zone] >= 10) {
        alert('Ce niveau est déjà plein (10 colis max).');
        return;
    }

    // Vérification si le colis est déjà dans cette zone
    if (contenuZones[zone].includes(colisID)) {
        alert('Ce colis est déjà rangé dans cette zone.');
        return;
    }

    // Ajouter le colis à la collection de la zone actuelle
    contenuZones[zone].push(colisID);
    niveaux[zone]++;
    alert(`Colis ${colisID} rangé dans la zone : ${zone}.`);

    // Mettre à jour l'affichage des compteurs
    afficherCompteurs();

    // Réinitialiser pour le prochain colis
    colisID = '';
    document.getElementById('colis').value = ''; // Vider le champ de saisie

    // Vérifier si la zone est pleine pour désactiver le niveau
    if (niveaux[zone] >= 10) {
        alert('Ce niveau est déjà plein (10 colis max).');
        griserNiveau(zone);
    }
}
function resetZones() {
    document.querySelectorAll('.zone').forEach(zone => zone.classList.remove('selected'));
}

function confirmerRangement() {
    
    // Mise à jour de l'affichage des compteurs
    afficherCompteurs();

    // Vérification pour passer au niveau suivant
    if (peutPasserNiveau()) {
        griserNiveau(niveauActuel); // Désactiver le niveau actuel
        changerNiveau(); // Passer au niveau suivant
    } else {
        alert('Colis rangé. Continuez à remplir ce niveau.');
    }
}

function peutPasserNiveau() {
    return niveaux[getZoneActuelle()] >= 1;
}

function griserNiveau(niveau) {
    const zone = getZoneActuelle();
    document.getElementById(`zone-${zone}`).classList.add('disabled');
}

function changerNiveau() {
    if (niveauActuel < 3) {
        niveauActuel++;
        activerNiveau(niveauActuel);
    } else {
        alert('Tous les niveaux sont remplis. Travail terminé !');
    }
}

function activerNiveau(niveau) {
    const zone = getZoneActuelle();
    document.getElementById(`zone-${zone}`).classList.remove('disabled');
}

function afficherCompteurs() {
    document.getElementById('compteurs').innerText = `
        Bas : ${niveaux.bas} colis | Milieu : ${niveaux.milieu} colis | Haut : ${niveaux.haut} colis`;
}

function regarderCase(zone) {
    const contenu = contenuZones[zone];
    if (contenu.length === 0) {
        document.getElementById('contenu').innerText = `La zone ${zone} est vide.`;
    } else {
        document.getElementById('contenu').innerText = `Contenu de la zone ${zone} : ${contenu.join(', ')}`;
    }
}

function getZoneActuelle() {
    if (niveauActuel === 1) return 'bas';
    if (niveauActuel === 2) return 'milieu';
    if (niveauActuel === 3) return 'haut';
}