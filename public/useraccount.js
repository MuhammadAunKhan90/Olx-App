var db=firebase.firestore();
function logout()
{
    localStorage.removeItem("userloggin")
    window.location.href="signin.html"


}

var iduser1=localStorage.getItem("userloggin");
var usercheck=db.collection("users").doc(iduser1);
console.log(usercheck);

var docreff= db.collection("users").doc(iduser1);
docreff.get().then(function(doc){
    if(doc.exists)
{
    console.log("document data " , doc.data());
    var name=doc.data().name;
    var welcom=document.getElementById("nameget")
    //welcom.style.display="block"
    welcom.innerHTML="THANKS FOR LOGGIN "+"" + name.toUpperCase();
}
else {
    console.log("no such document")
}
}).catch(function(error)
{
    //console.log("error",error)
})


var mycard=document.getElementById("mycard");
var iduser2=localStorage.getItem("userloggin");
console.log("iduuer2***",iduser2)
    debugger;
    db.collection("addvertise").where("iduser1","==",iduser1).get()
   
    .then(function(querysnapshot){
        querysnapshot.forEach(function(doc){
            console.log(doc.data())
             var getid= doc.data().iduser1;
           
            mycard.innerHTML +=`<div class="card" style="width:250px; height:300px;">
    <div class="card-image waves-effect waves-block waves-light"  >
      <img class="activator" src='${doc.data().url}' >
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${doc.data().maill}<i class="material-icons right">more_vert</i></span>
      <p><button onclick="chatbox('${getid}')"></button></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${doc.data().descrip}<i class="material-icons right">close</i></span>
      <span class="card-title grey-text text-darken-4">${doc.data().price}<i class="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div>`
        })
    })
