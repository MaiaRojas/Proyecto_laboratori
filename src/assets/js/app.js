"use strict";
const render = (root) =>{
   root.empty();
   const section = $('<div class="cont_App"></div>');
   section.append(header( _ => render(root)));

   if (state.page == null) {
    section.append(welcome( _ => render(root)));
  } else if (state.page == 1) {
    section.append(reloj( _ => render(root)));
  } else if (state.page == 2) {
    section.append(asistOk( _ => render(root)));
  } else if (state.page == 3) {
    section.append(Tardanza( _ => render(root)));
  } else if (state.page == 4) {
    section.append(Home( _ => render(root)));
  } else if (state.page == 5) {
    section.append(Falta( _ => render(root)));
  } else if (state.page == 6) {
    section.append(justificacion( _ => render(root)));
  } else if (state.page == 7) {
    section.append(mensaje( _ => render(root)));
  } else if (state.page == 8) {
    section.append(AlePantalla ( _ => render(root)));
  }

  root.append(section);
};

const update = function (){
  render(root);
};

const state = {
  data: null,
  user: null,
  dia: new Date()
};


$( _ => {
    getJSON("https://sheetsu.com/apis/v1.0/8392c0c102f9",(err,json)=> {
        if (err) { return alert(err.message);}
        console.log(json);
        state.data = json;

        const root = $('.root');
        render(root);
    });
});
