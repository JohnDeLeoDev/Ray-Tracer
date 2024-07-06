var canvas
var gl
var program
var eye = vec3(0.0, 0.0, 1.0)
var aspectRatio = 512 / 512
var maxDepth = 5
var maxSpheres = 10
var maxPlanes = 5
var sceneChoice = 6
var animating = true
var animationSpeed = 0.005
var t = 0.0

var scenes = [
    {
        // Scene 1
        spheres: [
            {
                center: vec3(-0.5, -0.5, -3.5),
                radius: 0.5,
                material: {
                    ambient: vec3(0.2, 0.0, 0.0),
                    diffuse: vec3(1.0, 0.0, 0.0),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.2,
                },
            },
            {
                center: vec3(0.5, -0.5, -4.0),
                radius: 0.5,
                material: {
                    ambient: vec3(0.0, 0.2, 0.0),
                    diffuse: vec3(0.0, 1.0, 0.0),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.2,
                },
            },
        ],
        planes: [
            {
                point: vec3(0.0, -1.0, 0.0),
                normal: vec3(0.0, 1.0, 0.0),
                material: {
                    ambient: vec3(0.1, 0.1, 0.5),
                    diffuse: vec3(0.2, 0.2, 0.7),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 1.0,
                },
            },
        ],
        lightPosition: vec3(-5.0, 5.0, 0.0),
    },
    {
        // Scene 2
        spheres: [
            {
                center: vec3(-1.0, -1.0, -3.0),
                radius: 0.5,
                material: {
                    ambient: vec3(0.1, 0.0, 0.0),
                    diffuse: vec3(0.8, 0.0, 0.0),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.3,
                },
            },
            {
                center: vec3(1.0, 1.0, -3.0),
                radius: 0.5,
                material: {
                    ambient: vec3(0.0, 0.1, 0.0),
                    diffuse: vec3(0.0, 0.8, 0.0),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.3,
                },
            },
            {
                center: vec3(1.0, -1.0, -3.0),
                radius: 0.5,
                material: {
                    ambient: vec3(0.0, 0.0, 0.1),
                    diffuse: vec3(0.0, 0.0, 0.8),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.3,
                },
            },
            {
                center: vec3(-1.0, 1.0, -3.0),
                radius: 0.5,
                material: {
                    ambient: vec3(0.1, 0.1, 0.0),
                    diffuse: vec3(0.8, 0.8, 0.0),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.3,
                },
            },
        ],
        planes: [],
        lightPosition: vec3(0.0, 0.0, -1.0),
    },
    {
        // Scene 3
        spheres: [
            {
                center: vec3(-0.5, -0.75, -1.5),
                radius: 0.25,
                material: {
                    ambient: vec3(0.0, 0.0, 0.0),
                    diffuse: vec3(0.1, 0.1, 0.1),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 1.0,
                },
            },
            {
                center: vec3(0.5, -0.75, -1.5),
                radius: 0.25,
                material: {
                    ambient: vec3(0.0, 0.5, 0.0),
                    diffuse: vec3(0.0, 0.5, 0.0),
                    specular: vec3(0.5, 0.5, 0.5),
                    shininess: 50.0,
                    reflectivity: 0.01,
                },
            },
        ],
        planes: [
            {
                // pink top
                point: vec3(0.0, 1.0, -5.0),
                normal: vec3(0.0, -1.0, 0.0),
                material: {
                    ambient: vec3(0.8, 0.0, 0.8),
                    diffuse: vec3(0.8, 0.0, 0.8),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.1,
                },
            },
            {
                // green right
                point: vec3(1.0, 0.0, -5.0),
                normal: vec3(-1.0, 0.0, 0.0),
                material: {
                    ambient: vec3(0.0, 0.6, 0.0),
                    diffuse: vec3(0.0, 0.8, 0.0),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.01,
                },
            },
            {
                // light blue left
                point: vec3(-1.0, 0.0, 0.0),
                normal: vec3(1.0, 0.0, 0.0),
                material: {
                    ambient: vec3(0.0, 0.8, 0.5),
                    diffuse: vec3(0.0, 0.5, 1.0),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.01,
                },
            },
            {
                // blue bottom
                point: vec3(0.0, -1.0, 0.0),
                normal: vec3(0.0, 1.0, 0.0),
                material: {
                    ambient: vec3(0.0, 0.0, 0.5),
                    diffuse: vec3(0.0, 0.0, 1.0),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.01,
                },
            },
            {
                // yellow back
                point: vec3(0.0, 0.0, -3.0),
                normal: vec3(0.0, 0.0, 1.0),
                material: {
                    ambient: vec3(0.5, 0.5, 0.0),
                    diffuse: vec3(1.0, 1.0, 0.0),
                    specular: vec3(0.5, 0.5, 0.5),
                    shininess: 100.0,
                    reflectivity: 0.01,
                },
            },
        ],
        lightPosition: vec3(0.0, 0.0, -0.5),
    },
    {
        // Scene 4
        spheres: [
            {
                center: vec3(-1.0, -1.0, -3.0),
                radius: 0.5,
                material: {
                    ambient: vec3(0.1, 0.0, 0.0),
                    diffuse: vec3(0.8, 0.0, 0.0),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.3,
                },
            },
            {
                center: vec3(1.0, 1.0, -3.0),
                radius: 0.5,
                material: {
                    ambient: vec3(0.0, 0.1, 0.0),
                    diffuse: vec3(0.0, 0.8, 0.0),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.3,
                },
            },
            {
                center: vec3(1.0, -1.0, -3.0),
                radius: 0.5,
                material: {
                    ambient: vec3(0.0, 0.0, 0.1),
                    diffuse: vec3(0.0, 0.0, 0.8),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.3,
                },
            },
            {
                center: vec3(-1.0, 1.0, -3.0),
                radius: 0.5,
                material: {
                    ambient: vec3(0.1, 0.1, 0.0),
                    diffuse: vec3(0.8, 0.8, 0.0),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.3,
                },
            },
        ],
        planes: [],
        lightPosition: vec3(0.0, 0.0, -1.0),
    },
    {
        // Scene 5 - Earth and Moon
        spheres: [
            {
                center: vec3(0.0, 0.0, -3.0),
                radius: 0.5,
                material: {
                    ambient: vec3(0.0, 0.0, 0.1),
                    diffuse: vec3(0.1, 0.1, 0.8),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.1,
                },
            },
            {
                center: vec3(1.0, 0.0, -3.0),
                radius: 0.1,
                material: {
                    ambient: vec3(0.2, 0.2, 0.2),
                    diffuse: vec3(0.8, 0.8, 0.8),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.1,
                },
            },
        ],
        planes: [],
        lightPosition: vec3(10.0, 10.0, -2.0),
    },
    {
        // Scene 6 - Solar System
        spheres: [
            {
                // Mercury
                center: vec3(0.5, 0.0, -3.0),
                radius: 0.05,
                material: {
                    ambient: vec3(0.3, 0.25, 0.15),
                    diffuse: vec3(0.6, 0.5, 0.3),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.5,
                },
            },
            {
                // Venus
                center: vec3(0.7, 0.0, -3.0),
                radius: 0.1,
                material: {
                    ambient: vec3(0.45, 0.4, 0.2),
                    diffuse: vec3(0.9, 0.8, 0.4),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.5,
                },
            },
            {
                // Earth
                center: vec3(1.0, 0.0, -3.0),
                radius: 0.12,
                material: {
                    ambient: vec3(0.05, 0.05, 0.4),
                    diffuse: vec3(0.1, 0.1, 0.8),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.5,
                },
            },
            {
                // Moon
                center: vec3(1.15, 0.0, -3.0),
                radius: 0.03,
                material: {
                    ambient: vec3(0.2, 0.2, 0.2),
                    diffuse: vec3(0.5, 0.5, 0.5),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.5,
                },
            },
            {
                // Mars
                center: vec3(1.3, 0.0, -3.0),
                radius: 0.08,
                material: {
                    ambient: vec3(0.4, 0.05, 0.05),
                    diffuse: vec3(0.8, 0.1, 0.1),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.5,
                },
            },
            {
                // Jupiter
                center: vec3(1.6, 0.0, -3.0),
                radius: 0.15,
                material: {
                    ambient: vec3(0.25, 0.12, 0.05),
                    diffuse: vec3(0.5, 0.25, 0.01),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.5,
                },
            },
            {
                // Saturn
                center: vec3(2.0, 0.0, -3.0),
                radius: 0.12,
                material: {
                    ambient: vec3(0.4, 0.4, 0.1),
                    diffuse: vec3(0.8, 0.8, 0.2),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.5,
                },
            },
            {
                // Uranus
                center: vec3(2.3, 0.0, -3.0),
                radius: 0.1,
                material: {
                    ambient: vec3(0.1, 0.35, 0.4),
                    diffuse: vec3(0.2, 0.7, 0.8),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.5,
                },
            },
            {
                // Neptune
                center: vec3(2.6, 0.0, -3.0),
                radius: 0.1,
                material: {
                    ambient: vec3(0.05, 0.1, 0.45),
                    diffuse: vec3(0.1, 0.2, 0.9),
                    specular: vec3(1.0, 1.0, 1.0),
                    shininess: 100.0,
                    reflectivity: 0.5,
                },
            },
        ],
        planes: [
            {
                // back wall
                point: vec3(0.0, 0.0, -10.0),
                normal: vec3(0.0, 0.0, 1.0),
                material: {
                    ambient: vec3(0.0, 0.0, 0.0),
                    diffuse: vec3(0.0, 0.0, 0.0),
                    specular: vec3(2.0, 2.0, 0.0),
                    shininess: 100.0,
                    reflectivity: 0.0,
                },
            },
        ],
        lightPosition: vec3(0.0, 0.0, -7.8),
    },
]
window.onload = function init() {
    canvas = document.getElementById('gl-canvas')
    gl = WebGLUtils.setupWebGL(canvas)
    if (!gl) {
        alert("WebGL isn't available")
    }

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - 100

    aspectRatio = canvas.width / canvas.height

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    program = initShaders(gl, 'vertex-shader', 'fragment-shader')
    gl.useProgram(program)

    gl.uniform3fv(gl.getUniformLocation(program, 'eye'), flatten(eye))
    gl.uniform1f(gl.getUniformLocation(program, 'uAspect'), aspectRatio)
    gl.uniform1i(gl.getUniformLocation(program, 'uMaxDepth'), maxDepth)

    render()
}

