"use strict";
const render = (root)=>{
   root.empty();

   const section = $('<section class="components"></section>');

   const update = function (){
    render(root);
  };

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

/*    $.getJSON('/user.json', function(data) {
      console.log(data);
    })*/

});

'use strict';

const getJSON = (url, cb) => {

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {

    if (xhr.status !== 200) {
      return cb(new Error('Error loading JSON from ' + url + '(' + xhr.status + ')'));
    }

    cb(null, xhr.response);
    
  });

  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.send();

};
