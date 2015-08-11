//>>built
require({cache:{"url:dojox/form/resources/TriStateCheckBox.html":'\x3cdiv class\x3d"dijit dijitReset dijitInline" role\x3d"presentation"\r\n\t\x3e\x3cdiv class\x3d"dojoxTriStateCheckBoxInner" dojoAttachPoint\x3d"stateLabelNode"\x3e\x3c/div\r\n\t\x3e\x3cinput ${!nameAttrSetting} type\x3d"${type}" role\x3d"${type}" dojoAttachPoint\x3d"focusNode"\r\n\tclass\x3d"dijitReset dojoxTriStateCheckBoxInput" dojoAttachEvent\x3d"onclick:_onClick"\r\n/\x3e\x3c/div\x3e\r\n'}});
define("dojox/form/TriStateCheckBox","dojo/_base/kernel dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/event dojo/query dojo/dom-attr dojo/text!./resources/TriStateCheckBox.html dijit/form/Button dijit/form/_ToggleButtonMixin dojo/NodeList-dom".split(" "),function(g,h,e,d,k,f,b,l,m,n){return h("dojox.form.TriStateCheckBox",[m,n],{templateString:l,baseClass:"dojoxTriStateCheckBox",type:"checkbox",states:"",_stateLabels:null,stateValue:null,_currentState:0,_stateType:"False",readOnly:!1,
checked:"",_aria_attr:"aria-checked",constructor:function(){this.states=[!1,"mixed",!0];this.checked=!1;this._stateLabels={False:"\x26#9633;",True:"\x26#8730;",Mixed:"\x26#9632;"};this.stateValues={False:!1,True:"on",Mixed:"mixed"}},_fillContent:function(a){},postCreate:function(){b.set(this.stateLabelNode,"innerHTML",this._stateLabels[this._stateType]);this.inherited(arguments)},startup:function(){this.set("checked",this.params.checked||this.states[this._currentState]);b.set(this.stateLabelNode,
"innerHTML",this._stateLabels[this._stateType]);this.inherited(arguments)},_setIconClassAttr:null,_setCheckedAttr:function(a,p){var c=e.indexOf(this.states,a);0<=c&&(this._currentState=c,this._stateType=this._getStateType(a),b.set(this.focusNode,"value",this.stateValues[this._stateType]),b.set(this.stateLabelNode,"innerHTML",this._stateLabels[this._stateType]),this.inherited(arguments))},setChecked:function(a){g.deprecated("setChecked("+a+") is deprecated. Use set('checked',"+a+") instead.","","2.0");
this.set("checked",a)},_setStatesAttr:function(a){if(d.isArray(a))this._set("states",a);else if(d.isString(a)){var b={"true":!0,"false":!1,mixed:"mixed"};a=a.split(/\s*,\s*/);for(var c=0;c<a.length;c++)a[c]=void 0!==b[a[c]]?b[a[c]]:!1;this._set("states",a)}},_setReadOnlyAttr:function(a){this._set("readOnly",a);b.set(this.focusNode,"readOnly",a)},_setValueAttr:function(a,d){"string"==typeof a&&0>e.indexOf(this.states,a)&&(""==a&&(a="on"),this.stateValues.True=a,a=!0);this._created&&(this._currentState=
e.indexOf(this.states,a),this.set("checked",a,d),b.set(this.focusNode,"value",this.stateValues[this._stateType]))},_setValuesAttr:function(a){this.stateValues.True=a[0]?a[0]:this.stateValues.True;this.stateValues.Mixed=a[1]?a[1]:this.stateValues.Mixed},_getValueAttr:function(){return this.stateValues[this._stateType]},reset:function(){this._hasBeenBlurred=!1;this.set("states",this.params.states||[!1,"mixed",!0]);this.stateValues=this.params.stateValues||{False:!1,True:"on",Mixed:"mixed"};this.set("values",
this.params.values||[]);this.set("checked",this.params.checked||this.states[0])},_onFocus:function(){this.id&&f("label[for\x3d'"+this.id+"']").addClass("dijitFocusedLabel");this.inherited(arguments)},_onBlur:function(){this.id&&f("label[for\x3d'"+this.id+"']").removeClass("dijitFocusedLabel");this.mouseFocus=!1;this.inherited(arguments)},_onClick:function(a){if(this.readOnly||this.disabled)return k.stop(a),!1;this.click();return this.onClick(a)},click:function(){this._currentState>=this.states.length-
1?this._currentState=0:-1==this._currentState?this.fixState():this._currentState++;var a=this._currentState;this.set("checked",this.states[this._currentState]);this._currentState=a;b.set(this.stateLabelNode,"innerHTML",this._stateLabels[this._stateType])},fixState:function(){this._currentState=this.states.length-1},_getStateType:function(a){return a?"mixed"==a?"Mixed":"True":"False"},_onMouseDown:function(){this.mouseFocus=!0}})});
//# sourceMappingURL=TriStateCheckBox.js.map