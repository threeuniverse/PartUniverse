

defineThreeUniverse(function (THREE, options) {

    function loadGPUParticlesSystem() {
        return new Promise(resolve => {
            if (THREE.GPUParticleSystem)
                resolve(THREE.GPUParticleSystem);
            else {
                if (!window.THREE) {
                    window.THREE = THREE;
                }
                THREE.loadnExecute(options.baseUrl + "src/extern/GPUParticleSystem.js").then(() => {
                    resolve(THREE.GPUParticleSystem);
                });

            }


        })

    }

    let root = new THREE.Object3D();



    var faceIndices = ['a', 'b', 'c'];

    let radius = 200;
    var f, f2, f3, vertexIndex, p, color;

    let geometry3 = new THREE.IcosahedronGeometry(radius, 1);
    for (var i = 0; i < geometry3.faces.length; i++) {
        f3 = geometry3.faces[i];
        for (var j = 0; j < 3; j++) {
            vertexIndex = f3[faceIndices[j]];
            p = geometry3.vertices[vertexIndex];
            color = new THREE.Color(0xffffff);
            color.setHSL((p.y / radius + 1) / 2, 1.0, 0.5);
            f3.vertexColors[j] = color;
            color = new THREE.Color(0xffffff);
            color.setHSL(0.0, (p.y / radius + 1) / 2, 0.5);
            f3.vertexColors[j] = color;
            color = new THREE.Color(0xffffff);
            color.setHSL(0.125 * vertexIndex / geometry3.vertices.length, 1.0, 0.5);
            f3.vertexColors[j] = color;
        }
    }


    var mesh, wireframe;
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors, shininess: 0 });
    var wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, transparent: true });



    mesh = new THREE.Mesh(geometry3, material);
    wireframe = new THREE.Mesh(geometry3, wireframeMaterial);
    mesh.add(wireframe);
    mesh.scale.set(0.25, 0.25, 0.25);
    var clock = new THREE.Clock();
    root.add(mesh);

    let spawnParticle = null;
    let updateParticle = null;

    if (options.requestAnimationFrame) {
        options.requestAnimationFrame(function () {
            mesh.position.y = Math.sin(clock.getElapsedTime()) * 100 + 100;
            if (mesh.position.y < 50 && spawnParticle) {
                spawnParticle();
            }
            updateParticle && updateParticle();
        });
    }





    loadGPUParticlesSystem().then(GPUParticleSystem => {

        let particleOptions = {
            position: new THREE.Vector3(0, -20, 0),
            positionRandomness: 0,
            velocity: new THREE.Vector3(0, 100, 0),
            velocityRandomness: 10,
            color: 0xff0000,
            colorRandomness: 0.5,
            turbulence: .5,
            lifetime: 20,
            size: 25,
            sizeRandomness: 1,

        };
        var textureLoader = new THREE.TextureLoader();

        let particleSystem = new THREE.GPUParticleSystem({
            maxParticles: 250000,
            particleNoiseTex: textureLoader.load(options.baseUrl + "resource/texture/perlin-512.png"),
            particleSpriteTex: textureLoader.load(options.baseUrl + "resource/texture/particle2.png")
        });
        root.add(particleSystem);
        let clock = new THREE.Clock();
        spawnParticle = function () {
            particleSystem.spawnParticle(particleOptions);
        }

        updateParticle = function () {
            particleSystem.update(clock.getElapsedTime() * 10);

        }



    });






    return root;
});

