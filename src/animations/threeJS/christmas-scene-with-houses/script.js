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

var giftColorArray = ['#FFC312', '#f78fb3', '#c44569', '#D980FA', '#6F1E51', '#273c75', '#82ccdd', '#78e08f', '#ff4d4d', '#ff793f', '#006266']

var houseColorArray = ['#b33939', '#273c75', '#84817a'];

var camera, scene, renderer;
var controls;

camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(20, 35, 120);

scene = new THREE.Scene();
const gui = new GUI();

// ground plane
const planeSize = 300;
const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  color: '#fff',
  side: THREE.DoubleSide,
});

const plate = new THREE.Mesh(planeGeo, planeMat);
plate.rotation.x = Math.PI * -0.5;
plate.position.set(0, 0, 0);
plate.receiveShadow = true;
scene.add(plate);

let aboveGroundOffset = 0.1;
let houseCount = 0;
for (let i = -1; i <= 0; i++) {
  for (let j = -1; j <= 0; j++) {
    // houses
    houseCount++;
    const size = 18;
    const wallColor = houseColorArray[getRandomNumbersBetween(0, houseColorArray.length - 1)];
    const walls = new THREE.Mesh(
      new THREE.BoxBufferGeometry(size, size / 1.3, size * 2),
      new THREE.MeshPhongMaterial({ color: wallColor, shininess: 200 })
    );
    walls.position.set(size * 2, size / (2 * 1.3) + aboveGroundOffset, 0);

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
      new THREE.MeshPhongMaterial({ color: wallColor, shininess: 200 })
    );
    firstFloor.position.set(size * 2, size / 1.3, -size);
    scene.add(firstFloor);


    const roofLeft = new THREE.Mesh(
      new THREE.BoxBufferGeometry(triangeleSize + 4, size * 2.2, 2),
      new THREE.MeshPhongMaterial({ color: '#FFFFFF', shininess: 200 })
    );
    roofLeft.position.set(30.7, 19.2, 0);
    roofLeft.rotation.x = Math.PI / 2;
    roofLeft.rotation.y = 0.75;


    const roofRight = new THREE.Mesh(
      new THREE.BoxBufferGeometry(triangeleSize + 6, size * 2.2, 2),
      new THREE.MeshPhongMaterial({ color: '#FFFFFF', shininess: 200 })
    );
    roofRight.position.set(40.6, 19.6, 0);
    roofRight.rotation.x = Math.PI / 2;
    roofRight.rotation.y = 2.36

    const door = new THREE.Mesh(
      new THREE.BoxBufferGeometry(size / 3, size / 2.5, size / 3),
      new THREE.MeshBasicMaterial({ color: '#ffda79' })
    );
    door.position.set(36.5, 3.6 + aboveGroundOffset, 15.6);

    const houseSection = new THREE.Group();
    houseSection.add(roofLeft);
    houseSection.add(roofRight);
    houseSection.add(door);
    houseSection.add(walls);
    houseSection.add(firstFloor);

    const bigPart = houseSection.clone();
    bigPart.rotation.set(0, -Math.PI / 2, 0);
    bigPart.scale.set(1.2, 1.2, 1.2);
    // bigPart.position.set(36.5, 0, -59.2);
    bigPart.position.set(100 * i + 100, 0, 80 * j - 50);

    const section1 = houseSection.clone();

    section1.rotation.set(0, Math.PI / 2, 0);
    section1.scale.set(0.7, 0.7, 1);
    section1.position.set(35.9, 0, 25.3);

    if ([1,4].includes(houseCount)) {
      const section2 = houseSection.clone();
      section2.rotation.set(0, Math.PI / 2, 0);
      section2.scale.set(0.6, 0.6, 0.6);
      section2.position.set(43.5, 0, 11.2);
      
      section1.scale.set(0.6, 0.6, 0.6);
      section1.position.set(43.5, 0, 29.2);
      bigPart.add(section2);
      
      // gui.add(section2.position, 'x', -70, 70, 0.1).name(`x`);
      // gui.add(section2.position, 'y', -70, 70, 0.1).name(`y`);
      // gui.add(section2.position, 'z', -70, 70, 0.1).name(`z`);
      // gui.add(section2.rotation, 'x', -Math.PI, Math.PI, 0.01).name(`rx`);
      // gui.add(section2.rotation, 'y', -Math.PI, Math.PI, 0.01).name(`ry`);
      // gui.add(section2.rotation, 'z', -Math.PI, Math.PI, 0.01).name(`rz`);        
      // gui.add(section2.scale, 'x', 0, 5, 0.01).name(`sx`);
      // gui.add(section2.scale, 'y', 0, 5, 0.01).name(`sy`);
      // gui.add(section2.scale, 'z', 0, 5, 0.01).name(`sz`);
    }

    bigPart.add(section1);    
    
    
    // christmas tree near house
    {
      const radius = 10;
      const treeLeavesColor = '#218c74'
      const treeTop = new THREE.Mesh(
        new THREE.ConeBufferGeometry(radius, 30, 4),
        new THREE.MeshPhongMaterial({ color: treeLeavesColor, shininess: 200 })
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
      trunk.position.set(0, side + 1 + aboveGroundOffset, 0);

      const tree = new THREE.Group();
      tree.add(trunk);
      tree.add(treeTop);
      tree.scale.set(0.8, 0.8, 0.8);
      tree.position.set(60.7, 0, -22.3);
      bigPart.add(tree);
    }

    // gifts near christmas tree
    for (let k = -1; k <= 5; k++) {
      const size = 3;
      const gift = new THREE.Mesh(
        new THREE.BoxBufferGeometry(size, size, size),
        new THREE.MeshPhongMaterial({
          color: giftColorArray[getRandomNumbersBetween(0, giftColorArray.length - 1)],
          shininess: 200
        })
      );
      gift.position.set(
        70 + (getRandomNumbersBetween(-2, 1) * (size + 1)), 
        size/2 + (aboveGroundOffset),
        -15 + (getRandomNumbersBetween(-2, 1) * (size + 1))
      );    
      bigPart.add(gift);
      
    }



    scene.add(bigPart);
  }
  
}


