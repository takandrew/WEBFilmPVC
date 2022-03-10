function Show_uploaded_image () {
    let file = document.getElementById('photo-pvc').files[0];
    if (file) {
        let img_source = document.getElementById('image-pvc').src = URL.createObjectURL(file);
        localStorage.setItem('myImage', img_source);
    }
}

const Show_div_image = () => {
    let image = document.getElementById('div-image');
    image.classList.toggle("active");
}

function make_base()
{
    Show_uploaded_image();
    let canvas = document.getElementById('canvas-pvc'),
        context = canvas.getContext('2d');
    let image = document.getElementById('image-pvc');
    let needed_width = image.width, needed_height = image.height;
    if (image.width >= window.innerWidth) {
        let needed_proportion = needed_width/needed_height;
        needed_width = window.innerWidth - 100;
        needed_height = needed_width/needed_proportion;
    }
    context.canvas.width = needed_width;
    context.canvas.height = needed_height;
    image.onload = function(){
        context.drawImage(image, 0, 0, needed_width, needed_height);
    }
    Show_div_image();
}

function draw_rectangle() {
    let canvas = document.getElementById('canvas-pvc'),
        context = canvas.getContext('2d');
    var right_border = false;
    var x_left, x_right, y_left, y_right;
    canvas.onclick = function clickEvent(e) {
        if (right_border) {
            context.strokeStyle = '#c0392b';
            let rect = e.target.getBoundingClientRect();
            x_right = e.clientX - rect.left;
            y_right = e.clientY - rect.top;
            let rect_w = Math.abs(x_right-x_left);
            let rect_h = Math.abs(y_left-y_right);
            context.strokeRect(x_left,y_left,rect_w,rect_h);
            right_border = false;
            return;
        }
        else {
            let rect = e.target.getBoundingClientRect();
            x_left = e.clientX - rect.left;
            y_left = e.clientY - rect.top;
            right_border = true;
        }

    }
}

/*TODO: Нужно внедрить потом это как-то */
/*
var img_mod_date;
var img_name;

function Show_uploaded_image () {
    let file = document.getElementById('photo-pvc').files[0];
    if (img_name !== file.name && img_mod_date !== file.lastModified) {
        img_name = file.name;
        img_mod_date = file.lastModified;
        if (file) {
            let img_source = document.getElementById('image-pvc').src = URL.createObjectURL(file);
            localStorage.setItem('myImage', img_source);
        }
        return true;
    }
    return false;
}

const Show_div_image = () => {
    let image = document.getElementById('div-image');
    if (!image.classList.contains('visited')) {
        image.classList.toggle("visited");
    }
}

function make_base()
{
    if (Show_uploaded_image()) {
        Show_div_image();
        let canvas = document.getElementById('canvas-pvc'),
            context = canvas.getContext('2d');
        let image = document.getElementById('image-pvc');
        context.canvas.width = image.width;
        context.canvas.height = image.height;
        image.onload = function(){
            context.drawImage(image, 0, 0, image.width, image.height);
        }
    }
} */