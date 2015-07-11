var reveal_path = '../bower_components/reveal.js/'

//require('expose?Reveal!' + reveal_path +  'js/reveal.js')
require('../bower_components/reveal.js/css/reveal.css') //Expose $ and jQuery to global scope
require('../custom/css/theme/slyu.css') //Expose $ and jQuery to global scope
require('../bower_components/reveal.js/lib/js/head.min.js') //Expose $ and jQuery to global scope
//TODO: zenburn css?
require('expose?Reveal!../bower_components/reveal.js/js/reveal.js') //Expose $ and jQuery to global scope
require('expose?$!expose?jQuery!../bower_components/jquery/dist/jquery.min.js') //Expose $ and jQuery to global scope
require('../bower_components/reveal.js/plugin/markdown/marked.js')
require('../bower_components/reveal.js/plugin/markdown/markdown.js')

