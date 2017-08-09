const AlePantalla = (update) => {
  
  const container_OK =$('<section class="container center-align"></section>');
  const cont_asisOK =$('<div class="row"></div>') ;
  const cont_title =$('<div class="title_asis"></div>') ;
  const title =$('<p class="negrita"> Pantalla de Ale</p>');

  cont_title.append(title);
  cont_asisOK.append(cont_title);
  container_OK.append(cont_asisOK);
  return container_OK ;
}
