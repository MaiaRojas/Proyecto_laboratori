const AlePantalla = (update) => {

  const container_OK =$('<section class="container center-align"></section>');
  const cont_asisOK =$('<div class="row"></div>') ;
  const cont_title =$(`<div class="title_asis"> Revisa la Asistencia de Hoy : ${harold(state.dia.getDate()) + "/" + harold((state.dia.getMonth() +1)) + "/" + harold(state.dia.getFullYear())} </div>`) ;
  const detalle_squads = $(`<div id="coders"></div>`)
  container_OK.append(cont_asisOK,cont_title,detalle_squads);
  const coderToday = [], squads = [];


  $.get("https://sheetsu.com/apis/v1.0/8392c0c102f9",(data)=> {
    console.log(data);
    state.asistencia = data;

    $.each(state.asistencia,(i,e)=>{
      if(e.Dia === harold(state.dia.getDate()) + "/" + harold((state.dia.getMonth() +1)) + "/" + harold(state.dia.getFullYear())){
        coderToday.push(e);
      }
    });

    $.each(coderToday,(i,e)=>{
      console.log(e);
      if($.inArray(e.Squad,squads)===-1){
        squads.push(e.Squad);
      }
    })

    let ausentes = 0, puntuales = 0, tarde = 0;

    $.each(squads,(i,e)=>{
      const divSquad = $(`<div id =${e}></div>`);
      const title = $(`<h4>${e}</h4>`);
        coderToday.forEach(function(coder){
            if(e == coder.Squad){
                switch (coder.Estado) {
                  case 'Ausente' : ausentes++ ;
                    break;
                  case 'Puntual' : puntuales++;
                    break;
                  case 'Tarde' : tarde++;
                   break;
                }
                console.log(coder);
                detalle(coder, divSquad);
              }

          });

          detalle_squads.append(divSquad);
          divSquad.prepend(title);
          title.append(`<span>  Ausente - ${ausentes}</span>`)
          title.append(`<span>  Puntual - ${puntuales}</span>`)
          title.append(`<span>  Tarde - ${tarde}</span>`)
          ausentes = 0;
          puntuales = 0;
          tarde = 0;
      });
  })
 return container_OK ;
}

const detalle = (coder, container)=> {
   const spanCoder = $(`<h5>${coder.Coder}</h5>`);
   const spanEstado = $(`<span>${coder.Estado}</span>`)
  container.append(spanCoder,spanEstado);
}
