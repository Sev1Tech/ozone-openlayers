/*
 * Copyright (c) 2012 Geocent - Published under the MIT License.
 * See LICENSE for the full text of the license.
 */
 
new function() {
    
    /**
     * Current preferences for the widget.
     * 
     * @private
     * @type Map
     */
    this.widgetPreferences = {
        layerConfiguration:[],
        widgetConfiguration:{
            channelEnabled: true,
            intentsEnabled: true
        }
    };
    
    /**
     * OGC layer configurations.
     * 
     * @private
     * @type Array<Map>
     * @see OGC_TYPES
     */
    this.ogcConfiguration = [];
    
    /**
     * OWF widget eventing controller.
     * 
     * @private
     * @type Object
     */
    this.widgetEventingController = null; 
    
    /**
     * Initialize the preferenced interfac for the widget.
     * 
     * @param {Map} ogcTypes OGC layer configurations as specified in {@link OGC_TYPES}.
     */
    this.initializePreferences = function(ogcTypes) {
        var context = this;
        
        context.ogcConfiguration = ogcTypes;
        owfdojo.addOnLoad(function(){
            owfdojo.forEach(ogcTypes, function(obj) {
                if(obj !== undefined) {
                    owfdojo.create("option", {
                        value: obj.value, 
                        innerHTML: obj.name
                    }, "newLayerType");
                }
            });
            
            owfdojo.connect(owfdojo.byId("preferencesAdd"), "onclick", context, function(e){
                context.addLayer(context, e);
            });
            
            owfdojo.connect(owfdojo.byId("newLayerType"), "onchange", context, function(e){
                var layerConfiguration = context.getOgcConfiguration(context, owfdojo.query("#newLayerType > option:checked")[0].value);
                if(layerConfiguration !== null) {
                    context.processVisuals(context, layerConfiguration);
                }
            });
            
            owfdojo.connect(owfdojo.byId("enableChannel"), "onchange", context, function(e){
                context.updateWidgetConfiguration(context);
            });

            owfdojo.connect(owfdojo.byId("enableIntents"), "onchange", context, function(e){
                context.updateWidgetConfiguration(context);
            });

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
    
    /**
     * Get the configuration for the specified OGC layer type.
     *
     * @param {Object} context  Class object context.
     * @param {Map} type        Type of the layer as specified in {@link OGC_TYPES}.
     * 
     * @returns {Map} Full configuration for the layer as specified in {@link OGC_TYPES. Otherwise null.
     */
    this.getOgcConfiguration = function(context, type) {
        for(var i=0; i < context.ogcConfiguration.length; i++) {
            if(context.ogcConfiguration[i].value === type) {
                return context.ogcConfiguration[i];
            }
        }
        
        return null;        
    }
    
    /**
     * Class helper function to process the visual states of UI elements based on the
     * required values from the layer configuration as specified in {@link OGC_TYPES}. 
     *
     * @param {Object} context          Class object context.
     * @param {Map} layerConfiguration  Specific layer configuration to process.
     */
    this.processVisuals = function(context, layerConfiguration) {
        context.processSelection(owfdojo.indexOf(layerConfiguration.requires, "layerName") > -1, "newLayerName");
        context.processSelection(owfdojo.indexOf(layerConfiguration.requires, "layerIsBaseLayer") > -1, "newLayerIsBaseLayer");
        context.processSelection(owfdojo.indexOf(layerConfiguration.requires, "layerSingleTile") > -1, "newLayerSingleTile");
        context.processSelection(owfdojo.indexOf(layerConfiguration.requires, "imageType") > -1, "newLayerImageType");
        context.processSelection(owfdojo.indexOf(layerConfiguration.requires, "featureType") > -1, "newLayerFeatureType");
        context.processSelection(owfdojo.indexOf(layerConfiguration.requires, "featureNS") > -1, "newLayerFeatureNamespace");
    }
    
    
    /**
     * Class helper function to process the visual state of UI elements based on their required states.
     *
     * @param {Boolean} controlValue  Logical value upon which to process the visual element.
     * @param {String} controlId      ID of the associated control.
     */
    this.processSelection = function(controlValue, controlId) {
        var node = owfdojo.byId(controlId);
        
        if(controlValue) {
            owfdojo.query("#"+controlId)
            .map(function(x){
                return x.parentNode
            })
            .removeClass("hidden")
            .addClass("shown");
        }
        else {
            if(node.nodeName === "SELECT"){
                node.selectedIndex = -1;
            }
            else {
                node.value = "";
            }
            
            owfdojo.query("#"+controlId)
            .map(function(x){
                return x.parentNode
            })
            .removeClass("shown")
            .addClass("hidden");
        }
    }
    
    /**
     * Adds the specified layer information to the widget preferences and persists the data.
     *
     * @param {Object} context  Class object context.
     * @param {Event} event     Event object for the action.
     */
    this.addLayer = function(context, event) {
        var layerConfiguration = context.getOgcConfiguration(context, owfdojo.query("#newLayerType > option:checked")[0].value);
        
        var layerData = {
            id: uuid.v4(),
            title: owfdojo.byId("newLayerTitle").value,
            type: layerConfiguration.value,
            url: owfdojo.byId("newLayerUrl").value
        }
        
        if(owfdojo.indexOf(layerConfiguration.requires, "layerName") > -1) {
            layerData.layerName = owfdojo.byId("newLayerName").value;
        }
        
        if(owfdojo.indexOf(layerConfiguration.requires, "layerIsBaseLayer") > -1) {
            layerData.layerIsBaseLayer = owfdojo.byId("newLayerIsBaseLayer").checked;
        }
        
        if(owfdojo.indexOf(layerConfiguration.requires, "layerSingleTile") > -1) {
            layerData.layerSingleTile = owfdojo.byId("newLayerSingleTile").checked;
        }
        
        if(owfdojo.indexOf(layerConfiguration.requires, "imageType") > -1) {
            layerData.imageType = owfdojo.query("#newLayerImageType > option:checked")[0].value;
        }
        
        if(owfdojo.indexOf(layerConfiguration.requires, "featureType") > -1) {
            layerData.featureType = owfdojo.byId("newLayerFeatureType").value;
        }
        
        if(owfdojo.indexOf(layerConfiguration.requires, "featureNS") > -1) {
            layerData.featureNS = owfdojo.byId("newLayerFeatureNamespace").value;
        }
                
        if(!context.layerExistsByInfo(context, layerData.title, layerData.type, layerData.url)) {
            context.widgetPreferences.layerConfiguration.push(layerData);
            context.savePreferences(context.widgetPreferences);
        }
        else {
            Ozone.util.ErrorDlg.show("Specified layer information already exists.");            
        }
    }
    
    /**
     * Removes all selected layers and associated data from the preferences dialog.
     * Note that the preferences are not persisted until {@link savePreferences} is executed.
     *
     * @param {Object} context  Class object context.
     * @param {Event} event     Event object for the action.
     */
    this.removeLayers = function(context, event) {
        owfdojo.query("#layerInformation > tr > td > input[type='checkbox']:checked").forEach(function(obj) {
            for(var i=0; i< context.widgetPreferences.layerConfiguration.length; i++) {
                if(context.widgetPreferences.layerConfiguration[i].id === obj.value) {
                    context.widgetPreferences.layerConfiguration.splice(i, 1);
                    break;
                }
            }
        });
        
        context.savePreferences(context.widgetPreferences);
    }
    
    /**
     * Check if the described layer already exists within the configured list of layer objects.
     *
     * @param {Object} context  Class object context.
     * @param {String} title    Title of the layer.
     * @param {String} url      Data URL for the layer.
     * @param {String} type     Type string of the layer.
     * 
     * @return {Boolean} true if the layer exists, otherwise false
     */  
    this.layerExistsByInfo = function(context, title, type, url) {
        var exists = false;
        owfdojo.forEach(context.widgetPreferences.layerConfiguration, function(obj){
            exists = exists ? true : (obj.title === title && obj.type === type && obj.url === url );
        });        
        
        return exists;
    }
    
    /**
     * Update the configuration information for the widget.
     *
     * @param {Object} context  Class object context.
     */
    this.updateWidgetConfiguration = function(context) {
        context.widgetPreferences.widgetConfiguration.channelEnabled = owfdojo.byId("enableChannel").checked;
        context.widgetPreferences.widgetConfiguration.intentsEnabled = owfdojo.byId("enableIntents").checked;

        context.savePreferences(context.widgetPreferences);
    }

    /**
     * Loads the preferences for the widget from the underlying OWF preferences module.
     *
     * @param {Object} context  Class object context.
     */
    this.loadPreferences = function(context) {
        Ozone.pref.PrefServer.getUserPreference({
            namespace: "com.geocent.owf.widget-openlayers-manager",
            name: "widgetPreferences",
            onSuccess: function(widgetPreferences) {
                var preferences = owfdojo.fromJson(widgetPreferences.value);
                if( preferences !== undefined && preferences !== null ) {
                    context.widgetPreferences = preferences;
                    
                    owfdojo.empty("layerInformation");
                    owfdojo.forEach(context.widgetPreferences.layerConfiguration, function(obj){
                        owfdojo.create("tr", {
                            innerHTML: "<td><input type='checkbox' name='layers' value='"+obj.id+"'/></td><td>"+obj.title+"</td><td>"+obj.type+"</td>"
                        }, "layerInformation");
                    });
                    owfdojo.byId("enableChannel").checked = context.widgetPreferences.widgetConfiguration.channelEnabled;
                    owfdojo.byId("enableIntents").checked = context.widgetPreferences.widgetConfiguration.intentsEnabled;
                    
                }
            },
            onFailure: function(error, status) {
                if (status !== 404) {
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
            namespace: "com.geocent.owf.widget-openlayers-manager",
            name: "widgetPreferences",
            value: owfdojo.toJson(preferences),
            onSuccess: function() {
                window.location.reload();
            },
            onFailure: function(error, status) {
                if (status !== 404) {
                    Ozone.util.ErrorDlg.show("Error saving preferences.");            
                }
            }
        });        
    }
    
    /* Pseudo-Constructor */
    {
        this.initializePreferences(OGC_TYPES);   
    }
}();