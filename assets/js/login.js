document.addEventListener("DOMContentLoaded",()=>{
    let users =JSON.parse(localStorage.getItem("users"))


    let form =document.querySelector("form");
    let username=document.querySelector("#username");
    let password=document.querySelector("#password");
    form.addEventListener("submit",login)
    function login(e){
        e.preventDefault();


        let loginUser=users.find((user)=>user.username==username.value && user.password==password.value);

        if (loginUser) {
                loginUser.islogined =true 
                localStorage.setItem("users",JSON.stringify(users));
                toast("giris ugurlu");
                setTimeout(()=>{
                    window.location.href="index.html"
                }, 2000)
        }else{
            toast("username ve ya password yanlisdi");
            return;
        }
    }
});
let toast=(text)=>{
    Toastify({
        text: `${text}`,
        duration: 2000,
        position: "right", 
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}