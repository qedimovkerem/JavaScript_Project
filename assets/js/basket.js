document.addEventListener("DOMContentLoaded",()=>{
    let products=[]
    let users=JSON.parse(localStorage.getItem("users"));
    let currentUser=users.find((user)=>user.islogined===true);
    let wrapper =document.querySelector(".username")
    let logout=document.querySelector(".logout")
    let login=document.querySelector(".login");
    let register=document.querySelector(".register");
    let parametr=document.querySelector(".parametr")
    axios.get('http://localhost:3000/products')
    .then(res=>{
       const product=res.data
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
       console.log(product);
    })

    if (!currentUser) {
        setTimeout(()=>{
            window.location.href="login.html"
        },2000)
        toast("Qeydiyyatdan kecin")
    }
    let userIde=users.findIndex((user)=>user.id==currentUser.id);
    let basket=currentUser.basket
    let clickWishlist=()=>{
        window.location.href="wishlist.html";
      };
      
      let clickBasket=()=>{
        window.location.href="basket.html"
      }

      
        let logoutUser=()=>{
          toast("cixis olunur")
          setTimeout(()=>{
            currentUser.islogined=false;
          localStorage.setItem("users",JSON.stringify(users))
          window.location.reload()
          },2000)
      };
      logout.addEventListener("click",logoutUser);
      
      let navListIcon=document.querySelector(".nav_list-li1");
      navListIcon.style.cursor="pointer"
      navListIcon.addEventListener("click",clickWishlist);
      
      let navListIcon2=document.querySelector(".nav_list-li2");
      navListIcon2.style.cursor="pointer"
      navListIcon2.addEventListener("click",clickBasket);

    function createBasketItem() {
        let basketContainer=document.querySelector(".cards");
        basketContainer.innerHTML=""
        basket.forEach((element) => {
        let basketCard=document.createElement("div")
        basketCard.classList.add("basket-card")
        let image=document.createElement("div")
        image.classList.add("image")
        let img=document.createElement("img")
        img.src=`${element.image}`
        let cardContent=document.createElement("div")
        cardContent.classList.add("card-content")
        let cardHead=document.createElement("div")
        cardHead.classList.add("cards-head")
        let cardTitle=document.createElement("div")
        cardTitle.classList.add("card-title")
        cardTitle.textContent=`${element.title.slice(0,50)}`
        let cardPrice=document.createElement("div")
        cardPrice.classList.add("cards-price")
        cardPrice.textContent=`$${(element.price * element.count).toFixed(2)}`
        let cardSizes=document.createElement("div")
        cardSizes.classList.add("cards-sizes")
        let size=document.createElement("span")
        size.classList.add("size")
        size.textContent="Size: XS"
        let color=document.createElement("span")
        color.classList.add("color")
        color.textContent="Color: Grey"
        let delivery=document.createElement("div")
        delivery.classList.add("delivery")
        delivery.textContent="Delivery: 25-32"
        let quality=document.createElement("div")
        quality.classList.add("quality")
        quality.textContent="Quality"
        let countArea=document.createElement("div")
        countArea.classList.add("count-area")
        let minusBtn=document.createElement("button")
        minusBtn.classList.add("minus-btn")
        minusBtn.textContent="-"
        minusBtn.addEventListener("click",()=>decrement(element.id,countElem,minusBtn,cardPrice));
        let countElem=document.createElement("p")
        countElem.classList.add("count")
        countElem.textContent=element.count
        let plusBtn=document.createElement("button")
        plusBtn.classList.add("plus-btn")
        plusBtn.textContent="+"
        plusBtn.addEventListener("click",()=>incerement(element.id,countElem,minusBtn,cardPrice));
        let cardsIcons=document.createElement("div")
        cardsIcons.classList.add("cards-icons")
        let cardHeart=document.createElement("span")
        cardHeart.classList.add("cards-heart")
        let cardHeartIcon=document.createElement("i")
        cardHeartIcon.classList.add("fa-regular","fa-heart")
        if (currentUser && currentUser.wishlist.some(item => item.id === element.id)) {
            cardHeartIcon.classList.add("fa-solid");
            cardHeartIcon.style.color = "#ff9800";
        } else {
            cardHeartIcon.classList.add("fa-regular");
        }
          cardHeartIcon.addEventListener("click" ,(e)=>{
            e.stopPropagation(),
              toogleUserWishLish(element.id,cardHeartIcon)
          })
        let cardRemove=document.createElement("span")
        cardRemove.classList.add("cards-remove")
        let cardRemoveIcon=document.createElement("i")
        cardRemoveIcon.classList.add("fa-solid","fa-trash")
        cardRemoveIcon.addEventListener("click",()=>removeProduct(element.id));

        cardRemove.appendChild(cardRemoveIcon)
        cardHeart.appendChild(cardHeartIcon)
        cardsIcons.append(cardHeart,cardRemove)
        countArea.append(minusBtn,countElem,plusBtn)
        cardSizes.append(size,color,delivery,quality,countArea,cardsIcons)
        cardHead.append(cardTitle,cardPrice)
        cardContent.append(cardHead,cardSizes)
        image.appendChild(img)
        basketCard.append(image,cardContent)
        let cards=document.querySelector(".cards")
        cards.appendChild(basketCard)

        let allRemoveBtn=document.querySelector(".remove-all")
        allRemoveBtn.addEventListener("click",()=>allRemoveProduct())
        })
    }
    function toogleUserWishLish(productId,cardHeartIcon){
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
            cardHeartIcon.classList.add("fa-regular");
            cardHeartIcon.classList.remove("fa-solid");
            toast("product silindi");
        }else{
            let addProduct=products.find((product)=>product.id==productId);
            currentUser.wishlist.push(addProduct);
            localStorage.setItem("users",JSON.stringify(users));
            toast("product elave olundu");
            cardHeartIcon.classList.remove("fa-regular");
            cardHeartIcon.classList.add("fa-solid");
            cardHeartIcon.style.color="#ff9800"
        }
    }
        function incerement(productId,countElem,minusBtn,cardPrice) {
            let existProduct=basket.find((product)=>product.id== productId);
            if (existProduct.count) {
                existProduct.count++
                countElem.textContent=existProduct.count
                cardPrice.textContent=`$${newprices(existProduct).toFixed(2)}`
                if (existProduct.count>1) {
                    minusBtn.removeAttribute("disabled")
                }
                users[userIde].basket=currentUser.basket;
                localStorage.setItem("users",JSON.stringify(users));
            }
            totalPrice()
      }
      function newprices(product){
        return product.price * product.count;
      }
      function decrement(productId,countElem,minusBtn,cardPrice) {
        let existProduct=basket.find((product)=>product.id== productId);
        if (existProduct) {
            if (existProduct.count>1) {
                existProduct.count--
                countElem.textContent=existProduct.count
                cardPrice.textContent=`$${newprices(existProduct).toFixed(2)}`
            }
            if (existProduct.count===1) {
                minusBtn.setAttribute("disabled","true")
            }
            users[userIde].basket=currentUser.basket;
            localStorage.setItem("users",JSON.stringify(users));
        }
        totalPrice()
    }
    function totalPrice() {
        let patmentCash=0;
        basket.forEach((product)=>{
            patmentCash+=product.count*product.price
        });
        let totalElement=document.querySelector(".total-price");
        totalElement.textContent=patmentCash.toFixed(2)
    }
    function removeProduct(productId) {
        let existProductIndex =basket.findIndex((product)=>product.id==productId);
        if (existProductIndex !== -1) {
            basket.splice(existProductIndex,1)
            users[userIde].basket=basket
            localStorage.setItem("users",JSON.stringify(users));
            toast("product silindi")
            let basketContainer = document.querySelector(".cards");
            basketContainer.innerHTML = "";
            createBasketItem()
            totalPrice()
        }
    }
    function allRemoveProduct(){
        if (basket.length===0) return
        basket=[];
        users[userIde].basket=basket;
        localStorage.setItem("users",JSON.stringify(users));
            window.location.reload()
            createBasketItem()
            totalPrice()
            toast("Butun productlar silindi");
    }
     totalPrice()
    createBasketItem()

    let confirmBtn = document.querySelector(".confirm");

if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
        if (!basket.length) {
            toast("Sebet boşdur");
            return;
        }
        console.log("Seçilmiş mehsullar:");
        basket.forEach((item, index) => {
            console.log(`${index + 1}. ${item.title} - Say: ${item.count}, Qiymət: $${item.price}`);
        });
        toast("finish")
    });
}
})


    let toast=(text)=>{
        Toastify({
            text: `${text}`,
            duration: 2000,
            position: "right", 
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){}
          }).showToast();
    }