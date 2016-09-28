Template.search.helpers({
  settings: function() {  //configuraciones de Autocomplete
    return {
      position: "botton",
      
      rules: [
        {
          token:'@',                //busca con @ en la coleccion Meteor.users
          collection: Meteor.users,
          // selector: function (match){
          //   console.log('selector', {'profile.name': new RegExp(match, 'i'), 'roles.__global_roles__':'player' })
          //   return {'profile.name': new RegExp(match, 'i'), 'roles.__global_roles__':'player' }
          // },
          field: "profile.name",
          matchAll: true,
          //filter: {'roles.__global_roles__':'player'}, //preguntar como hacer para buscar solo en usuarios con rol player.
          template: Template.userDataPill,  
          noMatchTemplate: Template.searchEmpty
        },
        {
          token:'!',              //busca con ! en la coleccion Recintos
          collection: Recintos,
          field: "nombre_recinto",
          template: Template.EnclosureDataPill,  
          noMatchTemplate: Template.searchEmpty
        },
        
        
      ]
    };
  }
});
Template.search.events({
  "autocompleteselect input": function(event, template, doc) {
  if(! doc.profile) {   //si tiene doc.profile rutea a showRecintos sino a showProfile
      Router.go('showRecinto',{nombre_recinto: doc.nombre_recinto});
    } else {
      Router.go('showProfile',{_id: doc._id}); 
    }
  },
});