function render() {
    if (animating) {
        t += animationSpeed
        /*
        for (var i = 0; i < scenes[3].spheres.length; i++) {
            scenes[3].spheres[i].center = vec3(
                Math.sin(t + 1.5 * i) * 1.5,
                Math.cos(t + 1.5 * i) * 1.5,
                -3.0
            )
        }
        */
        if (sceneChoice === 4) {
            scenes[3].lightPosition = vec3(
                Math.sin(t) * 5.0,
                Math.cos(t) * 5.0,
                -1.0
            )
        }

        if (sceneChoice === 5) {
            scenes[4].spheres[1].center = vec3(
                Math.sin(t + Math.PI) * 1.5,
                Math.cos(t + Math.PI) * 1.5,
                -3.0
            )
        }

        if (sceneChoice === 6) {
            for (var i = 0; i < scenes[5].spheres.length; i++) {
                let scale = 0.8
                let planetNum = i + 1
                var speed = 2.0 / planetNum

                // if moon, orbit earth
                if (i === 3) {
                    let earth = scenes[5].spheres[2]
                    scenes[5].spheres[i].center = vec3(
                        earth.center[0] +
                            Math.sin(t * 10 * speed) * 0.4 * scale,
                        earth.center[1] +
                            Math.cos(t * 10 * speed) * 0.4 * scale,
                        -8.0
                    )
                } else {
                    scenes[5].spheres[i].center = vec3(
                        Math.sin(t * speed + 2.5 * planetNum) *
                            scale *
                            planetNum,
                        Math.cos(t * speed + 2.5 * planetNum) *
                            scale *
                            planetNum,
                        -8.0
                    )
                }
            }
        }
    }

    clearWebGL()

    renderImage(sceneChoice)

    requestAnimationFrame(render)
}

