<%@ page trimDirectiveWhitespaces = "true" %>
<%@ page import = "com.geocent.owf.openlayers.DataRequestProxy" %>
<%= DataRequestProxy.getInstance().getData(request, response, request.getParameter("dataurl")) %>