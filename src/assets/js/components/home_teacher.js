'use strict';

const HomeTeacher = (update) => {

	$(document).ready(function() {
		$('.collapsible').collapsible();
		accordion : true
	});

	$('body').css('background-color', '#f7f7f7');
	const container = $('<div class="container"></div>');
    const row = $('<div class="row"></div>');
    const rowli = $('<div class="row"></div>');
    const col = $('<div class="col s12"></div>');
    const title = $('<p>Buen día <br>La asistencia de hoy</p>');
    const asistencia = $('<div class="asistencia"></div>');
    const ul = $('<ul class="collapsible" data-collapsible="accordion"></ul>');

    //Iteración simulada

    const squads = ["Squad 1", "Squad 2", "Squad 3", "Squad 4"];
    const names = ["Student 1", "Student 2", "Student 3"]

    for(var i = 0; i < squads.length; i++){

    	const li = $('<li></li>');
    	const header = $('<div class="collapsible-header"></div>');
    	const body = $('<div class="collapsible-body"></div>');
        const col2 = $('<div class="col s12"></div>');
    	const squadTitle = $('<p class="col s7 squad-text">'+squads[i]+'</p>');
    	const squadBar = $('<div class="col s4 progress"><div class="determinate" style="width: 90%"></div></div>');
        const studentsContainer = $('<div class="students-container"></div>');

        for(var j = 0; j < names.length; j++){

            const student = $('<div class="student"></div>');
            const studentImage = $('<img src="http://laboratoria.la/app/assets/img/Idea-100.png" alt="creative" class="student-image">');
            const studentName = $('<p class="student-text">'+names[j]+'</p>');

            student.append(studentImage, studentName);
            studentsContainer.append(student);
            body.append(studentsContainer);

        }
        
        col2.append(squadTitle, squadBar);
        header.append(col2);
    	li.append(header, body);
    	ul.append(li);
   	}

    col.append(title, ul);
    row.append(col);
    container.append(row);
    return container
}