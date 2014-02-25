<%@ page trimDirectiveWhitespaces = "true" %>
<%@ page import = "com.geocent.owf.openlayers.interface.DataRequestProxy" %>
<%= DataRequestProxy.getData(request, response, request.getParameter("dataurl")) %>