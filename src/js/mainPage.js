let uri = `${location.href}/v1`;

let movie_list = document.querySelector('.movie-list');
let HiName = document.getElementById('HiName')

const showData = (data) => {
    let plantilla = '';

    data.forEach( movie => {
        const fechaEstreno = new Date(movie.fecha_estreno);
        const fechaRetiro = new Date(movie.fecha_retiro);
        const fechaActual = new Date()

        if (fechaEstreno < fechaActual && fechaRetiro > fechaActual) plantilla += /*html*/`

        <div>
            <img src="${movie.imagen}" alt="Movie 1" class="movie-poster">
            <p class="movie-title">${movie.titulo}</p>
        </div>

        `


        // if(fechaEstreno < fechaActual && fechaRetiro > fechaActual){
        //     console.log("INSANOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", movie)
        // }else console.log("ADF")
    })

    return plantilla;
}


const showComingSoon = (data) => {
    let plantilla = '';

    data.forEach( movie => {
        const fechaEstreno = new Date(movie.fecha_estreno);
        const fechaRetiro = new Date(movie.fecha_retiro);
        const fechaActual = new Date()

        if (fechaEstreno < fechaActual && fechaRetiro > fechaActual) plantilla += /*html*/`

        <div>
            <img src="${movie.imagen}" alt="Movie 1" class="movie-poster">
            <p class="movie-title">${movie.titulo}</p>
        </div>

        `


        // if(fechaEstreno < fechaActual && fechaRetiro > fechaActual){
        //     console.log("INSANOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", movie)
        // }else console.log("ADF")
    })

    return plantilla;
}



addEventListener('DOMContentLoaded', async()=>{
    let peticion = await fetch(uri);
    let res = await peticion.json();
    if(res.data){
        if(res.status == 200) {
            HiName.innerHTML = `Hi, ${res.cookie.nombre}`
            movie_list.innerHTML = await showData(res.data)
        }
        HiName.innerHTML = `Hi, ${res.cookie.nombre}`
        await showData(res.data);
    }else{
        HiName.innerHTML = `Hi, ${res.cookie.nombre}`
        movie_list.innerHTML = await showData();
        await showData();
}})