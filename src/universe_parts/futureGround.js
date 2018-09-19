defineThreeUniverse(function (THREE,UNIVERSE,options) {

    return new Promise(function (resolve) {



        var vertex = new THREE.Vector3();
        var color = new THREE.Color();
        var floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 20, 20);
        floorGeometry.rotateX(- Math.PI / 2);

        // vertex displacement
        var position = floorGeometry.attributes.position;

        for (var i = 0; i < position.count; i++) {

            vertex.fromBufferAttribute(position, i);

            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 10;
            vertex.z += Math.random() * 20 - 10;

            position.setXYZ(i, vertex.x, vertex.y, vertex.z);

        }

        // floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

        let count = floorGeometry.attributes.position.count;
        var colors = [];

        for (var i = 0; i < count; i++) {

            color.setHSL(Math.random() * 0.5 + 0.5, 0.75, Math.random() * 0.1 + 0.75);
            colors.push(color.r, color.g, color.b);

        }

        var loader = new THREE.TextureLoader();


        var normalMap = loader.load(options.baseUrl + 'resource/Leather_004_NRM.png', () => {
            resolve(floor);
        });
        normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
        normalMap.repeat.set(25, 25);




        floorGeometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        var floorMaterial = new THREE.MeshStandardMaterial({ metalness: 0.5, normalMap: normalMap, flatShading: true, vertexColors: THREE.VertexColors, shininess: 20 });

        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        
    })


});