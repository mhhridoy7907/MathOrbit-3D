
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a14);

// CAMERA
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
camera.position.set(10,8,12);

// RENDERER
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// CONTROLS
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// GRID + AXES
scene.add(new THREE.GridHelper(30,30));
scene.add(new THREE.AxesHelper(10));

// LIGHT
scene.add(new THREE.AmbientLight(0xffffff,0.7));
const light = new THREE.PointLight(0xffffff,1);
light.position.set(10,15,10);
scene.add(light);

// ================= VARIABLES =================
let sinLine, cosLine;
let textMesh;


const loader = new THREE.FontLoader();

loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font){

    const geo = new THREE.TextGeometry("MH HRIDOY", {
        font: font,
        size: 0.8,
        height: 0.25
    });

    geo.computeVertexNormals();

const mat = new THREE.MeshStandardMaterial({
    color: 0x0051ff,
    metalness: 0.0,
    roughness: 2.0
});

    textMesh = new THREE.Mesh(geo, mat);

 
    textMesh.position.set(0,9,-0.1);

    scene.add(textMesh);
});

// ================= DRAW GRAPH =================
function draw(){

    if(sinLine) scene.remove(sinLine);
    if(cosLine) scene.remove(cosLine);

    const a1 = +document.getElementById("a1").value;
    const b1 = +document.getElementById("b1").value;
    const a2 = +document.getElementById("a2").value;
    const b2 = +document.getElementById("b2").value;

    const ox = +document.getElementById("ox").value;
    const oy = +document.getElementById("oy").value;
    const oz = +document.getElementById("oz").value;

    const sinPoints = [];
    const cosPoints = [];

    for(let x=-10; x<=10; x+=0.1){

        sinPoints.push(new THREE.Vector3(
            x + ox,
            a1*Math.sin(b1*x) + oy,
            oz
        ));

        cosPoints.push(new THREE.Vector3(
            x + ox,
            a2*Math.cos(b2*x) + oy,
            oz
        ));
    }

    sinLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(sinPoints),
        new THREE.LineBasicMaterial({color:0xff4444})
    );

    cosLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(cosPoints),
        new THREE.LineBasicMaterial({color:0x44ff88})
    );

    scene.add(sinLine);
    scene.add(cosLine);

   
}


function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}
animate();

// RESIZE
window.addEventListener("resize", ()=>{
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});

