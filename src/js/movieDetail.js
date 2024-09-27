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
    <div class="movie-info">${data.sinopsis} • ${Math.floor(data.duracion / 60)}h ${data.duracion % 60}m</div>
    <div class="cast">
        ${plantillaCast}
    </div>
    <div class="cinema-option">
        <div class="cinema-name">Atrium Cinemas</div>
        <div class="cinema-info">Karachi • 5 km</div>
    </div>
    <div class="cinema-option">
        <div class="cinema-name">Nueplex</div>
        <div class="cinema-info">Karachi • 5.7km • DHA Phase 8</div>
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

})