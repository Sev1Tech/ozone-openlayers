package com.geocent.owf.openlayers.handler;

/*
 * Copyright (c) 2012 Geocent - Published under the MIT License.
 * See LICENSE for the full text of the license.
 */
import java.io.IOException;
import java.io.InputStream;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.IOUtils;

/**
 * Default proxy handler to return content as received.
 */
public class DefaultHandler extends Handler {

    private String contentType;

    public DefaultHandler(String contentType) {
        this.contentType = contentType;
    }
    
    @Override
    public String handleContent(HttpServletResponse response, InputStream responseStream) throws IOException {
        response.setContentType(contentType);
        
        return IOUtils.toString(responseStream);
    }
}
