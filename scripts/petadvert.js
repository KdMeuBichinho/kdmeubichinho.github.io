const photo = document.getElementById("photo");
const anuncio = {};
const fotos={};
photo.addEventListener("change", ()=>{
    //console.log(photo.files[0]);
    /* fetch("http://localhost:8080/foto",{
        method: "POST",
        headers: { "Content-Type":""},
        body: photo.files[0]
    }) */
    uploadFile(photo.files[0])
})
const uploadFile = (file) => {
    const fd = new FormData();
    fd.append("image", file)
    fetch("http://localhost:8080/foto",{
        method: "POST",
        body: fd
    })
    .then(res => res.text())
    .then(res => {
        fotos.caminho=res;
        anuncio.fotos=fotos;
    })
    .catch(err => console.log(err))
}
