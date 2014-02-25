/*
 * Copyright (c) 2012 Geocent - Published under the MIT License.
 * See LICENSE for the full text of the license.
 */
package com.geocent.owf.openlayers;

import com.geocent.owf.openlayers.config.XMLConfigurationManager;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.UnknownHostException;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.IOUtils;

/**
 * Data request proxy class which will retrieve data from a provided URL.
 */
public class DataRequestProxy {

    private final List<Pattern> validUrlMasks = new LinkedList<Pattern>();
    private static final String VALID_URL_MASKS_XPATH = "/configuration/validUrlMasks/mask";
        
    private DataRequestProxy() {
        XMLConfigurationManager configurationManager = new XMLConfigurationManager(DataRequestProxy.class.getResourceAsStream("/config.xml"));
        for(String mask : configurationManager.getPropertyList(VALID_URL_MASKS_XPATH)) {
            validUrlMasks.add(Pattern.compile(mask));
        }
    }
    
    private static class SingletonHolder { 
            public static final DataRequestProxy INSTANCE = new DataRequestProxy();
    }

    /** Singleton implementation
     * 
     * @return Single instance of the class.
     */
    public static DataRequestProxy getInstance() {
            return SingletonHolder.INSTANCE;
    }
    
    /**
     * Gets the data from the provided remote URL.
     * Note that the data will be returned from the method and not automatically
     * populated into the response object.
     * 
     * @param request       ServletRequest object containing the request data.
     * @param response      ServletResponse object for the response information.
     * @param url           URL from which the data will be retrieved.
     * @return              Data from the provided remote URL.
     * @throws IOException 
     */
    public byte[] getData(HttpServletRequest request, HttpServletResponse response, String url) throws IOException {
        
        if(!allowUrl(url)) {
            throw new UnknownHostException("Request to invalid host not allowed.");
        }
        
        HttpURLConnection connection = (HttpURLConnection)(new URL(url).openConnection());
        connection.setRequestMethod(request.getMethod());
        
        // Detects a request with a payload inside the message body
        if (request.getContentLength() > 0) {
            connection.setRequestProperty("Content-Type", request.getContentType());
            connection.setDoOutput(true);
            connection.setDoInput(true);
            byte[] requestPayload = IOUtils.toByteArray(request.getInputStream());
            connection.getOutputStream().write(requestPayload);
            connection.getOutputStream().flush();
        }
        
        response.setContentType(connection.getContentType());
        return IOUtils.toByteArray(connection.getInputStream());
    }

    /**
     * Validates if communication to a supplied URL should be allowed.
     * 
     * @param url   URL to test
     * @return      true if communication to the URL should be allowed, otherwise false
     */
    public boolean allowUrl(String url) {
        for(Pattern urlMask : this.validUrlMasks) {
            if(urlMask.matcher(url).matches()) {
                return true;
            }
        }
        
        return false;
    }
}
