module.exports = {
    /**
     * Heritage
     * @param {Object} child
     * @param {Object} parent
     * @returns {undefined}
     */
    inherits: function (child,parent) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
    },

    /**
     * Returns unique identifier
     * @returns {String}
     */
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
    },

    /**
     * Inverse les cles/valeurs d'un objet js 
     * 
     * @param {Object} object
     * @returns {Object}
     */
    swapKeyValue: function(object) {
        var result = {};
        for(var key in object){
            result[object[key]] = key;
        }
        return result;
    },
        
    /**
     * Verifie si object est bein un objet js
     * @param {Object} object
     * @returns {Boolean}
     */
    isObject: function(object) {
        return object instanceof Object && object.constructor === Object;
    },

    /**
     * 
     * @param {string} str
     * @returns {object}
     */
    parseHashParams: function(str) {
        if (! str) { return {}; }
        if (str.indexOf('#') === 0) {
            str = str.substring(1);
        }
        
        return str.split('&').reduce(function(result, item) {
            var parts = item.split('=');
            if (parts.length<2) { return result; }

            var key = decodeURIComponent(parts[0]);
            var value = decodeURIComponent(parts[1]);
            if (! value) { return result; }

            // Key is an array
            if ( key.indexOf("[]") !== -1 ) {
                key = key.substring( 0, key.indexOf("[]"));
                // Check already there
                if ( "undefined" === typeof result[key] ) {
                    result[key] = [];
                }
                result[key].push(value);
            } else {
                result[key] = value;
            }

            return result;
        },{});
    },

    /**
     * Supprime les accents d'une chaine de caracteres
     * œ => OE et æ => AE
     */
    /*removeDiacritics: function(str) {
        function removeLigature(s) {
            return s.replace(/\u0152/g, 'OE')
                .replace(/\u0153/g, 'oe')
                .replace(/\u00c6/g, 'AE')
                .replace(/\u00e6/g, 'ae');
                
        }
        if (! (typeof str === "string")) {
            return str;
        }
        var s = str.normalize('NFD');
        s = removeLigature(s);
        return s.replace(/[\u0300-\u036f]/g, "");
    },*/

    regexHelp: {
        /**
         * Retourne la regex sous forme de chaine de caracteres pour un mot clef
         * @param {String} s
         * @returns {String}
         */
        getRegex: function(s) {
            switch(s) {
                case 'email':
                    return '^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$';
                case 'url':
                    /* A INTEGRER
                    return '^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i'; */
                    return '^(https?:\\/\\/)?([\\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\\w\\.-]*)*\\/?$';
                case 'phoneNumber' : 
                    return '^(\\+33[ -]?|0)[1-9][ -]?(\\d{2}[ -]?){4}$';
                case 'zipCode': // Code postal
                    return '^((0[1-9]|[1-8]\\d|9[0-5])\\d{3})|((97[1-5]|98[46789])\\d{2})$';
                case 'inseeCode': // Code INSEE
                    return '^((0[1-9]|[1-8]\\d|9[0-5]|2[AB])\\d{3})|((97[1-5]|98[46789])\\d{2})$';
                default: return null;
            }
        }/*,
        escape: function(s) {   // Echappe une chaine de caractere
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }*/
    },

    isTrueValue: function(str) {
        return ["1", "true", "t", "vrai", "oui"].includes(str);
    },

    isFalseValue: function(str) {
        return ["0", "false", "f", "faux", "non"].includes(str);
    }
};