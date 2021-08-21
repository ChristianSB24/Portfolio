var table = [
	"jQuery",
	"Django",
	"NodeJS",
    "JavaScript",
	"ReactJS",
	"Bootstrap",
	"Python",
    "PostgreSQL",
    "HTML",
    "",
	"CSS",
	"Redux",
	"VSCode",
	"Git",
	"GitHub",
	"Heroku",
	"MongoDB",
];

var camera, scene, renderer;
var controls;
var controlsOrbit

var objects = [];
var targets = {sphere: []};

flag = false
    document.getElementById("about").addEventListener("mouseover", function(event){
            if (flag === false){
            init();
            animate()
            flag = true
        }
    })

function init() {
    camera = new THREE.PerspectiveCamera(40, (window.innerWidth / window.innerHeight), 1, 1000);
    camera.position.z = 2500;

	scene = new THREE.Scene();

	// 

	for ( var i = 0; i < table.length; i += 1 ) {

		var element = document.createElement( 'div' );
		element.className = 'element';

		var symbol = document.createElement( 'div' );
		symbol.className = 'skill';
		symbol.textContent = table[ i ];
		element.appendChild( symbol );

		var object = new THREE.CSS3DObject( element );
		object.position.x = Math.random() * 4000 - 2000;
		object.position.y = Math.random() * 4000 - 2000;
		object.position.z = Math.random() * 4000 - 2000;
		scene.add( object );

        
		objects.push( object );

		//

	}

	// sphere

	var vector = new THREE.Vector3().normalize();


	for ( var i = 0, l = objects.length; i < l; i ++ ) {

		var phi = Math.acos( -1 + ( 2 * i ) / l );
		var theta = Math.sqrt( l * Math.PI ) * phi;

		var object = new THREE.Object3D();

		object.position.x = 800 * Math.cos( theta ) * Math.sin( phi );
		object.position.y = 800 * (Math.sin( theta ) * Math.sin( phi ));
		object.position.z = 800 * Math.cos( phi );

		vector.copy( object.position ).multiplyScalar( 2 );

		object.lookAt( vector );

		targets.sphere.push( object );

	}

	//
	container = document.getElementById('container');
	renderer = new THREE.CSS3DRenderer();
	renderer.setSize( $(container).width(), $(container).height());
	renderer.domElement.style.position = 'absolute';
	document.getElementById( 'container' ).appendChild( renderer.domElement );

	//

    // Orbit Controls
    controlsOrbit = new OrbitControls( camera, renderer.domElement );
    controlsOrbit.enableZoom = false;
    controlsOrbit.autoRotate = true;
    controlsOrbit.autoRotateSpeed = 3.0;
    controlsOrbit.enableDamping = true;
    controlsOrbit.minPolarAngle = ((Math.PI) /2);
    controlsOrbit.maxPolarAngle = ((Math.PI) /2)
    controlsOrbit.addEventListener( 'change', render );
    controlsOrbit.update();



	transform( targets.sphere, 5000 );
	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function transform( targets, duration ) {

	TWEEN.removeAll();

	for ( var i = 0; i < objects.length; i ++ ) {

		var object = objects[ i ];
		var target = targets[ i ];

		new TWEEN.Tween( object.position )
			.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();

		new TWEEN.Tween( object.rotation )
			.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();
	}

	new TWEEN.Tween( this )
		.to( {}, duration * 2 )
		.onUpdate( render )
		.start();

}

function onWindowResize() {
	const canvas = renderer.domElement;
	const width = $(container).width();
	const height = $(container).height();
	if (canvas.width !== width ||canvas.height !== height) {
	  // you must pass false here or three.js sadly fights the browser
	  renderer.setSize(width, height, false);
	  camera.aspect = width / height;
	  camera.updateProjectionMatrix();
  
	  // set render target sizes here
	}
  }

function animate() {

	requestAnimationFrame( animate );

	TWEEN.update();

    controlsOrbit.update();

}

function render() {

	renderer.render( scene, camera );

}