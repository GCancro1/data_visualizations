import Life from './gameOfLife.js'
import * as THREE from '../node_modules/three/build/three.module.js';




function init_Life(board){
    
    var life = new Life(board);
    
    // life.print_board();
    return life;
}


function build_group(group, board){
    
    var geometry = new THREE.BoxGeometry(.47, .47, .47);
  
    var mesh = new THREE.MeshPhongMaterial({
        color: 0x8f8f8f,
        emissive: 0x000000
        
    });
    

    var basicCube = new THREE.Mesh(geometry,mesh);
    
    // basicCube.position.x = 0;
    // // basicCube.position.y = .22;
    // basicCube.position.y = 0;
    // basicCube.position.z = 0;
    // group.add(basicCube)

    var liveMesh = new THREE.MeshPhongMaterial({
        color: 0x0fba5f,
        emissive: 0x404040
    });
    

    var cubes = []
    // for (let i = 0; i < board.length /2; i+=.5 ){
    //     let row = [];
    //     for (let j = 0; j < board[0].length /2; j+=.5 ){
    for (let i = -1 * (board.length /4); i < board.length /4; i+=.5 ){
        let row = [];
        for (let j = -1 * (board[0].length /4); j < board[0].length /4; j+=.5 ){
        let newcube = basicCube.clone();
        newcube.position.z = i * .95;
        newcube.position.x = j * .95;
        row.push(newcube)
        group.add(newcube);
        // console.log("added new cube at", newcube.position.x, newcube.position.z)
        }
        cubes.push(row);
    }
    
    console.log("added children:" , group.children.length);

    return group
}
// import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
// import OrbitControls from '../node_modules/orbit-controls-es6';
// creating a scene
function build_scene(board){
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

    var mesh = new THREE.MeshPhongMaterial({
        color: 0x8f8f8f,
        emissive: 0x000000
        
    });
    

    
    
    // basicCube.position.x = 0;
    // // basicCube.position.y = .22;
    // basicCube.position.y = 0;
    // basicCube.position.z = 0;
    // group.add(basicCube)

    var liveMesh = new THREE.MeshPhongMaterial({
        color: 0x0fba5f,
        emissive: 0x404040
    });

    // camera
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 7);
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

    group = build_group(group, board)

    scene.add(group)
    const size = 10;
    const divisions = 22;
    console.log(group.children[0]["material"])

    const gridHelper = new THREE.GridHelper( size, divisions );
    // scene.add( gridHelper );
    function empty_board(){


    }
    function render() {
        console.log("rendered")
        var then = Date.now()
        let id = requestAnimationFrame( render );


    
            

        
        for(let s in group.children){
            let i = parseInt(s);
            
            let c = i % board[0].length
            let r = Math.floor(i / board[0].length)
            
            if(board[r][c] == 1) {
                
                group.children[i]["material"] = liveMesh;
            }
            else 
                group.children[i]["material"] = mesh
                
        }   
        scene.remove(group)
        // scene.add(group)
        var life = new Life(board)
        var new_life = life.next_state();
        board = new_life.board;
        // new_life.print_board();
        if(new_life.empty_board(board)){
            console.log("empty board")
            cancelAnimationFrame(id);
            return;
        }

        scene.add(group)



        

        // if(group.children[0]["material"] == liveMesh) {
        //     group.children[0]["material"] = mesh
        // }
        // else {
        //     group.children[12]["material"] = liveMesh;
        // }
        
        group.rotation.x += .001;
        group.rotation.y += .002;
        
        // group.rotation.z += .005;
        // basicCube.rotation.x = 50;
        // basicCube.rotation.y += 0.005;

        

 

        renderer.render( scene, camera )

        // cancelAnimationFrame(id);

        
        
    

    }

    window.addEventListener( 'resize', function () {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );


    }, false );

    render();

    return scene;

}

let row1 = Array.from({length:30}, (_,i) => 0)
let rows = Array.from({length:20}, (_,i) => row1)
rows[9] = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  rows[10] = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  rows[11] = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
rows.push(Array.from({length:11}, (_,i) => row1))
let board1 = [[0,1,0],[0,0,1],[1,1,1],[0,0,0],[0,1,0],[0,0,1],[1,1,1],[0,0,0]];
let next = init_Life(rows)
build_scene(next.board);
// console.log(next)
// console.log(next.empty_board());