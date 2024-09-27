let body = document.querySelector('body');

const id = new URL(window.location.href).searchParams.get("id");
let uri = `${location.origin}${location.pathname}/v1/${id}`;

const showData = (data) => {

    console.log(data);

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
    <div class="movie-title">${data.titulo}</div>
    <div class="movie-info">${data.sinopsis} • ${Math.floor(data.duracion / 60)}h ${(data.duracion % 60)!=0 ? ((data.duracion % 60) + 'm') : ''}</div>
    <div class="cast">
        ${plantillaCast}
    </div>
    <div class="cinema-option">
        <article>
            <div class="cinema-name">CineCampus</div>
            <div class="cinema-info">Santander, Zona Franca.</div>
            <img src="https://yt3.googleusercontent.com/s0BLxzTiC8JcXrFSwbe7Ef5eIP8DHu33a_jRqjtuhZZiEuc5P4DhJ3hreKWt4CIY8vkf3t5iL2U=s160-c-k-c0x00ffffff-no-rj" id="ImagenCineCampus">
        </article>
    </div>

    
    <button class="book-button">Book Now</button>

        `
        
    body.innerHTML = plantilla

    return plantilla;
}


addEventListener('DOMContentLoaded', async()=>{
    console.log(uri)
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
            if (cineOption.id != 'cine-selected') {
                cinema_option.forEach(cineOptionId => {
                    cineOptionId.id = '';
                })
                cineOption.id = "cine-selected"
                cine_selected = true;
                book_Button_Validation();
            } else {
                cineOption.id = "";
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
            alert("HOLAAA")
            //window.location.href = `/bookingPage?id=${id}`;
        }
    })

})