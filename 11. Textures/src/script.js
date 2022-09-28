import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// import imageSource from './image.jpg';

// const imageSource = '/textures/minecraft.png';

// console.log(imageSource);

// const image = new Image();
// const texture = new THREE.Texture(image);

// image.addEventListener('load', () => {
//     texture.needsUpdate = true;
// });

// image.src = '/textures/door/roughness.jpg';

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
    console.log('loading started..');
}
loadingManager.onLoad = () => {
    console.log('loading finished..');
}
loadingManager.onProgress = () => {
    console.log('loading progressing..');
}
loadingManager.onError = () => {
    console.log('loading error..');
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load('/textures/minecraft.png');
const colorTexture = textureLoader.load('/textures/door/color.jpg');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// texture.repeat.x = 2;
// texture.repeat.y = 3;

// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

// texture.offset.x = 0.5;
// texture.offset.y = 0.5;

// texture.rotation = Math.PI * 0.25;
// texture.center.x = 0.5;
// texture.center.y = 0.5;

colorTexture.generateMipmaps = false
// texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
 const geometry = new THREE.BoxGeometry(1, 1, 1)

 // console.log(geometry.attributes.uv);

const material = new THREE.MeshBasicMaterial({ map: texture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0.7
camera.position.y = 0.8
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()