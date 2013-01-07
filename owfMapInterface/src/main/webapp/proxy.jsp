<%@ page trimDirectiveWhitespaces = "true" %>
<%@ page import = "com.geocent.owf.owfMapInterface.DataRequestProxy" %>
<%= DataRequestProxy.getData(request, response, request.getParameter("dataurl")) %>