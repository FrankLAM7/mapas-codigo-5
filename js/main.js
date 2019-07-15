import{estiloMapa, centroPorDefecto} from './variables.js';

window.onload = ()=>{
    let coordenadaAnterior;
    let contentString = '<div id="content" style="color: black;">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Información</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
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

    let configurarListeners = () =>{
        mapaGoogle.addListener('click', (e)=>{
            //alert("Se hizo click en el mapa");
            //imprimiendo las coordenadas de donde
            //se ha efectuado el click en el mapa
            console.log(e.latLng.lat());
            console.log(e.latLng.lng());
            //colocando un marcador en el mapa
            var infowindow = new google.maps.InfoWindow({
                content: contentString
              });
            let markerNew = new google.maps.Marker({
                position: {
                    lat: e.latLng.lat(), 
                    lng: e.latLng.lng()
                }, 
                map: mapaGoogle,
                icon: './icons/front-bus.png' 
            });
            markerNew.addListener('click', function() {
                infowindow.open(mapaGoogle, markerNew);
              });
            //dibujando el polyline entre la coordenada anterior y el nuevo punto
            //En el primer click, "coordenadaAnterior", sera [undefined]
            //es por ello que debera entrar a la zona del else
            //del segundo click en adelante, "coordenadaAnterior" tendra un valor definido y entrara
            //a la zona del "if"
            //en ambos casos es necesario guardar el valor de la variable
            //coordenadaAnterior
            if(coordenadaAnterior){
                console.log("Ya existia coord anterior");
                //usar la coordenada anterior
                //guardara el valor de la nueva y la antigua coordenada
                var coordenadas = [
                    {lat: e.latLng.lat(), lng: e.latLng.lng()},
                    {lat: coordenadaAnterior.lat, lng: coordenadaAnterior.lng}
                  ];
                //creando la linea
                var lineaBlanca = new google.maps.Polyline({
                    path: coordenadas,
                    geodesic: true,
                    strokeColor: '#FFFFFF',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                  });

                lineaBlanca.setMap(mapaGoogle);

                //GUARDAR LA NUEVA COORDENADA COMO ANTERIOR
                coordenadaAnterior = {
                    lat: e.latLng.lat(), 
                    lng: e.latLng.lng()
                }
            }else{
                console.log("Es el primer click");
                coordenadaAnterior = {
                    lat: e.latLng.lat(), 
                    lng: e.latLng.lng()
                }
            }
            
        });
    }
    posicionActual();

    configurarListeners();
}