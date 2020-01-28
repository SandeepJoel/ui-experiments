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

var camera, scene, renderer;
var controls;

camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(20, 15, 100);

scene = new THREE.Scene();
const gui = new GUI();

// ground plane
const planeSize = 200;
// const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
const planeGeo = new THREE.CircleBufferGeometry(planeSize, 75);
const planeMat = new THREE.MeshPhongMaterial({
  color: '#ccc',
  side: THREE.DoubleSide,
});

const plate = new THREE.Mesh(planeGeo, planeMat);
plate.rotation.x = Math.PI * -0.5;
plate.position.set(0, 0, 0);
plate.receiveShadow = true;
scene.add(plate);

// house
{
  const size = 18;
  // const wallColor = '#2c2c54';
  const wallColor = '#b33939';
  const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(size, size/1.3, size * 2),
    new THREE.MeshPhongMaterial({ color: wallColor, shininess: 10000 })
  );
  walls.position.set(size * 2, size/(2*1.3), 0);


  var trianglePoints = [];
  let triangeleSize = 9;
  trianglePoints.push(new THREE.Vector2(-triangeleSize, 0));
  trianglePoints.push(new THREE.Vector2(triangeleSize, 0));
  trianglePoints.push(new THREE.Vector2(0, triangeleSize));

  var firstFloor = new THREE.Mesh(
    new THREE.ExtrudeBufferGeometry(
      new THREE.Shape(trianglePoints), {
      bevelEnabled: false,
      depth: size * 2
    }),
    new THREE.MeshPhongMaterial({ color: wallColor, shininess: 10000 })
  );
  firstFloor.position.set(size * 2, size/1.3, -size);
  scene.add(firstFloor);


  const roofLeft = new THREE.Mesh(
    new THREE.BoxBufferGeometry(triangeleSize + 4, size * 2.2, 2),
    new THREE.MeshPhongMaterial({ color: '#FFFFFF', shininess: 10000 })
  );
  roofLeft.position.set(30.7, 19.2, 0);
  roofLeft.rotation.x = Math.PI / 2;
  roofLeft.rotation.y = 0.75; 


  const roofRight = new THREE.Mesh(
    new THREE.BoxBufferGeometry(triangeleSize + 6, size * 2.2, 2),
    new THREE.MeshPhongMaterial({ color: '#FFFFFF', shininess: 10000 })
  );
  roofRight.position.set(40.6, 19.6, 0);
  roofRight.rotation.x = Math.PI / 2;
  roofRight.rotation.y = 2.36

  // gui.add(roofRight.position, 'x', -50, 50, 0.1).name(`x`);
  // gui.add(roofRight.position, 'y', -50, 50, 0.1).name(`y`);
  // gui.add(roofRight.position, 'z', -50, 50, 0.1).name(`z`);
  // gui.add(roofRight.rotation, 'x', 0, Math.PI, 0.01).name(`rx`);
  // gui.add(roofRight.rotation, 'y', 0, Math.PI, 0.01).name(`ry`);
  // gui.add(roofRight.rotation, 'z', 0, Math.PI, 0.01).name(`rz`); 

  const door = new THREE.Mesh(
    new THREE.BoxBufferGeometry(size / 3, size / 2.5, size / 3),    
    new THREE.MeshBasicMaterial({ color: '#ffda79' })
  );
  door.position.set(36.5, 3.5, 15.6);

  const house = new THREE.Group();  
  house.add(roofLeft);
  house.add(roofRight);
  house.add(door);
  house.add(walls);
  house.add(firstFloor);
  scene.add(house);

  const house2 = house.clone();  
  house2.rotation.set(0, -Math.PI/2, 0);
  house2.scale.set(1.4, 1.4, 1.4)
  house2.position.set(36.5, 0, -59.2)  
  scene.add(house2);
} 

// tree

