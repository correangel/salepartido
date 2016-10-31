Template.dashboardAdmin.helpers({
	
	usuarioDueños: function(){
		return Meteor.users.find({'roles.__global_roles__': ['owner']});
	},
	
	usuarioJugador: function(){
		return Meteor.users.find({'roles.__global_roles__': ['player']});
	},

	cantidadDueños: function(){
		return Meteor.users.find({'roles.__global_roles__': ['owner']}).count();
	},

	cantidadJugadores: function(){
		return Meteor.users.find({'roles.__global_roles__': ['player']}).count();
	},
});

Template.dashboardAdmin.events({


	'click #cambiarRoleADueno': function (e) {
		
		e.preventDefault;
		
		Meteor.users.update({_id: this._id}, {$set: {'roles.__global_roles__': ['owner']}});
	
		$('#alertDarDueño').show();
		
	},

	'click #cambiarRoleAPlayer': function (e) {
		
		e.preventDefault;
		
		Meteor.users.update({_id: this._id}, {$set: {'roles.__global_roles__': ['player']}});
	
		$('#alertDarPlayer').show();
	},

	'click #eliminarPlayer': function (e) {
		e.preventDefault;
		Session.set('userId', this._id);
	},

	'click #eliminarDueno': function (e) {
		e.preventDefault;
		Session.set('userId', this._id);
	},

	'click #deleteUser' : function (e) {
		var userId = Session.get('userId');
	  Meteor.users.remove({_id: userId});
		$('#alertEliminarUser').show();

	}

});

