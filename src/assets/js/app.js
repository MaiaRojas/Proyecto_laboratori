"use strict";
const render = (root)=>{
   root.empty();

   const section = $('<div></div>');
   section.append(header( _ => render(root)));
   section.append(welcome( _ => render(root)));
   root.append(section);
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
});
