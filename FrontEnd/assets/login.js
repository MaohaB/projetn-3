//(email == "sophie.bluel@test.tld" && password == "S0phie")
function getValue() {
    document.getElementById("btnconnection").addEventListener("click",(e) => {

        const user = {
            email: document.getElementById("email").value,
            password : document.getElementById("password").value,
        };
    //console.log(email,password);
    console.log(user);


  //      messageError.style.display = "block";
  const messageError = document.getElementById("msgerror");

  response = fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
})
 .then(response => {
    //console.log(response);
    if(response.ok) {
        return response.json();
    }
    else{
        messageError.style.display = "block";
        console.log("test")
    }
 })
 .then((data) => {
    if(data){
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('token', data.token);
        window.location.href="../FrontEnd/index.html";
    }
 })
 .catch(error => 
    console.log(error));
}
)}
    //localStorage.setItem('token', data.token);
    //localStorage.setItem('userId', data.userId);

    //location.href = 'index.html';

     // document.querySelectorAll(".editor") => {editor.style.display = "none";}