{
  // roads
  const size = 35;
  const roadColor = '#535c68'; // #7f8c8d
  const road1 = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(planeSize, size),
    new THREE.MeshPhongMaterial({ color: roadColor, shininess: 100, side: THREE.DoubleSide })
  );
  road1.position.set(0, 1, 80);
  road1.rotation.set(Math.PI/2, 0, 0);  
  scene.add(road1);

  const road2 = road1.clone();
  road2.position.set(-80, 1, 0);
  road2.rotation.set(Math.PI / 2, 0, Math.PI / 2);  
  scene.add(road2);

  const lineMarkColor = '#e1b12c';
  const roadLine1 = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, planeSize),
    new THREE.MeshPhongMaterial({ color: lineMarkColor, shininess: 200, side: THREE.DoubleSide })
  )
  roadLine1.position.set(-0.2, 1.1, 80);
  roadLine1.rotation.set(Math.PI/2, 0, Math.PI/2);

  const roadLine2 = roadLine1.clone();
  roadLine2.rotation.set(Math.PI/2, 0, 0);
  roadLine2.position.set(-80.3, 1.1, -0.2);  
  scene.add(roadLine1);
  scene.add(roadLine2);
}

// add hemisphere light
const skyColor = '#ecf0f1';
const groundColor = '#ecf0f1';
const light = new THREE.HemisphereLight(skyColor, groundColor, 1);
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
// gui.add(light2, 'intensity', 0, 2, 0.01).name('DirectionalLight Intensity');
// makeXYZGUI(gui, light2.position, 'Light source', updateLight.bind(this, false, light2, helper2));
// makeXYZGUI(gui, light2.target.position, 'Light target', updateLight.bind(this, true, light2, helper2));

// updateLight.call(this, false, light, helper2);


// snow effect
const geometry = new THREE.BufferGeometry();
const particles = 200;
const radius = planeSize/2;
var positions = [];
var sizes = [];

for (var i = 0; i < particles; i++) {
  positions.push(((Math.random() * 2) - 1) * radius);
  positions.push((Math.random() * radius * 0.75));
  positions.push(((Math.random() * 2) - 1) * radius); 
  sizes.push(0.5);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
var particleMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF });
var particleSystem = new THREE.Points(geometry, particleMaterial);
scene.add(particleSystem);


renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor('#d9d9d9'); //b2bec3
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
  folder.add(vector3, 'x', -150, 150).onChange(onChangeFn);
  folder.add(vector3, 'y', -150, 150).onChange(onChangeFn);
  folder.add(vector3, 'z', -150, 150).onChange(onChangeFn);
  folder.open();
}

// function updateLight(target, light, helper) {
//   if (target === true) {
//     light.target.updateMatrixWorld();
//   }  
//   helper.update();
// }

function animate() {
  
  // Uncomment the below section to animate 
  // the snow particles

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