//>>built
require({cache:{"url:dojox/image/resources/Lightbox.html":'\x3cdiv class\x3d"dojoxLightbox" dojoAttachPoint\x3d"containerNode"\x3e\r\n\t\x3cdiv style\x3d"position:relative"\x3e\r\n\t\t\x3cdiv dojoAttachPoint\x3d"imageContainer" class\x3d"dojoxLightboxContainer" dojoAttachEvent\x3d"onclick: _onImageClick"\x3e\r\n\t\t\t\x3cimg dojoAttachPoint\x3d"imgNode" src\x3d"${imgUrl}" class\x3d"${imageClass}" alt\x3d"${title}"\x3e\r\n\t\t\t\x3cdiv class\x3d"dojoxLightboxFooter" dojoAttachPoint\x3d"titleNode"\x3e\r\n\t\t\t\t\x3cdiv class\x3d"dijitInline LightboxClose" dojoAttachPoint\x3d"closeButtonNode"\x3e\x3c/div\x3e\r\n\t\t\t\t\x3cdiv class\x3d"dijitInline LightboxNext" dojoAttachPoint\x3d"nextButtonNode"\x3e\x3c/div\x3e\t\r\n\t\t\t\t\x3cdiv class\x3d"dijitInline LightboxPrev" dojoAttachPoint\x3d"prevButtonNode"\x3e\x3c/div\x3e\r\n\t\t\t\t\x3cdiv class\x3d"dojoxLightboxText" dojoAttachPoint\x3d"titleTextNode"\x3e\x3cspan dojoAttachPoint\x3d"textNode"\x3e${title}\x3c/span\x3e\x3cspan dojoAttachPoint\x3d"groupCount" class\x3d"dojoxLightboxGroupText"\x3e\x3c/span\x3e\x3c/div\x3e\r\n\t\t\t\x3c/div\x3e\r\n\t\t\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojox/image/Lightbox","dojo dijit dojox dojo/text!./resources/Lightbox.html dijit/Dialog dojox/fx/_base".split(" "),function(c,e,g,k){c.experimental("dojox.image.Lightbox");c.getObject("image",!0,g);var h=c.declare("dojox.image.Lightbox",e._Widget,{group:"",title:"",href:"",duration:500,modal:!1,_allowPassthru:!1,_attachedDialog:null,startup:function(){this.inherited(arguments);var b=e.byId("dojoxLightboxDialog");b?this._attachedDialog=b:(this._attachedDialog=new g.image.LightboxDialog({id:"dojoxLightboxDialog"}),
this._attachedDialog.startup());this.store||(this._addSelf(),this.connect(this.domNode,"onclick","_handleClick"))},_addSelf:function(){this._attachedDialog.addImage({href:this.href,title:this.title},this.group||null)},_handleClick:function(b){this._allowPassthru||(b.preventDefault(),this.show())},show:function(){this._attachedDialog.show(this)},hide:function(){this._attachedDialog.hide()},disable:function(){this._allowPassthru=!0},enable:function(){this._allowPassthru=!1},onClick:function(){},destroy:function(){this._attachedDialog.removeImage(this);
this.inherited(arguments)}});h.LightboxDialog=c.declare("dojox.image.LightboxDialog",e.Dialog,{title:"",inGroup:null,imgUrl:e._Widget.prototype._blankGif,errorMessage:"Image not found.",adjust:!0,modal:!1,imageClass:"dojoxLightboxImage",errorImg:c.moduleUrl("dojox.image","resources/images/warning.png"),templateString:k,constructor:function(b){this._groups=this._groups||b&&b._groups||{XnoGroupX:[]}},startup:function(){this.inherited(arguments);this._animConnects=[];this.connect(this.nextButtonNode,
"onclick","_nextImage");this.connect(this.prevButtonNode,"onclick","_prevImage");this.connect(this.closeButtonNode,"onclick","hide");this._makeAnims();this._vp=c.window.getBox();return this},show:function(b){var a=this;this._lastGroup=b;a.open||(a.inherited(arguments),a._modalconnects.push(c.connect(c.global,"onscroll",this,"_position"),c.connect(c.global,"onresize",this,"_position"),c.connect(c.body(),"onkeypress",this,"_handleKey")),b.modal||a._modalconnects.push(c.connect(e._underlay.domNode,"onclick",
this,"onCancel")));if(this._wasStyled){var d=c.create("img",{className:a.imageClass},a.imgNode,"after");c.destroy(a.imgNode);a.imgNode=d;a._makeAnims();a._wasStyled=!1}c.style(a.imgNode,"opacity","0");c.style(a.titleNode,"opacity","0");d=b.href;b.group&&"XnoGroupX"!==b||a.inGroup?(a.inGroup||(a.inGroup=a._groups[b.group],c.forEach(a.inGroup,function(c,d){c.href==b.href&&(a._index=d)})),a._index||(a._index=0,d=(d=a.inGroup[a._index])&&d.href||a.errorImg),a.groupCount.innerHTML=" ("+(a._index+1)+" of "+
Math.max(1,a.inGroup.length)+")",a.prevButtonNode.style.visibility="visible",a.nextButtonNode.style.visibility="visible"):(a.groupCount.innerHTML="",a.prevButtonNode.style.visibility="hidden",a.nextButtonNode.style.visibility="hidden");b.leaveTitle||(a.textNode.innerHTML=b.title);a._ready(d)},_ready:function(b){var a=this;a._imgError=c.connect(a.imgNode,"error",a,function(){c.disconnect(a._imgError);a.imgNode.src=a.errorImg;a.textNode.innerHTML=a.errorMessage});a._imgConnect=c.connect(a.imgNode,"load",
a,function(b){a.resizeTo({w:a.imgNode.width,h:a.imgNode.height,duration:a.duration});c.disconnect(a._imgConnect);a._imgError&&c.disconnect(a._imgError)});a.imgNode.src=b},_nextImage:function(){this.inGroup&&(this._index+1<this.inGroup.length?this._index++:this._index=0,this._loadImage())},_prevImage:function(){this.inGroup&&(0==this._index?this._index=this.inGroup.length-1:this._index--,this._loadImage())},_loadImage:function(){this._loadingAnim.play(1)},_prepNodes:function(){this._imageReady=!1;
this.inGroup&&this.inGroup[this._index]?this.show({href:this.inGroup[this._index].href,title:this.inGroup[this._index].title}):this.show({title:this.errorMessage,href:this.errorImg})},_calcTitleSize:function(){var b=c.map(c.query("\x3e *",this.titleNode).position(),function(a){return a.h});return{h:Math.max.apply(Math,b)}},resizeTo:function(b,a){var d="border-box"==c.boxModel?c._getBorderExtents(this.domNode).w:0,f=a||this._calcTitleSize();this._lastTitleSize=f;if(this.adjust&&(b.h+f.h+d+80>this._vp.h||
b.w+d+60>this._vp.w))this._lastSize=b,b=this._scaleToFit(b);this._currentSize=b;d=g.fx.sizeTo({node:this.containerNode,duration:b.duration||this.duration,width:b.w+d,height:b.h+f.h+d});this.connect(d,"onEnd","_showImage");d.play(15)},_scaleToFit:function(b){var a={},c=this._vp.w-80,f=this._vp.h-60-this._lastTitleSize.h,e=b.w/b.h;e>=c/f?(a.h=c/e,a.w=c):(a.w=e*f,a.h=f);this._wasStyled=!0;this._setImageSize(a);a.duration=b.duration;return a},_setImageSize:function(b){var a=this.imgNode;a.height=b.h;
a.width=b.w},_size:function(){},_position:function(b){this._vp=c.window.getBox();this.inherited(arguments);b&&"resize"==b.type&&(this._wasStyled?(this._setImageSize(this._lastSize),this.resizeTo(this._lastSize)):(this.imgNode.height+80>this._vp.h||this.imgNode.width+60>this._vp.h)&&this.resizeTo({w:this.imgNode.width,h:this.imgNode.height}))},_showImage:function(){this._showImageAnim.play(1)},_showNav:function(){var b=c.marginBox(this.titleNode);b.h>this._lastTitleSize.h?this.resizeTo(this._wasStyled?
this._lastSize:this._currentSize,b):this._showNavAnim.play(1)},hide:function(){c.fadeOut({node:this.titleNode,duration:200,onEnd:c.hitch(this,function(){this.imgNode.src=this._blankGif})}).play(5);this.inherited(arguments);this._index=this.inGroup=null},addImage:function(b,a){b.href&&(a?(this._groups[a]||(this._groups[a]=[]),this._groups[a].push(b)):this._groups.XnoGroupX.push(b))},removeImage:function(b){c.every(this._groups[b.group||"XnoGroupX"],function(a,c,e){return a.href==b.href?(e.splice(c,
1),!1):!0})},removeGroup:function(b){this._groups[b]&&(this._groups[b]=[])},_handleKey:function(b){if(this.open){var a=c.keys;switch(b.charOrCode){case a.ESCAPE:this.hide();break;case a.DOWN_ARROW:case a.RIGHT_ARROW:case 78:this._nextImage();break;case a.UP_ARROW:case a.LEFT_ARROW:case 80:this._prevImage()}}},_makeAnims:function(){c.forEach(this._animConnects,c.disconnect);this._animConnects=[];this._showImageAnim=c.fadeIn({node:this.imgNode,duration:this.duration});this._animConnects.push(c.connect(this._showImageAnim,
"onEnd",this,"_showNav"));this._loadingAnim=c.fx.combine([c.fadeOut({node:this.imgNode,duration:175}),c.fadeOut({node:this.titleNode,duration:175})]);this._animConnects.push(c.connect(this._loadingAnim,"onEnd",this,"_prepNodes"));this._showNavAnim=c.fadeIn({node:this.titleNode,duration:225})},onClick:function(b){},_onImageClick:function(b){if(b&&b.target==this.imgNode&&(this.onClick(this._lastGroup),this._lastGroup.declaredClass))this._lastGroup.onClick(this._lastGroup)}});return h});
//# sourceMappingURL=Lightbox.js.map