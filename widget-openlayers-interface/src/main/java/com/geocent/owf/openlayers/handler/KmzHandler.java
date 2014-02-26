/*
 * Copyright (c) 2012 Geocent - Published under the MIT License.
 * See LICENSE for the full text of the license.
 */
package com.geocent.owf.openlayers.handler;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.output.ByteArrayOutputStream;

/**
 * Handler to extract KML content from detected KMZ content.
 */
public class KmzHandler extends Handler {

    @Override
    public String handleContent(HttpServletResponse response, InputStream responseStream) throws IOException {
        ZipInputStream zis = new ZipInputStream(responseStream);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        
        ZipEntry ze = zis.getNextEntry();
    	while(ze != null) {
            if(ze.getName().endsWith("kml")) {
                int len;
                while ((len = zis.read(buffer)) > 0) {
                    baos.write(buffer, 0, len);
                }
                
                response.setContentType(ContentTypes.KML.getContentType());
                return new String(baos.toByteArray(), Charset.defaultCharset());
            }
            
            ze = zis.getNextEntry();
        }
        
        throw new IOException("Missing KML file entry.");
    }
}
