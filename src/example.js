import * as THREE from '../node_modules/three/build/three.module.js';


// document.getElementById( 'newWindow' ).href += window.location.hash;

			// const gui = new THREE.GUI();

			// const scene = new THREE.Scene();
			// scene.background = new THREE.Color( 0x444444 );

			// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
			// camera.position.z = 30;

			// const renderer = new THREE.WebGLRenderer( { antialias: true } );
			// renderer.setPixelRatio( window.devicePixelRatio );
			// renderer.setSize( window.innerWidth, window.innerHeight );
			// document.body.appendChild( renderer.domElement );

			// const orbit = new THREE.OrbitControls( camera, renderer.domElement );
			// orbit.enableZoom = false;

            const sceneCanvas = document.getElementById('three-canvas')
            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(
              50,
              sceneCanvas.getBoundingClientRect().width / sceneCanvas.getBoundingClientRect().height,
              1,
              1000
            )
            camera.position.set(15, 5, 15)
            
            const renderer = new THREE.WebGLRenderer({
              antialias: true,
              canvas: sceneCanvas,
              powerPreference: "high-performance"
            })
            renderer.outputEncoding = THREE.sRGBEncoding
            // this.controls = new OrbitControls(this.camera, this.renderer.domElement)
            // this.controls.addEventListener('change', this.animateThreeJs )
            renderer.setSize(sceneCanvas.offsetWidth, sceneCanvas.offsetHeight)
            renderer.setClearColor("#212121")
            renderer.shadowMap.enabled = true
            renderer.shadowMap.type = THREE.PCFSoftShadowMap
            renderer.shadowMapSoft = true
            renderer.shadowMap.autoUpdate = false
            renderer.shadowMap.needsUpdate = true
            // sceneCanvas.append(renderer.domElement)
            
            // lighting
            let ambientLight = new THREE.AmbientLight (0xdaccff, 0.5)
            scene.add(ambientLight)
            let light = new THREE.PointLight(0xfc831d, 1, 100)
            light.position.set(15, 10, 15)
            light.castShadow = true
            light.shadow.radius = 1
            light.shadow.mapSize.width = 2048
            light.shadow.mapSize.height = 2048
            scene.add(light)

			const lights = [];
			lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

			lights[ 0 ].position.set( 0, 200, 0 );
			lights[ 1 ].position.set( 100, 200, 100 );
			lights[ 2 ].position.set( - 100, - 200, - 100 );

			scene.add( lights[ 0 ] );
			scene.add( lights[ 1 ] );
			scene.add( lights[ 2 ] );

			const group = new THREE.Group();

			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [], 3 ) );

			const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
			const meshMaterial = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );



            

                const data = {
                    radius: 5,
                    widthSegments: 32,
                    heightSegments: 16,
                    phiStart: 0,
                    phiLength: Math.PI *2,
                    thetaStart: 0,
                    thetaLength: Math.PI
                };

            let spheregeo = new THREE.SphereGeometry(data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength)
            let basicmesh = new THREE.MeshBasicMaterial( { color:0xadd8e6 });
            let sphere1 = new THREE.Mesh( spheregeo, basicmesh );
            group.add(sphere1);
            // group.add( new THREE.LineSegments( geometry, lineMaterial ) );
			// group.add( new THREE.Mesh( geometry, meshMaterial ) );
            
            // scene.add( sphere );
			// const options = THREEchooseFromHash( group );

			scene.add( group );

			function render() {
                console.log("rendered")
				requestAnimationFrame( render );

				// if ( ! options.fixed ) {

				// 	group.rotation.x += 0.005;
				// 	group.rotation.y += 0.005;

				// }

				renderer.render( scene, camera );

			}

			window.addEventListener( 'resize', function () {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}, false );

			render();