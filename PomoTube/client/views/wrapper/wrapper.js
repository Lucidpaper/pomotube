Template['wrapper'].helpers({
	logged_in : function() {
		return Meteor.userId() !== null;
	},
});