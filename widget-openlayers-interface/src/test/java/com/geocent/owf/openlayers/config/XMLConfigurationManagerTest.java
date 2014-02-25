package com.geocent.owf.openlayers.config;

import java.util.List;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import org.junit.*;

public class XMLConfigurationManagerTest {
    
    public XMLConfigurationManagerTest() {
    }

    @BeforeClass
    public static void setUpClass() throws Exception {
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    
    /**
     * Test of getPropertyList method, of class XMLConfigurationManager.
     */
    @Test
    public void testGetPropertyList() {
        System.out.println("getPropertyList");
        XMLConfigurationManager instance = new XMLConfigurationManager(XMLConfigurationManager.class.getResourceAsStream("/config.xml"));
        List<String> result = instance.getPropertyList("/configuration/validUrlMasks/mask");
        
        assertEquals(result.size(), 1);
        assertTrue(result.get(0).equals(".*"));
    }
}
