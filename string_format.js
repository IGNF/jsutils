/**
 * Formatage d'une chaine de caracteres.
 * Exemple : StringFormat('{0} is dead, but {1} is alive! {0}', 'ASP', 'ASP.NET');
 * Resultat : ASP is dead, but ASP.NET is alive! ASP
 * 
 * @param {string} format 
 * @returns 
 */
StringFormat = function(format) {
    let args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};


module.exports = {
    StringFormat: StringFormat    
};