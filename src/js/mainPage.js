let uri = `${location.href}/v1`;
let movie_list = document.querySelector('.movie-list');

const showData = (data) => {
    console.log(data, "ASDDASDSADSD");

    let plantilla = '';

    data.forEach( movie => {
        if(new Date(movie.fecha_estreno) > new Date() && new Date(movie.fecha_retiro) > new Date()){
            console.log(movie)
        }
    })

    return plantilla;
}



addEventListener('DOMContentLoaded', async()=>{
    let peticion = await fetch(uri);
    let res = await peticion.json();
    if(res.data){
        //if(res.status == 200) myTbody.innerHTML = await showData(res.data);
        await showData(res.data);
    }else{
        //myTbody.innerHTML = await showData();
        await showData();
}})