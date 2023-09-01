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

autolinker
----------

Transforme les URLs, adresses email, numéros de téléphones... en liens cliquables
dans un bloc de texte ou un contenu HTML.

https://github.com/gregjacobs/Autolinker.js

bootbox
-------

Boites de dialogues modales pour bootstrap.

http://bootboxjs.com/

colorpicker
-----------

Sélecteur de couleur.

http://mjolnic.github.io/bootstrap-colorpicker/ n'existe plus.

a sans doute été remplacé par : https://github.com/farbelous/bootstrap-colorpicker

datetimepicker
--------------

Sélecteur de date et heure.
Nécessite la librairie Moment à la racine de js/.

https://github.com/Eonasdan/bootstrap-datetimepicker

filestyle
---------

Extension de Bootstrap pour les input de type file.

https://github.com/markusslima/bootstrap-filestyle

GpPluginOpenLayers
------------------

Extension Géoportail pour OL3

https://github.com/IGNF/geoportal-extensions/

inputmasks
----------

Extension JQuery IGN pour limiter la saisie dans un champs ou on souhaite une valeur numérique.

jqueryfileupload
----------------

???

tablesorter
-----------

Extension JQuery pour rendre les tableaux HTML triables en cliquant sur les en-têtes
de colonnes.

http://tablesorter.com

typeahead
---------

Extension Bootstrap 3 d'autocomplétion
