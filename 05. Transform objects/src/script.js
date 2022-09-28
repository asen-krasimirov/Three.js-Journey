import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)

// Position
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1.5
// mesh.position.set(0.7, -0.6, 1)

// Scale
// mesh.scale.set(2, 0.25, 0.5)

// Rotation
// mesh.rotation.reorder("yxz")
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25

// scene.add(mesh)

// Group
const cubeGroup = new THREE.Group()
scene.add(cubeGroup)

// cube1
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube1.position.x = -1.5
cubeGroup.add(cube1)

// cube2
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cubeGroup.add(cube2)

// cube3
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.x = 1.5
cubeGroup.add(cube3)

cubeGroup.scale.y = 2
cubeGroup.position.x = -0.25
cubeGroup.rotation.y = Math.PI * 0.25

/**
 * AxesHelper
 */
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// normalize method
// mesh.position.normalize()

// length method
// console.log(mesh.position.length())

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4
scene.add(camera)

// lookAt
// camera.lookAt(mesh.position)

// distanceTo method
// console.log(mesh.position.distanceTo(camera.position))


// Testing
// mesh.position.x = 0.7
// mesh.position.y = - 0.6
// mesh.position.z = 1
// mesh.scale.x = 2
// mesh.scale.y = 0.25
// mesh.scale.z = 0.5
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)