document.addEventListener("DOMContentLoaded", () => {
    let url = new URLSearchParams(location.search);
    let selectedProductId = url.get("id");
    let wrapper =document.querySelector(".username")
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.islogined === true);
    let userIde = users.findIndex(user => user.id === currentUser?.id);
    let login=document.querySelector(".login");
    let register=document.querySelector(".register");
    let logout=document.querySelector(".logout");
    let parametr=document.querySelector(".parametr")
    if (currentUser) {
        let userIde=users.findIndex((user)=>user.id==currentUser.id);
        let basket =currentUser.basket
        wrapper.textContent=`${currentUser.name}`
          login.classList.add("d-none");
          register.classList.add("d-none");
          logout.classList.remove("d-none");
          parametr.classList.remove("d-none")
      }else{
          login.classList.remove("d-none");
          register.classList.remove("d-none");
          logout.classList.add("d-none");
          parametr.classList.add("d-none")
      }

    const mainImage = document.querySelector(".card .image img");
    const asideImages = document.querySelectorAll(".aside-image img");
    const titleEl = document.querySelector(".card-title");
    const priceBtns = document.querySelectorAll(".cards-buttons .card-btn");
    const btnDanger = document.querySelector(".btn-danger");
    axios.get("http://localhost:3000/products")
        .then(res => {
            const products = res.data;
            let findProduct = products.find(product => product.id == selectedProductId);

            if (!findProduct) {
                toast("product tapilmadi");
                return;
            }

            mainImage.src = findProduct.image;
            asideImages.forEach(img => img.src = findProduct.image);
            titleEl.textContent = findProduct.title;
            priceBtns[0].textContent = `Price: $${findProduct.price}`;

            btnDanger.addEventListener("click", () => {
                if (!currentUser) {
                    toast("Qeydiyyatdan keçin");
                    setTimeout(() => window.location.href = "login.html", 2000);
                    return;
                }

                let basket = currentUser.basket;
                let productCount = 1;
                let existingProduct = basket.find(item => item.id == findProduct.id);
                if (existingProduct) {
                    existingProduct.count += productCount;
                } else {
                    basket.push({ ...findProduct, count: productCount });
                }

                users[userIde].basket = basket;
                localStorage.setItem("users", JSON.stringify(users));
                toast("product baskete elave olundu");
                window.location.reload()
            });
            let cardsHeart=document.querySelector(".cards-heart i")
                cardsHeart.addEventListener("click" ,(e)=>{
                    e.stopPropagation(),
                      toogleUserWishLish(findProduct.id,cardsHeart,products)
                  });
                  if (currentUser && currentUser.wishlist?.some(item => item.id == findProduct.id)) {
                    cardsHeart.classList.remove("fa-regular");
                    cardsHeart.classList.add("fa-solid");
                    cardsHeart.style.color = "#ff9800";
                };
            function basketCount() {
                let result=currentUser.basket.reduce((acc,product)=>acc+product.count,0);
                let countIcon=document.querySelector(".nav_list-li2 sup");
                countIcon.textContent=result
              }
              basketCount()
              function toogleUserWishLish(productId,cardsHeart,products){
                let userIde=users.findIndex((user)=>user.id==currentUser.id);
                if (!currentUser) {
                    toast("Qeydiyyaddan kecin");
                    setTimeout(()=>{
                        window.location.href="login.html"
                    },2000)
                }
                let currentProduct =currentUser.wishlist.some((item)=>item.id ===productId);
                if (currentProduct) {
                    let currentProductIndex=currentUser.wishlist.findIndex((product)=>product.id==productId);
                    currentUser.wishlist.splice(currentProductIndex,1);
                    users[userIde].wishlist=currentUser.wishlist
                    localStorage.setItem("users",JSON.stringify(users));
                    cardsHeart.classList.add("fa-regular");
                    cardsHeart.classList.remove("fa-solid");
                    toast("product silindi");
                }else{
                    let addProduct=products.find((product)=>product.id==productId);
                    currentUser.wishlist.push(addProduct);
                    localStorage.setItem("users",JSON.stringify(users));
                    toast("product elave olundu");
                    cardsHeart.classList.remove("fa-regular");
                    cardsHeart.classList.add("fa-solid");
                    cardsHeart.style.color="#ff9800"
                }
              }
              let desc=document.querySelector(".desc")
              desc.textContent=`${findProduct.description}`
              toogleUserWishLish()
        });
});


function toast(text) {
    Toastify({
        text: text,
        duration: 2000,
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}