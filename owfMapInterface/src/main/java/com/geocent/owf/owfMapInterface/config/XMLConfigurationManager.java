package com.geocent.owf.owfMapInterface.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.namespace.QName;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 * XML configuration manager for reading configuration parameters from specified configuration XML files.
 */
public class XMLConfigurationManager {
    protected Document xmlDocument;
    protected XPath xPath;

    /**
     * Class constructor
     * 
     * @param configurationFile InputStream to the configuration XML file.
     */
    public XMLConfigurationManager(InputStream configurationFile) {
        try {
            this.xmlDocument = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(configurationFile);
        } catch (SAXException ex) {
            Logger.getLogger(XMLConfigurationManager.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(XMLConfigurationManager.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParserConfigurationException ex) {
            Logger.getLogger(XMLConfigurationManager.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        this.xPath = XPathFactory.newInstance().newXPath();
    }
    
    private Object getXPathValue(String expression, Object traverseObject, QName dataType) throws XPathExpressionException {
        return this.xPath.compile(expression).evaluate(traverseObject, dataType);
    }
    
    /**
     * Get a property based off of the specified XPath expression and if it is not found return a default value.
     * @param propertyXPath XPath expression for the property to fetch.
     * @param defaultValue
     * @return The value of the specified property if it exists, otherwise defaultValue.
     */
    public String getProperty(String propertyXPath, String defaultValue) {
        try {
            return (String)getXPathValue(propertyXPath, this.xmlDocument, XPathConstants.STRING);
        } catch (XPathExpressionException ex) {
            Logger.getLogger(XMLConfigurationManager.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return defaultValue;
    }
    
    /**
     * <code>defaultValue</code> defaults to null.
     * 
     * @see XMLConfigurationManager#getProperty(String, String) 
     */
    public String getProperty(String propertyXPath) {
        return getProperty(propertyXPath, null);
        
    }
    
    /**
     * Get a list of properties based off of the specified XPath expression.
     * @param propertyXPath XPath expression for the properties to fetch.
     * @return The list of values for the specified expression.
     */
    public List<String> getPropertyList(String propertiesXPath) {
        List<String> propertyList = new LinkedList<String>();
        
        try {
            NodeList configList = (NodeList) getXPathValue(propertiesXPath, this.xmlDocument, XPathConstants.NODESET);
            for (int i = 0; i < configList.getLength(); i++) {
                Node node = configList.item(i);
                propertyList.add((String) getXPathValue(".", node, XPathConstants.STRING));
            }
            return propertyList;
        } catch (XPathExpressionException ex) {
            Logger.getLogger(XMLConfigurationManager.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return Collections.EMPTY_LIST;
    }
}
