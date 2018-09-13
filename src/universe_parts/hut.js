
defineThreeUniverse(function (THREE, UNIVERSE, options) {

  

    return new Promise(function (resolve, reject) {
        var rootObj = new THREE.Object3D();

        var objectPromise2 = UNIVERSE.loadMTLNObject(options.baseUrl, 'resource/forest/Palm_Tree.mtl', 'resource/forest/Palm_Tree.obj');
        objectPromise2.then(object => {



            object.scale.set(30, 30, 30);

            UNIVERSE.castShadow(object);

            let prg = UNIVERSE.seedrandom("Palm Distribution with hut");

            for (let index = 0; index < 10; index++) {

                let clone = object.clone();
                clone.rotateY(prg() * Math.PI * 2);
                clone.position.set(prg() * 300 - 150 + 600, 100, prg() * 100 - 50);

                options.GetGroundHitPoint(clone.position).then((result) => {

                    clone.position.y = result[0].point.y;


                })
                rootObj.add(clone);
            }

            options.loadMTLNObject( 'resource/hut/shack.obj').then(hut => {
                rootObj.add(hut);
                hut.scale.set(30, 30, 30);
                hut.position.set(300, 0, 200);
                hut.rotateY(25 * Math.PI / 180)


                options.GetGroundHitPoint(new THREE.Vector3()).then((result) => {

                    hut.position.y = result[0].point.y - 5;


                })



                resolve(rootObj);
            });

        });



    });
});



