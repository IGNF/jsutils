module.exports = {
    QueryFilter: function() {
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
                        complement['operators'] = ['equal','not_equal','is_empty','is_not_empty'];
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
                    complement['operators'] = ['equal','not_equal','less','less_or_equal','greater','greater_or_equal','is_empty','is_not_empty'];
                    if (attribute.nullable) {
                        complement['operators'] = complement['operators'].concat(['is_null', 'is_not_null']);
                    }
                    break;
                case 'Double':
                    complement['type'] = 'double';
                    complement['input'] = 'number';
                    complement['operators'] = ['equal','not_equal','less','less_or_equal','greater','greater_or_equal','is_empty','is_not_empty'];
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
                    complement['type'] = (attribute.type === 'Date') ? 'date' : 'datetime';
                    complement['operators'] = ['equal','not_equal','less','less_or_equal','greater','greater_or_equal','is_empty','is_not_empty'];
                    if (attribute.nullable) {
                        complement['operators'] = complement['operators'].concat(['is_null', 'is_not_null']);
                    }
                    complement['plugin'] = 'datepicker';
                    complement['input_event'] = 'change.datetimepicker';
                    complement['plugin_config'] = {
                        locale: 'fr',
                        format: (attribute.type === 'Date') ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss',
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
         * @param {boolean} queryAbleOnly
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
                    label: attribute.name
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
