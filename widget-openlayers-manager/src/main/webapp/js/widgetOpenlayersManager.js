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
     * OWF widget eventing controller.
     * 
     * @private
     * @type Object
     */
    this.widgetEventingController = null; 
    
    /**
     * Initialize the class and its hooks into the UI elements.
     */
    this.initializeManager = function() {
        var context = this;
        
        owfdojo.addOnLoad(function(){
            owfdojo.connect(owfdojo.byId("submitLayers"), "onclick", context, function(e){
                context.handleSubmitLayers(context);
            });
            
            context.initializeOWF(context);
        });       
    }

    /**
     * Initialize the OWF objects and hooks into the framework.
     *
     * @param {Object} context  Class object context.
     */
    this.initializeOWF = function(context) {
        context.widgetEventingController = Ozone.eventing.Widget.getInstance();
        
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
        
        context.loadPreferences(context);
    }
    
    /**
     * Handles the submission of the selected layers and their associated data to the configured OWF event communication channel.
     *
     * @param {Object} context  Class object context.
     */
    this.handleSubmitLayers = function(context) {
        var submissionData = {
            action: "manage-submit",
            layerData : []
        };
        
        owfdojo.query("#layerInformation > tr > td > input[type='checkbox']:checked").forEach(function(obj) {
            for(var i=0; i< context.widgetPreferences.layerConfiguration.length; i++) {
                if(context.widgetPreferences.layerConfiguration[i].id === obj.value) {
                    submissionData.layerData.push(context.widgetPreferences.layerConfiguration[i]);
                    break;
                }
            }
        });        
        
        if(context.widgetPreferences.widgetConfiguration.channelEnabled) {
            context.widgetEventingController.publish("com.geocent.owf.widget-openlayers", owfdojo.toJson(submissionData));
        }

        if(context.widgetPreferences.widgetConfiguration.intentsEnabled) {
            OWF.Intents.startActivity(
                {   
                    action:'manage-submit',
                    dataType:'application/vnd.owf.geocent.com.widget-openlayers'
                },
                {
                    layerData: submissionData.layerData
                }
            );             
        }  
    }

    /**
     * Handles the submission of the selected layers and their associated via Intents API to receiving widgets via
     * datatype "application/vnd.owf.geocent.com.widget-openlayers".
     *
     * @param {Object} data  Layer data to submit to the Intents API.
     */
    this.submitIntents = function(data) {
       
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
            namespace: "com.geocent.owf.widget-openlayers-manager",
            name: "widgetPreferences",
            onSuccess: function(widgetPreferences) {
                var preferences = owfdojo.fromJson(widgetPreferences.value);
                if( preferences !== undefined && preferences !== null ) {
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
                if (status !== 404) {
                    Ozone.util.ErrorDlg.show("Error loading preferences.");            
                }
            }
        });
    }
    
    /* Pseudo-Constructor */
    {
        this.initializeManager();
    }
}();