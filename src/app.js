requirejs.config({
    baseUrl: 'http://localhost/reapp/',
    paths: {
        react: 'bower_components/react/react.min',
        modernizr: 'bower_components/modernizr/modernizr',
        localforage: 'bower_components/localforage/dist/localforage.min',
        McFly: 'bower_components/mcfly/dist/McFly',
        scripts: 'dist/js/scripts',
    }
});


    define(['react','localforage','McFly', 'scripts'], function(React, localforage, McFly, scripts){
        console.log(localforage);
    });