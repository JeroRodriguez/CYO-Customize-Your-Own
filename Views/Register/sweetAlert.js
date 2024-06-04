let submitRegister = document.querySelector('.submitRegister');

submitRegister.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        title: "Sorry but we don't have this feature yet... We are working on it!",
        imageUrl: "../../img/OtherImg/logo.png",
        imageWidth: 200,
        imageHeight: 150,
        imageAlt: "Logo Image"
      });
})