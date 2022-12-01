guardar_localstorage();

function guardar_localstorage(){
    
    let persona = {
        nombre: "Christopher",
        edad: 21,
        correo: "cris01pitus@gmail.com",
        coords: {
            lat: 10,
            lng: -10
}
};

let nombre = "Luis";

localStorage.setItem( "nombre", nombre);


}