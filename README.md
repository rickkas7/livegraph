#livegraph
*Example program using Particle Photon, node.js, SSE, HTML5 Canvas to do real-time graphing*

I got a request this morning for a tutorial/example of streaming data from a Photon to a node.js server, and then graphing it as a web page. I thought that sounded interesting, so here it is. It’s currently sending a sample every 20 milliseconds (50 samples per second) though it can go faster than that. My demo has a potentiometer and when you adjust it, the graph updates in real time!

**Update:** There's a newer version of this code, [localserver] (https://github.com/rickkas7/localserver). The newer version is more complex, but it eliminates the need to hardcode the server IP address in the Photon code, authenticates the data connection, and combines server functions to use a single port for both. There is live graphing example there, as well, using the better infrastructure. 

The node.js code has two parts:

A HTTP web server that serves the html/css/Javascript for the demo page and also serves Server Sent Events (SSE) for the live data updates. The SSE server sends out 10 bytes for every data sample, so the overhead is pretty low even sending out 50 samples per second.

A TCP server that accepts a connection from the Photon and receives raw data values, 1 byte per sample. When a new data value is received it’s sent out to all of the web browsers that are currently graphing. Since it’s the node.js server replicating the data you can have many web browsers simultaneously graphing the data without bogging down the Photon.

Since there are two listening ports you may need to adjust your firewall rules.

There’s also the static web page code, served up by the node.js server. It’s simple HTML and Javascript code. The graphing is done using HTML5 canvas. It receives data in real-time using Server Sent Events. And it does the whole thing without using any framework (jquery, AngularJS, etc.) - it’s that simple!

Note: Internet Explorer and Microsoft Edge browsers do not support SSE, so you’ll need to use Chrome, Firefox, Opera or Safari. Probably others, as well, but I tested those on Windows and Mac.

To run it, download the source from Github:
https://github.com/rickkas7/livegraph

The firmware directory contains the code for your Photon. Be sure to update the server IP address and flash the Photon.

Then run the node.js server:
node livegraph.js

You must be in the directory containing livegraph.js and the public folder, because the files in the public folder, index.html, main.js, and main.css need to be sent to the web browser.

Then open up a web browser. If you’re doing it on the computer running the node server and the default port, you’d just use:
http://localhost:8080/

Have fun!
