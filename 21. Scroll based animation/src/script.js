import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap';

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    // materialColor: '#ffeded'
    materialColor: '#813737'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        objectMaterial.color.set(parameters.materialColor)
        particlesMaterial.color.set(parameters.materialColor)
    })

/**
 * Texture loading
 */

const textureLoader = new THREE.TextureLoader();

// Material textures
const gradientTexture = textureLoader.load('textures/gradients/3.jpg');
gradientTexture.magFilter = THREE.NearestFilter;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const objectMaterial = new THREE.MeshToonMaterial({ color: parameters.materialColor });
objectMaterial.gradientMap = gradientTexture;

const object1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    objectMaterial
);
const object2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    objectMaterial
);
const object3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    objectMaterial
);

const sectionObjects = [ object1, object2, object3 ];
scene.add(object1, object2, object3);

const objectsDistance = 4;

object1.position.y = - objectsDistance * 0;
object2.position.y = - objectsDistance * 1;
object3.position.y = - objectsDistance * 2;

object1.position.x = 2;
object2.position.x = - 2;
object3.position.x = 2;

/**
 * Particles
 */
// Geometry
const particlesCount = 200;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;

    positions[i3 + 0] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionObjects.length;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Lights
 */

const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

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
// Group
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera);

/**
 * Scroll
 */

let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    
    const newSection = Math.round(scrollY / sizes.height);

    if (newSection != currentSection) {
        currentSection = newSection;

        gsap.to(
            sectionObjects[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5'
            }
        )
    }
});

/**
 * Cursor
 */

const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = e.clientY / sizes.height - 0.5;
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setClearAlpha(0);
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    // console.log(deltaTime);

    // Animate objects
    for (const object of sectionObjects) {
        object.rotation.x += deltaTime * 0.1;
        object.rotation.y += deltaTime * 0.12;
    }

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance;

    const parallaxX = cursor.x * 0.5;
    const parallaxY = - cursor.y * 0.5;
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()