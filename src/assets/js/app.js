"use strict";
const render = (root) =>{
   root.empty();

   const wrapper = $('<div class="wrapper"></div>');

   const update = function (){
    render(root);
  };

  if(state.screen == null) {
    wrapper.append(Home(update))
  }

  root.append(wrapper);
};

const state = {
  data: null,
   user: null,
   email: null,
   password: null,
   screen: null
};

$( _ => {

  getJSON('/user.json', (err, json) => {

      if (err) { return alert(err.message);}

      state.data = json;
      console.log(state.data)

      const root = $('#root');
      render(root);

    });

/*    $.getJSON('/user.json', function(data) {
      console.log(data);
    })*/

});
