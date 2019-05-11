# smartTitle
Control the title of a HTML page with a single module

<h2>Reference</h2>

<h3>Functions</h3>

<pre>
/* optional duration in milliseconds */
scroll("Title to scroll", [duration])
</pre>

<pre>
flash("Title to flash", [duration])
</pre>

<h3>Options</h3>

<pre>
sets the flash speed in milliseconds
options.flashSpeed

sets the scrol speed in milliseconds
options.scrollSpeed
</pre>

<h3>Installation</h3>

npm install
<pre>
npm i smart_title
</pre>

code for your app
<pre>
window.smartTitle = require("smart_title");
</pre>

<h3>Example</h3>

<pre>
window.smartTitle.flash("Hello World!");
</pre>
