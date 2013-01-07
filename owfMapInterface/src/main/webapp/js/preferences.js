new function() {
    
    /**
     * Current preferences for the widget.
     * 
     * @private
     * @type Map
     */
    this.widgetPreferences = {
        layerConfiguration:[]
    };
    
    /**
     * OWF widget eventing controller.
     * 
     * @private
     * @type Object
     */
    this.widgetEventingController = null; 


    /**
     * Event handler to remove the selected layers from the widget's configuration.
     *
     * @param {Object} context    Class object context.
     * @param {MouseEvent} event  Dojo mouse event object.
     */ 
    this.removeLayers = function(context, event) {
        owfdojo.query("#layerInformation > tr > td > input[type='checkbox']:checked").forEach(function(obj) {
            for(var i=0; i< context.widgetPreferences.layerConfiguration.length; i++) {
                if(context.widgetPreferences.layerConfiguration[i].id == obj.value) {
                    context.widgetPreferences.layerConfiguration.splice(i, 1);
                    break;
                }
            }
        });
        
        context.savePreferences(context.widgetPreferences);
    }
    
    /**
     * Loads the preferences for the widget from the underlying OWF preferences module.
     * If layer configurations are located then initialization of the OpenLayers module is
     * automatically bootstrapped.
     *
     * @param {Object} context  Class object context.
     */     
    this.loadPreferences = function(context) {        
        Ozone.pref.PrefServer.getUserPreference({
            namespace: "com.geocent.owf.owfMapInterface",
            name: "widgetPreferences",
            onSuccess: function(widgetPreferences) {
                var preferences = owfdojo.fromJson(widgetPreferences.value);
                if( preferences != undefined && preferences != null ) {
                    context.widgetPreferences = preferences;
                    
                    owfdojo.empty("layerInformation");
                    owfdojo.forEach(context.widgetPreferences.layerConfiguration, function(obj){
                        owfdojo.create("tr", {
                            innerHTML: "<td><input type='checkbox' name='layers' value='"+obj.id+"'/></td><td>"+obj.title+"</td>"
                            }, "layerInformation");
                    });
                }
            },
            onFailure: function(error, status) {
                if (status != 404) {
                    Ozone.util.ErrorDlg.show("Error loading preferences.");            
                }
            }
        });
    }
    
    /**
     * Saves the specified preferences for the widget to the underlying OWF preferences module.
     *
     * @param {Map} preferences  Configured widget preferences to save.
     */
    this.savePreferences = function(preferences) {
        Ozone.pref.PrefServer.setUserPreference({
            namespace: "com.geocent.owf.owfMapInterface",
            name: "widgetPreferences",
            value: owfdojo.toJson(preferences),
            onSuccess: function() {
                window.location.reload();
            },
            onFailure: function(error, status) {
                if (status != 404) {
                    Ozone.util.ErrorDlg.show("Error saving preferences.");            
                }
            }
        });        
    }
    
    /* Psudo-Constructor */
    {
        var context = this;
        
        owfdojo.addOnLoad(function(){        
            owfdojo.connect(owfdojo.byId("preferencesRemove"), "onclick", context, function(e){
                context.removeLayers(context, e);
            });

            owfdojo.connect(owfdojo.byId("preferencesClose"), "onclick", context, function(e){
                window.location.href = "index.jsp";
            });

            context.widgetEventingController = Ozone.eventing.Widget.getInstance();
            context.loadPreferences(context);
        });
    }
}();