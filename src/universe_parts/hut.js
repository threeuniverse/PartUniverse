
defineThreeUniverse(function (THREE, options,UNIVERSE) {

    function loadMTLNObject(baseUrl, mtl, obj) {
        var objLoader = new THREE.OBJLoader2();

        return new Promise((resolve, reject) => {
            objLoader.loadMtl(baseUrl + mtl, null, function (materials) {

                objLoader.setMaterials(materials);
                objLoader.setLogging(false, false);
                objLoader.load(baseUrl + obj, (event) => {
                    resolve(event.detail.loaderRootNode);
                }, null, null, null, false);

            });
        });

    }

    return new Promise(function (resolve, reject) {
        var rootObj = new THREE.Object3D();
        

        var objectPromise2 = loadMTLNObject(options.baseUrl, 'resource/forest/Palm_Tree.mtl', 'resource/forest/Palm_Tree.obj');
        objectPromise2.then(object => {

            

            object.scale.set(30, 30, 30);

            object.traverse(object => {
                if (object.isMesh) {
                    object.castShadow = true;
                }

            })

            let prg = UNIVERSE.seedrandom("Palm Distribution with hut");

            for (let index = 0; index < 10; index++) {
                
                let clone=object.clone();
                clone.rotateY(prg()*Math.PI*2);
                clone.position.set(prg()*300-150+600,0,prg()*100-50);
                rootObj.add(clone);
            }


            loadMTLNObject(options.baseUrl, 'resource/hut/shack.obj.mtl', 'resource/hut/shack.obj').then(hut=>{
                rootObj.add(hut);
                hut.scale.set(30, 30, 30);                
                hut.position.set(300,0,200);
                hut.rotateY(25 * Math.PI / 180)

                
                resolve(rootObj);
            });

        });



    });
});



