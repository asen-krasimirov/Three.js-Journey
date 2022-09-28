import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
gui.close();

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * Raycaster
 */

const raycaster = new THREE.Raycaster();

// const rayOrigin = new THREE.Vector3(- 3, 0, 0);
// const rayDirection = new THREE.Vector3(10, 0, 0);
// rayDirection.normalize();

// raycaster.set(rayOrigin, rayDirection);

// const intersectedObject = raycaster.intersectObject(object2);
// console.log(intersectedObject);

// const intersectedObjects = raycaster.intersectObjects([object1, object2, object3]);
// console.log(intersectedObjects);

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
 * Mouse
 */

const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX / sizes.width * 2 - 1;
    mouse.y = - (e.clientY / sizes.height) * 2 + 1;

    // console.log(mouse);
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
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

let currentIntersect = null;

window.addEventListener('click', () => {
    // if (Object.is(currentIntersect.object, object1)) {
    //     console.log('clicked on object1');
    // }
    // else if (Object.is(currentIntersect.object, object2)) {
    //     console.log('clicked on object2');
    // }
    // else if (Object.is(currentIntersect.object, object3)) {
    //     console.log('clicked on object3');
    // }

    switch (currentIntersect.object) {
        case object1:
            console.log('clicked on object1');
            break;
        case object2:
            console.log('clicked on object2');
            break;
        case object3:
            console.log('clicked on object3');
            break;
    }
});

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate objects
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
    object3.position.y = Math.sin(elapsedTime * 1.3) * 1.5;

    // Cast a ray

    // const rayOrigin = new THREE.Vector3(- 3, 0, 0);
    // const rayDirection = new THREE.Vector3(1, 0, 0);
    // rayDirection.normalize();

    // raycaster.set(rayOrigin, rayDirection);

    raycaster.setFromCamera(mouse, camera);

    const objectsToTest = [object1, object2, object3];
    const intercepts = raycaster.intersectObjects(objectsToTest);
    // console.log(intercepts);
    
    if (intercepts.length) {
        if(!currentIntersect) {
            console.log('mouse enter');
        }

        currentIntersect = intercepts[0];
    }
    else {
        if (currentIntersect) {
            console.log('mouse leave');
        }

        currentIntersect = null;
    }

    for(const object of objectsToTest) {
        object.material.color.set('#ff0000');
    }

    for(const intercept of intercepts) {
        intercept.object.material.color.set('#0000ff');
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()