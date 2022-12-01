//lanzamiento del service Worker en la app
if ('serviceWorker' in navigator) {
    console.log('Si funciona el SW');
    navigator.serviceWorker.register('./sw.js')
        .then( resp => console.log('serviceWorker ya cargo', resp))
        .catch(err => console.log('no hay SW',err));
}else{
    console.log('No soporta pwa');
}


//Scroll suavizado
$(document).ready(function(){
    $("#menu a").click(function(e){
        e.proventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    });
})
