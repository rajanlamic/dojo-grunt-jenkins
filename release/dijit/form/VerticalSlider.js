//>>built
require({cache:{"url:dijit/form/templates/VerticalSlider.html":'\x3ctable class\x3d"dijit dijitReset dijitSlider dijitSliderV" cellspacing\x3d"0" cellpadding\x3d"0" border\x3d"0" rules\x3d"none" data-dojo-attach-event\x3d"onkeydown:_onKeyDown,onkeyup:_onKeyUp"\r\n\trole\x3d"presentation"\r\n\t\x3e\x3ctr class\x3d"dijitReset"\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV"\r\n\t\t\t\x3e\x3cdiv class\x3d"dijitSliderIncrementIconV" style\x3d"display:none" data-dojo-attach-point\x3d"decrementButton"\x3e\x3cspan class\x3d"dijitSliderButtonInner"\x3e+\x3c/span\x3e\x3c/div\r\n\t\t\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\r\n\t\x3e\x3c/tr\r\n\t\x3e\x3ctr class\x3d"dijitReset"\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\r\n\t\t\t\x3e\x3ccenter\x3e\x3cdiv class\x3d"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper" data-dojo-attach-event\x3d"press:_onClkIncBumper"\x3e\x3c/div\x3e\x3c/center\r\n\t\t\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\r\n\t\x3e\x3c/tr\r\n\t\x3e\x3ctr class\x3d"dijitReset"\r\n\t\t\x3e\x3ctd data-dojo-attach-point\x3d"leftDecoration" class\x3d"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV"\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset dijitSliderDecorationC" style\x3d"height:100%;"\r\n\t\t\t\x3e\x3cinput data-dojo-attach-point\x3d"valueNode" type\x3d"hidden" ${!nameAttrSetting}\r\n\t\t\t/\x3e\x3ccenter class\x3d"dijitReset dijitSliderBarContainerV" role\x3d"presentation" data-dojo-attach-point\x3d"sliderBarContainer"\r\n\t\t\t\t\x3e\x3cdiv role\x3d"presentation" data-dojo-attach-point\x3d"remainingBar" class\x3d"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV" data-dojo-attach-event\x3d"press:_onBarClick"\x3e\x3c!--#5629--\x3e\x3c/div\r\n\t\t\t\t\x3e\x3cdiv role\x3d"presentation" data-dojo-attach-point\x3d"progressBar" class\x3d"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV" data-dojo-attach-event\x3d"press:_onBarClick"\r\n\t\t\t\t\t\x3e\x3cdiv class\x3d"dijitSliderMoveable dijitSliderMoveableV" style\x3d"vertical-align:top;"\r\n\t\t\t\t\t\t\x3e\x3cdiv data-dojo-attach-point\x3d"sliderHandle,focusNode" class\x3d"dijitSliderImageHandle dijitSliderImageHandleV" data-dojo-attach-event\x3d"press:_onHandleClick" role\x3d"slider"\x3e\x3c/div\r\n\t\t\t\t\t\x3e\x3c/div\r\n\t\t\t\t\x3e\x3c/div\r\n\t\t\t\x3e\x3c/center\r\n\t\t\x3e\x3c/td\r\n\t\t\x3e\x3ctd data-dojo-attach-point\x3d"containerNode,rightDecoration" class\x3d"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV"\x3e\x3c/td\r\n\t\x3e\x3c/tr\r\n\t\x3e\x3ctr class\x3d"dijitReset"\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\r\n\t\t\t\x3e\x3ccenter\x3e\x3cdiv class\x3d"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper" data-dojo-attach-event\x3d"press:_onClkDecBumper"\x3e\x3c/div\x3e\x3c/center\r\n\t\t\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\r\n\t\x3e\x3c/tr\r\n\t\x3e\x3ctr class\x3d"dijitReset"\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV"\r\n\t\t\t\x3e\x3cdiv class\x3d"dijitSliderDecrementIconV" style\x3d"display:none" data-dojo-attach-point\x3d"incrementButton"\x3e\x3cspan class\x3d"dijitSliderButtonInner"\x3e-\x3c/span\x3e\x3c/div\r\n\t\t\x3e\x3c/td\r\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\r\n\t\x3e\x3c/tr\r\n\x3e\x3c/table\x3e\r\n'}});
define("dijit/form/VerticalSlider",["dojo/_base/declare","./HorizontalSlider","dojo/text!./templates/VerticalSlider.html"],function(a,b,c){return a("dijit.form.VerticalSlider",b,{templateString:c,_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_handleOffsetCoord:"top",_progressPixelSize:"height",_descending:!0,_isReversed:function(){return this._descending}})});
//# sourceMappingURL=VerticalSlider.js.map