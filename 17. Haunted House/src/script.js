import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
// import { RepeatWrapping } from 'three'

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

// Fog


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Walls Textures
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');

// Door Textures
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');

// Floor Textures
const floorColorTexture = textureLoader.load('/textures/grass/color.jpg');
const floorAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const floorNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const floorRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');

// resizing floor textures
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorColorTexture.repeat.set(4, 4);

floorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
floorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
floorAmbientOcclusionTexture.repeat.set(4, 4);

floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.repeat.set(4, 4);

floorRoughnessTexture.wrapS = THREE.RepeatWrapping;
floorRoughnessTexture.wrapT = THREE.RepeatWrapping;
floorRoughnessTexture.repeat.set(4, 4);

/**
 * House
 */
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
);
walls.castShadow = true;
walls.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(walls.geometry.attributes.uv.array, 2)
);

walls.position.y = walls.geometry.parameters.height * 0.5;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4, 1),
    new THREE.MeshStandardMaterial({ color: 0x661200 })
);
roof.position.y = walls.geometry.parameters.height + (roof.geometry.parameters.height * 0.5);
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 50, 50),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        aoMap: doorAmbientOcclusionTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        normalMap: doorNormalTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.05,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
);
door.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(door.geometry.attributes.uv.array, 2)
);

door.position.y = door.geometry.parameters.height * 0.5 - 0.1;
door.position.z = walls.geometry.parameters.width * 0.5 + 0.001;
house.add(door);

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: floorColorTexture,
        aoMap: floorAmbientOcclusionTexture,
        normalMap: floorNormalTexture,
        roughnessMap: floorRoughnessTexture
     })
)
floor.receiveShadow = true;
floor.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Garden
 */
// Bushes
const bushes = new THREE.Group();
scene.add(bushes);

const bushGeometry = new THREE.SphereGeometry(0.5, 20, 20);
const bushMaterial = new THREE.MeshStandardMaterial({ color: 'green' });

let bushY = bushGeometry.parameters.radius * 0.5;
let bushZ = walls.geometry.parameters.width * 0.5 + 0.5;
const bushesCoordinates = [[1, bushY, bushZ], [-2, bushY, bushZ + 0.1], [1.7, bushY, bushZ]];
const bushesScale = [1.1, 1.2, 0.5]

for (let i = 0; i < bushesCoordinates.length; i++) {
    let [x, y, z] = bushesCoordinates[i];
    let scale = bushesScale[i];

    const newBush = new THREE.Mesh(bushGeometry, bushMaterial);
    newBush.castShadow = true;
    newBush.position.set(x, y, z);
    newBush.scale.set(scale, scale, scale);
    
    bushes.add(newBush);
}

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.5, 0.7, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: 'gray' });

for (let i = 0; i < 75; i++) {
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.castShadow = true;
    
    // grave.position.x = (walls.geometry.parameters.width + 2) + (Math.random() - 0.5) * floor.geometry.parameters.width - 5;
    // grave.position.y = grave.geometry.parameters.height * 0.4;
    // grave.position.z = (walls.geometry.parameters.width + 2) + (Math.random() - 0.5) * floor.geometry.parameters.width - 5;

    const angle = Math.random() * Math.PI * 2;
    const radius = 4 + Math.random() * 6;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    grave.position.set(x, 0.3, z);
    grave.rotation.z = (Math.random() - 0.5) * 0.1; 

    graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
// const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('ambientLight intensity');
// scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#4F6988', 0.5)

moonLight.castShadow = true;
moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001).name('moonLight intensity')
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Point light
const doorLight = new THREE.PointLight('#993311', 1, 7);

doorLight.castShadow = true;
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

doorLight.position.set(
    0,
    walls.geometry.parameters.height - 0.3,
    walls.geometry.parameters.width * 0.5 + 0.2
);
scene.add(doorLight);

// Ghosts
const ghost1 = new THREE.PointLight('#00FFFF', 0.3, 10, 1);

ghost1.castShadow = true;
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost1.position.set(5, 1, 5);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#FFFF00', 0.3, 10, 1);

ghost2.castShadow = true;
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost2.position.set(5, 1, 5);
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#00FF00', 0.3, 10, 1);

ghost3.castShadow = true;
ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

ghost3.position.set(5, 1, - 5);
scene.add(ghost3);

// const ghostHelper1 = new THREE.PointLightHelper(ghost1);
// scene.add(ghostHelper1);

// const doorLightHelper = new THREE.PointLightHelper(doorLight);
// scene.add(doorLightHelper);

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

// Fog
renderer.setClearColor('#22292f');
scene.fog = new THREE.Fog('#22292f', 1, 15);

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update ghosts
    ghost1.position.x = Math.sin(elapsedTime * 0.5) * 7;
    ghost1.position.z = Math.cos(elapsedTime * 0.5) * 7;
    ghost1.position.y = Math.sin(elapsedTime * 5);
    
    ghost2.position.x = Math.sin(elapsedTime * - 2) * 4;
    ghost2.position.z = Math.cos(elapsedTime * - 2) * 4;
    // ghost2.position.y = Math.sin(elapsedTime * 5);

    ghost3.position.y = Math.sin(elapsedTime * 3);

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
