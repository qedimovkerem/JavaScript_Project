document.addEventListener("DOMContentLoaded",()=>{
    let form=document.querySelector("form");
    let name=document.querySelector("#name");
    let username=document.querySelector("#username");
    let email=document.querySelector("#email");
    let password=document.querySelector("#password");
    let confirmPassword=document.querySelector("#confirmpassword");
    let users= JSON.parse(localStorage.getItem("users"))||[];


    let currentUser = users.find(user => user.islogined); 
    name.value = currentUser.name;
    username.value = currentUser.username;
    email.value = currentUser.email;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (name.value.trim() === "" || username.value.trim() === "" || email.value.trim() === "" || password.value.trim() === "" || confirmPassword.value.trim() === "") {
            toast("butun inputlari doldurun");
            return;
        }

         currentUser.name =name.value;
        currentUser.username= username.value;
        currentUser.email = email.value;
        currentUser.password =password.value;
        currentUser.confirmPassword=confirmPassword.value;

        if (confirmPassword.value==password.value) {
            if (email.value.endsWith("@gmail.com")) {
                if (username.value.length >=3&& username.value.length<=20) {
                    if (/[A-Z]/.test(username.value)&& /[a-z]/.test(username.value)&&/[_-]/.test(username.value)) {
                        if (password.value.length >= 8) {
                            if ( /[a-z]/.test(password.value)) {
                                localStorage.setItem("users", JSON.stringify(users)),
                                   toast("Melumatlar yenilendi"),
                                     setTimeout(()=>{
                                        window.location.href="login.html"
                                         },2000) 
                            }else{
                                toast("passworda kicik herf olmaidi")
                            }
                        }else{
                            toast("password min 8 simvol olmalidir")
                        }
                    }else{
                        toast("usernamede yalniz elifba, reqem, alt xett və tire istifade oluna biler")
                    }
                }else{
                    toast("username maxsimum 20 simvol ola biler ve username minimum 3 simvol olmalidi")
                }
            }else{
                toast("email @gmail.com ile bitmelidir.")
            }
          }else{
            toast("password ve confirmpassword eyni deyil")
          }
        
      })
    password.addEventListener("input", ()=>{
        let passwordCheck=document.querySelector(".password_check");
        let passwordIcon=document.querySelector("i")
        if (!passwordIcon) return;
        if (password.value.length<7 &&password.value.length>=0) {
            passwordIcon.style.color="red"
            passwordCheck.classList.remove("d-none")
        }else{
            passwordIcon.style.color="green"
            passwordCheck.classList.remove("d-none")
        }
    })
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