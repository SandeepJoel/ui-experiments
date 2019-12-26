import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var camera, scene, renderer;
var controls;

camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 100);
camera.position.z = 50;

scene = new THREE.Scene();

// ground plane
const planeSize = 75;
const planeGeo = new THREE.PlaneBufferGeometry(planeSize + 25, planeSize -25);
const planeMat = new THREE.MeshPhongMaterial({
  color: '#ccc',
  side: THREE.DoubleSide,
});

const plate = new THREE.Mesh(planeGeo, planeMat);
plate.rotation.x = Math.PI * -0.5;
plate.position.set(0, 0, 0);
plate.receiveShadow = true;
scene.add(plate);

// {
//   // red box
//   const side = 5
//   const geometry = new THREE.BoxGeometry(side, side, side);
//   const material = new THREE.MeshPhongMaterial({ color: 0xd63031 });
//   const box = new THREE.Mesh(geometry, material);
//   box.position.set(side * 2, side/2, 0);
//   box.rotation.y = Math.PI * -0.30;
//   scene.add(box);
// }


{
  const sphereRadius = 5;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
  const sphereMat = new THREE.MeshPhongMaterial({ color: '#00b894' });

  const mesh = new THREE.Mesh(sphereGeo, sphereMat);
  mesh.position.set(-sphereRadius, sphereRadius * 3, 0);
  scene.add(mesh);
}

// add hemisphere light
const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xf7c683;
const light = new THREE.HemisphereLight(skyColor, groundColor);
light.position.set(0, 45, 0);
// light.target.position.set(0, 0, 0);
scene.add(light);
// scene.add(light.target);
const light2 = new THREE.DirectionalLight('#ffffff', 1);
light2.position.set(0, 45, 45);
light2.castShadow = true;
scene.add(light2);


const helper = new THREE.HemisphereLightHelper(light, 5);
scene.add(helper);
const helper2 = new THREE.DirectionalLightHelper(light2, 5);
scene.add(helper2);
updateLight();
const gui = new GUI();
gui.add(light, 'intensity', 0, 2, 0.01).name('Hemisphere Intensity');
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('SkyColor');
gui.addColor(new ColorGUIHelper(light, 'groundColor'), 'value').name('GroundColor');

gui.addColor(new ColorGUIHelper(light2, 'color'), 'value').name('Directional Color');
gui.add(light2, 'intensity', 0, 2, 0.01).name('DirectionalLight Intensity');
makeXYZGUI(gui, light2.position, 'position', updateLight);
// makeXYZGUI(gui, light.target.position, 'target', updateLight);




renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xb2bec3);
renderer.setPixelRatio(window.devicePixelRatio);
controls = new THREE.OrbitControls(camera, renderer.domElement);
window.addEventListener('mousemove', onMouseMove, false);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
animate();


function makeXYZGUI(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, 'x', -50, 50).onChange(onChangeFn);
  folder.add(vector3, 'y', -50, 50).onChange(onChangeFn);
  folder.add(vector3, 'z', -50, 50).onChange(onChangeFn);
  folder.open();
}

function updateLight() {
  // light.target.updateMatrixWorld();
  helper.update();
}



function onMouseMove(event) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {

  // box.rotation.x += 0.005;
  // box.rotation.y += 0.005;
  controls.update();



  // update the picking ray with the camera and mouse position
  // raycaster.setFromCamera(mouse, camera);
  // calculate objects intersecting the picking ray
  // var intersects = raycaster.intersectObjects(scene.children);

  // for (var i = 0; i < intersects.length; i++) {    
  //   intersects[i].object.material.wireframe = true;
  // }

  // if (!(intersects.length > 0)) {
  //   box.scale.set(1, 1, 1);
  //   box.material.wireframe = false;
  // }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});