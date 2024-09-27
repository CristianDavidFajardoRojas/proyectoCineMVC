let uri = `${location.href}/v1`;

let movie_list = document.querySelector('.wrap');
let comingSoon_list = document.querySelector('.section_coming_soon');
let HiName = document.getElementById('HiName');


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

        <div class="coming-soon" id="${movie._id}">
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
            ChooseMovie()
        }
        HiName.innerHTML = `Hi, ${res.cookie.nombre}`
        await showData(res.data);
        comingSoon_list.innerHTML = await showComingSoon(res.data)
        ChooseMovie()
    }else{
        HiName.innerHTML = `Hi, ${res.cookie.nombre}`
        movie_list.innerHTML = await showData();
        comingSoon_list.innerHTML = await showComingSoon(res.data)
        ChooseMovie()
}})


const ChooseMovie = () => {
    let ChooseMovie = document.querySelectorAll('.ChooseMovie')
    let ChooseComingSoonMovie = document.querySelectorAll('.coming-soon')

    ChooseMovie.forEach(movie => {
        movie.addEventListener('click', () => {
            location.href = `/movieDetail?id=${movie.id}`
        })
    })

    ChooseComingSoonMovie.forEach(movie => {
        movie.addEventListener('click', () => {
            location.href = `/movieDetail?id=${movie.id}`
        })
    })

    Carousel();
};



const Carousel = () => {

    const wrap = document.querySelector('.wrap');
    const moviePosters = document.querySelectorAll('.movie-poster');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentIndex = 0;
    

    function updateCarousel() {
        const translateX = -currentIndex * (moviePosters[0].clientWidth + 0); 
        wrap.style.transform = `translateX(${translateX}px)`;
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + moviePosters.length) % moviePosters.length;
        updateCarousel();
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % moviePosters.length ;
        updateCarousel();
    }
    
    prevButton.addEventListener('click', showPrev);
    nextButton.addEventListener('click', showNext);
    
    updateCarousel();
};