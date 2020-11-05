// ---------------------------------
// ---------- Plugin Name ----------
// ---------------------------------
// Brief plugin description
// ------------------------

;(function ($, window, document, undefined) {
    
    var pluginName = 'numericMask';

    function Plugin (element, isdouble) {
        this.element 	= element;
        this._name 		= pluginName;
        this._defaults 	= $.fn[pluginName].defaults;
        this.options 	= $.extend({}, this._defaults, { isDouble: (isdouble !== undefined) });

        this.init();
    };

    $.extend(Plugin.prototype, {
        // Initialisation
        init: function () {
            this.buildCache();
            this.bindEvents();
        },

        // Supprile l'instance du plugin
        destroy: function() {
            this.unbindEvents();
            this.$element.removeData();
        },

        // Cache DOM nodes pour la performance
        buildCache: function () {
            this.$element = $(this.element);
        },

        // Bind events that trigger methods
        bindEvents: function() {
            var plugin = this;
            plugin.$element.on('keyup' + '.' + this._name, function() {
                plugin.onKeyUp.call(plugin);
            });
        },

        // Unbind events that trigger methods
        unbindEvents: function() {
            this.$element.off('keyup' + '.' + this._name);
        },

        // Create custom methods
        onKeyUp: function() {
            var value = this.element.value;
			if (!value) {
                return;
            }

            var func  = (this.options.isDouble) ? parseFloat : parseInt;
            var regex = (this.options.isDouble) ? /[^0-9\.\-]/g : /[^0-9\-]/g;

            if (value != value.replace(regex, "")) {
                this.element.value = value.replace(regex, "");
            } else if (value != func(value) && value !== "-") {
                this.element.value = func(value);
                if (this.element.value === "NaN") { // parseFloat ou parseInt renvoie parfois NaN
                    this.element.value = "";
                }
            }

			// Affichage des div erreurs pour les min et max
            /*if ( $(this).attr('min') !== undefined && Number(this.value) < Number($(this).prop('min')) ) {
                $(this).parent().find('#'+this.name+'-error-min').show();
            } else {
                $(this).parent().find('#'+this.name+'-error-min').hide();
            }
            if ( $(this).attr('max') !== undefined && Number(this.value) > Number($(this).prop('max')) ) {
                $(this).parent().find('#'+this.name+'-error-max').show();
            } else {
                $(this).parent().find('#'+this.name+'-error-max').hide();
            }*/
        }
    });

    $.fn[pluginName] = function (options) {
        return this.each(function() {
            if ( !$.data( this, pluginName ) ) {
                $.data( this, pluginName, new Plugin( this, options ) );
            }
        });
    };

    $.fn[pluginName].defaults = {};
})( jQuery, window, document );
