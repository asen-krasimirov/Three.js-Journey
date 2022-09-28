console.log(THREE);

const sizes = {
    width: 800,
    height: 600
};

const scene = new THREE.Scene();

// const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);

// Mesh Creation
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
