require({cache:{
'url:dojox/calc/templates/FuncGen.html':"<div style=\"border:1px solid black;\">\r\n\t<select data-dojo-type=\"dijit.form.ComboBox\" placeholder=\"functionName\" data-dojo-attach-point='combo' style=\"width:45%;\" class=\"dojoxCalcFuncGenNameBox\" data-dojo-attach-event='onChange:onSelect'></select>\r\n\t<input data-dojo-type=\"dijit.form.TextBox\" placeholder=\"arguments\" class=\"dojoxCalcFuncGenTextBox\" style=\"width:50%;\" data-dojo-attach-point='args' />\r\n\t<BR>\r\n\t<TEXTAREA data-dojo-type=\"dijit.form.SimpleTextarea\" placeholder=\"function body\" class=\"dojoxCalcFuncGenTextArea\" style=\"text-align:left;width:95%;\" rows=10 data-dojo-attach-point='textarea' value=\"\" data-dojo-attach-event='onClick:readyStatus'></TEXTAREA>\r\n\t<BR>\r\n\t<input data-dojo-type=\"dijit.form.Button\" class=\"dojoxCalcFuncGenSave\" data-dojo-attach-point='saveButton' label=\"Save\" data-dojo-attach-event='onClick:onSaved' />\r\n\t<input data-dojo-type=\"dijit.form.Button\" class=\"dojoxCalcFuncGenReset\" data-dojo-attach-point='resetButton' label=\"Reset\" data-dojo-attach-event='onClick:onReset' />\r\n\t<input data-dojo-type=\"dijit.form.Button\" class=\"dojoxCalcFuncGenClear\" data-dojo-attach-point='clearButton' label=\"Clear\" data-dojo-attach-event='onClick:onClear' />\r\n\t<input data-dojo-type=\"dijit.form.Button\" class=\"dojoxCalcFuncGenClose\" data-dojo-attach-point='closeButton' label=\"Close\" />\r\n\t<BR><BR>\r\n\t<input data-dojo-type=\"dijit.form.Button\" class=\"dojoxCalcFuncGenDelete\" data-dojo-attach-point='deleteButton' label=\"Delete\" data-dojo-attach-event='onClick:onDelete' />\r\n\t<BR>\r\n\t<input data-dojo-type=\"dijit.form.TextBox\" style=\"width:45%;\" data-dojo-attach-point='status' class=\"dojoxCalcFuncGenStatusTextBox\" readonly value=\"Ready\" />\r\n</div>\r\n"}});
define("dojox/calc/FuncGen", [
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-style",
	"dijit/_WidgetBase",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/_TemplatedMixin",
	"dojox/math/_base",
	"dijit/registry",
	"dojo/text!./templates/FuncGen.html",
	"dojox/calc/_Executor",
	"dijit/form/ComboBox", // template
	"dijit/form/SimpleTextarea", // template
	"dijit/form/Button", // template
	"dijit/form/TextBox" // template
], function(declare, lang, domStyle, WidgetBase, WidgetsInTemplateMixin, TemplatedMixin, math, registry, template, calc){

	var FuncGen = declare(
		"dojox.calc.FuncGen",
		[WidgetBase, TemplatedMixin, WidgetsInTemplateMixin],
	{
		// summary:
		//		The dialog layout for making functions

		templateString: template,

		onSelect: function(){
			// summary:
			//		if they select something in the name combobox, then change the body and arguments to correspond to the function they selected
			this.reset();
		},
		onClear: function(){
			// summary:
			//		The clear button in the template calls this.
			//		Clear the name, arguments, and body if the user says yes.
			var answer = confirm("Do you want to clear the name, argument, and body text?");
			if(answer){
				this.clear();
			}
		},
		saveFunction: function(name, args, body){
			// override me
		},
		onSaved: function(){
			// this on save needs to be overriden if you want Executor parsing support
			// 0 && console.log("Save was pressed");
		},
		clear: function(){
			// summary:
			//		clear the name, arguments, and body
			this.textarea.set("value", "");
			this.args.set("value", "");
			this.combo.set("value", "");
		},
		reset: function(){
			// summary:
			//		set the arguments and body to match a function selected if it exists in the function list
			if(this.combo.get("value") in this.functions){
				this.textarea.set("value", this.functions[this.combo.get("value")].body);
				this.args.set("value", this.functions[this.combo.get("value")].args);
			}
		},
		onReset: function(){
			// summary:
			//		(Reset button on click event) reset the arguments and body to their previously saved state if the user says yes

			// 0 && console.log("Reset was pressed");
			if(this.combo.get("value") in this.functions){
				var answer = confirm("Do you want to reset this function?");
				if(answer){
					this.reset();
					this.status.set("value", "The function has been reset to its last save point.");
				}
			}
		},
		deleteThing: function(item){
			// summary:
			//		delete an item in the writestore
			if(this.writeStore.isItem(item)){
				// delete it
				// 0 && console.log("Found item "+item);
				this.writeStore.deleteItem(item);
				this.writeStore.save();
			}else{
				// 0 && console.log("Unable to locate the item");
			}
		},
		deleteFunction: function(name){
			// override me
		},
		onDelete: function(){
			// summary:
			//		(Delete button on click event) delete a function if the user clicks yes

			// 0 && console.log("Delete was pressed");

			var name;
			if((name = this.combo.get("value")) in this.functions){
				var answer = confirm("Do you want to delete this function?");
				if(answer){
					var item = this.combo.item;

					//this.writeStore.fetchItemByIdentity({identity:name, onItem: this.deleteThing, onError:null});

					this.writeStore.deleteItem(item);
					this.writeStore.save();

					this.deleteFunction(name);
					delete this.functions[name];
					this.clear();
				}
			}else{
				this.status.set("value", "Function cannot be deleted, it isn't saved.");
			}
		},
		readyStatus: function(){
			// summary:
			//		set the status in the template to ready
			this.status.set("value", "Ready");
		},
		writeStore:null, //the user can save functions to the writestore
		readStore:null, // users cannot edit the read store contents, but they can use them
		functions:null, // use the names to get to the function

		/*postCreate: function(){
			this.functions = []; // use the names to get to the function
			this.writeStore = new dojo.data.ItemFileWriteStore({data: {identifier: 'name', items:[]}});

			this.combo.set("store", this.writeStore);
		},*/

		startup: function(){
			// summary:
			//		make sure the parent has a close button if it needs to be able to close
			//		link the write store too
			this.combo.set("store", this.writeStore);

			this.inherited(arguments);// this is super class startup
			// close is only valid if the parent is a widget with a close function
			var parent = registry.getEnclosingWidget(this.domNode.parentNode);
			if(parent && typeof parent.close == "function"){
				this.closeButton.set("onClick", lang.hitch(parent, 'close'));
			}else{
				domStyle.set(this.closeButton.domNode, { display: "none" }); // hide the button
			}
		}
	});

	return lang.mixin(calc, { FuncGen: FuncGen });
});
