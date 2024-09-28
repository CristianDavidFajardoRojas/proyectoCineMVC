let body = document.querySelector('body');

const id = new URL(window.location.href).searchParams.get("id");
let uri = `${location.origin}${location.pathname}/v1/${id}`;

const showData = (data) => {

    let plantillaSalas = '';

    data.salas.forEach(sala => {
        plantillaSalas += /*html*/`

        <article id="${sala._id}">
            <div class="cinema-name">${sala.nombre}</div>
            <div class="cinema-info">Capacidad de ${sala.capacidad} personas.</div>
            <div class="precio-asiento"><strong>$${sala.precio}</strong></div>
        </article>

        `
    })

    let plantillaCast = '';

    data.cast.forEach(cast => {
        plantillaCast += /*html*/`

        <div class="cast-member">
            <img src="${cast.imagen}" alt="" class="cast-image">
            <div class="cast-name">${cast.nombre}</div>
            <div class="cast-name">${cast.rol}</div>
        </div>

        `
    })
    
    let plantilla = '';
  
        plantilla += /*html*/`

        <div class="header">
        <button class="back-button">&#8592;</button>
        <h1>Cinema Selection</h1>
        <button class="menu-button">&#8942;</button>
    </div>
    <div class="movie-poster" style="background-image: url('${data.imagen}');"></div>
    <div class="movie-title"><p>${data.titulo}</p><a href="${data.trailer}"><button>▶  Watch Trailer</button></a></div>
    <div class="movie-info">${data.genero}</div>
    <div class="movie-info">${data.sinopsis} • ${Math.floor(data.duracion / 60)}h ${(data.duracion % 60)!=0 ? ((data.duracion % 60) + 'm') : ''}</div>
    <div class="cast">
        ${plantillaCast}
    </div>
    <div class="cinema-option">
        ${plantillaSalas}
    </div>

    
    <button class="book-button">Book Now</button>

        `
        
    body.innerHTML = plantilla

    return plantilla;
}


addEventListener('DOMContentLoaded', async()=>{
    let peticion = await fetch(uri);
    let res = await peticion.json();
    showData(res.data[0])
    
    let back_button = document.querySelector('.back-button');
    back_button.addEventListener('click', () => {
        window.location.href = "/mainPage";
    })

    let book_button = document.querySelector('.book-button');
    let cinema_option = document.querySelectorAll('.cinema-option > article');
    let cine_selected = false;
    const fechaEstreno = new Date(res.data[0].fecha_estreno);
    const fechaRetiro = new Date(res.data[0].fecha_retiro);
    const fechaActual = new Date()

    if (fechaEstreno > fechaActual) {
        book_button.disabled = true;
        book_button.innerHTML = "Coming Soon..."
    }

    cinema_option.forEach(cineOption => {

        cineOption.addEventListener('click', () => {
            if (cineOption.className != 'cine-selected') {
                cinema_option.forEach(cineOptionId => {
                    cineOptionId.className = '';
                })
                cineOption.className = "cine-selected"
                cine_selected = true;
                book_Button_Validation();
            } else {
                cineOption.className = "";
                cine_selected = false;
                book_Button_Validation()
            }
        })

    });

    const book_Button_Validation = () => {

    if(book_button.disabled != true && cine_selected != false) {
        book_button.id = "book-avaible";
    } else {
        book_button.id = "";
    }};

    book_button.addEventListener('click', () => {
        if(book_button.id == "book-avaible"){
            let cine_selected = document.querySelector('.cine-selected');
            window.location.href = `/bookingPage?id=${id}&idSala=${cine_selected.id}`;
            
        }
    })

})