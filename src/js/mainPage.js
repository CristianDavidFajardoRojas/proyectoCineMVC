let uri = `${location.href}/v1`;

let movie_list = document.querySelector('.movie-list');
let comingSoon_list = document.querySelector('.section_coming_soon');
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
    })

    return plantilla;
}


const showComingSoon = (data) => {
    let plantilla = '';

    data.forEach( movie => {
        const fechaEstreno = new Date(movie.fecha_estreno);
        const fechaActual = new Date();

        const monthNames = [
            "January",   
            "February",  
            "March",     
            "April",    
            "May",       
            "June",      
            "July",      
            "August",    
            "September", 
            "October",   
            "November",  
            "December"   
        ];

        const year = fechaEstreno.getFullYear();
        const month = fechaEstreno.getMonth(); 
        const day = fechaEstreno.getDate();    
        const monthName = monthNames[month];
        
        if (fechaEstreno > fechaActual) plantilla += /*html*/`

        <div class="coming-soon">
            <img src="${movie.imagen}" alt="${movie.titulo}">
            <div class="coming-soon-info">
                <p class="coming-soon-title">${movie.titulo} (${year})</p>
                <p class="coming-soon-date">${monthName} ${day}, ${year}</p>
            </div>
        </div>

        `
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
            comingSoon_list.innerHTML = await showComingSoon(res.data)
        }
        HiName.innerHTML = `Hi, ${res.cookie.nombre}`
        await showData(res.data);
        comingSoon_list.innerHTML = await showComingSoon(res.data)
    }else{
        HiName.innerHTML = `Hi, ${res.cookie.nombre}`
        movie_list.innerHTML = await showData();
        comingSoon_list.innerHTML = await showComingSoon(res.data)
}})