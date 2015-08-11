require({cache:{
'url:dojox/calendar/templates/MobileVerticalRenderer.html':"<div class=\"dojoxCalendarEvent dojoxCalendarVertical\">\r\n\t<div class=\"bg\"></div>\t\r\n\t<div data-dojo-attach-point=\"resizeStartHandle\" class=\"resizeStartHandle resizeHandle\"><div></div></div>\r\n\t<dl style=\"width:100%;\">\t\t\t\t\r\n\t\t<dd data-dojo-attach-point=\"beforeIcon\" class=\"beforeIcon\">▲</dd>\r\n\t\t<dd data-dojo-attach-point=\"startTimeLabel\" class=\"startTime\"></dd>\r\n\t\t<dd data-dojo-attach-point=\"summaryLabel\" class=\"summary\"></dd>\r\n\t</dl>\r\n\t<span data-dojo-attach-point=\"afterIcon\" class=\"afterIcon\">▼</span>\t\r\n\t<div data-dojo-attach-point=\"resizeEndHandle\" class=\"resizeEndHandle resizeHandle\"><div></div></div>\r\n\t<span data-dojo-attach-point=\"endTimeLabel\" class=\"endTime\"></span>\r\n</div>\r\n"}});
define("dojox/calendar/MobileVerticalRenderer", ["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", 
	"dojox/calendar/_RendererMixin", "dojo/text!./templates/MobileVerticalRenderer.html"],
	 
	function(declare, _WidgetBase, _TemplatedMixin, _RendererMixin, template){
	
	return declare("dojox.calendar.MobileVerticalRenderer", [_WidgetBase, _TemplatedMixin, _RendererMixin], {
				
		// summary:
		//		The mobile specific item vertical renderer.
		
		templateString: template,
		mobile: true,
		
		visibilityLimits: {
			resizeStartHandle: 75,
			resizeEndHandle: -1,
			summaryLabel: 55,			
			startTimeLabel: 75,
			endTimeLabel: 20
		},		
		
		postCreate: function() {
			this.inherited(arguments);
			this._applyAttributes();
		},
		
		_isElementVisible: function(elt, startHidden, endHidden, size){
			var d;
			
			switch(elt){
				case "startTimeLabel":
					d = this.item.startTime;
					if(this.item.allDay || this.owner.isStartOfDay(d)){
						return false;
					}
					break;
				case "endTimeLabel":
					d = this.item.endTime;
					if(this.item.allDay || this.owner.isStartOfDay(d)){
						return false;
					}
					break;
			}
			return this.inherited(arguments);
		}
	});
});
