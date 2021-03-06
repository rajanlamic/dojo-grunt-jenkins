require({cache:{
'url:dijit/templates/Fieldset.html':"<fieldset>\r\n\t<legend data-dojo-attach-event=\"ondijitclick:_onTitleClick, onkeydown:_onTitleKey\"\r\n\t\t\tdata-dojo-attach-point=\"titleBarNode, titleNode\">\r\n\t\t<span data-dojo-attach-point=\"arrowNode\" class=\"dijitInline dijitArrowNode\" role=\"presentation\"></span\r\n\t\t><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\r\n\t\t><span data-dojo-attach-point=\"titleNode, focusNode\" class=\"dijitFieldsetLegendNode\" id=\"${id}_titleNode\"></span>\r\n\t</legend>\r\n\t<div class=\"dijitFieldsetContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\r\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\r\n\t\t\t<div class=\"dijitFieldsetContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\"\r\n\t\t\t\t \tid=\"${id}_pane\" aria-labelledby=\"${id}_titleNode\">\r\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</fieldset>\r\n"}});
define("dijit/Fieldset", [
	"dojo/_base/declare",
	"dojo/query!css2",
	"dijit/TitlePane",
	"dojo/text!./templates/Fieldset.html",
	"./a11yclick"	// template uses ondijitclick
], function(declare, query, TitlePane, template){


	return declare("dijit.Fieldset", TitlePane, {
		// summary:
		//		An accessible fieldset that can be expanded or collapsed via
		//		its legend.  Fieldset extends `dijit.TitlePane`.

		// baseClass: [protected] String
		//		The root className to use for the various states of this widget
		baseClass: 'dijitFieldset',

		// title: String
		//		Content of the legend tag. Overrides <legend> tag if not empty.
		title: '',

		// open: Boolean
		//		Whether fieldset is opened or closed.
		open: true,

		templateString: template,

		postCreate: function() {
			if(!this.title){
				var legends = query('legend', this.containerNode);
				if(legends.length) { // oops, no legend?
					this.set('title', legends[0].innerHTML);
					legends[0].parentNode.removeChild(legends[0]);
				}
			}

			this.inherited(arguments);
		}
	});
});
