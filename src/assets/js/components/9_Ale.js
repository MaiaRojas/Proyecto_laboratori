'use strict';
const AlePantalla = (update) => {
  let Tausentes = 0, Tpuntuales = 0 ,Ttarde = 0;
  const container_OK =$('<section class="container center-align"></section>');
  const cont_asisOK =$('<div class="row"></div>') ;
  const cont_title =$(`<div class="title_asis left-align"><p>Buen día Alejandra</p><p> Revisa la Asistencia de Hoy : ${harold(state.dia.getDate()) + "/" + harold((state.dia.getMonth() +1)) + "/" + harold(state.dia.getFullYear())}</p> </div>`) ;
  const divTotales =$('<div class="flex_center"><h4>Registro Total</h4></div>');
  const totalPuntual=$('<div class="sizedetail"><p class="Puntual">Puntual</p><p></p></div>');
  const TPuntual=$('<p></p>');
  const totalTarde=$('<div class="sizedetail"><p class="Tarde">Tarde</p><p></p></div>');
  const TTarde=$('<p></p>');
  const totalAusente=$('<div class="sizedetail"><p class="Ausente">Ausente</p><p></p></div>');
  const TAusente=$('<p></p>');
  divTotales.append(totalPuntual,totalTarde,totalAusente);
  totalPuntual.append(TPuntual);
  totalTarde.append(TTarde);
  totalAusente.append(TAusente);
  const detalle_squads = $(`<div id="coders"></div>`)
  container_OK.append(cont_asisOK,cont_title,divTotales,detalle_squads);

  const coderToday = [], squads = [];

  $.get("https://sheetsu.com/apis/v1.0/50c5e101da79",(data)=> {
    console.log(data);
    state.asistencia = data;

    $.each(state.asistencia,(i,e)=>{
      if(e.Dia === harold(state.dia.getDate()) + "/" + harold((state.dia.getMonth() +1)) + "/" + harold(state.dia.getFullYear())){
        coderToday.push(e);
      }
    });

    $.each(coderToday,(i,e)=>{

      if($.inArray(e.Squad,squads)===-1){
        squads.push(e.Squad);
      }
    })

    let ausentes = 0, puntuales = 0, tarde = 0;

    $.each(squads,(i,e)=>{
      const  divSquad = $(`<ul class="collapsible" data-collapsible="expandable" id =${e}></ul>`);
      const li =$('<li></li>');
      const divHeader =$('<div class="collapsible-header"></div>');
      const divBody =$('<div class="collapsible-body"></div>');
      const title = $(`<div class="title_squad"><h4 class="left-align">${e}</h4></div>`);
      const bodyCase =$('<div class="flex_center"></div>');
      title.append(bodyCase);
        coderToday.forEach(function(coder){
            if(e == coder.Squad){
                switch (coder.Estado) {
                  case 'Ausente' : ausentes++;
                                   Tausentes++;
                    break;
                  case 'Puntual' : puntuales++;
                                   Tpuntuales++;
                    break;
                  case 'Tarde' : tarde++;
                                  Ttarde++;
                   break;
                }

                detalle(coder, divBody);
              }

          });

          detalle_squads.append(divSquad);
          divSquad.prepend(li);
          li.append(divHeader ,divBody);
          divHeader.append(title)
          bodyCase.append(`<div class="sizedetail"><p class="Ausente">Ausente </p><p>${ausentes}</p></div>`);
          bodyCase.append(`<div class="sizedetail"><p class="Puntual">Puntual </p><p> ${puntuales}</p></div>`);
          bodyCase.append(`<div class="sizedetail"><p class="Tarde">Tarde </p><p> ${tarde}</p></div>`);

          ausentes = 0;
          puntuales = 0;
          tarde = 0;
          $(document).ready(function(){
            console.log("hola");
           $('.collapsible').collapsible();
          });
      });
      console.log(Tpuntuales);
      console.log(Tausentes);
      TPuntual.text(Tpuntuales);
      TAusente.text(Tausentes);
      TTarde.text(Ttarde);
  })

 return container_OK ;
}






const detalle = (coder, container)=> {
   const divImg =$('<div class="detail_coder"></div>');
   const imgCoder =$(`<img src="assets/img/${coder.Tipo}.svg"  class="img-responsive" alt="foto">`)
   const spanCoder = $(`<p>${coder.Coder}</p>`);
   const spanEstado = $(`<span class="${coder.Estado}">${coder.Estado}</span>`);
   container.append(divImg);
   divImg.append(imgCoder,spanCoder,spanEstado);
}
