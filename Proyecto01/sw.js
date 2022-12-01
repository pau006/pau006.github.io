//Asignar un nombre y version al cache
const CACHE_NAME = 'v1_cache_102';
//Archivos a guardar
var urlsToCache =[
    './',//Todo lo del directorio actual
    './styles.css',
    '/./main.js',
    './jquery.js',
    './index.html',
    './sw.js',
    './img/arma.png',
    './img/besta.png',
    './img/enemigo1.jpeg',
    './img/enemigo2.jpeg',
    './img/hijos.besta.jpg',
    './img/logo.jpeg',
    './img/facebook.png',
    './img/logo1.jpeg',
    './img/logo2.jpeg',
    './img/logo3.jpeg',
    './img/logofu.png',
    './img/videointro.mp4',
];

//Evento install
//Instalacion SW y almacer en cache los rescursos
self.addEventListener('install', e=> {
    e.waitUntil(//espera que abra el cache
        caches.open(CACHE_NAME)//abrimos en cache, regresa una promesa
        .then(cache=>{
            return cache.addAll(urlsToCache)//Regresamos los elemnetos del arreglo
            .then(()=>
                self.skipWaiting())//Espera que se llene el cache 
        })
        .catch(err=>
            console.log('No se ha registrado el cache', err))
    )
})
//Evento Activate
//Este evento activa el SW  y una vez que se activa trabaja offline
self.addEventListener('activate', e=>{
    const cacheWhitelist = [CACHE_NAME]//vamos a guardar todos los elementos que vienen del cache original 
    //primnero limpiamos el cache para quitar elementos que hay en el cache 
    e.waitUntil(
        caches.keys()
        .then(cacheNames=>{
            return Promise.all(
                //map() nos permite recoger un array
                cacheNames.map(cacheName=>{
                    //indexOf es para buscar dentro del cache 
                    //lo siguiente es buscar un elemento y si no se encuentra borrarlo de la cache o si no es redundante
                    if(cacheWhitelist.indexOf(cacheName)=== -1){
                        //borrar elementos que no se necesitan 
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        //Activar cache
        .then(()=>
            self.clients.claim())//Activar el cache actual WitheList
        )
})
//Evento fetch
self.addEventListener('fetch', e=>{
    
    e.respondWith(
        caches.match(e.request)//Busca la informacion en el cache
        .then(res=>{
            if(res){
                //si se encuentra en el cache 
                //devuelvo los datos desde cache
                return res
            }
            //en caso de que no se encuentre en el cache la recupero desde el servidor.
            return fetch(e.request)
        })
    )
})