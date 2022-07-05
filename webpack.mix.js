
let mix = require('laravel-mix');

// mix.js('src/app.js', 'dist').setPublicPath('dist');

mix.js('resouces/js/app.js', 'public/js/app.js').sass('resouces/scss/app.scss', 'public/css/app.css');