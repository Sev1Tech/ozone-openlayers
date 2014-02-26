/*
 * Copyright (c) 2012 Geocent - Published under the MIT License.
 * See LICENSE for the full text of the license.
 */
package com.geocent.owf.openlayers.handler;


/**
 * Supported content types which must be handled within the proxy.
 */
public enum ContentTypes {
    
    KML("application/vnd.google-earth.kml+xml"),
    KMZ("application/vnd.google-earth.kmz");
    
    private String contentType;

    private ContentTypes(String contentType) {
        this.contentType = contentType;
    }

    public String getContentType() {
        return contentType;
    }
}
