// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function signIn() {
    var email = document.getElementById('e_mail').value;
    var pwd = document.getElementById('p_word').value;

    firebase.auth().signInWithEmailAndPassword(email, pwd)
    .then((res) => {
        console.log(res)
        localStorage.setItem("userloggin" , res.user.uid)
        // var currentname=res.user.uid
        //  localStorage.setItem("username" , currentname.doc("users").name)
        
         window.location.href="useraccount.html"
        //  window.location.href="index.html"

      // var serviceForm = document.getElementById('service-form')
      
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
}
