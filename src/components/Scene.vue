<template>
  <div class="scene">
    <div id="three-scene-canvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  name: 'Scene',
  data () {
    return {
      sceneCanvas: null,
      scene: null,
      camera: null,
      renderer: null,
      controls: null
    }
  },
  mounted () {
    /* **************
       BASIC SETUP
    ************** */
    this.sceneCanvas = document.getElementById('three-scene-canvas')
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.sceneCanvas.getBoundingClientRect().width / this.sceneCanvas.getBoundingClientRect().height,
      1,
      1000
    )
    this.camera.position.set(15, 5, 15)
    
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance"
    })
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.addEventListener('change', this.animateThreeJs )
    this.renderer.setSize(this.sceneCanvas.offsetWidth, this.sceneCanvas.offsetHeight)
    this.renderer.setClearColor("#212121")
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.shadowMapSoft = true
    this.renderer.shadowMap.autoUpdate = false
    this.renderer.shadowMap.needsUpdate = true
    this.sceneCanvas.append(this.renderer.domElement)
    
    // lighting
    let ambientLight = new THREE.AmbientLight (0xdaccff, 0.5)
    this.scene.add(ambientLight)
    let light = new THREE.PointLight(0xfc831d, 1, 100)
    light.position.set(15, 10, 15)
    light.castShadow = true
    light.shadow.radius = 1
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048
    this.scene.add(light)
    // Adding a cube
    let geometry = new THREE.BoxGeometry()
    let material = new THREE.MeshBasicMaterial({color:  0xadd8e6})
    let cube = new THREE.Mesh(geometry, material)
    // this.scene.add(cube)

    const radius = 1;    
    const widthSegments = 32;  
    const heightSegments = 16;  
    const sphere_geo = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    
    let sphere = new THREE.Mesh(sphere_geo, material);


    for(let i = 0; i < 6; i++){
      var newMesh = sphere.clone();
      newMesh.position.x += 1 + (i*4);
      newMesh.rotation.x = 1;
      newMesh.rotation.y = 1;
      this.scene.add(newMesh);
      console.log("adding new mesh at ", newMesh.position.x)
    }

    console.log("test")
    // this.scene.add(sphere);
    this.resizeCanvas();

    

    
    window.addEventListener("resize", () => {
      this.resizeCanvas()
    })
  },
  methods: {
    animateThreeJs () {
      this.renderer.render(this.scene, this.camera)
      this.renderer.shadowMap.needsUpdate = true
    },
    
    resizeCanvas () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.animateThreeJs()
    }
  }
}
</script>