function Show_uploaded_image () {
    let file = document.getElementById('photo-pvc').files[0];
    if (file) {
        let img_source = document.getElementById('image-pvc').src = URL.createObjectURL(file);
        localStorage.setItem('myImage', img_source);
    }
}

const Show_div_image = () => {
    document.getElementById('div-image').classList.toggle("visited");
}

function make_base()
{
    Show_uploaded_image();
    Show_div_image();
    let canvas = document.getElementById('canvas-pvc'),
        context = canvas.getContext('2d');
    base_image = new Image();
    base_image.src = document.getElementById('image-pvc').src;
    base_image.onload = function(){
        context.drawImage(base_image, 0, 0);
    }
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
        }
        else {
            let rect = e.target.getBoundingClientRect();
            x_left = e.clientX - rect.left;
            y_left = e.clientY - rect.top;
            right_border = true;
        }

    }
}