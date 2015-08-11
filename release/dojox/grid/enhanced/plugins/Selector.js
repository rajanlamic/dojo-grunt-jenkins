//>>built
define("dojox/grid/enhanced/plugins/Selector","dojo/_base/kernel dojo/_base/lang dojo/_base/declare dojo/_base/array dojo/_base/event dojo/keys dojo/query dojo/_base/html dojo/_base/window dijit/focus ../../_RowSelector ../_Plugin ../../EnhancedGrid ../../cells/_base ./AutoScroll".split(" "),function(t,h,y,e,z,u,w,l,A,x,r,B,C){var q={col:"row",row:"col"},p=function(a,b,c,d,f){return"cell"!==a?(b=b[a],c=c[a],d=d[a],"number"!==typeof b||"number"!==typeof c||"number"!==typeof d?!1:f?b>=c&&b<d||b>d&&
b<=c:b>=c&&b<=d||b>=d&&b<=c):p("col",b,c,d,f)&&p("row",b,c,d,f)},v=function(a,b,c){try{if(b&&c)switch(a){case "col":case "row":return b[a]==c[a]&&"number"==typeof b[a]&&!(q[a]in b)&&!(q[a]in c);case "cell":return b.col==c.col&&b.row==c.row&&"number"==typeof b.col&&"number"==typeof b.row}}catch(d){}return!1},s=function(a){try{a&&a.preventDefault&&z.stop(a)}catch(b){}},g=function(a,b,c){switch(a){case "col":return{col:"undefined"==typeof c?b:c,except:[]};case "row":return{row:b,except:[]};case "cell":return{row:b,
col:c}}return null};t=y("dojox.grid.enhanced.plugins.Selector",B,{name:"selector",constructor:function(a,b){this.grid=a;this._config={row:2,col:2,cell:2};this.noClear=b&&b.noClear;this.setupConfig(b);"single"===a.selectionMode&&(this._config.row=1);this._enabled=!0;this._selecting={};this._selected={col:[],row:[],cell:[]};this._startPoint={};this._currentPoint={};this._lastAnchorPoint={};this._lastEndPoint={};this._lastSelectedAnchorPoint={};this._lastSelectedEndPoint={};this._keyboardSelect={};this._lastType=
null;this._selectedRowModified={};this._hacks();this._initEvents();this._initAreas();this._mixinGrid()},destroy:function(){this.inherited(arguments)},setupConfig:function(a){if(a&&h.isObject(a)){var b=["row","col","cell"],c;for(c in a)0<=e.indexOf(b,c)&&(this._config[c]=!a[c]||"disabled"==a[c]?0:"single"==a[c]?1:2);this.grid.selection.setMode(["none","single","extended"][this._config.row])}},isSelected:function(a,b,c){return this._isSelected(a,g(a,b,c))},toggleSelect:function(a,b,c){this._startSelect(a,
g(a,b,c),2===this._config[a],!1,!1,!this.isSelected(a,b,c));this._endSelect(a)},select:function(a,b,c){this.isSelected(a,b,c)||this.toggleSelect(a,b,c)},deselect:function(a,b,c){this.isSelected(a,b,c)&&this.toggleSelect(a,b,c)},selectRange:function(a,b,c,d){this.grid._selectingRange=!0;b="cell"==a?g(a,b.row,b.col):g(a,b);c="cell"==a?g(a,c.row,c.col):g(a,c);this._startSelect(a,b,!1,!1,!1,d);this._highlight(a,c,void 0===d?!0:d);this._endSelect(a);this.grid._selectingRange=!1},clear:function(a){this._clearSelection(a||
"all")},isSelecting:function(a){return"undefined"==typeof a?this._selecting.col||this._selecting.row||this._selecting.cell:this._selecting[a]},selectEnabled:function(a){"undefined"!=typeof a&&!this.isSelecting()&&(this._enabled=!!a);return this._enabled},getSelected:function(a,b){switch(a){case "cell":return e.map(this._selected[a],function(a){return a});case "col":case "row":return e.map(b?this._selected[a]:e.filter(this._selected[a],function(a){return 0===a.except.length}),function(c){return b?
c:c[a]})}return[]},getSelectedCount:function(a,b){switch(a){case "cell":return this._selected[a].length;case "col":case "row":return(b?this._selected[a]:e.filter(this._selected[a],function(a){return 0===a.except.length})).length}return 0},getSelectedType:function(){var a=this._selected;return" cell row row|cell col col|cell col|row col|row|cell".split(" ")[!!a.cell.length|!!a.row.length<<1|!!a.col.length<<2]},getLastSelectedRange:function(a){return this._lastAnchorPoint[a]?{start:this._lastAnchorPoint[a],
end:this._lastEndPoint[a]}:null},_hacks:function(){var a=this.grid,b=function(b){if(b.cellNode)a.onMouseUp(b);a.onMouseUpRow(b)},c=h.hitch(a,"onMouseUp"),d=h.hitch(a,"onMouseDown"),f=function(a){a.cellNode.style.border="solid 1px"};e.forEach(a.views.views,function(a){a.content.domouseup=b;a.header.domouseup=c;"dojox.grid._RowSelector"==a.declaredClass&&(a.domousedown=d,a.domouseup=c,a.dofocus=f)});a.selection.clickSelect=function(){};this._oldDeselectAll=a.selection.deselectAll;var k=this;a.selection.selectRange=
function(b,c){k.selectRange("row",b,c,!0);a.selection.preserver&&a.selection.preserver._updateMapping(!0,!0,!1,b,c);a.selection.onChanged()};a.selection.deselectRange=function(b,c){k.selectRange("row",b,c,!1);a.selection.preserver&&a.selection.preserver._updateMapping(!0,!1,!1,b,c);a.selection.onChanged()};a.selection.deselectAll=function(){a._selectingRange=!0;k._oldDeselectAll.apply(a.selection,arguments);k._clearSelection("all");a._selectingRange=!1;a.selection.preserver&&a.selection.preserver._updateMapping(!0,
!1,!0);a.selection.onChanged()};var m=a.views.views[0];m instanceof r&&(m.doStyleRowNode=function(b,c){l.removeClass(c,"dojoxGridRow");l.addClass(c,"dojoxGridRowbar");l.addClass(c,"dojoxGridNonNormalizedCell");l.toggleClass(c,"dojoxGridRowbarOver",a.rows.isOver(b));l.toggleClass(c,"dojoxGridRowbarSelected",!!a.selection.isSelected(b))});this.connect(a,"updateRow",function(b){e.forEach(a.layout.cells,function(a){this.isSelected("cell",b,a.index)&&this._highlightNode(a.getNode(b),!0)},this)})},_mixinGrid:function(){var a=
this.grid;a.setupSelectorConfig=h.hitch(this,this.setupConfig);a.onStartSelect=function(){};a.onEndSelect=function(){};a.onStartDeselect=function(){};a.onEndDeselect=function(){};a.onSelectCleared=function(){}},_initEvents:function(){var a=this.grid,b=this,c=h.partial,d=function(a,c){"row"===a&&(b._isUsingRowSelector=!0);if(b.selectEnabled()&&b._config[a]&&2!=c.button){if(b._keyboardSelect.col||b._keyboardSelect.row||b._keyboardSelect.cell)b._endSelect("all"),b._keyboardSelect.col=b._keyboardSelect.row=
b._keyboardSelect.cell=0;b._usingKeyboard&&(b._usingKeyboard=!1);var d=g(a,c.rowIndex,c.cell&&c.cell.index);b._startSelect(a,d,c.ctrlKey,c.shiftKey)}},f=h.hitch(this,"_endSelect");this.connect(a,"onHeaderCellMouseDown",c(d,"col"));this.connect(a,"onHeaderCellMouseUp",c(f,"col"));this.connect(a,"onRowSelectorMouseDown",c(d,"row"));this.connect(a,"onRowSelectorMouseUp",c(f,"row"));this.connect(a,"onCellMouseDown",function(c){if(!c.cell||!c.cell.isRowSelector)a.singleClickEdit&&(b._singleClickEdit=!0,
a.singleClickEdit=!1),d(0==b._config.cell?"row":"cell",c)});this.connect(a,"onCellMouseUp",function(c){b._singleClickEdit&&(delete b._singleClickEdit,a.singleClickEdit=!0);f("all",c)});this.connect(a,"onCellMouseOver",function(a){"row"!=b._curType&&(b._selecting[b._curType]&&2==b._config[b._curType])&&(b._highlight("col",g("col",a.cell.index),b._toSelect),b._keyboardSelect.cell||b._highlight("cell",g("cell",a.rowIndex,a.cell.index),b._toSelect))});this.connect(a,"onHeaderCellMouseOver",function(a){b._selecting.col&&
2==b._config.col&&b._highlight("col",g("col",a.cell.index),b._toSelect)});this.connect(a,"onRowMouseOver",function(a){b._selecting.row&&2==b._config.row&&b._highlight("row",g("row",a.rowIndex),b._toSelect)});this.connect(a,"onSelectedById","_onSelectedById");this.connect(a,"_onFetchComplete",function(){a._notRefreshSelection||this._refreshSelected(!0)});this.connect(a.scroller,"buildPage",function(){a._notRefreshSelection||this._refreshSelected(!0)});this.connect(A.doc,"onmouseup",c(f,"all"));this.connect(a,
"onEndAutoScroll",function(a,c,d,f){d=b._selecting.cell;c=c?1:-1;if(a&&(d||b._selecting.row))a=d?"cell":"row",d=b._currentPoint[a],b._highlight(a,g(a,d.row+c,d.col),b._toSelect);else if(!a&&(d||b._selecting.col))a=d?"cell":"col",d=b._currentPoint[a],b._highlight(a,g(a,d.row,f),b._toSelect)});this.subscribe("dojox/grid/rearrange/move/"+a.id,"_onInternalRearrange");this.subscribe("dojox/grid/rearrange/copy/"+a.id,"_onInternalRearrange");this.subscribe("dojox/grid/rearrange/change/"+a.id,"_onExternalChange");
this.subscribe("dojox/grid/rearrange/insert/"+a.id,"_onExternalChange");this.subscribe("dojox/grid/rearrange/remove/"+a.id,"clear");this.connect(a,"onSelected",function(a){this._selectedRowModified&&this._isUsingRowSelector?delete this._selectedRowModified:this.grid._selectingRange||this.select("row",a)});this.connect(a,"onDeselected",function(a){this._selectedRowModified&&this._isUsingRowSelector?delete this._selectedRowModified:this.grid._selectingRange||this.deselect("row",a)})},_onSelectedById:function(a,
b,c){if(!this.grid._noInternalMapping){var d=[this._lastAnchorPoint.row,this._lastEndPoint.row,this._lastSelectedAnchorPoint.row,this._lastSelectedEndPoint.row],d=d.concat(this._selected.row),f=!1;e.forEach(d,function(c){c&&(c.id===a?(f=!0,c.row=b):c.row===b&&c.id&&(c.row=-1))});!f&&c&&e.some(this._selected.row,function(c){return c&&!c.id&&!c.except.length?(c.id=a,c.row=b,!0):!1});f=!1;d=[this._lastAnchorPoint.cell,this._lastEndPoint.cell,this._lastSelectedAnchorPoint.cell,this._lastSelectedEndPoint.cell];
d=d.concat(this._selected.cell);e.forEach(d,function(c){c&&(c.id===a?(f=!0,c.row=b):c.row===b&&c.id&&(c.row=-1))})}},onSetStore:function(){this._clearSelection("all")},_onInternalRearrange:function(a,b){try{this._refresh("col",!1);e.forEach(this._selected.row,function(a){e.forEach(this.grid.layout.cells,function(b){this._highlightNode(b.getNode(a.row),!1)},this)},this);w(".dojoxGridRowSelectorSelected").forEach(function(a){l.removeClass(a,"dojoxGridRowSelectorSelected");l.removeClass(a,"dojoxGridRowSelectorSelectedUp");
l.removeClass(a,"dojoxGridRowSelectorSelectedDown")});var c=[this._lastAnchorPoint[a],this._lastEndPoint[a],this._lastSelectedAnchorPoint[a],this._lastSelectedEndPoint[a]];if("cell"===a){this.selectRange("cell",b.to.min,b.to.max);var d=this.grid.layout.cells;e.forEach(c,function(a){if(!a.converted)for(var c=b.from.min.row,f=b.to.min.row;c<=b.from.max.row;++c,++f)for(var n=b.from.min.col,e=b.to.min.col;n<=b.from.max.col;++n,++e){for(;d[n].hidden;)++n;for(;d[e].hidden;)++e;if(a.row==c&&a.col==n){a.row=
f;a.col=e;a.converted=!0;return}}})}else c=this._selected.cell.concat(this._selected[a]).concat(c).concat([this._lastAnchorPoint.cell,this._lastEndPoint.cell,this._lastSelectedAnchorPoint.cell,this._lastSelectedEndPoint.cell]),e.forEach(c,function(c){if(c&&!c.converted){var d=c[a];d in b&&(c[a]=b[d]);c.converted=!0}}),e.forEach(this._selected[q[a]],function(a){for(var c=0,d=a.except.length;c<d;++c){var f=a.except[c];f in b&&(a.except[c]=b[f])}});e.forEach(c,function(a){a&&delete a.converted});this._refreshSelected(!0);
this._focusPoint(a,this._lastEndPoint)}catch(f){}},_onExternalChange:function(a,b){this.selectRange(a,"cell"==a?b.min:b[0],"cell"==a?b.max:b[b.length-1])},_refresh:function(a,b){this._keyboardSelect[a]||e.forEach(this._selected[a],function(c){this._highlightSingle(a,b,c,void 0,!0)},this)},_refreshSelected:function(){this._refresh("col",!0);this._refresh("row",!0);this._refresh("cell",!0)},_initAreas:function(){var a=this.grid,b=a.focus,c=this,d=function(d,f,n,e,k){var g=c._keyboardSelect;if(k.shiftKey&&
g[d]){if(1===g[d]){if("cell"===d){var h=c._lastEndPoint[d];if(b.cell!=a.layout.cells[h.col+e]||b.rowIndex!=h.row+n){g[d]=0;return}}c._startSelect(d,c._lastAnchorPoint[d],!0,!1,!0);c._highlight(d,c._lastEndPoint[d],c._toSelect);g[d]=2}f=f(d,n,e,k);c._isValid(d,f,a)&&c._highlight(d,f,c._toSelect);s(k)}},f=function(b,d,f,e){if(e&&c.selectEnabled()&&0!=c._config[b])switch(f.keyCode){case u.SPACE:c._startSelect(b,d(),f.ctrlKey,f.shiftKey);c._endSelect(b);break;case u.SHIFT:2==c._config[b]&&c._isValid(b,
c._lastAnchorPoint[b],a)&&(c._endSelect(b),c._keyboardSelect[b]=1,c._usingKeyboard=!0)}},e=function(a,b,d){d&&(b.keyCode==u.SHIFT&&c._keyboardSelect[a])&&(c._endSelect(a),c._keyboardSelect[a]=0)};a.views.views[0]instanceof r&&(this._lastFocusedRowBarIdx=0,b.addArea({name:"rowHeader",onFocus:function(d,f){var e=a.views.views[0];if(e instanceof r){var k=e.getCellNode(c._lastFocusedRowBarIdx,0);k&&l.toggleClass(k,b.focusClass,!1);d&&"rowIndex"in d&&(0<=d.rowIndex?c._lastFocusedRowBarIdx=d.rowIndex:c._lastFocusedRowBarIdx||
(c._lastFocusedRowBarIdx=0));if(k=e.getCellNode(c._lastFocusedRowBarIdx,0))x.focus(k),l.toggleClass(k,b.focusClass,!0);b.rowIndex=c._lastFocusedRowBarIdx;s(d);return!0}return!1},onBlur:function(d,f){var e=a.views.views[0];e instanceof r&&((e=e.getCellNode(c._lastFocusedRowBarIdx,0))&&l.toggleClass(e,b.focusClass,!1),s(d));return!0},onMove:function(d,f,e){f=a.views.views[0];if(d&&f instanceof r&&(d=c._lastFocusedRowBarIdx+d,0<=d&&d<a.rowCount)){s(e);e=f.getCellNode(c._lastFocusedRowBarIdx,0);l.toggleClass(e,
b.focusClass,!1);e=a.scroller;var k=e.getLastPageRow(e.page),g=Math.min(a.rowCount-1,d);d>k&&a.setScrollTop(a.scrollTop+e.findScrollTop(g)-e.findScrollTop(c._lastFocusedRowBarIdx));e=f.getCellNode(d,0);x.focus(e);l.toggleClass(e,b.focusClass,!0);c._lastFocusedRowBarIdx=d;b.cell=e;b.cell.view=f;b.cell.getNode=function(a){return b.cell};b.rowIndex=c._lastFocusedRowBarIdx;b.scrollIntoView();b.cell=null}}}),b.placeArea("rowHeader","before","content"));b.addArea({name:"cellselect",onMove:h.partial(d,"cell",
function(a,b,d,f){a=c._currentPoint[a];return g("cell",a.row+b,a.col+d)}),onKeyDown:h.partial(f,"cell",function(){return g("cell",b.rowIndex,b.cell.index)}),onKeyUp:h.partial(e,"cell")});b.placeArea("cellselect","below","content");b.addArea({name:"colselect",onMove:h.partial(d,"col",function(a,b,d,f){return g("col",c._currentPoint[a].col+d)}),onKeyDown:h.partial(f,"col",function(){return g("col",b.getHeaderIndex())}),onKeyUp:h.partial(e,"col")});b.placeArea("colselect","below","header");b.addArea({name:"rowselect",
onMove:h.partial(d,"row",function(a,c,d,f){return g("row",b.rowIndex)}),onKeyDown:h.partial(f,"row",function(){return g("row",b.rowIndex)}),onKeyUp:h.partial(e,"row")});b.placeArea("rowselect","below","rowHeader")},_clearSelection:function(a,b){"all"==a?(this._clearSelection("cell",b),this._clearSelection("col",b),this._clearSelection("row",b)):(this._isUsingRowSelector=!0,e.forEach(this._selected[a],function(c){v(a,b,c)||this._highlightSingle(a,!1,c)},this),this._blurPoint(a,this._currentPoint),
this._selecting[a]=!1,this._startPoint[a]=this._currentPoint[a]=null,this._selected[a]=[],"row"==a&&!this.grid._selectingRange&&(this._oldDeselectAll.call(this.grid.selection),this.grid.selection._selectedById={}),this.grid.onEndDeselect(a,null,null,this._selected),this.grid.onSelectCleared(a))},_startSelect:function(a,b,c,d,f,e){if(this._isValid(a,b)){var m=this._isSelected(a,this._lastEndPoint[a]),g=this._isSelected(a,b);this._toSelect=this.noClear&&!c?void 0===e?!0:e:f?g:!g;if(!c||!g&&1==this._config[a])this._clearSelection("col",
b),this._clearSelection("cell",b),(!this.noClear||"row"===a&&1==this._config[a])&&this._clearSelection("row",b),this._toSelect=void 0===e?!0:e;this._selecting[a]=!0;this._currentPoint[a]=null;d&&this._lastType==a&&m==this._toSelect&&2==this._config[a]?("row"===a&&(this._isUsingRowSelector=!0),this._startPoint[a]=this._lastAnchorPoint[a],this._highlight(a,this._startPoint[a]),this._isUsingRowSelector=!1):this._startPoint[a]=b;this._curType=a;this._fireEvent("start",a);this._isUsingRowSelector=this._isStartFocus=
!0;this._highlight(a,b,this._toSelect);this._isStartFocus=!1}},_endSelect:function(a){"row"===a&&delete this._isUsingRowSelector;"all"==a?(this._endSelect("col"),this._endSelect("row"),this._endSelect("cell")):this._selecting[a]&&(this._addToSelected(a),this._lastAnchorPoint[a]=this._startPoint[a],this._lastEndPoint[a]=this._currentPoint[a],this._toSelect&&(this._lastSelectedAnchorPoint[a]=this._lastAnchorPoint[a],this._lastSelectedEndPoint[a]=this._lastEndPoint[a]),this._startPoint[a]=this._currentPoint[a]=
null,this._selecting[a]=!1,this._lastType=a,this._fireEvent("end",a))},_fireEvent:function(a,b){switch(a){case "start":this.grid[this._toSelect?"onStartSelect":"onStartDeselect"](b,this._startPoint[b],this._selected);break;case "end":this.grid[this._toSelect?"onEndSelect":"onEndDeselect"](b,this._lastAnchorPoint[b],this._lastEndPoint[b],this._selected)}},_calcToHighlight:function(a,b,c,d){if(void 0!==d){var f;if(this._usingKeyboard&&!c&&this._isInLastRange(this._lastType,b)){f=this._isSelected(a,
b);if(d&&f)return!1;if(!d&&!f&&this._isInLastRange(this._lastType,b,!0))return!0}return c?d:f||this._isSelected(a,b)}return c},_highlightNode:function(a,b){a&&(l.toggleClass(a,"dojoxGridRowSelected",b),l.toggleClass(a,"dojoxGridCellSelected",b))},_highlightHeader:function(a,b){var c=this.grid.layout.cells[a].getHeaderNode();l.toggleClass(c,"dojoxGridHeaderSelected",b)},_highlightRowSelector:function(a,b){var c=this.grid.views.views[0];c instanceof r&&(c=c.getRowNode(a))&&l.toggleClass(c,"dojoxGridRowSelectorSelected",
b)},_highlightSingle:function(a,b,c,d,f){var k=this,m,g=k.grid,h=g.layout.cells;switch(a){case "cell":m=this._calcToHighlight(a,c,b,d);a=h[c.col];!a.hidden&&!a.notselectable&&this._highlightNode(c.node||a.getNode(c.row),m);break;case "col":m=this._calcToHighlight(a,c,b,d);this._highlightHeader(c.col,m);w("td[idx\x3d'"+c.col+"']",g.domNode).forEach(function(a){var b=h[c.col].view.content.findRowTarget(a);b&&k._highlightSingle("cell",m,{row:b[dojox.grid.util.rowIndexTag],col:c.col,node:a})});break;
case "row":m=this._calcToHighlight(a,c,b,d),this._highlightRowSelector(c.row,m),this._config.cell&&e.forEach(h,function(a){k._highlightSingle("cell",m,{row:c.row,col:a.index,node:a.getNode(c.row)})}),this._selectedRowModified=!0,f||g.selection.setSelected(c.row,m)}},_highlight:function(a,b,c){if(this._selecting[a]&&null!==b){var d=this._startPoint[a],f=this._currentPoint[a],e=this,g=function(b,d,f){e._forEach(a,b,d,function(b){e._highlightSingle(a,f,b,c)},!0)};switch(a){case "col":case "row":null!==
f?p(a,b,d,f,!0)?g(f,b,!1):(p(a,d,b,f,!0)&&(g(f,d,!1),f=d),g(b,f,!0)):this._highlightSingle(a,!0,b,c);break;case "cell":null!==f&&(p("row",b,d,f,!0)||p("col",b,d,f,!0)||p("row",d,b,f,!0)||p("col",d,b,f,!0))&&g(d,f,!1),g(d,b,!0)}this._currentPoint[a]=b;this._focusPoint(a,this._currentPoint)}},_focusPoint:function(a,b){if(!this._isStartFocus){var c=b[a],d=this.grid.focus;"col"==a?(d._colHeadFocusIdx=c.col,d.focusArea("header")):"row"==a?d.focusArea("rowHeader",{rowIndex:c.row}):"cell"==a&&d.setFocusIndex(c.row,
c.col)}},_blurPoint:function(a,b){var c=this.grid.focus;"cell"==a&&c._blurContent()},_addToSelected:function(a){var b=this._toSelect,c=this,d=[],f=[],k=this._startPoint[a],g=this._currentPoint[a];this._usingKeyboard&&this._forEach(a,this._lastAnchorPoint[a],this._lastEndPoint[a],function(c){p(a,c,k,g)||(b?f:d).push(c)});this._forEach(a,k,g,function(e){var k=c._isSelected(a,e);b&&!k?d.push(e):b||f.push(e)});this._add(a,d);this._remove(a,f);e.forEach(this._selected.row,function(a){0<a.except.length&&
(this._selectedRowModified=!0,this.grid.selection.setSelected(a.row,!1))},this)},_forEach:function(a,b,c,d,f){if(this._isValid(a,b,!0)&&this._isValid(a,c,!0))switch(a){case "col":case "row":b=b[a];c=c[a];var e=c>b?1:-1;for(f||(c+=e);b!=c;b+=e)d(g(a,b));break;case "cell":f=c.col>b.col?1:-1;for(var e=c.row>b.row?1:-1,h=b.row,l=c.row+e;h!=l;h+=e)for(var n=b.col,p=c.col+f;n!=p;n+=f)d(g(a,h,n))}},_makeupForExceptions:function(a,b){var c=[];e.forEach(this._selected[a],function(d){e.forEach(b,function(b){if(d[a]==
b[a]){var g=e.indexOf(d.except,b[q[a]]);0<=g&&d.except.splice(g,1);c.push(b)}})});return c},_makeupForCells:function(a,b){var c=[];e.forEach(this._selected.cell,function(d){e.some(b,function(b){return d[a]==b[a]?(c.push(d),!0):!1})});this._remove("cell",c);e.forEach(this._selected[q[a]],function(c){e.forEach(b,function(b){b=e.indexOf(c.except,b[a]);0<=b&&c.except.splice(b,1)})})},_addException:function(a,b){e.forEach(this._selected[a],function(c){e.forEach(b,function(b){c.except.push(b[q[a]])})})},
_addCellException:function(a,b){e.forEach(this._selected[a],function(c){e.forEach(b,function(b){c[a]==b[a]&&c.except.push(b[q[a]])})})},_add:function(a,b){var c=this.grid.layout.cells;if("cell"==a){var d=this._makeupForExceptions("col",b),f=this._makeupForExceptions("row",b);b=e.filter(b,function(a){return 0>e.indexOf(d,a)&&0>e.indexOf(f,a)&&!c[a.col].hidden&&!c[a.col].notselectable})}else"col"==a&&(b=e.filter(b,function(a){return!c[a.col].hidden&&!c[a.col].notselectable})),this._makeupForCells(a,
b),this._selected[a]=e.filter(this._selected[a],function(c){return e.every(b,function(b){return c[a]!==b[a]})});"col"!=a&&this.grid._hasIdentity&&e.forEach(b,function(a){var b=this.grid._by_idx[a.row];b&&(a.id=b.idty)},this);this._selected[a]=this._selected[a].concat(b)},_remove:function(a,b){var c=h.partial(v,a);this._selected[a]=e.filter(this._selected[a],function(a){return!e.some(b,function(b){return c(a,b)})});"cell"==a?(this._addCellException("col",b),this._addCellException("row",b)):this._config.cell&&
this._addException(q[a],b)},_isCellNotInExcept:function(a,b){var c=b[a],d=b[q[a]];return e.some(this._selected[a],function(b){return b[a]==c&&0>e.indexOf(b.except,d)})},_isSelected:function(a,b){if(!b)return!1;var c=e.some(this._selected[a],function(c){var e=v(a,b,c);return e&&"cell"!==a?0===c.except.length:e});!c&&"cell"===a&&(c=this._isCellNotInExcept("col",b)||this._isCellNotInExcept("row",b),"cell"===a&&(c=c&&!this.grid.layout.cells[b.col].notselectable));return c},_isInLastRange:function(a,b,
c){var d=this[c?"_lastSelectedAnchorPoint":"_lastAnchorPoint"][a];c=this[c?"_lastSelectedEndPoint":"_lastEndPoint"][a];return!b||!d||!c?!1:p(a,b,d,c)},_isValid:function(a,b,c){if(!b)return!1;try{var d=this.grid,e=b[a];switch(a){case "col":return 0<=e&&e<d.layout.cells.length&&h.isArray(b.except)&&(c||!d.layout.cells[e].notselectable);case "row":return 0<=e&&e<d.rowCount&&h.isArray(b.except);case "cell":return 0<=b.col&&b.col<d.layout.cells.length&&0<=b.row&&b.row<d.rowCount&&(c||!d.layout.cells[b.col].notselectable)}}catch(g){}return!1}});
C.registerPlugin(t,{dependency:["autoScroll"]});return t});
//# sourceMappingURL=Selector.js.map