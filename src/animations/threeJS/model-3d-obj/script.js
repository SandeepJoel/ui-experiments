var camera, scene, renderer;
var controls;

camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(800, 100, 100);
camera.rotation.y = 45/180*Math.PI;
scene = new THREE.Scene();
// scene.background = new THREE.Color('#ccc');

var light = new THREE.DirectionalLight(0xFFFFFF);
var helper = new THREE.DirectionalLightHelper(light, 5);
scene.add(helper);
light.position.set(10, 100, 100);
scene.add(light);

// loading 3d car model
var loader = new THREE.OBJLoader();
loader.setPath('./Lamborghini/');
loader.load(
  // resource name
  "huracan-in-2.8.obj",

  // onLoad callback
  // Here the loaded data is assumed to be an object
  function (obj) {
    // Add the loaded object to the scene
    obj.children[0].scale.set(20,20,20)
    console.log(obj);
    scene.add(obj);
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