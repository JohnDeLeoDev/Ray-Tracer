var canvas
var gl
var program
var eye = vec3(0.0, 0.0, 1.0) // Camera position
var lightPosition = vec3(2.0, 2.0, -3.0)
var aspectRatio = 512 / 512
var maxDepth = 5

var scenes = [
    {
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

    renderImage(3)
}

function renderImage(imageIndex) {
    var scene = scenes[imageIndex - 1]
    gl.uniform1i(gl.getUniformLocation(program, 'uScene'), imageIndex - 1)
    gl.uniform3fv(
        gl.getUniformLocation(program, 'uLightPosition'),
        flatten(scene.lightPosition)
    )

    var sphereCount = Math.min(scene.spheres.length, 4)
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
