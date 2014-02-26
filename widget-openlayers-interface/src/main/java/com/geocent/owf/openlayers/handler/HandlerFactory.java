/*
 * Copyright (c) 2012 Geocent - Published under the MIT License.
 * See LICENSE for the full text of the license.
 */
package com.geocent.owf.openlayers.handler;

/**
 * Content handler factory to generate handlers based off of supplied content types.
 */
public class HandlerFactory {
    
    /**
     * Standard factory interface.
     * 
     * @param contentType Content type from the proxied data.
     * @return 
     */
    public static Handler getHandler(String contentType) {
        if(contentType.equalsIgnoreCase(ContentTypes.KMZ.getContentType())) {
            return new KmzHandler();
        }
        else {
            return new DefaultHandler(contentType);
        }
    }
}
