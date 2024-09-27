
const id = new URL(window.location.href).searchParams.get("id");
let uri = `${location.origin}${location.pathname}/v1/${id}`;

const showData = (data) => {
    let plantilla = '';

    data.forEach( movie => {
        const fechaEstreno = new Date(movie.fecha_estreno);
        const fechaRetiro = new Date(movie.fecha_retiro);
        const fechaActual = new Date()

        if (fechaEstreno < fechaActual && fechaRetiro > fechaActual) plantilla += /*html*/`

        <div class="ChooseMovie" id="${movie._id}">
            <img src="${movie.imagen}" alt="Movie 1" class="movie-poster">
            <p class="movie-title">${movie.titulo}</p>
        </div>

        `
    })

    return plantilla;
}


addEventListener('DOMContentLoaded', async()=>{
    console.log(uri)
    let peticion = await fetch(uri);
    let res = await peticion.json();
    console.log(res)
})