function clearWebGL() {
    for (var i = 0; i < scenes.length; i++) {
        for (var j = 0; j < maxSpheres; j++) {
            gl.uniform3fv(
                gl.getUniformLocation(program, `uSpheres[${j}].center`),
                flatten(vec3(0.0, 0.0, 0.0))
            )
            gl.uniform1f(
                gl.getUniformLocation(program, `uSpheres[${j}].radius`),
                0.0
            )
            gl.uniform3fv(
                gl.getUniformLocation(
                    program,
                    `uSpheres[${j}].material.ambient`
                ),
                flatten(vec3(0.0, 0.0, 0.0))
            )
            gl.uniform3fv(
                gl.getUniformLocation(
                    program,
                    `uSpheres[${j}].material.diffuse`
                ),
                flatten(vec3(0.0, 0.0, 0.0))
            )
            gl.uniform3fv(
                gl.getUniformLocation(
                    program,
                    `uSpheres[${j}].material.specular`
                ),
                flatten(vec3(0.0, 0.0, 0.0))
            )
            gl.uniform1f(
                gl.getUniformLocation(
                    program,
                    `uSpheres[${j}].material.shininess`
                ),
                0.0
            )
            gl.uniform1f(
                gl.getUniformLocation(
                    program,
                    `uSpheres[${j}].material.reflectivity`
                ),
                0.0
            )
        }

        for (var j = 0; j < maxPlanes; j++) {
            gl.uniform3fv(
                gl.getUniformLocation(program, `uPlanes[${j}].point`),
                flatten(vec3(0.0, 0.0, 0.0))
            )
            gl.uniform3fv(
                gl.getUniformLocation(program, `uPlanes[${j}].normal`),
                flatten(vec3(0.0, 0.0, 0.0))
            )
            gl.uniform3fv(
                gl.getUniformLocation(
                    program,
                    `uPlanes[${j}].material.ambient`
                ),
                flatten(vec3(0.0, 0.0, 0.0))
            )
            gl.uniform3fv(
                gl.getUniformLocation(
                    program,
                    `uPlanes[${j}].material.diffuse`
                ),
                flatten(vec3(0.0, 0.0, 0.0))
            )
            gl.uniform3fv(
                gl.getUniformLocation(
                    program,
                    `uPlanes[${j}].material.specular`
                ),
                flatten(vec3(0.0, 0.0, 0.0))
            )
            gl.uniform1f(
                gl.getUniformLocation(
                    program,
                    `uPlanes[${j}].material.shininess`
                ),
                0.0
            )
            gl.uniform1f(
                gl.getUniformLocation(
                    program,
                    `uPlanes[${j}].material.reflectivity`
                ),
                0.0
            )
        }
    }
}

