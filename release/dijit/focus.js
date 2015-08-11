//>>built
define("dijit/focus","dojo/aspect dojo/_base/declare dojo/dom dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/Evented dojo/_base/lang dojo/on dojo/domReady dojo/sniff dojo/Stateful dojo/_base/window dojo/window ./a11y ./registry ./main".split(" "),function(p,v,q,w,x,r,y,g,k,z,l,A,B,s,C,m,n){var t,u,c=new (v([A,y],{curNode:null,activeStack:[],constructor:function(){var a=g.hitch(this,function(a){q.isDescendant(this.curNode,a)&&this.set("curNode",null);q.isDescendant(this.prevNode,a)&&this.set("prevNode",
null)});p.before(r,"empty",a);p.before(r,"destroy",a)},registerIframe:function(a){return this.registerWin(a.contentWindow,a)},registerWin:function(a,h){var e=this,b=a.document&&a.document.body;if(b){var c=l("pointer-events")?"pointerdown":l("MSPointer")?"MSPointerDown":l("touch-events")?"mousedown, touchstart":"mousedown",d=k(a.document,c,function(a){if(!a||!(a.target&&null==a.target.parentNode))e._onTouchNode(h||a.target,"mouse")}),f=k(b,"focusin",function(a){if(a.target.tagName){var b=a.target.tagName.toLowerCase();
"#document"==b||"body"==b||(C.isFocusable(a.target)?e._onFocusNode(h||a.target):e._onTouchNode(h||a.target))}}),g=k(b,"focusout",function(a){e._onBlurNode(h||a.target)});return{remove:function(){d.remove();f.remove();g.remove();b=d=f=g=null}}}},_onBlurNode:function(a){a=(new Date).getTime();a<t+100||(this._clearFocusTimer&&clearTimeout(this._clearFocusTimer),this._clearFocusTimer=setTimeout(g.hitch(this,function(){this.set("prevNode",this.curNode);this.set("curNode",null)}),0),this._clearActiveWidgetsTimer&&
clearTimeout(this._clearActiveWidgetsTimer),a<u+100||(this._clearActiveWidgetsTimer=setTimeout(g.hitch(this,function(){delete this._clearActiveWidgetsTimer;this._setStack([])}),0)))},_onTouchNode:function(a,h){u=(new Date).getTime();this._clearActiveWidgetsTimer&&(clearTimeout(this._clearActiveWidgetsTimer),delete this._clearActiveWidgetsTimer);x.contains(a,"dijitPopup")&&(a=a.firstChild);var e=[];try{for(;a;){var b=w.get(a,"dijitPopupParent");if(b)a=m.byId(b).domNode;else if(a.tagName&&"body"==a.tagName.toLowerCase()){if(a===
B.body())break;a=s.get(a.ownerDocument).frameElement}else{var c=a.getAttribute&&a.getAttribute("widgetId"),d=c&&m.byId(c);d&&!("mouse"==h&&d.get("disabled"))&&e.unshift(c);a=a.parentNode}}}catch(f){}this._setStack(e,h)},_onFocusNode:function(a){a&&9!=a.nodeType&&(t=(new Date).getTime(),this._clearFocusTimer&&(clearTimeout(this._clearFocusTimer),delete this._clearFocusTimer),this._onTouchNode(a),a!=this.curNode&&(this.set("prevNode",this.curNode),this.set("curNode",a)))},_setStack:function(a,c){var e=
this.activeStack,b=e.length-1,f=a.length-1;if(a[f]!=e[b]){this.set("activeStack",a);var d;for(d=b;0<=d&&e[d]!=a[d];d--)if(b=m.byId(e[d]))b._hasBeenBlurred=!0,b.set("focused",!1),b._focusManager==this&&b._onBlur(c),this.emit("widget-blur",b,c);for(d++;d<=f;d++)if(b=m.byId(a[d]))b.set("focused",!0),b._focusManager==this&&b._onFocus(c),this.emit("widget-focus",b,c)}},focus:function(a){if(a)try{a.focus()}catch(c){}}}));z(function(){var a=c.registerWin(s.get(document));l("ie")&&k(window,"unload",function(){a&&
(a.remove(),a=null)})});n.focus=function(a){c.focus(a)};for(var f in c)/^_/.test(f)||(n.focus[f]="function"==typeof c[f]?g.hitch(c,f):c[f]);c.watch(function(a,c,e){n.focus[a]=e});return c});
//# sourceMappingURL=focus.js.map