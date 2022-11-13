// require sirve para extraer la funcionalidades de gulp y sass(como)
const { src, dest, watch, parallel } = require("gulp");

// --------------CSS---------------------------
const sass = require("gulp-sass")(require('sass'));
//
const plumber = require("gulp-plumber");
const autoprefixer = require('autoprefixer');// soporte para que nuestro css se muestre en algunos sitios webs
const cssnano = require('cssnano');// comprime nuestro codigo de css
const postcss = require('gulp-postcss');// transformaciones a los demas componentes
const sourcemaps = require('gulp-sourcemaps');

// ----------JAVASCRIPT-----------------

const terser = require('gulp-terser-js');


// el gulp-sass plugin que sirve para hacer la conexion de las automatizaciones(gulp) con los archivos de sass(css)

// -------------IMAGENES------------------------
// Sirves esto para una optimizacion de imagenes 
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');

//convierte las imagenes en ligeras y con alta calidad(importacion en requirements)
const webp = require('gulp-webp');

// Nuevo plugin para optimizar las imagenes
const avif = require("gulp-avif");


function css(done){
    // **/* -------> detecta todos los archivos o carpetas que hemos creado para que se actualice automaticamente
    src('src/scss/**/*.scss') // Identificar el archivo de sass
        .pipe(sourcemaps.init())
        .pipe(plumber())//reemplaza el metodo y elimina los controladores del error y muestra la linea donde se encuentra el error
        .pipe( sass() )//el pipe sirve para compilar el archivo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest("build/css") ) // Almacenar en el disco duro
    

    done(); // callback que avisa a gulp cuando llegamos al final
}

// Se utiliza el plugin de webp con su constante que fue puesta
function versionWebp(done){

    const opciones ={
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest("build/img"))
    done();
}

// se utiliza las variables de cache y imagemin e importadaas en requiriments
function imagenes(done){

    const opciones={
        optimizationLevel:3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

// funcion para el avif
function versionAvif(done){

    const opciones ={
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest("build/img"))
    done();
}


function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/js"));
    done()
}





// Funcion que sirve para que escuche a todos los cambios que se hace en la app.scss(actualiza)
//mediante el metodo watch
function dev(done){

    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript)

    done();
}

exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes,versionWebp,versionAvif,javascript,dev);

//Maneras de ejecutar el gulp
//npx gulp + (el nombre como se exporta) npx: ejecuta paquetes sin estar instalados globalmente
// npm run +(el nombre que se pone en los scripts)


// -> gulp sirve para crear y automatizar tareas
// -> sass sirve para identificar sintaxis valida y compilarlo
//-> gulp-sass sirve para hacer la conexion de gulp con sass