{
  const radius = 10;
  const treeLeavesColor = '#218c74'
  const treeTop = new THREE.Mesh(
    new THREE.ConeBufferGeometry(radius, 30, 4),
    new THREE.MeshPhongMaterial({ color: treeLeavesColor, shininess: 1000 })
  );
  treeTop.position.set(0, 20, 0);
  treeTop.castShadow = true;
  treeTop.receiveShadow = true;

  // stem
  const side = 2;
  const brownColor = '#4F332D';
  const trunk = new THREE.Mesh(
    new THREE.CylinderBufferGeometry(side, side, side * 3, 5),
    new THREE.MeshPhongMaterial({ color: brownColor })
  );
  trunk.position.set(0, side, 0);

  const tree = new THREE.Group();
  tree.add(trunk);
  tree.add(treeTop);
  scene.add(tree)

}




{
  // gifts
  const size = 4;
  const geo = new THREE.BoxBufferGeometry(size, size, size);
  const mat = new THREE.MeshPhongMaterial({ color: '#e74c3c', shininess: 10000 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, size/2, 15);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

{
  // gifts
  const size = 4;
  const geo = new THREE.BoxBufferGeometry(size, size, size);
  const mat = new THREE.MeshPhongMaterial({ color: '#f1c40f', shininess: 10000 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(7, size / 2, 13);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

{
  // gifts
  const size = 4;
  const geo = new THREE.BoxBufferGeometry(size, size, size);
  const mat = new THREE.MeshPhongMaterial({ color: '#2ecc71', shininess: 10000 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(5, size / 2, 18);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

{
  // gifts
  const size = 4;
  const geo = new THREE.BoxBufferGeometry(size, size, size);
  const mat = new THREE.MeshPhongMaterial({ color: '#8c7ae6', shininess: 10000 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(-5, size / 2, 13);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

// add hemisphere light
const skyColor = 0xecf0f1;  // light blue
const groundColor = 0xecf0f1;
const light = new THREE.HemisphereLight(skyColor, groundColor);
light.position.set(0, 45, 0);
scene.add(light);

// add directional light
const light2 = new THREE.DirectionalLight('#ffffff', 0.35);
light2.position.set(0, 45, 95);
light2.castShadow = true;
scene.add(light2);
const helper2 = new THREE.DirectionalLightHelper(light2, 5);
scene.add(helper2);
// gui.addColor(new ColorGUIHelper(light2, 'color'), 'value').name('Directional Color');
gui.add(light2, 'intensity', 0, 2, 0.01).name('DirectionalLight Intensity');
// makeXYZGUI(gui, light2.position, 'Light source', updateLight.bind(this, false, light2, helper2));
makeXYZGUI(gui, light2.target.position, 'Light target', updateLight.bind(this, true, light2, helper2));

updateLight.call(this, false, light, helper2);


// snow effect
const geometry = new THREE.BufferGeometry();
const particles = 100;
const radius = planeSize/2;
var positions = [];
var sizes = [];

for (var i = 0; i < particles; i++) {
  positions.push(((Math.random() * 2) - 1) * radius);
  positions.push((Math.random() * radius));
  positions.push(((Math.random() * 2) - 1) * radius); 
  sizes.push(0.5);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
// geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
var particleMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF });
var particleSystem = new THREE.Points(geometry, particleMaterial);
// scene.add(particleSystem);


renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xb2bec3);
renderer.setPixelRatio(window.devicePixelRatio);
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.autoRotate = true;
// controls.enableZoom = false;
// controls.maxPolarAngle = Math.PI/2.5;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
animate();


function makeXYZGUI(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, 'x', -50, 50).onChange(onChangeFn);
  folder.add(vector3, 'y', -50, 50).onChange(onChangeFn);
  folder.add(vector3, 'z', -50, 50).onChange(onChangeFn);
  folder.open();
}

function updateLight(target, light, helper) {
  if (target === true) {
    light.target.updateMatrixWorld();
  }  
  helper.update();
}

function animate() {
  // var positions = geometry.attributes.position.array;
  // let index;
  // let speed = 1.5;
  // for (var i = 0; i < particles; i++) {    
  //   index = (3 * i) + 1;
  //   if (positions[index] < 0) {
  //     positions[index] = 100;  
  //   }
  //   positions[index] -= speed;
  // }


  controls.update();
  geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});