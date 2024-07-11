import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

// Setup
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create stars
let starGeometry = new THREE.BufferGeometry();
let starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
let starVertices = [];
for (let i = 0; i < 10000; i++) {
    let x = (Math.random() - 0.5) * 2000;
    let y = (Math.random() - 0.5) * 2000;
    let z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
let stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Animation
camera.position.z = 1;
let speed = 0.01;
let zoomIn = true;
function animate() {
    requestAnimationFrame(animate);
    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.0005;

    if (zoomIn) {
        camera.position.z -= speed;
        speed += 0.0001;
        if (camera.position.z <= -200) {
            zoomIn = false;
            document.getElementById('portfolio-container').style.display = 'block';
        }
    }

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
