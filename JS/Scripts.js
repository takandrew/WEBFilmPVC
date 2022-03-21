function Show_uploaded_image () {
    let file = document.getElementById('photo-pvc').files[0];
    if (file) {
        let img_source = document.getElementById('image-pvc');
        img_source.src = URL.createObjectURL(file);
        localStorage.setItem('myImage', img_source);
    }
}

const Show_div_image = () => {
    let image = document.getElementById('div-image');
    image.classList.toggle("active", true);
}

function make_base()
{
    Show_uploaded_image();
    let image = document.getElementById('image-pvc');
    image.onload = function(){
        let needed_width = image.width, needed_height = image.height;
        if (image.width >= window.innerWidth) {
            let needed_proportion = needed_width/needed_height;
            needed_width = window.innerWidth - 100;
            needed_height = needed_width/needed_proportion;
        }
        context.canvas.width = needed_width;
        context.canvas.height = needed_height;
        context.drawImage(image, 0, 0, needed_width, needed_height);
    }
    Show_div_image();
}


/*TODO: Сделать красивое рисование прямоугольников*/
/*FIXME: Наладить работу добавления и удаления обработчиков событий; Разобраться в том, что тут происходит не так...*/

var canvas = document.getElementById('canvas-pvc'),
    context = canvas.getContext('2d');

var x_left, x_right, y_left, y_right;
var draw = false;

function Start_drawing() {
    canvas.addEventListener("mousedown", mouse_downed(MouseEvent), true);
    canvas.addEventListener("mousemove", mouse_mooved(MouseEvent), true);
    canvas.addEventListener("mouseup", mouse_upped(MouseEvent), true);
}

function  Stop_drawing() {
    canvas.removeEventListener("mouseup", mouse_upped(MouseEvent), true);
    canvas.removeEventListener("mousedown", mouse_downed(MouseEvent), true);
    canvas.removeEventListener("mousemove", mouse_mooved(MouseEvent), true);
}

function mouse_downed(event) {
    if (event.target !== undefined) {
        let rect = event.target.getBoundingClientRect();
        x_left = event.clientX - rect.left;
        y_left = event.clientY - rect.top;
        draw = true;
    }
}

function  mouse_mooved(event) {
    if (event.target !== undefined) {
        if(draw===true){
            draw_rectangle(event);
        }
    }
}

function mouse_upped(event) {
    if (event.target !== undefined) {
        draw_rectangle(event);
        draw = false;
    }
}

function draw_rectangle(event) {
    let rect = event.target.getBoundingClientRect();
    x_right = event.clientX - rect.left;
    y_right = event.clientY - rect.top;
    let rect_w = Math.abs(x_right-x_left);
    let rect_h = Math.abs(y_left-y_right);
    context.strokeRect(x_left,y_left,rect_w,rect_h);
}