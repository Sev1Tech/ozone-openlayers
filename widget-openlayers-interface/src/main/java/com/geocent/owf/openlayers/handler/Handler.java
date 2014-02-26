/*
 * Copyright (c) 2012 Geocent - Published under the MIT License.
 * See LICENSE for the full text of the license.
 */
package com.geocent.owf.openlayers.handler;

import java.io.IOException;
import java.io.InputStream;
import javax.servlet.http.HttpServletResponse;

/**
 * Base content type handler class.
 */
abstract public class Handler {
    
    /**
     * Handler for the supplied content.
     * 
     * @param response Proxied response to the client.
     * @param responseStream Response stream from the remote server,
     * @return String representation of the returned content.
     * @throws IOException 
     */
    abstract public String handleContent(HttpServletResponse response, InputStream responseStream) throws IOException ;
}
