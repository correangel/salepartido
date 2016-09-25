Template.crearReserva.onRendered(function () {
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

Template.crearReserva.events({
    
   'submit form': function(e) {
        
        e.preventDefault();

        var reservadueno = {
            _id:Meteor.ObjectId,            
            nom_reserva:$(e.target).find('[name=nombreDeLaReserva]').val(),
            nom_usuario:$(e.target).find('[name=nombreDelCliente]').val(),
            nom_recinto:$('input[name=nombreRecinto]').val(),
            num_cancha:$(e.target).find('[name=nombreCancha]').val(),
            hora_de_juego:$(e.target).find('[name=datetimepicker3]').val(),
            fecha_de_juego:$(e.target).find('[name=datetimepicker]').val()
        };        


        var errors = validateReservadueno(reservadueno);
        if (errors.nombreRecinto || errors.nombreDelCliente || errors.nombreCancha ||  errors.nombreDeLaReserva )
        return Session.set('reservaErrors', errors);

        var x= Reservadueno.insert(reservadueno);
        
        
        var partido = { 
          _id:Meteor.ObjectId,
          reserva_id:x,
        };
        
        var partidoId=Partido.insert(partido);
        alert("Reserva creada");
        Router.go('gestionarReserva');
    },

  'click [data-for-recinto]': function(event){
    
    var $item=$(event.currentTarget);
    var $target=$($item.data('forRecinto'));
    
    $target.val($item.text());

    var recinto=Recintos.findOne({'_id':($item.data('forId'))});
    
    Session.set('recinto', recinto); 
    
  },
  

  'click [data-picker-handle]': function (event) {

    var datetimepicker = $(event.currentTarget).data('pickerHandle');   
    $(datetimepicker).data('DateTimePicker').toggle();

  },

  'click [data-for-cancha]': function(event){

    var $item=$(event.currentTarget);
    var $target=$($item.data('forCancha'));

    $target.val($item.text());    
  }
  
  });

Template.crearReserva.helpers({

  recinto: function () {
   
    var recintoDueno = Recintos.find({'ownerId': Meteor.user()._id});
    return recintoDueno;
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

Template.crearReserva.onCreated(function() {
  
  Session.set('reservaErrors', {});
});

