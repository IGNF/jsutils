const utils = require('./utils');

module.exports = {
    QueryFilter: function() {
        /**
         * Retourne le format pour les types Date,DateTime,Year et YearMonth
         * @param {String} type 
         */
        function getDateFormat(type) {
            switch(type) {
                case 'Date':
                    return 'YYYY-MM-DD';
                case 'DateTime':
                    return 'YYYY-MM-DD HH:mm:ss';
                case 'Year':
                    return 'YYYY';
                case 'YearMonth':
                    return 'YYYY-MM';
                default: console.error("Type forbidden");
            }
        };

        /**
         *
         * @param {object} attribute
         * @returns object
         */
        function getFilterComplement(attribute) {
            var complement = {};

            switch(attribute.type) {
                case 'String':
					complement['type'] = 'string';
                    if (! attribute.listOfValues) {
                        complement['input'] = 'text';
                        complement['operators'] = ['equal','not_equal','begins_with','not_begins_with','contains','not_contains','ends_with','not_ends_with','is_empty','is_not_empty'];
						if (attribute.nullable) {
							complement['operators'] = complement['operators'].concat(['is_null', 'is_not_null']);
						}
                    } else if (Array.isArray(attribute.listOfValues)) {  // Array
                        complement['input'] = 'select';
                        complement['values'] = attribute.listOfValues;
                        complement['operators'] = ['in','not_in','is_empty','is_not_empty'];
                        complement['multiple'] = true;
                    } else if (utils.isObject(attribute.listOfValues)) {
                        complement['input'] = 'select';
                        complement['values'] = utils.swapKeyValue(attribute.listOfValues);
                        complement['operators'] = ['in','not_in','is_empty','is_not_empty'];
                        complement['multiple'] = true;
                    }
                    break;
                case 'Integer':
                    complement['type'] = 'integer';
                    complement['input'] = 'number';
                    complement['operators'] = ['equal','not_equal','less','less_or_equal','greater','greater_or_equal','between','not_between'];
                    if (attribute.nullable) {
                        complement['operators'] = complement['operators'].concat(['is_null', 'is_not_null']);
                    }
                    break;
                case 'Double':
                    complement['type'] = 'double';
                    complement['input'] = 'number';
                    complement['operators'] = ['less','less_or_equal','greater','greater_or_equal','between','not_between'];
                    if (attribute.nullable) {
                        complement['operators'] = complement['operators'].concat(['is_null', 'is_not_null']);
                    }
                    break;
                case 'Boolean':
                    complement['type'] = 'boolean';
                    complement['input'] = 'radio';
                    complement['operators'] = ['equal'];
                    complement['values'] = [true,false];
                    if (attribute.nullable) {
                        complement['operators'] = complement['operators'].concat(['is_null', 'is_not_null']);
                    }
                    break;
                case 'Date':
                case 'DateTime':
                case 'Year':
                case 'YearMonth':
                    complement['type'] = (attribute.type === 'DateTime') ? 'datetime' : 'date';                  
                    complement['operators'] = ['equal','not_equal','less','less_or_equal','greater','greater_or_equal','between','not_between','is_empty','is_not_empty'];
                    if (attribute.nullable) {
                        complement['operators'] = complement['operators'].concat(['is_null', 'is_not_null']);
                    }
					complement['input_event'] = 'change.datetimepicker';
                    complement['plugin'] = 'datetimepicker';
                    complement['plugin_config'] = {
                        locale: 'fr',
                        format: getDateFormat(attribute.type),
                        useCurrent: 'day',
                        buttons: {
                            showToday: true,
                            showClear: true,
                            showClose: true
                        }
                    };
                    break;
                default:break;
            }

            return complement;
        };

        /**
         *
         * @param {object} featureType
         * @param {boolean} queryAbleOnly seulement les champs disponibles a la recherche
         * @returns array
         */
        this.getFilters = function(featureType, queryAbleOnly)	{
            var filters = [];
            $.each(featureType.attributes, function(key, attribute) {
                if (!attribute.queryable && queryAbleOnly) {
                    return true;
                }

                var filter = {
                    id: attribute.name,
                    label: attribute.title
                };

                var complement = getFilterComplement(attribute);
                if (Object.keys(complement).length) {
                    $.extend(filter, complement);
                    filters.push(filter);
                }
            });

            return filters;
        };
    }
};