
defineThreeUniverse(function (THREE,options) {

    return new Promise(function (resolve, reject) {

        var objLoader = new THREE.OBJLoader2();
        var callbackOnLoad = function (event) {
            resolve(event.detail.loaderRootNode);
            
        };
        var onLoadMtl = function (materials) {
            
            objLoader.setMaterials(materials);
            objLoader.setLogging(false, false);
            objLoader.load(options.baseUrl+'resource/hut/shack.obj', callbackOnLoad, null, null, null, false);


        };
        objLoader.loadMtl(options.baseUrl+'resource/hut/shack.obj.mtl', null, onLoadMtl);
    });
});
