'use strict';

const HomeTeacher = (update) => {

	$(document).ready(function() {
		$('.collapsible').collapsible();
		accordion : true
	});

	$('body').css('background-color', '#f7f7f7');
	const container = $('<div class="container"></div>');
    const row = $('<div class="row"></div>');
    const col = $('<div class="col s12"></div>');
    const title = $('<p>Buen día <br>La asistencia de hoy</p>');
    const asistencia = $('<div class="asistencia"></div>');
    const ul = $('<ul class="collapsible" data-collapsible="accordion"></ul>');

    //Iteración simulada

    const squads = ["Laboratoria", "Developers"];

    for(var i = 0; i < squads.length; i++){

    	const li = $('<li></li>');
    	const header = $('<div class="collapsible-header"></div>');
    	const body = $('<div class="collapsible-body"></div>');
    	const prueba = $('<p>Prueba</p>');
    	const squadTitle = $('<p class="">'+squads[i]+'</p>');
    	const squadBar = $('<div class="col s6 progress"><div class="determinate" style="width: 60%"></div></div>');

    	const col2 = $('<div class="col s12"></div>');


    	const presentes = $('<div class="col s4 text-center"><p>4<br>Presente</p></div>');
    	const tardanzas = $('<div class="col s4 text-center"><p>2<br>Tarde</p></div>');
    	const ausentes = $('<div class="col s4 text-center"><p>2<br>Ausente</p></div>');

    	header.append(squadTitle, squadBar, col2);
    	col2.append(presentes, tardanzas, ausentes);
    	body.append(prueba);
    	li.append(header, body);
    	ul.append(li);
   	}

    col.append(title, ul);
    row.append(col);
    container.append(row);
    return container
}