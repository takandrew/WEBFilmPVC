let photo_loaded = false;

function Show_uploaded_image () {
    let file = document.getElementById('photo-pvc').files[0];
    if (file) {
        let img_source = document.getElementById('image-pvc');
        img_source.src = URL.createObjectURL(file);
        localStorage.setItem('myImage', img_source);
        photo_loaded = true;
    }
    else {
        photo_loaded = false;
    }
}

const Show_div_image = () => {
    let image = document.getElementById('div-image');
    if (photo_loaded) {
        image.classList.toggle("active", true);
    }
}

function make_base() {
    Show_uploaded_image();
    let image = document.getElementById('image-pvc');
    image.onload = function(){
        let needed_width = image.width, needed_height = image.height;
        if (image.width >= window.innerWidth) {
            let needed_proportion = needed_width/needed_height;
            needed_width = window.innerWidth - 100;
            needed_height = needed_width/needed_proportion;
        }
        context_pvc.canvas.width = needed_width;
        context_pvc.canvas.height = needed_height;
        context_pvc.drawImage(image, 0, 0, needed_width, needed_height)
        context_rect.canvas.width = needed_width;
        context_rect.canvas.height = needed_height;
    }
    Show_div_image();
    rect_arr = [];
}

var canvas_pvc = document.getElementById('canvas-pvc'),
    context_pvc = canvas_pvc.getContext('2d');

var canvas_rect = document.getElementById('canvas-rect'),
    context_rect = canvas_rect.getContext('2d');

var x_left, x_right, y_left, y_right, rect_w, rect_h;
var draw = false;

function start_drawing() {
    canvas_rect.style.visibility = "visible";
    context_rect.clearRect(0,0, canvas_rect.width, canvas_rect.height);
    canvas_rect.addEventListener("mousedown", mouse_downed, true);
    canvas_rect.addEventListener("mousemove", mouse_moved, true);
    canvas_rect.addEventListener("mouseup", mouse_upped, true);
}

function  stop_drawing() {
    canvas_rect.removeEventListener("mouseup", mouse_upped, true);
    canvas_rect.removeEventListener("mousedown", mouse_downed, true);
    canvas_rect.removeEventListener("mousemove", mouse_moved, true);
    canvas_rect.style.visibility = "hidden";
}

var is_final_rec = false;

function mouse_downed(e) {
    is_final_rec = false;
    let rect = e.target.getBoundingClientRect();
    x_left = e.clientX - rect.left;
    y_left = e.clientY - rect.top;
    draw = true;
}

function  mouse_moved(e) {
    if(draw===true){
        is_final_rec = false;
        draw_rectangle(e);
    }
}

function mouse_upped(e) {
    is_final_rec = true;
    draw = false;
    draw_rectangle(e);
}
var temp, time, LAB_L, LAB_a, LAB_b, YI;

class rect_class {
    constructor(time, temp, xl, yl, w, h, LAB_L, LAB_a, LAB_b, YI) {
        this.time = time;
        this.temp = temp;
        this.xl = xl;
        this.yl = yl;
        this.w = w;
        this.h = h;
        this.LAB_L = LAB_L;
        this.LAB_a = LAB_a;
        this.LAB_b = LAB_b;
        this.YI = YI;
    }
}

function modal_save() {
    temp = document.getElementById('modal-temp').value.replace(/[a-zA-Z]|\s/g,'');
    time = document.getElementById('modal-time').value.replace(/[a-zA-Z]|\s/g,'');
    if (temp === "" && time === "") {
    }
    else {
        close_modal.click();
        rect_class_push();
    }
}

var rect_arr = [];

function draw_rectangle(e) {
    if (!is_final_rec) {
        context_rect.clearRect(0, 0, canvas_rect.width, canvas_rect.height);
    }
    let rect = e.target.getBoundingClientRect();
    x_right = e.clientX - rect.left;
    y_right = e.clientY - rect.top;
    rect_w = Math.abs(x_right-x_left);
    rect_h = Math.abs(y_left-y_right);
    if (!is_final_rec) {
        context_rect.strokeRect(x_left,y_left,rect_w,rect_h);
    }
    else {
        context_rect.strokeRect(x_left,y_left,rect_w,rect_h);
        context_pvc.strokeRect(x_left,y_left,rect_w,rect_h);
        let modal_call = document.getElementById('open_modal');
        modal_call.click();
    }
}

function rect_class_push() {
    get_rect_rgb();
    let rect_class_temp = new rect_class(time, temp, x_left,y_left,rect_w,rect_h, LAB_L, LAB_a, LAB_b, YI);
    rect_arr.push(rect_class_temp);
}

function get_rect_rgb() {
    let rgb_data = context_pvc.getImageData(x_left,y_left, rect_w, rect_h).data;
    let R = 0, G = 0, B = 0;
    for (let i = 0; i < rgb_data.length; i += 4) {
        const Ri = rgb_data[i];
        const Gi = rgb_data[i + 1];
        const Bi = rgb_data[i + 2];
        R += Ri;
        G += Gi;
        B += Bi;
    }
    let S = (rect_w*rect_h);
    R = R / S;
    G = G / S;
    B = B / S;

    let nR = R/255, nG = G/255, nB = B/255;

    let r, g, b;
    r = get_rgb(nR);
    g = get_rgb(nG);
    b = get_rgb(nB);

    let X, Y, Z;
    X = 0.412453*r+0.357580*g+0.180423*b;
    Y = 0.212671*r+0.715160*g+0.072169*b;
    Z = 0.019334*r+0.119193*g+0.950227*b;

    YI = 100*(1.28*X-1.06*Z)/Y;

    let Xr = 0.964221, Yr = 1, Zr = 0.825211;
    let xr = X/Xr, yr = Y/Yr, zr = Z/Zr;

    let fx, fy, fz;
    fx = get_f(xr);
    fy = get_f(yr);
    fz = get_f(zr);

    LAB_L = (116*fy)-16;
    LAB_a = 500*(fx-fy);
    LAB_b = 200*(fy-fz);

    // console.log(`RGB: R = ${R}; G = ${G}; B = ${B}`);
    // console.log(`nRGB: nR = ${nR}; nG = ${nG}; nB = ${nB}`);
    // console.log(`rgb: r = ${r}; g = ${g}; b = ${b}`);
    // console.log(`XYZ: X = ${X}; Y = ${Y}; Z = ${Z}`);
    // console.log(`YI = ${YI}`);
    // console.log(`LAB: L = ${LAB_L}; a = ${LAB_a}; b = ${LAB_b}`);
}

let get_rgb = function(x) {
    if (x > 0.04045) {
        return Math.pow(((x+0.055)/1.055),2.4);
    }
    else {
        return x/12.92;
    }
}

let get_f = function(x) {
    if (x > 0.008856) {
        return Math.pow(x, 1/3);
    }
    else {
        return (903.3*x+16.0)/116.0;
    }
}