import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

var camera, scene, renderer;
var controls;

camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.set(800, 100, 1000);
camera.rotation.y = 45/180*Math.PI;
scene = new THREE.Scene();
// scene.background = new THREE.Color('#ccc');

var light = new THREE.DirectionalLight(0xFFFFFF, 100);
var helper = new THREE.DirectionalLightHelper(light, 10);
scene.add(helper);
light.position.set(10, 1000, 100);
scene.add(light);
const gui = new GUI();
gui.add(light.position, 'x', -2000, 2000, 50);
gui.add(light.position, 'y', -2000, 2000, 50);
gui.add(light.position, 'z', -2000, 2000, 50);
gui.add(light, 'intensity', 0, 1000, 10);
// loading 3d car model
var loader = new THREE.GLTFLoader();
loader.load(
  // resource name
  "scene.gltf",  
  // onLoad callback
  // Here the loaded data is assumed to be an object
  function (obj) {
    // Add the loaded object to the scene
    obj.scene.children[0].scale.set(0.5, 0.5, 0.5)
    console.log(obj);
    scene.add(obj.scene);
  },

  // onProgress callback
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },

  // onError callback
  function (err) {
    console.error('An error happened');
  }
);





renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setClearColor(0xb2bec3);
renderer.setPixelRatio(window.devicePixelRatio);
controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.minDistance = 500;
// controls.maxDistance = 1500;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
animate();


function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});