var camera, scene, renderer;
var controls;

// camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 100);
// camera.position.z = 50;

camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
camera.position.set(-900, -200, -900);
scene = new THREE.Scene();


let materialArray = [];
let texture_ft = new THREE.TextureLoader().load('./mud/mudskipper_ft.png');
let texture_bk = new THREE.TextureLoader().load('./mud/mudskipper_bk.png');
let texture_up = new THREE.TextureLoader().load('./mud/mudskipper_up.png');
let texture_dn = new THREE.TextureLoader().load('./mud/mudskipper_dn.png');
let texture_rt = new THREE.TextureLoader().load('./mud/mudskipper_rt.png');
let texture_lf = new THREE.TextureLoader().load('./mud/mudskipper_lf.png');

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;

let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);




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

  // box.rotation.x += 0.005;
  // box.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});