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
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x444444 );

    
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