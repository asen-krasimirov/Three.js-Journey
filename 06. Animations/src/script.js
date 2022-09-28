import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Vanila JS timestamp
// let startTime = Date.now()

// Three.js Clock timestamp
// const clock = new THREE.Clock()

gsap.to(mesh.position, { x: 2, duration: 3, delay: 1 })

const tick = () => {
    // console.log('tick...')
    // console.log(camera .position.z)

    // camera.position.z -= 0.01
    // camera.position.x += 0.01
    // camera.lookAt(mesh.position)

    // const currentTime = Date.now()
    // const deltaTime = currentTime - startTime
    // startTime = currentTime

    // mesh.rotation.y -= 0.01 * deltaTime

    // const elapsedTime = clock.getElapsedTime() * -1

    // Mesh Transformations

    // mesh.rotation.y = elapsedTime

    // mesh.position.x = Math.sin(elapsedTime)
    // mesh.position.y = Math.cos(elapsedTime)

    // Camera Transformations
    // camera.position.x = Math.cos(elapsedTime)
    // camera.position.y = Math.sin(elapsedTime)

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
    // setTimeout(tick, 5)
}

tick()