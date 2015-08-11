//>>built
define("dojo/promise/instrumentation",["./tracer","../has","../_base/lang","../_base/array"],function(e,l,g,h){function m(c,a,b){a&&a.stack&&a.stack.split("\n").slice(1).join("\n").replace(/^\s+/," ")}function p(c,a,b,d){a||m(c,b,d)}function q(c,a,b,e){a?h.some(d,function(a,b){if(a.error===c)return d.splice(b,1),!0}):h.some(d,function(a){return a.error===c})||d.push({error:c,rejection:b,deferred:e,timestamp:(new Date).getTime()});k||(k=setTimeout(n,f))}function n(){var c=(new Date).getTime(),a=c-
f;d=h.filter(d,function(b){return b.timestamp<a?(m(b.error,b.rejection,b.deferred),!1):!0});k=d.length?setTimeout(n,d[0].timestamp+f-c):!1}l.add("config-useDeferredInstrumentation","report-unhandled-rejections");var d=[],k=!1,f=1E3;return function(c){var a=l("config-useDeferredInstrumentation");if(a){e.on("resolved",g.hitch(console,"log","resolved"));e.on("rejected",g.hitch(console,"log","rejected"));e.on("progress",g.hitch(console,"log","progress"));var b=[];"string"===typeof a&&(b=a.split(","),
a=b.shift());if("report-rejections"===a)c.instrumentRejected=p;else if("report-unhandled-rejections"===a||!0===a||1===a)c.instrumentRejected=q,f=parseInt(b[0],10)||f;else throw Error("Unsupported instrumentation usage \x3c"+a+"\x3e");}}});
//# sourceMappingURL=instrumentation.js.map