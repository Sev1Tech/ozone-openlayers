/*
 * Copyright (c) 2012 Geocent - Published under the MIT License.
 * See LICENSE for the full text of the license.
 */
 
new function(){
    
    /**
     * Openlayer manager object.
     * 
     * @private
     * @type OpenLayersManager
     */
    this.openLayersManager = null;
    
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
     * Initialize the OWF objects and hooks into the framework.
     *
     * @param {Object} context  Class object context.
     */
    this.initializeOWF = function(context) {    
        context.widgetEventingController = Ozone.eventing.Widget.getInstance();
        
        // Create and hook into the preferences window icon
        Ozone.chrome.WidgetChrome.getInstance({
            widgetEventingController: context.widgetEventingController
        }).insertHeaderButtons({
            items: [
            {
                xtype: 'widgettool',
                type: 'gear',
                itemId: 'preferences',
                handler: function(sender, data) {
                    window.location.href = "preferences.jsp";  
                }
            }
            ]
        });
        
        // Hook into the eventing communication channel
        context.widgetEventingController.subscribe("com.geocent.owf.widget-openlayers", function(sender, msg, channel){
            context.handleChannelMessage(context, sender, msg);
        });
        
        context.loadPreferences(context);
    }
    
    /**
     * Handler for receiving OWF event channel messages.
     *
     * @param {Object} context  Class object context.
     * @param {Map} sender      Sender data information.
     * @param {String} msg      Received channel message. Should be a JSON-formatted string of data.
     */
    this.handleChannelMessage = function(context, sender, msg) {
        var requestData = owfdojo.fromJson(msg);
        
        if('action' in requestData) {
            var action = requestData.action;
            
            if(action === "manage-submit") {
                if(('layerData' in requestData) && requestData.layerData.length > 0) {
                    owfdojo.forEach(requestData.layerData, function(obj){
                        if(!context.layerExistsByInfo(context, obj.title, obj.url, obj.type)) {
                            context.widgetPreferences.layerConfiguration.push(obj);
                        }
                    });

                    context.savePreferences(context.widgetPreferences);
                }
            }
        }
        
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
    this.layerExistsByInfo = function(context, title, url, type) {
        for(var i=0; i < context.widgetPreferences.layerConfiguration.length; i++) {
            var obj = context.widgetPreferences.layerConfiguration[i];
            if(obj.title === title && obj.url === url && obj.type === type) {
                return true;
            }
        }      
        
        return false;
    }
    
    /**
     * Loads the preferences for the widget from the underlying OWF preferences module.
     * If layer configurations are located then initialization of the OpenLayers module is
     * automatically bootstrapped.
     *
     * @param {Object} context  Class object context.
     * 
     * @return {Map} A map of the user preferences for this widget.
     */     
    this.loadPreferences = function(context) {
        Ozone.pref.PrefServer.getUserPreference({
            namespace: "com.geocent.owf.widget-openlayers-interface",
            name: "widgetPreferences",
            onSuccess: function(widgetPreferences) {
                var preferences = owfdojo.fromJson(widgetPreferences.value);
                if( preferences !== undefined && preferences !== null ) {
                    context.widgetPreferences = preferences;
                    if(context.widgetPreferences.layerConfiguration.length > 0) {
                        owfdojo.forEach(context.widgetPreferences.layerConfiguration, function(obj) {
                            context.openLayersManager.addLayer(obj);
                        });
                    }
                    else {
                        Ozone.util.ErrorDlg.show("There are no configured layers for this widget.");
                    }
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
            namespace: "com.geocent.owf.widget-openlayers-interface",
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
        var context = this;
        
        owfdojo.addOnLoad(function(){
            context.openLayersManager = new OpenLayersManager('map');
            context.initializeOWF(context);
        }); 
    }
}();
