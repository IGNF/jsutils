var utils = utils || {};

/**
 * Heritage
 * @param {Object} child
 * @param {Object} parent
 * @returns {undefined}
 */
utils.inherits = function (child,parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
};

/**
 * Returns unique identifier
 * @returns {String}
 */
utils.guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
};

/**
 * Inverse les cles/valeurs d'un objet js 
 * 
 * @param {Object} object
 * @returns {Object}
 */
utils.swapKeyValue = function(object)
{
    var result = {};
    for(var key in object){
        result[object[key]] = key;
    }
    return result;
};
    
/**
 * Verifie si object est bein un objet js
 * @param {Object} object
 * @returns {Boolean}
 */
utils.isObject = function(object) {
    return object instanceof Object && object.constructor === Object;
};

/**
 * 
 * @param {string} str
 * @returns {object}
 */
utils.parseHashParams = function(str) {
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
};

/**
 * Supprime les accents d'une chaine de caracteres
 * œ => OE et æ => AE
 */
utils.RemoveDiacritics = function(str) {
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
};


utils.RegexHelp = {
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
};