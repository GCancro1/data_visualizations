import * as THREE from '../node_modules/three/build/three.module.js';
// import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
// import OrbitControls from '../node_modules/orbit-controls-es6';
// creating a scene
    var scene = new THREE.Scene();
 
    
    // var mesh = new THREE.Mesh(
    //         // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
    //         new THREE.SphereGeometry(0.5),
    //        // standard material
    //         new THREE.MeshPhongMaterial({
    //             color: 0xff0000,
    //             emissive: 0x404040
    //         }));
    
    // scene.add(mesh); // add the mesh to the scene
    const sceneCanvas = document.getElementById('three-canvas')

    
    // var box = new THREE.Box3().setFromObject(basicCube);
    // var center = box.getCenter( basicCube.position ); // this re-sets the mesh position
    
    
    
    
    // scene.add(basicCube);

    


    // camera
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(4.75, 4, 4.75);
    var light = new THREE.SpotLight(); // point light
    light.position.x = 1;
    light.position.y = 1;
    camera.add(light);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: sceneCanvas,
        powerPreference: "high-performance"
      })
      renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding

    renderer.setSize(sceneCanvas.offsetWidth, sceneCanvas.offsetHeight)
    renderer.setClearColor("#212121")
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.shadowMapSoft = true
    renderer.shadowMap.autoUpdate = false
    renderer.shadowMap.needsUpdate = true

    // var controls = new OrbitControls(this.camera, this.renderer.domElement)
    // controls.addEventListener('change', this.animateThreeJs )
    // document.body.appendChild(renderer.domElement);

    var group = new THREE.Group()

    var geometry = new THREE.BoxGeometry(.45, .45, .45);
  
    var mesh = new THREE.MeshPhongMaterial({
        color: 0x3f7b9d,
        emissive: 0x404040
    });
    var basicCube = new THREE.Mesh(geometry,mesh);
    
    basicCube.position.x = 0;
    // basicCube.position.y = .22;
    basicCube.position.y = 0;
    basicCube.position.z = 0;
    group.add(basicCube)

    for (let i = .5; i < 5; i+=.5 ){
        let newcube = basicCube.clone();
        newcube.position.x = i * .95;
        // newcube.position.y = i * 2;
        group.add(newcube);
        console.log("added new cube at %d", newcube.position.x)
    }
    

    scene.add(group)
    const size = 10;
    const divisions = 22;
    console.log(group.children[1]["material"])
    var mesh2 = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x404040
    });
    
    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    function render() {
        console.log("rendered")
        
        requestAnimationFrame( render );

        if(group.children[1]["material"] == mesh2) {
            group.children[1]["material"] = mesh
        }
        else {
            group.children[1]["material"] = mesh2
        }
        
        // group.rotation.x += .005;
        // group.rotation.y += .005;
        
        // group.rotation.z += .005;
        // basicCube.rotation.x = 50;
        // basicCube.rotation.y += 0.005;

        

 

        renderer.render( scene, camera );

    }

    window.addEventListener( 'resize', function () {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }, false );

    render();