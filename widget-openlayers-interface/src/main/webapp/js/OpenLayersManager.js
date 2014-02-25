/*
 * Copyright (c) 2012 Geocent - Published under the MIT License.
 * See LICENSE for the full text of the license.
 */
 
/**
 * @class A lifecycle manager for an OpenLayers map.
 */
var OpenLayersManager = function(mapId){   
    /**
     * OpenLayers Map object which will be leveraged and manipulated throughout the class.
     * 
     * @private
     * @type Openlayers.Map
     */
    this.openlayersMap = null;
    
    /**
     * Array of layers currently managed by the class.
     * 
     * @private
     * @type Array<OpenLayers.Layer>
     */
    this.openlayersLayers = [];
                    
    /**
     * Create a new OpenLayers.Layer object based off of the supplied layer configuration data
     * and displays it on the map. If there is an error with the data it is ignored.
     *
     * @param {Map} layerData  Configuration data for the new layer.
     */ 
    this.addLayer = function(layerData) {
        var layer = this.createLayer(layerData);
        
        if(layer !== null) {
            this.openlayersLayers.push(layer);
            this.openlayersMap.addLayer(layer);
            this.openlayersMap.zoomToMaxExtent();
        }
    }
    
    /**
     * Validates that a supplied object contains all of the supplied property fields. 
     *
     * @param {Map/Object} object     An object to check for the existing properties.
     * @param {Array<String>} fields  An array of string property names to test.
     * 
     * @return {Boolean} true if the supplied object contains all of the specified field, otherwise false
     */ 
    this.containsRequiredProperties = function(object, fields) {
        for(var i=0; i < fields.length; i++) {
            if(!(fields[i] in object)) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Create a new OpenLayers.Layer.GeoRSS object based off of the supplied
     * layer configuration data.
     * 
     * @param {OpenLayersManager} context  OpenLayersManager class object context. 
     * @param {Map} layerData              Configuration data for the new layer.
     * 
     * @return {OpenLayers.Layer.GeoRSS} The newly created layer. If there is an error with the data a NULL is returned.
     */ 
    this.createLayerGeoRSS = function(context, layerData) {
        if(!context.containsRequiredProperties(layerData, ['title', 'url'])) {
            return null;
        }
        else {
            return new OpenLayers.Layer.GeoRSS(layerData.title, layerData.url);
        }
    }
    
    /**
     * Create a new GML-backed OpenLayers.Layer.Vector object based off of the supplied
     * layer configuration data.
     *
     * @param {OpenLayersManager} context  OpenLayersManager class object context. 
     * @param {Map} layerData              Configuration data for the new layer.
     * 
     * @return {OpenLayers.Layer.Vector} The newly created layer. If there is an error with the data a NULL is returned.
     */ 
    this.createLayerGML = function(context, layerData) {
        if(!context.containsRequiredProperties(layerData, ['title', 'url'])) {
            return null;
        }
        else {
            return new OpenLayers.Layer.Vector(layerData.title, {
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: layerData.url,
                    format: new OpenLayers.Format.GML()
                })
            });
        }
    }
    
    /**
     * Create a new KML-backed OpenLayers.Layer.Vector object based off of the supplied
     * layer configuration data.
     *
     * @param {OpenLayersManager} context  OpenLayersManager class object context. 
     * @param {Map} layerData              Configuration data for the new layer.
     * 
     * @return {OpenLayers.Layer.Vector} The newly created layer. If there is an error with the data a NULL is returned.
     */ 
    this.createLayerKML = function(context, layerData) {
        if(!context.containsRequiredProperties(layerData, ['title', 'url'])) {
            return null;
        }
        else {
            return new OpenLayers.Layer.Vector(layerData.title, {
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: layerData.url,
                    format: new OpenLayers.Format.KML({
                        extractStyles: true, 
                        extractAttributes: true
                    })
                })
            });
        }
    }
    
    /**
     * Create a new WFS-backed OpenLayers.Layer.Vector object based off of the supplied
     * layer configuration data.
     *
     * @param {OpenLayersManager} context  OpenLayersManager class object context. 
     * @param {Map} layerData              Configuration data for the new layer.
     * 
     * @return {OpenLayers.Layer.Vector} The newly created layer. If there is an error with the data a NULL is returned.
     */ 
    this.createLayerWFS = function(context, layerData) {
        if(!context.containsRequiredProperties(layerData, ['title', 'url', 'featureType', 'featureNS'])) {
            return null;
        }
        else {
            return new OpenLayers.Layer.Vector(layerData.title, {
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.WFS({
                    url: layerData.url,
                    featureType: layerData.featureType,
                    featureNS: layerData.featureNS
                }),
                renderers: OpenLayers.Layer.Vector.prototype.renderers
            });
        }
    }
    
    /**
     * Create a new OpenLayers.Layer.WMS object based off of the supplied layer configuration data. 
     *
     * @param {OpenLayersManager} context  OpenLayersManager class object context. 
     * @param {Map} layerData              Configuration data for the new layer.
     * 
     * @return {OpenLayers.Layer.WMS} The newly created layer. If there is an error with the data a NULL is returned.
     */ 
    this.createLayerWMS = function(context, layerData) {
        if(!context.containsRequiredProperties(layerData, ['title', 'url', 'layerName'])) {
            return null;
        }
        else {
            var isBaseLayer = context.containsRequiredProperties(layerData, ['layerIsBaseLayer']) ? layerData.layerIsBaseLayer : false;
            var isSingleTile = context.containsRequiredProperties(layerData, ['layerSingleTile']) ? layerData.layerSingleTile : false;
            
            return new OpenLayers.Layer.WMS( layerData.title, layerData.url, {
                layers: layerData.layerName,
                transparent: !isBaseLayer,
                singleTile: isSingleTile
            }, {
                wrapDateLine: true
            });
        }
    }
    
    /**
     * Create a new OpenLayers.Layer object based off of the supplied layer configuration data.
     * 
     * @param {Map} layerData  Configuration data for the new layer.
     * 
     * @return {OpenLayers.Layer} The newly created layer. If there is an error with the data or the format is not supported a NULL is returned.
     */ 
    this.createLayer = function(layerData) {
        if(('type' in layerData) && (layerData.type in this.supportedFormats)) {
            return this.supportedFormats[layerData.type](this, layerData);
        }
        else {
            return null;
        }
    }
    
    /**
     * Supported formats and their creation handlers.
     * 
     * @private
     * @type Map
     */
    this.supportedFormats = {
        georss: this.createLayerGeoRSS,
        gml: this.createLayerGML,
        kml: this.createLayerKML,
        wfs: this.createLayerWFS,
        wms: this.createLayerWMS
    };
    
    /* Pseudo-Constructor */
    {
        OpenLayers.ProxyHost = "proxy.jsp?dataurl=";
        
        this.openlayersMap = new OpenLayers.Map(mapId,
        {
            projection: new OpenLayers.Projection('EPSG:4326'),
            maxExtent: new OpenLayers.Bounds(-180.0,-90.0,180.0,90.0),
            controls:[
            new OpenLayers.Control.ArgParser(),
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar(),
            new OpenLayers.Control.LayerSwitcher()
            ]
        });
    }    
}