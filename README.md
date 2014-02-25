
Ozone Widget Framework OpenLayers Widget Suite
===============================================
QQ

OGC Layer Management Widget
---------------------------
QQ

OpenLayers Interface Widget
---------------------------
QQ

Building the Widgets
--------------------
The project and its associate widgets are developed utilizing the
[Maven](http://maven.apache.org/) build system. To build the projects either import
the project into your editor of choice which supports Maven projects
(such as [Netbeans](http://netbeans.org/) or [Eclipse](http://www.eclipse.org/))
and build the project using the IDE's build tools.

Alternately from the project's root or individual widget directories run the following
command:
`mvn clean install`

Deploying the Widgets
---------------------
Once each widget has been built there exists an application WAR within each widget's
`target` directory. Simply copy this WAR file to your application server's deployment
directory.

Installing the Widgets
----------------------
Each widget contains an associated `descriptor.html` file which fully describes the
installation parameters for the widget within OWF. To install each widget follow the
existing directions outlined within the [OWF documentation](https://github.com/ozoneplatform/owf/wiki/OWF-7-Administrator-Creating-and-Editing-Widgets#wiki-1-creating-widgets)
for creating a new widget supply a URL to the deployed descriptor file for each widget at:
`[widget context root]/descriptor.html`

License
-------
Permissive free open source [MIT](http://opensource.org/licenses/MIT/) software
license.

Copyright (C) 2012 [Geocent](http://geocent.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.