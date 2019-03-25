// Fonction de désactivation de l'affichage des "tooltips"
function desactiverTooltips() {

    var tooltips = document.getElementsByClassName('tooltip'),
        tooltipsLength = tooltips.length;

    for (var i = 0; i < tooltipsLength; i++) {
        tooltips[i].style.display = 'none';
    }

}


// La fonction ci-dessous permet de récupérer la "tooltip" qui correspond à notre input

function getTooltip(elements) {

    while (elements = elements.nextSibling) {
        if (elements.className === 'tooltip') {
            return elements;
        }
    }

    return false;

}


// Fonctions de vérification du formulaire, elles renvoient "true" si tout est ok

var check = {}; // On met toutes nos fonctions dans un objet littéral

check['sex'] = function() {

    var sex = document.getElementsByName('sex'),
        tooltipStyle = getTooltip(sex[1].parentNode).style;

    if (sex[0].checked || sex[1].checked) {
        tooltipStyle.display = 'none';
        return true;
    } else {
        tooltipStyle.display = 'inline-block';
        return false;
    }

};

check['lastName'] = function(id) {

    var name = document.getElementById(id),
        tooltipStyle = getTooltip(name).style;
    var regex_nom_prenom = /[a-zA-Z_-]{2,16}$/;

    if ((name.value.length >= 2) && regex_nom_prenom.test(name.value)) {
        name.style.border = "2px solid #00FF00";
        tooltipStyle.display = 'none';
        return true;
    } else {
        name.style.border = "2px solid #FF0000";
        tooltipStyle.display = 'inline-block';
        return false;
    }

};

check['firstName'] = check['lastName']; // La fonction pour le prénom est la même que celle du nom

check['age'] = function() {

    var age = document.getElementById('age'),
        tooltipStyle = getTooltip(age).style,
        ageValue = parseInt(age.value);

    if (!isNaN(ageValue) && ageValue >= 5 && ageValue <= 140) {
        age.style.border = "2px solid #00FF00";
        tooltipStyle.display = 'none';
        return true;
    } else {
        age.style.border = "2px solid #FF0000";
        tooltipStyle.display = 'inline-block';
        return false;
    }

};

check['login'] = function() {

    var login = document.getElementById('login'),
        tooltipStyle = getTooltip(login).style,
        regex_login = /[a-zA-Z0-9._-]{4,16}$/;

    if ((login.value.length >= 4) && regex_login.test(login.value)) {
        login.style.border = "2px solid #00FF00";
        tooltipStyle.display = 'none';
        return true;
    } else {
        login.style.border = "2px solid #FF0000";
        tooltipStyle.display = 'inline-block';
        return false;
    }

};

check['pwd1'] = function() {

    var pwd1 = document.getElementById('pwd1'),
        tooltipStyle = getTooltip(pwd1).style;

    if (pwd1.value.length >= 6) {
        pwd1.style.border = "2px solid #00FF00";
        tooltipStyle.display = 'none';
        return true;
    } else {
        pwd1.style.border = "2px solid #FF0000";
        tooltipStyle.display = 'inline-block';
        return false;
    }

};

check['pwd2'] = function() {

    var pwd1 = document.getElementById('pwd1'),
        pwd2 = document.getElementById('pwd2'),
        tooltipStyle = getTooltip(pwd2).style;

    if (pwd1.value == pwd2.value && pwd2.value != '') {
        pwd2.style.border = "2px solid #00FF00";
        tooltipStyle.display = 'none';
        return true;
    } else {
        pwd2.style.border = "2px solid #FF0000";
        tooltipStyle.display = 'inline-block';
        return false;
    }

};

check['country'] = function() {

    var country = document.getElementById('country'),
        tooltipStyle = getTooltip(country).style;

    if (country.options[country.selectedIndex].value != 'none') {
        tooltipStyle.display = 'none';
        return true;
    } else {
        tooltipStyle.display = 'inline-block';
        return false;
    }

};


// Mise en place des événements

(function() { // Utilisation d'une IIFE pour éviter les variables globales.

    var myForm = document.getElementById('myForm'),
        inputs = document.querySelectorAll('input[type=text], input[type=password]'),
        inputsLength = inputs.length;

    for (var i = 0; i < inputsLength; i++) {
        inputs[i].addEventListener('keyup', function(e) {
            check[e.target.id](e.target.id); // "e.target" représente l'input actuellement modifié
        });
    }

    myForm.addEventListener('submit', function(e) {

        var result = true;

        for (var i in check) {
            result = check[i](i) && result;
        }

        if (result) {
            alert('Le formulaire est bien rempli.');
        }

        e.preventDefault();

    });

    myForm.addEventListener('reset', function() {

        for (var i = 0; i < inputsLength; i++) {
            inputs[i].className = '';
        }

        desactiverTooltips();

    });

})();


// Maintenant que tout est initialisé, on peut désactiver les "tooltips"

desactiverTooltips();