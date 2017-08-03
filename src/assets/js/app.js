"use strict";
const render = (root)=>{
   root.empty();
   const section = $('<div></div>');
   section.append(header( _ => render(root)));
   section.append(welcome( _ => render(root)));
   root.append(section);
};

const state = {
   user: null,
   email: null,
   password: null,
   screen: null
};

const update = function (){
 render(root);
};

$( _ => {

  $.getJSON('../../user.json',function(data){
    state.user = data;

    console.log(state.user);
  })
  const root = $('.root');
  render(root);
});
