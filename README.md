Ozone Widget Framework OpenLayers Widget Suite
===============================================

The Ozone Widget Framework OpenLayers Widget Suite exists as functionally segregated and interoperable widgets designed to:
1. Present an OpenLayers interface to the user for GIS data visualization
2. Manage any number of OGC compatible GIS data layers for use within the visualization widget.

Currently supported OGC data formats for the widget within the Ozone Widget Framework OpenLayers Widget Suite are:
* [WMS (Web Map Service)](http://www.opengeospatial.org/standards/wms/) (Base Map and Data Layers)
* [WFS (Web Feature Service)](http://www.opengeospatial.org/standards/wfs/)
* [KML (Keyhole Markup Language)](http://www.opengeospatial.org/standards/kml/)
* [KMZ (Compressed KML)](https://developers.google.com/kml/documentation/kmzarchives)
* [GML (Geography Markup Language)](http://www.opengeospatial.org/standards/gml)
* [GeoRSS](http://www.georss.org/)

In addition to providing included interoperability the widgets provide integration points with external widgets through integration with the OWF Eventing and Intents APIs.

OpenLayers Widget
---------------------------
![OpenLayers Widget](http://geocentlabs.com/wp-content/uploads/2014/02/ozone-openlayers-interface.png "OpenLayers Widget")

The OpenLayers Widget provides a central interface by which multiple compatible OGC layers can be visualized and interacte with by the user through a standard lightweight OpenLayers interface. In order to remain lightweight in its interactive form all layer management functionalities has been defered to the OpenLayers OGC Layer Manager Widget.

Standard interface functions include:
* Pan and Zoom
* Per-layer enable and disable capabilities
* Data element interaction

### Preferences ####
![OpenLayers Widget Preferences](http://geocentlabs.com/wp-content/uploads/2014/02/ozone-openlayers-interface-preferences.png "OpenLayers Widget Preferences")

#### Configured Layers ####
Allows the user to remove layers from the OpenLayers interface.

OpenLayers OGC Layer Manager Widget
-----------------------------------
![OpenLayers OGC Layer Manager Widget Widget](http://geocentlabs.com/wp-content/uploads/2014/02/ozone-openlayers-manager.png "OpenLayers OGC Layer Manager Widget")

The OpenLayers OGC Layer Management Widget allows the user to manage any number of supported OGC layer types for usage within the OWF system. Once selected the user may select any number of configured layers from the list and either publish the layer information on the widget's configured data channel `com.geocent.owf.widget-openlayers` or to any widgets which are configured to receive data via the OWF Intents API for the widget's data type `application/vnd.owf.geocent.com.widget-openlayers`.

### Widget Event Channel Format ###

**Channel Name**

`com.geocent.owf.widget-openlayers`

**Data Format**
```javascript
{
  "action": "manage-submit",
  "layerData": [
    {
      "id": [Layer ID],
      "title": [Layer Name],
      "type": [Layer Format],
      "url": [Layer URL],
      ...
      [Layer Specific Data]
    },
    ...
  ]
}
```

**Example Data**
```javascript
{
  "action": "manage-submit",
  "layerData": [
    {
      "id": "dadacce0-080e-4e6c-91d0-6762b1e421e3",
      "title": "Fire Hot Spots (MODIS)",
      "type": "georss",
      "url": "http:\/\/www.tucuxisoftware.com\/feeds\/modis.xml"
    },
    {
      "id": "9b893845-75f8-45ed-83e5-cbdac65cdf9d",
      "title": "OSGEO VMAP0",
      "type": "wms",
      "url": "http:\/\/vmap0.tiles.osgeo.org\/wms\/vmap0",
      "layerName": "basic",
      "layerIsBaseLayer": true,
      "layerSingleTile": false
    },
    {
      "id": "8152936b-4902-4821-957f-27ebb9d7573a",
      "title": "NOAA GFS Meteograms",
      "type": "kml",
      "url": "http:\/\/www.srh.noaa.gov\/gis\/kml\/GFSmeteo\/GFSmeteogram.kmz"
    },
    {
      "id": "51ee282c-dff2-4bc0-b940-ec341e7f6354",
      "title": "SPC Outlook",
      "type": "kml",
      "url": "http:\/\/www.spc.noaa.gov\/products\/outlook\/SPC_outlooks.kml"
    }
  ]
}
```

### Widget Intents Format ###

**MIME Type**

`application/vnd.owf.geocent.com.widget-openlayers`

**Intents Action**

`manage-submit`

**Data Format**
```javascript
{
  "layerData": [
    {
      "id": [Layer ID],
      "title": [Layer Name],
      "type": [Layer Format],
      "url": [Layer URL],
      ...
      [Layer Specific Data]
    },
    ...
  ]
}
```
**Example Data**
```javascript
{
  "layerData": [
    {
      "id": "dadacce0-080e-4e6c-91d0-6762b1e421e3",
      "title": "Fire Hot Spots (MODIS)",
      "type": "georss",
      "url": "http:\/\/www.tucuxisoftware.com\/feeds\/modis.xml"
    },
    {
      "id": "9b893845-75f8-45ed-83e5-cbdac65cdf9d",
      "title": "OSGEO VMAP0",
      "type": "wms",
      "url": "http:\/\/vmap0.tiles.osgeo.org\/wms\/vmap0",
      "layerName": "basic",
      "layerIsBaseLayer": true,
      "layerSingleTile": false
    },
    {
      "id": "8152936b-4902-4821-957f-27ebb9d7573a",
      "title": "NOAA GFS Meteograms",
      "type": "kml",
      "url": "http:\/\/www.srh.noaa.gov\/gis\/kml\/GFSmeteo\/GFSmeteogram.kmz"
    },
    {
      "id": "51ee282c-dff2-4bc0-b940-ec341e7f6354",
      "title": "SPC Outlook",
      "type": "kml",
      "url": "http:\/\/www.spc.noaa.gov\/products\/outlook\/SPC_outlooks.kml"
    }
  ]
}
```

### Preferences ####
![OpenLayers OGC Layer Manager Widget Preferences](http://geocentlabs.com/wp-content/uploads/2014/02/ozone-openlayers-manager-preferences.png "OpenLayers OGC Layer Manager Widget Preferences")

#### Configured Layers ####
Allows the user to remove stored OGC layers from the widget's configuration.

#### New Layer ####
Enables the user to store a new OGC layer within the widget's configuration.

#### Widget Configuration ####
Configuration information for the functionality of the widget.
* `Enable Channel` Enables or disables the widget from publishing the submitted layer information to the widgets `com.geocent.owf.widget-openlayers` event channel.
* `Enable Intents` Enabled or disables the widget from broadcasting the submitted layer information to external widgets via the OWF Intents API which comply with the widget data type `application/vnd.owf.geocent.com.widget-openlayers`

Building the Widgets
--------------------
The project and its associate widgets are developed utilizing the
[Maven](http://maven.apache.org/) build system. To build the projects either import
the project into your editor of choice which supports Maven projects
(such as [Netbeans](http://netbeans.org/) or [Eclipse](http://www.eclipse.org/))
and build the project using the IDE's build tools.

Alternately from the project's root or individual widget directories run the following
command:
`mvn clean install`

Deploying the Widgets
---------------------
Once each widget has been built there exists an application WAR within each widget's
`target` directory. Simply copy this WAR file to your application server's deployment
directory.

Installing the Widgets
----------------------
Each widget contains an associated `descriptor.html` file which fully describes the
installation parameters for the widget within OWF. To install each widget follow the
existing directions outlined within the [OWF documentation](https://github.com/ozoneplatform/owf/wiki/OWF-7-Administrator-Creating-and-Editing-Widgets#wiki-1-creating-widgets)
for creating a new widget supply a URL to the deployed descriptor file for each widget at:
`[widget context root]/descriptor.html`

License
-------
Permissive free open source [MIT](http://opensource.org/licenses/MIT/) software
license.

Copyright (C) 2012 [Geocent](http://geocent.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.