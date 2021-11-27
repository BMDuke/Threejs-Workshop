import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import GUI from 'lil-gui'


// ++++++++ SETUP ++++++++

// Get canvas
const canvas = document.querySelector('#threejs_workshop');

// Capture window size 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspect: () => {return sizes.width / sizes.height},
}

// Create a new scene
const scene = new THREE.Scene();

// Initialise debug pannel
const gui = new GUI();



// +++++++ OBJECTS +++++++

// Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color:0xff0000,
    wireframe:true,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(.5,.5,.5);
scene.add(cube);

// Create an axis helper
const length = 2;
const axesHelper = new THREE.AxesHelper(length);
scene.add(axesHelper);

// Create a camera
const camera = new THREE.PerspectiveCamera(75, sizes.aspect())
camera.position.set(1, 2, 6)
camera.lookAt(cube.position);

// Create orbit control
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Create a renderer
const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera);




// +++++++++ DEBUG +++++++++
gui.add(cube, 'visible');
gui.add(cube.material, 'wireframe');
gui.add(cube.position, 'x').min(-5).max(5).step(.01);
gui.add(cube.position, 'y').min(-5).max(5).step(.01);
gui.add(cube.position, 'z').min(-5).max(5).step(.01);


// +++++++ ANIMATION +++++++

// Initialise time
const clock = new THREE.Clock();

const tick = () => {

    // Get elapsed time
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    cube.rotation.y = elapsedTime;

    // Render results
    renderer.render(scene, camera);

    // Call tick on next frame
    window.requestAnimationFrame(tick);

}

tick()



// +++++ EVENT LISTENERS +++++

// Resize
window.addEventListener('resize', () => {

    // Update sizes object
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.aspect();
    camera.updateProjectionMatrix();

    // Update controls
    controls.update();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.render(scene, camera);   //// !!!! <<< May reset scene

});

// Fullscreen
window.addEventListener('dblclick', () => {

    // Get fullscreen method
    const FSElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!FSElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } 
        else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } 
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
})