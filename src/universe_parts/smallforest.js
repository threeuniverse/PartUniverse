
defineThreeUniverse(function (THREE, UNIVERSE, SPACE) {

    return new Promise(function (resolve, reject) {

        SPACE.loadMTLNObject('resource/forest/Oak_Tree.obj').then((rootnode) => {
            let obj = new THREE.Object3D();

            rootnode.scale.set(40, 40, 40);
            UNIVERSE.castShadow(rootnode);
            let prg = UNIVERSE.seedrandom("Farest rendering start");

            for (let index = 0; index < 20; index++) {

                let clone = rootnode.clone();
                clone.rotateY(prg() * Math.PI * 2);
                clone.position.set(prg() * 1000 - 500, 100, prg() * 1000 - 500);
                SPACE.GetGroundHitPoint(clone.position).then(result => {
                    clone.position.y = result[0].point.y;
                    obj.add(clone);
                });

            }
            resolve(obj);

        })


    });
});
