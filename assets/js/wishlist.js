document.addEventListener("DOMContentLoaded",()=>{
    let products=[];
    let users =JSON.parse(localStorage.getItem("users"))||[];
    let wrapper =document.querySelector(".username")
    let currentUser=users.find((user)=>user.islogined==true);
    let name=document.querySelector(".name")
    let login=document.querySelector(".login");
    let register=document.querySelector(".register");
    let logout=document.querySelector(".logout");
    let parametr=document.querySelector(".parametr")
    let userIde=users.findIndex((user)=>user.id==currentUser.id);
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

    if (!currentUser) {
        setTimeout(()=>{
            window.location.href="login.html"
        },2000)
        toast("Qeydiyyatdan kecin")
    }
    let userWishlist=currentUser.wishlist

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
    function createWishlistItem(product) {
    //        axios.get("http://localhost:3000/products")
    //            .then(res=>{
    //     const product=res.data
    //     console.log(product);



        userWishlist.forEach(element => {
            let card=document.createElement("div")
            card.classList.add("card")
            let container=document.createElement("div")
            container.classList.add("container")
            let newButton=document.createElement("div")
            newButton.classList.add("new")
            newButton.textContent="New"
            let cardsIcon=document.createElement("div")
            cardsIcon.classList.add("cards-icon")
            let cardsHeart=document.createElement("i")
            cardsHeart.classList.add("fa-solid", "fa-x")
            cardsHeart.addEventListener("click",()=>{
                removeProduct(element.id)
            })
            let cardsImages=document.createElement("div")
            cardsImages.classList.add("cards-images")
            let image=document.createElement("img")
            image.src=`${element.image}`
            let cardContent=document.createElement("div")
            cardContent.classList.add("cards-content")
            let cardsIcons=document.createElement("div")
            cardsIcons.classList.add("cards-icons")
            let cardsStar=document.createElement("i")
            cardsStar.classList.add("fa-solid" ,"fa-star")
            cardsStar.style.color="#ffd43b"
            let cardsStar1=document.createElement("i")
            cardsStar1.classList.add("fa-solid" ,"fa-star")
            cardsStar1.style.color="#ffd43b"
            let cardsStar2=document.createElement("i")
            cardsStar2.classList.add("fa-solid" ,"fa-star")
            cardsStar2.style.color="#ffd43b"
            let cardsStar3=document.createElement("i")
            cardsStar3.classList.add("fa-solid" ,"fa-star")
            cardsStar3.style.color="#ffd43b"
            let cardsStar4=document.createElement("i")
            cardsStar4.classList.add("fa-solid" ,"fa-star")
            cardsStar4.style.color="#ffd43b"
            let cardsTitle=document.createElement("div")
            cardsTitle.classList.add("cards-title")
            cardsTitle.textContent=`${element.title}`
            let cardPrice=document.createElement("div")
            cardPrice.classList.add("cards-prices")
            let price=document.createElement("span")
            price.classList.add("price")
            price.textContent=`$${element.price}`
            let beforePrice=document.createElement("span")
            beforePrice.textContent=`$${element.beforePrice}`
            beforePrice.classList.add("before-price")
            let btn =document.createElement("button")
            btn.classList.add("cards-button")
            btn.textContent="add to card"
            btn.addEventListener("click",(e)=> {
                e.stopPropagation(),
              addbasket(element.id ,products)
            }) 
    
            cardPrice.append(price,beforePrice)
            cardsIcons.append(cardsStar,cardsStar1,cardsStar2,cardsStar3,cardsStar4)
            cardContent.append(cardsIcons,cardsTitle,cardPrice,btn)
            cardsImages.appendChild(image)
            cardsIcon.appendChild(cardsHeart)
            container.append(newButton,cardsIcon,cardsImages,cardContent)
            card.appendChild(container)
            let cards=document.querySelector(".cards")
            cards.appendChild(card)
            let allRemoveBtn=document.querySelector(".remove-all")
            allRemoveBtn.addEventListener("click",allRemoveProduct)
            
        });
    //  })
    }
    function allRemoveProduct(){
        if (!currentUser.wishlist || currentUser.wishlist.length === 0){
            toast("Wishlist bosdur")
            return
        }
        currentUser.wishlist=[]
        users[userIde].wishlist=[];
        localStorage.setItem("users",JSON.stringify(users));
        let cardsContainer = document.querySelector(".cards");
            cardsContainer.innerHTML = "";
            toast("Butun productlar silindi");
    }


    function removeProduct(productId) {
        let userIndex =users.findIndex((user)=>user.id==currentUser.id);
        let productIndex=currentUser.wishlist.findIndex(
            (product)=>product.id==productId
        );
        if (productIndex !==-1) {
           setTimeout(() => {
            currentUser.wishlist.splice(productIndex,1);
            users[userIndex]=currentUser,
            localStorage.setItem("users",JSON.stringify(users));
            window.location.reload()
           }, 2000);
            toast("product silindi")
        }
    }
    function addbasket(productId,products) {
        let userIde=users.findIndex((user)=>user.id==currentUser.id);
        if (!currentUser) {
          toast("Qeydiyyaddan kecin");
          setTimeout(()=>{
              window.location.href="login.html"
          },2000)}
          let basket =currentUser.basket
       let findProductIndex=currentUser.basket.findIndex((product)=>product.id==productId);
       let exsistProduct=basket.find((elem)=>elem.id==productId)
       if (!exsistProduct) {
        let product =products.find((item)=>item.id ==productId)
        basket.push({...product,count:1});
       }else{
        exsistProduct.count++;
       }
       toast("mehsul baskete elave olundu");
       users[userIde].basket=currentUser.basket;
       localStorage.setItem("users",JSON.stringify(users));
       basketCount()
      }
      
      
      function basketCount() {
        let result=currentUser.basket.reduce((acc,product)=>acc+product.count,0);
        let countIcon=document.querySelector(".nav_list-li2 sup");
        countIcon.textContent=result
      }
      basketCount()
    createWishlistItem()
});

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