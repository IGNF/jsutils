ign/jsutils-bundle
=======

Ensemble de classes utilitaires javascripts (plugins jquery ...)
Déclaré comme bundle Symfony, les codes utiles sont dans JsUtilsBundle/resources/public
et sont installés automatiquement dans web par assetic.

installation
------------

Dans le .npmrc global (dans le dossier utilisateur sur windows) ou dans celui du projet ajouter les lignes suivantes, en remplaçant avec votre token:

@ign-mut:registry=https://gitlab.gpf-tech.ign.fr/api/v4/packages/npm/

//gitlab.gpf-tech.ign.fr/api/v4/packages/npm/:_authToken=MON_TOKEN

//gitlab.gpf-tech.ign.fr/api/v4/projects/:_authToken=MON_TOKEN

puis:

<pre>
npm add @ign-mut/jsutils-bundle
</pre>

datetimepicker
--------------

Sélecteur de date et heure.
Nécessite la librairie Moment à la racine de js/.

https://github.com/Eonasdan/bootstrap-datetimepicker



inputmasks
----------

Extension JQuery IGN pour limiter la saisie dans un champs ou on souhaite une valeur numérique.
