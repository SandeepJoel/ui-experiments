import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
import { getRandomNumbersBetween } from '../../../utilities/js-helpers.js';

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
THREE.Cache.enabled = true;
camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(50, 25, 110);

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

{
  // igloo

  let parameters = {
    radius: 25,
    widthSegments: 10,
    heightSegments: 8,
    phiLength: 6.3,
    thetaLength: 1.6,
  }

  let iglooDome = new THREE.Mesh(
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

  const door = new THREE.Mesh(
    new THREE.CylinderBufferGeometry(10, 10, 15, 8, 1, false, 0, 6.3),
    new THREE.MeshPhongMaterial({ color: '#ccc' })
  );

  const doorInside = new THREE.Mesh(
    new THREE.CylinderBufferGeometry(8, 8, 15, 8, 1, false, 0, 6.3),
    new THREE.MeshPhongMaterial({ color: '#000' })
  );

  door.position.set(0, 0, 24);
  door.rotation.x = Math.PI/2;
  door.scale.x = 0.8

  doorInside.position.set(0, 0, 24.1);
  doorInside.rotation.x = Math.PI / 2;
  doorInside.scale.x = 0.8  
  
  const igloo = new THREE.Group();  
  igloo.add(iglooDome);
  igloo.add(door);
  igloo.add(doorInside);
  scene.add(igloo);
  igloo.scale.set(0.8, 0.8, 0.8);
  igloo.rotation.y = Math.PI/4;
  igloo.position.set(-50, 0, 55);
}

// forest
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
  
  let spaceLowerLimit = 25;
  let spaceUpperLimit = 30;
  for (let i = -4; i <= 4; i++) {
    for (let j = -4; j <= 0; j++) {      
      let newTree = tree.clone();
      newTree.position.set(
        i * getRandomNumbersBetween(spaceLowerLimit, spaceUpperLimit),
        0,
        j * getRandomNumbersBetween(spaceLowerLimit, spaceUpperLimit)
        );
      newTree.scale.y = (getRandomNumbersBetween(0, 1) ? 1.3: 1)
      scene.add(newTree);
    }
  }
}

{
  const snowBall = new THREE.Mesh(
    new THREE.OctahedronBufferGeometry(10, 2),
    new THREE.MeshPhongMaterial({ color: '#ccc', shininess: 1000, flatShading: true })
  );
  snowBall.position.set(-85, 7, 60);
  snowBall.castShadow = true;
  snowBall.receiveShadow = true;
  scene.add(snowBall);
}

{
  let loader = new THREE.FontLoader();
  loader.load('../../../assets/fonts/El Messiri Medium_Regular.json', function (font) {    
    let wishText1 = new THREE.Mesh(
      new THREE.TextBufferGeometry('Happy', {
        font: font,
        size: 6,
        height: 4,
        // same extrusion settings can be applied here
      }),
      new THREE.MeshPhongMaterial({ color: '#CCCCCC' })
    );
    wishText1.position.set(24.1, 5, 44.1);
    wishText1.rotation.y = -0.43;    
    scene.add(wishText1);

    let wishText2 = new THREE.Mesh(
      new THREE.TextBufferGeometry('NewYear', {
        font: font,
        size: 7,
        height: 4,
      }),
      new THREE.MeshPhongMaterial({ color: '#CCCCCC' })
    );
    wishText2.position.set(25.3, 5, 66.3);
    wishText2.rotation.y = -0.43;
    scene.add(wishText2);
  });
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
// const helper2 = new THREE.DirectionalLightHelper(light2, 5);
// scene.add(helper2);
// gui.addColor(new ColorGUIHelper(light2, 'color'), 'value').name('Directional Color');
gui.add(light2, 'intensity', 0, 2, 0.01).name('DirectionalLight Intensity');
// makeXYZGUI(gui, light2.position, 'Light source', updateLight.bind(this, false, light2, helper2));
// makeXYZGUI(gui, light2.target.position, 'Light target', updateLight.bind(this, true, light2, helper2));

// updateLight.call(this, false, light, helper2);


// snow effect
const geometry = new THREE.BufferGeometry();
const particles = 250;
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
controls.autoRotateSpeed = 1;
// controls.enableZoom = false;
controls.maxPolarAngle = Math.PI/2.25;
let rotationOffset = 0.2
// controls.maxAzimuthAngle = (Math.PI/2) - rotationOffset;
// controls.minAzimuthAngle = -(Math.PI/2) + rotationOffset;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
animate();


function makeXYZGUI(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, 'x', -50, 50).onChange(onChangeFn);
  folder.add(vector3, 'y', -50, 50).onChange(onChangeFn);
  folder.add(vector3, 'z', -50, 50).onChange(onChangeFn);
  // folder.open();
}

function updateLight(target, light, helper) {
  if (target === true) {
    light.target.updateMatrixWorld();
  }  
  helper.update();
}

var angle = 0;
var rad = 150;
var rAngle = 0;

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

window.addEventListener('mousedown', function () {
  document.querySelector('body').classList.add('active');
});

window.addEventListener('mouseup', function () {  
  document.querySelector('body').classList.remove('active');
});

// Instantiate a exporter
var exporter = new THREE.GLTFExporter();

// Parse the input and generate the glTF output
// exporter.parse(scene, function (gltf) {
//   console.log(gltf);  
// });