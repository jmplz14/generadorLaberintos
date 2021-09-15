import * as THREE from '/threejs/three.module.js';
import { OrbitControls } from "/threejs/OrbitControls.js";
let camera, scene, renderer;
const wallWidth = 5, wallLong = 30, wallHigh = 20;
const hallSize = 20;
const texture = new THREE.TextureLoader().load('/images/crate.gif');
let mesh;



function createWall(xPos, yPos, long, horizontal, zFighting) {
    var materialTextura = new THREE.MeshBasicMaterial({
        map: texture,
        polygonOffset: true,
        polygonOffsetFactor: zFighting,
        polygonOffsetUnits: -4.0
    });
    var geometry = new THREE.BoxGeometry(wallWidth, long, wallHigh);
    var mesh = new THREE.Mesh(geometry, materialTextura);

    scene.add(mesh);
    mesh.position.set(xPos, yPos, 0);

    if (horizontal) {
        mesh.rotation.z = Math.PI / 2, 0;
    }

    return mesh;

}
function readCSV() {
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

    if (regex.test($("#uploadBtn").val().toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var labyrinth = {
                size: "",
                wallsDeleted: []
            };
            var reader = new FileReader();
            reader.onload = function (e) {
                var rows = e.target.result.split("\n");

                labyrinth.size = rows[0];
                for (var i = 1; i < rows.length; i++) {

                    var cells = rows[i].split(",");
                    if (cells.length > 1) {
                        labyrinth.wallsDeleted.push(cells);
                    }
                }

                createLabyrinth(labyrinth);
            }
            reader.readAsText($("#uploadBtn")[0].files[0]);


        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}

function createLabyrinth(labyrinth) {

    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    createPerimeter(labyrinth.size);
    createInteriorWalls(labyrinth);
}

function createInteriorWalls(labyrinth) {
    /*var perimeterLong = wallLong * labyrinth.size;
    var pos = (((perimeterLong) / 2) - wallWidth / 2);*/
    let horizontalWalls = new Array(labyrinth.size)
    let verticalWalls = new Array(labyrinth.size - 1)

    //creamos las matrices para los muros verticales y horizontales
    for (var i = 0; i < labyrinth.size; i++) {

        verticalWalls[i] = new Array(labyrinth.size);
        for (var j = 0; j < labyrinth.size - 1; j++) {
            verticalWalls[i][j] = true;
        }
    }


    for (var i = 0; i < labyrinth.size - 1; i++) {

        horizontalWalls[i] = new Array(labyrinth.size - 1);
        for (var j = 0; j < labyrinth.size; j++) {
            horizontalWalls[i][j] = true;
        }
    }
    //eliminamos los muros que no forman parte del laverinto
    for (var i = 0; i < labyrinth.wallsDeleted.length; i++) {
        let currentWall = labyrinth.wallsDeleted[i];
        let x = parseInt(currentWall[0]);
        let y = parseInt(currentWall[1]);
        let wall = parseInt(currentWall[2]);

        if (wall === 1 || wall === 3) {
            if (wall === 1) {
                horizontalWalls[x - 1][y] = false;
            } else {
                horizontalWalls[x][y] = false;
            }

        } else {
            if (wall === 2) {
                verticalWalls[x][y] = false;
            } else {

                verticalWalls[x][y - 1] = false;
            }
        }
    }

    printInteriorWalls(labyrinth.size, verticalWalls, horizontalWalls);


}

function printInteriorWalls(sizeLabyrinth, verticalWalls, horizontalWalls) {

    var pos = (wallLong * sizeLabyrinth) / 2 + wallWidth / 2;
    //let materialSphere = new THREE.MeshBasicMaterial({ color: 0xffff });



    let YHorizontal = pos - wallWidth / 2 - wallLong;

    for (var i = 0; i < sizeLabyrinth - 1; i++) {
        let XHorizontal = -pos + wallLong / 2 + wallWidth / 2;

        for (var j = 0; j < sizeLabyrinth; j++) {
            let zIndex;
            if (j % 2 === 0) {
                zIndex = 0;
            } else {
                zIndex = -0.5;
            }

            if (horizontalWalls[i][j]) {

                createWall(XHorizontal, YHorizontal, wallLong + wallWidth, true, zIndex);

            }
            XHorizontal += wallLong;

        }
        YHorizontal -= wallLong;

    }






    //materialSphere = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    let YVertical = pos - wallLong / 2 - wallWidth / 2;
    for (var i = 0; i < sizeLabyrinth; i++) {

        let XVertical = -pos + wallWidth / 2 + wallLong;

        let zIndex;
        if (i % 2 === 0) {
            zIndex = -1;
        } else {
            zIndex = -1.5;
        }
        for (var j = 0; j < sizeLabyrinth - 1; j++) {
            if (verticalWalls[i][j]) {

                createWall(XVertical, YVertical, wallLong + wallWidth, false, zIndex);

            }
            XVertical += wallLong
        }

        YVertical -= wallLong;

    }
}

function loadLabyrinth() {
    var filePath = $('#uploaded_file').val();
    if (filePath) {
        var startIndex = (filePath.indexOf('\\') >= 0 ? filePath.lastIndexOf('\\') : filePath.lastIndexOf('/'));
        var filename = filePath.substring(startIndex);
        var extension = filename.substring(".")

    }

}

function createPerimeter(sizeLabyrinth) {
    var perimeterLong = wallLong * sizeLabyrinth + 2 * wallWidth;

    var pos = (wallLong * sizeLabyrinth) / 2 + wallWidth / 2;

    /*const geometrySphere = new THREE.SphereGeometry(10, 32, 16);
    const materialSphere = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.position.set(pos, -pos, 0)
    scene.add(sphere);*/

    //superior
    createWall(0, pos, perimeterLong, true, -2);

    //inferior
    createWall(0, -pos, perimeterLong, true, -2);

    //izquierda
    createWall(-pos, 0, perimeterLong, false, -3);

    //derecha
    createWall(pos, 0, perimeterLong, false, -3);
}
document.getElementById("uploadFile").value = "";
init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);

    /*const geometrySphere = new THREE.SphereGeometry(15, 32, 16);
    const materialSphere = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.position.set(0, 0, 0)
    scene.add(sphere);*/


    /*const geometry = new THREE.BoxGeometry(wallWidth, wallLong, wallHigh);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    let posicion=0;

    for (var i = 0; i < 9; i++) {
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.position.set(posicion, 0, 0);
        mesh.rotation.z = Math.PI / 2,0;
        posicion += wallLong;
    }*/



    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var controls = new OrbitControls(camera, renderer.domElement);

    //

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    /*mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;*/

    renderer.render(scene, camera);

}

$("#buttonLoadLabyrinth").click(function () {
    readCSV();
});
document.getElementById("uploadBtn").onchange = function () {
    document.getElementById("uploadFile").value = this.value.replace("C:\\fakepath\\", "");
};