//>>built
define("dojox/sketch/Figure","dojo/_base/kernel dojo/_base/lang dojo/_base/connect dojo/_base/html ../gfx ../xml/DomParser ./UndoStack".split(" "),function(d){d.experimental("dojox.sketch");var e=dojox.sketch;e.tools={};e.registerTool=function(a,b){e.tools[a]=b};e.Figure=function(a){var b=this;this.annCounter=1;this.shapes=[];this.imageSrc=this.image=null;this.size={w:0,h:0};this.node=this.group=this.surface=null;this.zoomFactor=1;this.tools=null;this.obj={};d.mixin(this,a);this.selected=[];this.hasSelections=
function(){return 0<this.selected.length};this.isSelected=function(a){for(var f=0;f<b.selected.length;f++)if(b.selected[f]==a)return!0;return!1};this.select=function(a){b.isSelected(a)||(b.clearSelections(),b.selected=[a]);a.setMode(e.Annotation.Modes.View);a.setMode(e.Annotation.Modes.Edit)};this.deselect=function(a){for(var f=-1,c=0;c<b.selected.length;c++)if(b.selected[c]==a){f=c;break}-1<f&&(a.setMode(e.Annotation.Modes.View),b.selected.splice(f,1));return a};this.clearSelections=function(){for(var a=
0;a<b.selected.length;a++)b.selected[a].setMode(e.Annotation.Modes.View);b.selected=[]};this.replaceSelection=function(a,f){if(b.isSelected(f)){for(var c=-1,d=0;d<b.selected.length;d++)if(b.selected[d]==f){c=d;break}-1<c&&b.selected.splice(c,1,a)}else b.select(a)};this._cshape=this._absEnd=this._end=this._start=this._ctool=this._startPoint=this._prevState=this._action=this._lp=this._ctr=this._c=null;this._dblclick=function(a){var c=b._fromEvt(a);if(c)b.onDblClickShape(c,a)};this._keydown=function(a){var c=
!1;if(a.ctrlKey)if(90===a.keyCode||122===a.keyCode)b.undo(),c=!0;else if(89===a.keyCode||121===a.keyCode)b.redo(),c=!0;if(46===a.keyCode||8===a.keyCode)b._delete(b.selected),c=!0;c&&d.stopEvent(a)};this._md=function(a){"vml"==dojox.gfx.renderer&&b.node.focus();var c=b._fromEvt(a);b._startPoint={x:a.pageX,y:a.pageY};b._ctr=d.position(b.node);b._ctr={x:b._ctr.x-b.node.scrollLeft,y:b._ctr.y-b.node.scrollTop};var e=a.clientX-b._ctr.x,k=a.clientY-b._ctr.y;b._lp={x:e,y:k};b._start={x:e,y:k};b._end={x:e,
y:k};b._absEnd={x:e,y:k};c?(c.type&&"Anchor"!=c.type()&&(b.isSelected(c)?b._sameShapeSelected=!0:(b.select(c),b._sameShapeSelected=!1)),c.beginEdit(),b._c=c):(b.clearSelections(),b._ctool.onMouseDown(a))};this._mm=function(a){if(b._ctr)if(b._c&&!b._c.shape)b._clearMouse();else{var c=a.clientX-b._ctr.x,d=a.clientY-b._ctr.y,e=c-b._lp.x,m=d-b._lp.y;b._absEnd={x:c,y:d};if(b._c)b._c.setBinding({dx:e/b.zoomFactor,dy:m/b.zoomFactor}),b._lp={x:c,y:d};else if(b._end={x:e,y:m},c={x:Math.min(b._start.x,b._absEnd.x),
y:Math.min(b._start.y,b._absEnd.y),width:Math.abs(b._start.x-b._absEnd.x),height:Math.abs(b._start.y-b._absEnd.y)},c.width&&c.height)b._ctool.onMouseMove(a,c)}};this._mu=function(a){if(b._c)b._c.shape&&b._c.endEdit();else b._ctool.onMouseUp(a);b._clearMouse()};this._clearMouse=function(){b._c=b._ctr=b._lp=b._action=b._prevState=b._startPoint=null;b._cshape=b._start=b._end=b._absEnd=null};this.initUndoStack()};var c=e.Figure.prototype;c.initUndoStack=function(){this.history=new e.UndoStack(this)};
c.setTool=function(a){this._ctool=a};c.gridSize=0;c._calCol=function(a){return this.gridSize?Math.round(a/this.gridSize)*this.gridSize:a};c._delete=function(a,b){for(var c=0;c<a.length;c++)if(a[c].setMode(e.Annotation.Modes.View),a[c].destroy(b),this.remove(a[c]),this._remove(a[c]),!b)a[c].onRemove();a.splice(0,a.length)};c.onDblClickShape=function(a,b){if(a.onDblClick)a.onDblClick(b)};c.onCreateShape=function(a){};c.onBeforeCreateShape=function(a){};c.initialize=function(a){this.node=a;this.surface=
dojox.gfx.createSurface(a,this.size.w,this.size.h);this.group=this.surface.createGroup();this._cons=[];var b=this.surface.getEventSource();this._cons.push(d.connect(b,"ondraggesture",d.stopEvent),d.connect(b,"ondragenter",d.stopEvent),d.connect(b,"ondragover",d.stopEvent),d.connect(b,"ondragexit",d.stopEvent),d.connect(b,"ondragstart",d.stopEvent),d.connect(b,"onselectstart",d.stopEvent),d.connect(b,"onmousedown",this._md),d.connect(b,"onmousemove",this._mm),d.connect(b,"onmouseup",this._mu),d.connect(b,
"onclick",this,"onClick"),d.connect(b,"ondblclick",this._dblclick),d.connect(a,"onkeydown",this._keydown));this.image=this.group.createImage({width:this.imageSize.w,height:this.imageSize.h,src:this.imageSrc})};c.destroy=function(a){this.node&&(a||(this.history&&this.history.destroy(),this._subscribed&&(d.unsubscribe(this._subscribed),delete this._subscribed)),d.forEach(this._cons,d.disconnect),this._cons=[],d.empty(this.node),this.group=this.surface=null,this.obj={},this.shapes=[])};c.nextKey=function(){return"annotation-"+
this.annCounter++};c.draw=function(){};c.zoom=function(a){this.zoomFactor=a/100;this.surface.setDimensions(this.size.w*this.zoomFactor,this.size.h*this.zoomFactor);this.group.setTransform(dojox.gfx.matrix.scale(this.zoomFactor,this.zoomFactor));for(a=0;a<this.shapes.length;a++)this.shapes[a].zoom(this.zoomFactor)};c.getFit=function(){return 100*Math.min((this.node.parentNode.offsetWidth-5)/this.size.w,(this.node.parentNode.offsetHeight-5)/this.size.h)};c.unzoom=function(){this.zoomFactor=1;this.surface.setDimensions(this.size.w,
this.size.h);this.group.setTransform()};c._add=function(a){this.obj[a._key]=a};c._remove=function(a){this.obj[a._key]&&delete this.obj[a._key]};c._get=function(a){a&&-1<a.indexOf("bounding")?a=a.replace("-boundingBox",""):a&&-1<a.indexOf("-labelShape")&&(a=a.replace("-labelShape",""));return this.obj[a]};c._keyFromEvt=function(a){var b=a.target.id+"";if(0==b.length){a=a.target.parentNode;for(b=this.surface.getEventSource();a&&0==a.id.length&&a!=b;)a=a.parentNode;b=a.id}return b};c._fromEvt=function(a){return this._get(this._keyFromEvt(a))};
c.add=function(a){for(var b=0;b<this.shapes.length;b++)if(this.shapes[b]==a)return!0;this.shapes.push(a);return!0};c.remove=function(a){for(var b=-1,c=0;c<this.shapes.length;c++)if(this.shapes[c]==a){b=c;break}-1<b&&this.shapes.splice(b,1);return a};c.getAnnotator=function(a){for(var b=0;b<this.shapes.length;b++)if(this.shapes[b].id==a)return this.shapes[b];return null};c.convert=function(a,b){var c=b+"Annotation";if(e[c]){var f=a.type(),p=a.id,k=a.label,m=a.mode,g,h,n,l;switch(f){case "Preexisting":case "Lead":l=
{dx:a.transform.dx,dy:a.transform.dy};g={x:a.start.x,y:a.start.y};h={x:a.end.x,y:a.end.y};n={x:h.x-(h.x-g.x)/2,y:h.y-(h.y-g.y)/2};break;case "SingleArrow":case "DoubleArrow":l={dx:a.transform.dx,dy:a.transform.dy};g={x:a.start.x,y:a.start.y};h={x:a.end.x,y:a.end.y};n={x:a.control.x,y:a.control.y};break;case "Underline":l={dx:a.transform.dx,dy:a.transform.dy},g={x:a.start.x,y:a.start.y},n={x:g.x+50,y:g.y+50},h={x:g.x+100,y:g.y+100}}c=new e[c](this,p);"Underline"==c.type()?c.transform={dx:l.dx+g.x,
dy:l.dy+g.y}:(c.transform&&(c.transform=l),c.start&&(c.start=g));c.end&&(c.end=h);c.control&&(c.control=n);c.label=k;c.token=d.lang.shallowCopy(a.token);c.initialize();this.replaceSelection(c,a);this._remove(a);this.remove(a);a.destroy();c.setMode(m)}};c.setValue=function(a){a=dojox.xml.DomParser.parse(a);this.load(a,this.node)};c.load=function(a,b){this.surface&&this.destroy(!0);var c=a.documentElement;this.size={w:parseFloat(c.getAttribute("width"),10),h:parseFloat(c.getAttribute("height"),10)};
var c=c.childrenByName("g")[0],d=c.childrenByName("image")[0];this.imageSize={w:parseFloat(d.getAttribute("width"),10),h:parseFloat(d.getAttribute("height"),10)};this.imageSrc=d.getAttribute("xlink:href");this.initialize(b);c=c.childrenByName("g");for(d=0;d<c.length;d++)this._loadAnnotation(c[d]);this._loadDeferred&&(this._loadDeferred.callback(this),this._loadDeferred=null);this.onLoad()};c.onLoad=function(){};c.onClick=function(){};c._loadAnnotation=function(a){var b=a.getAttribute("dojoxsketch:type")+
"Annotation";return e[b]?(b=new e[b](this,a.id),b.initialize(a),this.nextKey(),b.setMode(e.Annotation.Modes.View),this._add(b),b):null};c.onUndo=function(){};c.onBeforeUndo=function(){};c.onRedo=function(){};c.onBeforeRedo=function(){};c.undo=function(){this.history&&(this.onBeforeUndo(),this.history.undo(),this.onUndo())};c.redo=function(){this.history&&(this.onBeforeRedo(),this.history.redo(),this.onRedo())};c.serialize=function(){for(var a='\x3csvg xmlns\x3d"http://www.w3.org/2000/svg" xmlns:xlink\x3d"http://www.w3.org/1999/xlink" xmlns:dojoxsketch\x3d"http://dojotoolkit.org/dojox/sketch" width\x3d"'+
this.size.w+'" height\x3d"'+this.size.h+'"\x3e\x3cg\x3e\x3cimage xlink:href\x3d"'+this.imageSrc+'" x\x3d"0" y\x3d"0" width\x3d"'+this.size.w+'" height\x3d"'+this.size.h+'" /\x3e',b=0;b<this.shapes.length;b++)a+=this.shapes[b].serialize();return a+"\x3c/g\x3e\x3c/svg\x3e"};c.getValue=c.serialize;return dojox.sketch.Figure});
//# sourceMappingURL=Figure.js.map