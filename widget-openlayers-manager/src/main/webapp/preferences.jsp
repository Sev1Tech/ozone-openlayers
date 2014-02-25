<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

        <title>Geocent OWF OGC Layer Manager Preferences</title>
        
        <% String owfContextPath = application.getInitParameter("owf-context-path"); %>
        <link rel="stylesheet" href="<%= owfContextPath %>/css/widgetContents.css" type="text/css"/>
        <link rel="stylesheet" href="<%= owfContextPath %>/css/dragAndDrop.css" type="text/css"/>
        <link rel="stylesheet" href="css/style.css" type="text/css"/>

        <script type="text/javascript" src="<%= owfContextPath %>/js/owf-widget.js"></script>
        <script type="text/javascript" src="js/uuid.js"></script>        
        <script type="text/javascript" src="js/ogcTypes.js"></script>        
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
        
        <form>
            <fieldset>
                <legend>New Layer</legend>
                
                <label for="newLayerTitle">Title</label>
                <br/>
                <input type="text" id="newLayerTitle" name="newLayerTitle"/>
                <br/>

                <label for="newLayerType">OGC Type</label>
                <br/>
                <select id="newLayerType" name="newLayerType"></select>
                <br/>

                <label for="newLayerUrl">OGC URL</label>
                <br/>
                <input type="text" id="newLayerUrl" name="newLayerUrl"/>
                <br/>

                <div class="hidden">
                    <label for="newLayerName">Layer Name</label>
                    <br/>
                    <input type="text" id="newLayerName" name="newLayerName"/>
                </div>
                
                <div class="hidden">
                    <label for="newLayerIsBaseLayer">Base Layer?</label>
                    <br/>
                    <input type="checkbox" id="newLayerIsBaseLayer" name="newLayerIsBaseLayer"/>
                </div>
                
                <div class="hidden">
                    <label for="newLayerSingleTile">Single Tile?</label>
                    <br/>
                    <input type="checkbox" id="newLayerSingleTile" name="newLayerSingleTile"/>
                </div>
                
                <div class="hidden">
                    <label for="newLayerImageType">Layer Image Type</label>
                    <br/>
                    <select id="newLayerImageType" name="newLayerImageType">
                        <option value="gif">GIF</option>
                        <option value="jpg">JPG</option>
                        <option value="png">PNG</option>
                    </select>
                </div>
                
                <div class="hidden">
                    <label for="newLayerFeatureType">Feature Type</label>
                    <br/>
                    <input type="text" id="newLayerFeatureType" name="newLayerFeatureType"/>
                </div>
                
                <div class="hidden">
                    <label for="newLayerFeatureNamespace">Feature Namespace</label>
                    <br/>
                    <input type="text" id="newLayerFeatureNamespace" name="newLayerFeatureNamespace"/>
                </div>
                
                <div class="centerContent">
                    <input type="button" id="preferencesAdd" value="Add"/>
                </div>
            </fieldset>            
        </form>
        
        <form>
            <fieldset>
                <legend>Widget Configuration</legend>
                
                <label for="enableIntents">Enable Intents?</label>
                <br/>
                <input type="checkbox" id="enableIntents" name="enableIntents"/>
            </fieldset>
        </form>

        <div class="centerContent">
            <input type="button" id="preferencesClose" value="Close"/>
        </div>
    </body>
</html>