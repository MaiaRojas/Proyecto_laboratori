const Home = (update) => {
    const container = $('<div class="container"></div>');
    const row = $('<div class="row"></div>');
    const col1 = $('<div class="col s12"></div>');
    const col2 = $('<div class="col s12 bg-white"></div>');
    const col3 = $('<div class="col s12"></div>');
    const welcome = $('<p>Buen día '+ state.user.Coder  +'</p>');
		const salir = $('<a href="#" class="active">Salir</a>');
    const title = $('<p class="title text-center">Agenda</p>');
    let date = $('<div class="date-home text-center"></div>');
    const event = ["Hackathon", "Company Pitch - Rimac", "Hackathon, Coffee time", "Company Pitch - Everis", "Hackathon", "Hackathon, Coffee time", "Company Pitch - BBVA", "Hackathon, Coffee time", " Expo"];
    const schedule = ["00:01", "10:10", "10:20", "13:00", "13:10", "15:00", "16:40", "16:50", "18:00"];

    let ul = $('<ul class="diary"></ul>');

    for(var i = 0; i < schedule.length; i++){
        const li = $('<li><span class="schedule-home">'+schedule[i]+'</span>'+ " | " + event[i] +'</li>');
        ul.append(li);
    }

    function rules(param) {
        if (param < 10) {
            param = '0' + param
        }
        return param;
    }

    var time = new Date();
    var day = time.getDate();
    var month = time.getMonth() +1;
    var year = time.getFullYear();

    date.text("(" + rules(day) + "/" + rules(month) + "/" + rules(year) + ")");

    col2.append(title,date,col3);
    col1.append(welcome ,salir);
    col3.append(ul);
    row.append(col1, col2);
    container.append(row);

		salir.on('click', (e) => {
			e.preventDefault();
			state.page = null;
			update();
		});

    return container
}
