function save () {
    let file = photo_pvc.files[0];
    if (file) {
        image_pvc.src = URL.createObjectURL(file);
        localStorage.setItem('myImage', image_pvc.src);
    }
}
image_pvc.src = localStorage.setItem('myImage');