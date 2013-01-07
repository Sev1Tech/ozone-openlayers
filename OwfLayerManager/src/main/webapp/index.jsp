<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

        <title>Geocent OWF OGC Layer Manager</title>
        
        <% String owfContextPath = application.getInitParameter("owf-context-path"); %>
        <link rel="stylesheet" href="<%= owfContextPath %>/css/widgetContents.css" type="text/css"/>
        <link rel="stylesheet" href="<%= owfContextPath %>/css/dragAndDrop.css" type="text/css"/>
        <link rel="stylesheet" href="css/style.css" type="text/css"/>
        
        <script type="text/javascript" src="<%= owfContextPath %>/js/owf-widget.js"></script>
        <script type="text/javascript" src="js/owfLayerManager.js"></script>
    </head>
    <body>
        <form>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody id="layerInformation">
                </tbody>
            </table>

            <div class="centerContent">
                <input type="button" id="submitLayers" value="Submit Layers"/>
            </div>
        </form>        
    </body>
</html>
