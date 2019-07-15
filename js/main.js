import{estiloMapa, centroPorDefecto} from './variables.js';

window.onload = ()=>{
    let  mapaGoogle = new google.maps.Map(document.getElementById('map'), {
        center: centroPorDefecto,
        zoom: 8,
        styles : estiloMapa
      });
 
    let posicionActual = () =>{
        //solicitar permiso de acceso a ubicación al navegador
        if(navigator.geolocation){
            //getCurrentPosition(position)=> funcion que devuelve
            //informacion de la ubicacion del equipo(coordenadas)
            navigator.geolocation.getCurrentPosition(posicion =>{
                console.log(posicion);
                //forma 1 => xvre
                let {latitude, longitude} = posicion.coords;
                //forma 2
                // let latitude = posicion.coords.latitude;
                // let longitude = posicion.coords.longitude;
                let marker = new google.maps.Marker({
                        position: {
                            lat: latitude, 
                            lng: longitude
                        }, 
                        map: mapaGoogle,
                        title: "Aquí estoy",
                        
                    });
                mapaGoogle.setCenter({
                    lat: latitude, 
                    lng: longitude
                });
                mapaGoogle.setZoom(16);
            },error=>{
                alert("No se ha concedido permisos para acceder a tu ubicación")
                console.log(error);
            });

        }else{  
            console.log("El navegador no posee geolocalización");
        }
    }

    posicionActual();

}