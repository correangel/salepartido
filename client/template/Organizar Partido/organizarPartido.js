Template.organizarPartido.onRendered(function () {
  this.$('#datetimepicker').datetimepicker({
    locale: 'es',
    format: 'L',
    minDate: moment(),
    showClear: true,
  });

  this.$('#datetimepicker3').datetimepicker({
    locale: 'es',
    format:'H',
    disabledHours: [ 2 , 3 , 4 , 5 , 6 , 7 , 8 ],
    showClear: true
  });
});


Template.organizarPartido.events({
    
   'submit form': function(e) {
        
        e.preventDefault();

        var reserva = {
            _id:Meteor.ObjectId,            
            nom_reserva:$(e.target).find('[name=nombreDeLaReserva]').val(),
            nom_usario: Meteor.user().profile.name,
            nom_recinto:$(e.target).find('[name=nombreRecinto]').val(),
            num_cancha:$(e.target).find('[name=nombreCancha]').val(),
            hora_de_juego:$(e.target).find('[name=datetimepicker3]').val(),
            fecha_de_juego:$(e.target).find('[name=datetimepicker]').val()
        };        


        var errors = validateReserva(reserva);
        if (errors.nombreRecinto || errors.nombreCancha ||  errors.nombreDeLaReserva )
        return Session.set('reservaErrors', errors);

        var idReserva= Reserva.insert(reserva);
        
        
        var partido = { 
          _id:Meteor.ObjectId,
          reserva_id:idReserva,
        };
        
        var partidoId=Partido.insert(partido);
        
        Router.go('confirmarPartido',{_id:partidoId});
    },
  

  'click [data-picker-handle]': function (event) {

    var datetimepicker = $(event.currentTarget).data('pickerHandle');   
    $(datetimepicker).data('DateTimePicker').toggle();

  },

  'click [data-for-recinto]': function(event){
    
    var $item=$(event.currentTarget);
    var $target=$($item.data('forRecinto'));
    
    $target.val($item.text());

    var recinto=Recintos.findOne({'_id':($item.data('forId'))});
    
    Session.set('recinto', recinto);
    
  },

  'click [data-for-cancha]': function(event){

    var $item=$(event.currentTarget);
    var $target=$($item.data('forCancha'));

    $target.val($item.text()); 
  }
  
  });

Template.organizarPartido.helpers({
	
  recinto: function () {
    return Recintos.find();
  },

  cancha: function () {
      var recinto = Session.get('recinto');
      var recinto_Id = recinto && recinto._id;
      var canchas = recinto_Id && Canchas.find({'recintoId':recinto_Id});
      return canchas;
  },

  errorMessage: function(field) {
    return Session.get('reservaErrors')[field];
  },

  errorClass: function (field) {
    return !!Session.get('reservaErrors')[field] ? 'has-error' : '';
  }

});

Template.organizarPartido.onCreated(function() {
  
  Session.set('reservaErrors', {});
});

Template.organizarPartido.onDestroyed( function(){

    Session.set('recinto', null);

});