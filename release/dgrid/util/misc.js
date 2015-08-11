//>>built
define("dgrid/util/misc",["dojo/has","put-selector/put"],function(l,n){l.add("dom-contains",function(a,f,d){return!!d.contains});var e=[],c,m,k,p=/([^A-Za-z0-9_\u00A0-\uFFFF-])/g,g={defaultDelay:15,throttle:function(a,f,d){var b=!1;d=d||g.defaultDelay;return function(){b||(b=!0,a.apply(f,arguments),setTimeout(function(){b=!1},d))}},throttleDelayed:function(a,f,d){var b=!1;d=d||g.defaultDelay;return function(){if(!b){b=!0;var c=arguments;setTimeout(function(){b=!1;a.apply(f,c)},d)}}},debounce:function(a,
c,d){var b;d=d||g.defaultDelay;return function(){b&&(clearTimeout(b),b=null);var h=arguments;b=setTimeout(function(){a.apply(c,h)},d)}},each:function(a,c,d){var b,h;if(a)if("number"===typeof a.length){b=0;for(h=a.length;b<h;b++)c.call(d,a[b],b,a)}else for(b in a)c.call(d,a[b],b,a)},contains:function(a,c){return l("dom-contains")?a.contains(c):a.compareDocumentPosition(c)&8},addCssRule:function(a,f){c||(c=n(document.getElementsByTagName("head")[0],"style"),c=c.sheet||c.styleSheet,m=c.deleteRule?"deleteRule":
"removeRule",k=c.cssRules?"cssRules":"rules");var d=e.length;e[d]=(c.cssRules||c.rules).length;c.addRule?c.addRule(a,f):c.insertRule(a+"{"+f+"}",e[d]);return{get:function(b){return c[k][e[d]].style[b]},set:function(b,a){"undefined"!==typeof e[d]&&(c[k][e[d]].style[b]=a)},remove:function(){var b=e[d],a,f;if(void 0!==b){c[m](b);e[d]=void 0;a=d+1;for(f=e.length;a<f;a++)e[a]>b&&e[a]--}}}},escapeCssIdentifier:function(a,c){return"string"===typeof a?a.replace(p,c||"\\$1"):a}};return g});
//# sourceMappingURL=misc.js.map