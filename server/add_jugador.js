Meteor.methods({
	addJugadores: function(elqueagrega,elagregado){
		check(elqueagrega, String);// id del usuario que esta agregando
		check(elagregado, String);//id del usuarios q quiere como amigo
		
		var agregado = Meteor.users.findOne({_id: elagregado});
		var correo = agregado.emails[0].address ;
		Meteor.users.update(elqueagrega,{
			$addToSet: {'profile.friends':{id: elagregado,correo:correo,fb: false}}
		});
		
		
	},

});