function handleSceneButton(sceneIndex) {
    sceneChoice = sceneIndex
    if (sceneIndex === 4 || sceneIndex === 5 || sceneIndex === 6) {
        animating = true
    } else {
        animating = false
    }
    clearWebGL()
}

function renderImage(imageIndex) {
    var scene = scenes[imageIndex - 1]
    gl.uniform1i(gl.getUniformLocation(program, 'uScene'), imageIndex - 1)
    gl.uniform3fv(
        gl.getUniformLocation(program, 'uLightPosition'),
        flatten(scene.lightPosition)
    )

    var sphereCount = scene.spheres.length
    for (var i = 0; i < sphereCount; i++) {
        var sphere = scene.spheres[i]
        gl.uniform3fv(
            gl.getUniformLocation(program, `uSpheres[${i}].center`),
            flatten(sphere.center)
        )
        gl.uniform1f(
            gl.getUniformLocation(program, `uSpheres[${i}].radius`),
            sphere.radius
        )
        gl.uniform3fv(
            gl.getUniformLocation(program, `uSpheres[${i}].material.ambient`),
            flatten(sphere.material.ambient)
        )
        gl.uniform3fv(
            gl.getUniformLocation(program, `uSpheres[${i}].material.diffuse`),
            flatten(sphere.material.diffuse)
        )
        gl.uniform3fv(
            gl.getUniformLocation(program, `uSpheres[${i}].material.specular`),
            flatten(sphere.material.specular)
        )
        gl.uniform1f(
            gl.getUniformLocation(program, `uSpheres[${i}].material.shininess`),
            sphere.material.shininess
        )
        gl.uniform1f(
            gl.getUniformLocation(
                program,
                `uSpheres[${i}].material.reflectivity`
            ),
            sphere.material.reflectivity
        )
        gl.uniform1f(
            gl.getUniformLocation(program, `uSpheres[${i}].isLightSource`),
            sphere.isLightSource ? 1.0 : 0.0
        )
    }

    var planeCount = scene.planes.length
    for (var i = 0; i < planeCount; i++) {
        var plane = scene.planes[i]
        gl.uniform3fv(
            gl.getUniformLocation(program, `uPlanes[${i}].point`),
            flatten(plane.point)
        )
        gl.uniform3fv(
            gl.getUniformLocation(program, `uPlanes[${i}].normal`),
            flatten(plane.normal)
        )
        gl.uniform3fv(
            gl.getUniformLocation(program, `uPlanes[${i}].material.ambient`),
            flatten(plane.material.ambient)
        )
        gl.uniform3fv(
            gl.getUniformLocation(program, `uPlanes[${i}].material.diffuse`),
            flatten(plane.material.diffuse)
        )
        gl.uniform3fv(
            gl.getUniformLocation(program, `uPlanes[${i}].material.specular`),
            flatten(plane.material.specular)
        )
        gl.uniform1f(
            gl.getUniformLocation(program, `uPlanes[${i}].material.shininess`),
            plane.material.shininess
        )
        gl.uniform1f(
            gl.getUniformLocation(
                program,
                `uPlanes[${i}].material.reflectivity`
            ),
            plane.material.reflectivity
        )
    }

    gl.clear(gl.COLOR_BUFFER_BIT)

    // Set up a simple rectangle covering the whole canvas
    var vertices = new Float32Array([
        -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0,
    ])

    var buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    var vPosition = gl.getAttribLocation(program, 'vPosition')
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vPosition)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}
