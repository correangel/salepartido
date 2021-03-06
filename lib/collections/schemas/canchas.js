Canchas = new Mongo.Collection("canchas");

if (typeof Schema === 'undefined') Schema = {};

Schema.Canchas = new SimpleSchema({

  recintoId:{
    type: String,
    autoform: {
      type: 'hidden'
    }
   },

  numero: {
    type: Number,
    label: "Número de cancha*",
    min: 0,
  },

 jugadores:{
    type:Object,
     },

  'jugadores.cantidad_de_jugadores':{
    type: String,
    allowedValues: ["5 vs 5","6 vs 6","7 vs 7","11 vs 11"],
    autoform: {
      afFieldInput: {
        firstOption: "(Seleccione la cantidad de jugadores)"
      }
    },
    label: "Cantidad de jugadores*",
  },


 tipo_cancha : {
    type: Object,
 },

 'tipo_cancha.tipo_de_cancha': {
    type: String,
    allowedValues: ["Césped Sintético","Césped Natural","Baldosa","Tierra","Parquet"],
    autoform: {
      afFieldInput: {
        firstOption: "(Seleccione un tipo de cancha)"
      }
    },
    label: "Tipo de cancha*",
  },

  estado_cancha:{
    type:Object,
  },

  'estado_cancha.estado_de_cancha':{
    type : String,    
    allowedValues: ["Habilitada","No Habilitada","Mantenimiento","Eliminada"],
    autoform: {
      afFieldInput: {
        firstOption: "(Seleccione un estado)"
      }
    },
    label: "Estado de cancha*",
  },

  createdAt: {
      type: Date,
      autoValue: function() {
          if (this.isInsert) {
            return new Date();
          }
      },
     autoform: {
      type: 'hidden'
    },
  
  },
  createdAtString: {
      type: String,
      autoValue: function() {
          if (this.isInsert) {
            var dia = new Date();
            var diaMoment = moment(dia, 'DD/MM/YYYY', true).format('L');
      return diaMoment;           
        }
      },
  },
      
  descripcion: {
    type: String,
    label: "Descripción complementaria",
    optional: true,
    max: 1000
  },
});

Canchas.attachSchema(Schema.Canchas);