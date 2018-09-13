
defineThreeUniverse(function (THREE, UNIVERSE, SPACE) {

  

    return new Promise(function (resolve, reject) {
        var rootObj = new THREE.Object3D();

        SPACE.loadMTLNObject('resource/forest/Palm_Tree.obj').then(object => {



            object.scale.set(30, 30, 30);

            UNIVERSE.castShadow(object);

            let prg = UNIVERSE.seedrandom("Palm Distribution with hut");

            for (let index = 0; index < 10; index++) {

                let clone = object.clone();
                clone.rotateY(prg() * Math.PI * 2);
                clone.position.set(prg() * 300 - 150 + 600, 100, prg() * 100 - 50);

                SPACE.GetGroundHitPoint(clone.position).then((result) => {

                    clone.position.y = result[0].point.y;


                })
                rootObj.add(clone);
            }

            SPACE.loadMTLNObject( 'resource/hut/shack.obj').then(hut => {
                rootObj.add(hut);
                hut.scale.set(30, 30, 30);
                hut.position.set(300, 0, 200);
                hut.rotateY(25 * Math.PI / 180)


                SPACE.GetGroundHitPoint(new THREE.Vector3()).then((result) => {

                    hut.position.y = result[0].point.y - 5;


                })



                resolve(rootObj);
            });

        });



    });
});



