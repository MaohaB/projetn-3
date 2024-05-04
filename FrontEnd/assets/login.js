//const messageError = document.getElementById("msgerror");
var email;
var password;
function getValue() {
    document.getElementById("btnconnection").addEventListener("click",(e) => {

    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    //alert (email,password)//
    console.log(email,password);
    // //
    if (email == "sophie.bluel@test.tld" && password == "S0phie") {
        window.location = "index.html";
    }})
//    else {
  //      messageError.style.display = "block";
    //
}

const result = fetch("http://localhost:5678/api/users/login", {
         method: "POST",
         headers: {
             'Accept': 'application/json',
             "Content-Type": "application/json",
         },
         body: JSON.stringify({
             email: form.email.value,
             password: form.password.value,
         })
     })
     console.log(result)


     // document.querySelectorAll(".editor") => {editor.style.display = "none";}