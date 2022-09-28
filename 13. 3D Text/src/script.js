import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// AxesHelper

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load('/textures/matcaps/8.png');

/**
 * Texts
 */

const fontLoader = new FontLoader();

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Let me be a king, of the sense of my mind\n\'Cause my mind is different, you feel me?',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 2
            }
        );

        textGeometry.computeBoundingBox();
        // console.log(textGeometry.boundingBox);

        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        // );

        textGeometry.center();

        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
        const text = new THREE.Mesh(textGeometry, material);
        scene.add(text);
        
        const donutGeometry = new THREE.TorusGeometry(0.5, 0.3, 10, 50);

        for (let i = 0; i < 50; i++) {
            const donut = new THREE.Mesh(donutGeometry, material);
            
            donut.position.x = (Math.random() - 0.5) * 15;
            donut.position.y = (Math.random() - 0.5) * 15;
            donut.position.z = (Math.random() - 0.5) * 15;

            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;
            
            const donutScale = Math.random();
            donut.scale.set(donutScale, donutScale, donutScale);

            scene.add(donut);
        }

        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

        for (let i = 0; i < 50; i++) {
            const cube = new THREE.Mesh(cubeGeometry, material);

            cube.position.x = (Math.random() - 0.5) * 15;
            cube.position.y = (Math.random() - 0.5) * 15;
            cube.position.z = (Math.random() - 0.5) * 15;

            cube.rotation.x = Math.random() * Math.PI;
            cube.rotation.y = Math.random() * Math.PI;
            
            const cubeScale = Math.random();
            cube.scale.set(cubeScale, cubeScale, cubeScale);

            scene.add(cube);
        }
    }
);

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
camera.position.x = 0
camera.position.y = 1
camera.position.z = 5.5
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