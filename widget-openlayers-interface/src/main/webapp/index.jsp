<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        
        <title>Geocent OWF Map Interface</title>

        <% String owfContextPath = application.getInitParameter("owf-context-path"); %>
        <link rel="stylesheet" href="<%= owfContextPath %>/css/widgetContents.css" type="text/css"/>
        <link rel="stylesheet" href="<%= owfContextPath %>/css/dragAndDrop.css" type="text/css"/>
        <link rel="stylesheet" href="lib/OpenLayers/theme/default/style.css" type="text/css"/>
        <link rel="stylesheet" href="css/style.css" type="text/css"/>
        
        <script type="text/javascript" src="<%= owfContextPath %>/js/owf-widget.js"></script>
        <script type="text/javascript" src="lib/OpenLayers/OpenLayers.js"></script>
        <script type="text/javascript" src="js/OpenLayersManager.js"></script>
        <script type="text/javascript" src="js/widgetOpenlayersInterface.js"></script>
    </head>
    <body>
        <div id="map"></div>
    </body>
</html>
