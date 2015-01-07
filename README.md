PropertyBook
============

A social site for property users

TODO:
add bower install bootstrap-material-design to the project


Material Preloader :

hot to use:

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="materialPreloader.js"></script>

<link rel="stylesheet" type="text/css" href="css/materialPreloader.css">

 preloader.on();
 preloader.off();

jQuery(document).ready(function($) {
    preloader = new $.materialPreloader({
        position: 'top',
        height: '5px',
        col_1: '#159756',
        col_2: '#da4733',
        col_3: '#3b78e7',
        col_4: '#fdba2c',
        fadeIn: 200,
        fadeOut: 200
    });
    preloader.on();
    $('.on').on('click', function(event) {
        event.preventDefault();
        preloader.on();
    });
    $('.off').on('click', function(event) {
        event.preventDefault();
        preloader.off();
    });
});
