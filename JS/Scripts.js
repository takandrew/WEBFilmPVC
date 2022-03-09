function Show_uploaded_image () {
    let file = photo_pvc.files[0];
    if (file) {
        image_pvc.src = URL.createObjectURL(file);
        localStorage.setItem('myImage', image_pvc.src);
    }
}
//image_pvc.src = localStorage.setItem('myImage');

const Show_div_image = () => {
    div_image.classList.toggle("active");
}