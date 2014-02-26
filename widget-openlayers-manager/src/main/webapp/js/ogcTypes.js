/*
 * Copyright (c) 2012 Geocent - Published under the MIT License.
 * See LICENSE for the full text of the license.
 */
 
/**
 * Current configuration of the supported OGC layer types.
 * Parameters for the elemnt types are:
 * 
 * name:     Name of the layer type which appears in the widget preferences UI.
 * value:    Value of the key for the layer type.
 * requires: Array of control IDs which are required by this layer.
 * 
 */
var OGC_TYPES = [
    {
        name: "GeoRSS",
        value: "georss",
        requires: []
    },
    
    {
        name: "GML (Geography Markup Language)",
        value: "gml",
        requires: []
    },
    
    {
        name: "KML (Compressed KML)",
        value: "kmz",
        requires: []
    },

    {
        name: "KMZ (Keyhole Markup Language)",
        value: "kml",
        requires: []
    },

    {
        name: "WFS (Web Feature Service)",
        value: "wfs",
        requires: ['featureType', 'featureNS']
    },
    
    {
        name: "WMS (Web Map Service)",
        value: "wms",
        requires: ["layerName", "layerIsBaseLayer", "layerSingleTile"]
    },
];