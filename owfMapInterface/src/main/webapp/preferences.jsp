<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

        <title>Geocent OWF OGC Map Interface Preferences</title>

        <% String owfContextPath = application.getInitParameter("owf-context-path");%>
        <link rel="stylesheet" href="<%= owfContextPath%>/css/widgetContents.css" type="text/css"/>
        <link rel="stylesheet" href="<%= owfContextPath%>/css/dragAndDrop.css" type="text/css"/>
        <link rel="stylesheet" href="css/style.css" type="text/css"/>

        <script type="text/javascript" src="<%= owfContextPath%>/js/owf-widget.js"></script>
        <script type="text/javascript" src="js/preferences.js"></script>        
    </head>
    <body>
        <form>
            <fieldset>
                <legend>Configured Layers</legend>

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody id="layerInformation">
                    </tbody>
                </table>

                <div class="centerContent">
                    <input type="button" id="preferencesRemove" value="Remove"/>
                </div>
            </fieldset>
        </form>

        <div class="centerContent">
            <input type="button" id="preferencesClose" value="Close"/>
        </div>        
    </body>
</html>
