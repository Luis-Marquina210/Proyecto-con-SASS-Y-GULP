document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});



function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}


function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}

// funcion para hacer funcional nuestro scrool en la pagina
function scrollNav(){
    const enlances = document.querySelectorAll('.navegacion-principal a')
    enlances.forEach(enlace=>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();// prevenir llevarnos de golpe al momento de dar click y abajo creamos el nuevo efecto
            //console.log(e.target.attributes.href.value)// target sirve para ver en que le damos click
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);// llamamos al valor que se encuentra en el href que es el lineup(donde nos llevara para la vista del lineup)
            seccion.scrollIntoView({behavior: 'smooth'});//api function para darle efectos en esa transicion al seleccionar
        });
    });
}



function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    // vamos a iterar sobre cada imagen con los 3 formatos de imagen que hicimos antes
    for(let i =1; i<= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML=`
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen vocalista">`;
        galeria.appendChild(imagen);

        imagen.onclick=function(){// Lo pasamos como callback para llamar asi a cada elemento con el onclick, porque si mandamos a llamar a la funcion con parametro llama a todos los elementos y eso no se quiere
            mostrarImagen(i);
        }
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML=`
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen vocalista">`;

    // Crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    overlay.onclick= function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    // Boton para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent='X';
    cerrarModal.classList.add('btn-cerrar');
    // callback que llamamos a la funcion remove(propia de js) que cierra la ventana modal
    cerrarModal.onclick=function(){

        //aca quitamos la clase fijar-body cuando cerramos el modal para evitar que se congele toda la pagina
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        //
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    // añadir al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}