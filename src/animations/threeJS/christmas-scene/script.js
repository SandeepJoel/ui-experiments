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

let parameters = {
  radius: 25,
  widthSegments: 10,
  heightSegments: 8,
  phiLength: 6.3,
  thetaLength: 1.6,
}
{
  // igloo
  let igloo = new THREE.Mesh(
    new THREE.SphereBufferGeometry(
      parameters.radius,
      parameters.widthSegments,
      parameters.heightSegments,
      0,
      parameters.phiLength,
      0,
      parameters.thetaLength
    ),
    new THREE.MeshPhongMaterial({ color: '#CCC', shininess: 1000, flatShading: true })
  );
  igloo.position.set(30, 1, 0)
  scene.add(igloo);

  const door = new THREE.Mesh(
    new THREE.CylinderBufferGeometry(10, 10, 15, 8, 1, false, 0, 6.3),
    new THREE.MeshPhongMaterial({ color: '#ccc' })
  );

  const doorInside = new THREE.Mesh(
    new THREE.CylinderBufferGeometry(8, 8, 15, 8, 1, false, 0, 6.3),
    new THREE.MeshPhongMaterial({ color: '#000' })
  );

  door.position.set(30, 1, 24);
  door.rotation.x = Math.PI/2;
  door.scale.x = 0.8
  scene.add(door);  

  doorInside.position.set(30, 1, 24.1);
  doorInside.rotation.x = Math.PI / 2;
  doorInside.scale.x = 0.8
  scene.add(doorInside);
  
  gui.add(doorInside.position, 'x', -50, 50, 0.5).name(`x`);
  gui.add(doorInside.position, 'y', -50, 50, 0.5).name(`y`);
  gui.add(doorInside.position, 'z', -50, 50, 0.5).name(`z`);
  gui.add(doorInside.rotation, 'x', 0, Math.PI, 0.01).name(`rx`);
  gui.add(doorInside.rotation, 'y', 0, Math.PI, 0.01).name(`ry`);
  gui.add(doorInside.rotation, 'z', 0, Math.PI, 0.01).name(`rz`);
  gui.add(doorInside.scale, 'x', 0, 5, 0.1).name(`sx`);
  gui.add(doorInside.scale, 'y', 0, 5, 0.1).name(`sy`);
  gui.add(doorInside.scale, 'z', 0, 5, 0.1).name(`sz`);  
}
// house
// {
//   const size = 18;
//   const walls = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(size, size, size *), 
//     new THREE.MeshPhongMaterial({ color: '#b2bec3', shininess: 10000 })
//   );
//   walls.position.set(size * 2, size / 2, 0);
//   walls.castShadow = true;
//   walls.receiveShadow = true;

//   const roofSize = size - 3;  
//   const roof = new THREE.Mesh(
//     new THREE.ConeBufferGeometry(roofSize, roofSize, 4),
//     new THREE.MeshPhongMaterial({ color: '#636e72', shininess: 10000 })
//   );
//   roof.position.set(35.5, 25.5, 0);
//   roof.rotation.y = 0.78;
//   roof.castShadow = true;
//   roof.receiveShadow = true;

//   const door = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(size / 3, size / 1.5, size / 3),
//     new THREE.MeshBasicMaterial({ color: '#000' })
//   );
//   door.position.set(36.5, 5, 6.01);

//   const house = new THREE.Group();
//   house.add(door);
//   house.add(walls);
//   house.add(roof);
//   scene.add(house);
//   // gui.add(house.position, 'x', -50, 50, 0.5).name(`x`);
//   // gui.add(house.position, 'y', -50, 50, 0.5).name(`y`);
//   // gui.add(house.position, 'z', -50, 50, 0.5).name(`z`);
//   // gui.add(house.rotation, 'x', 0, Math.PI, 0.01).name(`rx`);
//   // gui.add(house.rotation, 'y', 0, Math.PI, 0.01).name(`ry`);
//   // gui.add(house.rotation, 'z', 0, Math.PI, 0.01).name(`rz`);
//   // gui.add(house.scale, 'x', 0, 5, 0.1).name(`sx`);
//   // gui.add(house.scale, 'y', 0, 5, 0.1).name(`sy`);
//   // gui.add(house.scale, 'z', 0, 5, 0.1).name(`sz`);  
// } 

// tree

{
  const radius = 10;
  const treeTop = new THREE.Mesh(
    new THREE.ConeBufferGeometry(radius, 30, 4),
    new THREE.MeshPhongMaterial({ color: '#006266', shininess: 1000 })
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
  
  scene.add(tree);
  // gui.addColor(new ColorGUIHelper(sphereMat, 'color'), 'value').name(`SphereColor`);  
}

{
    
  const snowBall = new THREE.Mesh(
    new THREE.OctahedronBufferGeometry(15, 2),
    new THREE.MeshPhongMaterial({ color: '#ccc', shininess: 1000, flatShading: true })
  );
  snowBall.position.set(-30, 13, 10);
  snowBall.castShadow = true;
  snowBall.receiveShadow = true;
  scene.add(snowBall);
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
makeXYZGUI(gui, light2.position, 'Light source', updateLight.bind(this, false, light2, helper2));
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
scene.add(particleSystem);


renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xb2bec3);
renderer.setPixelRatio(window.devicePixelRatio);
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.enableZoom = false;
controls.maxPolarAngle = Math.PI/2.5;

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

// Instantiate a exporter
var exporter = new THREE.GLTFExporter();

// Parse the input and generate the glTF output
// exporter.parse(scene, function (gltf) {
//   console.log(gltf);  
// });