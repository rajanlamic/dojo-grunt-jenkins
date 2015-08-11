//>>built
define("dojox/layout/dnd/PlottedDnd",["dojo","dijit","dojox","dojo/require!dojo/dnd/Source,dojo/dnd/Manager,dojox/layout/dnd/Avatar"],function(c,g,e){c.provide("dojox.layout.dnd.PlottedDnd");c.require("dojo.dnd.Source");c.require("dojo.dnd.Manager");c.require("dojox.layout.dnd.Avatar");c.declare("dojox.layout.dnd.PlottedDnd",[c.dnd.Source],{GC_OFFSET_X:c.dnd.manager().OFFSET_X,GC_OFFSET_Y:c.dnd.manager().OFFSET_Y,constructor:function(a,b){this.childBoxes=null;this.dropIndicator=new e.layout.dnd.DropIndicator("dndDropIndicator",
"div");this.withHandles=b.withHandles;this.handleClasses=b.handleClasses;this.opacity=b.opacity;this.allowAutoScroll=b.allowAutoScroll;this.dom=b.dom;this.skipForm=this.singular=!0;this._over=!1;this.defaultHandleClass="GcDndHandle";this.isDropped=!1;this._timer=null;this.isOffset=b.isOffset?!0:!1;this.offsetDrag=b.offsetDrag?b.offsetDrag:{x:0,y:0};this.hideSource=b.hideSource?b.hideSource:!0;this._drop=this.dropIndicator.create()},_calculateCoords:function(a){c.forEach(this.node.childNodes,function(b){var d=
c.coords(b,!0);b.coords={xy:d,w:b.offsetWidth/2,h:b.offsetHeight/2,mw:d.w};a&&(b.coords.mh=d.h)},this)},_legalMouseDown:function(a){if(!this.withHandles)return!0;for(a=a.target;a&&a!=this.node;a=a.parentNode)if(c.hasClass(a,this.defaultHandleClass))return!0;return!1},setDndItemSelectable:function(a,b){for(var d=a;d&&a!=this.node;d=d.parentNode)if(c.hasClass(d,"dojoDndItem")){c.setSelectable(d,b);break}},getDraggedWidget:function(a){for(;a&&"body"!=a.nodeName.toLowerCase()&&!c.hasClass(a,"dojoDndItem");)a=
a.parentNode;return a?g.byNode(a):null},isAccepted:function(a){return(a=a?a.getAttribute("dndtype"):null)&&a in this.accept},onDndStart:function(a,b,d){this.firstIndicator=a==this;this._calculateCoords(!0);var f=c.dnd.manager();b[0].coords?(this._drop.style.height=b[0].coords.mh+"px",c.style(f.avatar.node,"width",b[0].coords.mw+"px")):this._drop.style.height=f.avatar.node.clientHeight+"px";this.dndNodes=b;e.layout.dnd.PlottedDnd.superclass.onDndStart.call(this,a,b,d);a==this&&this.hideSource&&c.forEach(b,
function(a){c.style(a,"display","none")})},onDndCancel:function(){if(c.dnd.manager().source==this&&this.hideSource){var a=this.getSelectedNodes();c.forEach(a,function(a){c.style(a,"display","")})}e.layout.dnd.PlottedDnd.superclass.onDndCancel.call(this);this.deleteDashedZone()},onDndDrop:function(a,b,c,f){try{if(this.isAccepted(b[0]))a==this&&(this._over&&this.dropObject)&&(this.current=this.dropObject.c),e.layout.dnd.PlottedDnd.superclass.onDndDrop.call(this,a,b,c,f),this._calculateCoords(!0);else this.onDndCancel()}catch(h){}},
onMouseDown:function(a){null==this.current?this.selection={}:this.current==this.anchor&&(this.anchor=null);if(null!==this.current){var b=c.coords(this.current,!0);this.current.coords={xy:b,w:this.current.offsetWidth/2,h:this.current.offsetHeight/2,mh:b.h,mw:b.w};this._drop.style.height=this.current.coords.mh+"px";if(this.isOffset){if(0==this.offsetDrag.x&&0==this.offsetDrag.y){var d=!0,b=c.coords(this._getChildByEvent(a));this.offsetDrag.x=b.x-a.pageX;this.offsetDrag.y=b.y-a.clientY}16>this.offsetDrag.y&&
null!=this.current&&(this.offsetDrag.y=this.GC_OFFSET_Y);b=c.dnd.manager();b.OFFSET_X=this.offsetDrag.x;b.OFFSET_Y=this.offsetDrag.y;d&&(this.offsetDrag.x=0,this.offsetDrag.y=0)}}c.dnd.isFormElement(a)?this.setDndItemSelectable(a.target,!0):(this.containerSource=!0,d=this.getDraggedWidget(a.target),(!d||!d.dragRestriction)&&e.layout.dnd.PlottedDnd.superclass.onMouseDown.call(this,a))},onMouseUp:function(a){e.layout.dnd.PlottedDnd.superclass.onMouseUp.call(this,a);this.containerSource=!1;!c.isIE&&
this.mouseDown&&this.setDndItemSelectable(a.target,!0);a=c.dnd.manager();a.OFFSET_X=this.GC_OFFSET_X;a.OFFSET_Y=this.GC_OFFSET_Y},onMouseMove:function(a){var b=c.dnd.manager();if(this.isDragging){var d=!1;if(null!=this.current||null==this.current&&!this.dropObject)if(this.isAccepted(b.nodes[0])||this.containerSource)d=this.setIndicatorPosition(a);if(this.current!=this.targetAnchor||d!=this.before)this._markTargetAnchor(d),b.canDrop(!this.current||b.source!=this||!(this.current.id in this.selection));
this.allowAutoScroll&&this._checkAutoScroll(a)}else this.mouseDown&&this.isSource&&(d=this.getSelectedNodes(),d.length&&b.startDrag(this,d,this.copyState(c.isCopyKey(a)))),this.allowAutoScroll&&this._stopAutoScroll()},_markTargetAnchor:function(a){this.current==this.targetAnchor&&this.before==a||(this.targetAnchor=this.current,this.targetBox=null,this.before=a)},_unmarkTargetAnchor:function(){this.targetAnchor&&(this.targetBox=this.targetAnchor=null,this.before=!0)},setIndicatorPosition:function(a){var b=
!1;if(this.current){if(!this.current.coords||this.allowAutoScroll)this.current.coords={xy:c.coords(this.current,!0),w:this.current.offsetWidth/2,h:this.current.offsetHeight/2};b=this.horizontal?a.pageX-this.current.coords.xy.x<this.current.coords.w:a.pageY-this.current.coords.xy.y<this.current.coords.h;this.insertDashedZone(b)}else this.dropObject||this.insertDashedZone(!1);return b},onOverEvent:function(){this._over=!0;e.layout.dnd.PlottedDnd.superclass.onOverEvent.call(this);if(this.isDragging){var a=
c.dnd.manager();!this.current&&(!this.dropObject&&this.getSelectedNodes()[0]&&this.isAccepted(a.nodes[0]))&&this.insertDashedZone(!1)}},onOutEvent:function(){this.containerSource=this._over=!1;e.layout.dnd.PlottedDnd.superclass.onOutEvent.call(this);this.dropObject&&this.deleteDashedZone()},deleteDashedZone:function(){this._drop.style.display="none";for(var a=this._drop.nextSibling;null!=a;)a.coords.xy.y-=parseInt(this._drop.style.height),a=a.nextSibling;delete this.dropObject},insertDashedZone:function(a){if(this.dropObject){if(a==
this.dropObject.b&&(this.current&&this.dropObject.c==this.current.id||!this.current&&!this.dropObject.c))return;this.deleteDashedZone()}this.dropObject={n:this._drop,c:this.current?this.current.id:null,b:a};if(this.current)if(c.place(this._drop,this.current,a?"before":"after"),this.firstIndicator)this.firstIndicator=!1;else for(a=this._drop.nextSibling;null!=a;)a.coords.xy.y+=parseInt(this._drop.style.height),a=a.nextSibling;else this.node.appendChild(this._drop);this._drop.style.display=""},insertNodes:function(a,
b,d,f){if(this.dropObject)c.style(this.dropObject.n,"display","none"),e.layout.dnd.PlottedDnd.superclass.insertNodes.call(this,!0,b,!0,this.dropObject.n),this.deleteDashedZone();else return e.layout.dnd.PlottedDnd.superclass.insertNodes.call(this,a,b,d,f);if(a=g.byId(b[0].getAttribute("widgetId")))e.layout.dnd._setGcDndHandle(a,this.withHandles,this.handleClasses),this.hideSource&&c.style(a.domNode,"display","")},_checkAutoScroll:function(a){this._timer&&clearTimeout(this._timer);this._stopAutoScroll();
var b=this.dom,c=this._sumAncestorProperties(b,"offsetTop");a.pageY-b.offsetTop+30>b.clientHeight?(this.autoScrollActive=!0,this._autoScrollDown(b)):0<b.scrollTop&&30>a.pageY-c&&(this.autoScrollActive=!0,this._autoScrollUp(b))},_autoScrollUp:function(a){this.autoScrollActive&&0<a.scrollTop&&(a.scrollTop-=30,this._timer=setTimeout(c.hitch(this,"_autoScrollUp",a),100))},_autoScrollDown:function(a){this.autoScrollActive&&a.scrollTop<a.scrollHeight-a.clientHeight&&(a.scrollTop+=30,this._timer=setTimeout(c.hitch(this,
"_autoScrollDown",a),100))},_stopAutoScroll:function(){this.autoScrollActive=!1},_sumAncestorProperties:function(a,b){a=c.byId(a);if(!a)return 0;for(var d=0;a;){var f=a[b];if(f&&(d+=f-0,a==c.body()))break;a=a.parentNode}return d}});e.layout.dnd._setGcDndHandle=function(a,b,d,f){f||c.query(".GcDndHandle",a.domNode).removeClass("GcDndHandle");if(b){b=!1;for(f=d.length-1;0<=f;f--){var e=c.query("."+d[f],a.domNode)[0];if(e&&(b=!0,"GcDndHandle"!=d[f])){var g=c.query(".GcDndHandle",a.domNode);0==g.length?
c.removeClass(a.domNode,"GcDndHandle"):g.removeClass("GcDndHandle");c.addClass(e,"GcDndHandle")}}b||c.addClass(a.domNode,"GcDndHandle")}else c.addClass(a.domNode,"GcDndHandle")};c.declare("dojox.layout.dnd.DropIndicator",null,{constructor:function(a,b){this.tag=b||"div";this.style=a||null},isInserted:function(){return this.node.parentNode&&1==this.node.parentNode.nodeType},create:function(){if(this.node&&this.isInserted())return this.node;var a=c.doc.createElement(this.tag);this.style?(a.className=
this.style,a.style.height="90px"):c.style(a,{position:"relative",border:"1px dashed #F60",margin:"2px",height:"90px"});return this.node=a},destroy:function(){this.node&&this.isInserted()&&(this.node.parentNode.removeChild(this.node),this.node=null)}});c.extend(c.dnd.Manager,{canDrop:function(a){a=this.target&&a;this.canDropFlag!=a&&(this.canDropFlag=a,this.avatar&&this.avatar.update())},makeAvatar:function(){return"dojox.layout.dnd.PlottedDnd"==this.source.declaredClass?new e.layout.dnd.Avatar(this,
this.source.opacity):new c.dnd.Avatar(this)}});c.isIE&&(e.layout.dnd.handdleIE=[c.subscribe("/dnd/start",null,function(){IEonselectstart=document.body.onselectstart;document.body.onselectstart=function(){return!1}}),c.subscribe("/dnd/cancel",null,function(){document.body.onselectstart=IEonselectstart}),c.subscribe("/dnd/drop",null,function(){document.body.onselectstart=IEonselectstart})],c.addOnWindowUnload(function(){c.forEach(e.layout.dnd.handdleIE,c.unsubscribe)}))});
//# sourceMappingURL=PlottedDnd.js.map