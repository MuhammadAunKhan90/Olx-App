if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

var db = firebase.firestore();
var currentUser= localStorage.getItem("currentuser")
var userlogginid=localStorage.getItem("userloggin");
 function submitad(){
     var uname=document.getElementById("name").value;
     var maill=document.getElementById("mail").value;
     var price=document.getElementById("price").value;
     var addver=document.getElementById("addvertise").value;
     var descrip=document.getElementById("desp").value;
     var numb=document.getElementById("num").value;
     var prove=document.getElementById("provn").value;

     console.log(uname,price,maill,addver,descrip,numb,prove);

     uploadImage().then((url) => {
                db.collection('addds').add({uname,price,maill,addver,descrip,numb,prove,url,currentUser,userlogginid})
            .then(function(){
                console.log("add added ")
                 window.location.href="useraccount.html"
               
            }
            ).catch(function(error)
            {
                console.log('error,error.message')
            })
            });
            
        
        }
    





function uploadImage() {
    var storageRef = firebase.storage().ref(); 
    var imagesRef = storageRef.child('images/ads_'+ Math.random().toString().substring(2, 6) +'.jpg');
    var file = document.getElementById('imageId').files[0] // use the Blob or File API
    
    return new Promise((resolve, reject) => {
        imagesRef.put(file)
        .then(function(snapshot) {
            console.log('Uploaded a blob or file!', snapshot);
            imagesRef.getDownloadURL().then(function(url) {
                // console.log('URL *****', url)
                resolve(url);
              }).catch(function(error) {
                // Handle any errors
              });
        }).catch((e) => {
            console.log('bhai kuch masla hai', e)
        });
    })
}


var iduser1=localStorage.getItem("userloggin");
// var usercheck=db.collection("users").doc(iduser1);
// console.log(usercheck);

// var docreff= db.collection("users").doc(iduser1);
// docreff.get().then(function(doc){
//     if(doc.exists)
// {
//     console.log("document data " , doc.data());
//     var name=doc.data().name;
//     var welcom=document.getElementById("nameget")
//     //welcom.style.display="block"
//     welcom.innerHTML="THANKS FOR LOGGIN "+"" + name.toUpperCase();
// }
// else {
//     console.log("no such document")
// }
// }).catch(function(error)
// {
//     //console.log("error",error)
// })


// document.addEventListener('scroll',function(event){
//     console.log(document.body.scrollHeight-10,document)

//     if(document.body.scrollHeight-10 <=
//     document.body.scrollTop+
// window.innerHeight){
//     console.log('call');
//     if()
// }
// })

    var olxcard=document.getElementById("cardoff");
    db.collection("addds").get()
   
    .then(function(querysnapshot){
        querysnapshot.forEach(function(doc){
            console.log(doc.data())
            var getid= doc.data().iduser1;
            olxcard.innerHTML+=`<div class="col-sm-12 m7" >
            <h2 class="header"> Card</h2>
            <span class="card-title activator grey-text text-darken-4">${doc.data().maill}<i class="material-icons right">more_vert</i></span>
            <div class="card horizHorizontalontal">
              <div class="card-image" >
                <img src='${doc.data().url}' width="200px">
              </div>
              <div class="card-stacked">
                <div class="card-content">

                  <p>                <b><i>${doc.data().uname}</i></b></p>
                  <p>                <b><i>${doc.data().maill}</i></b></p>
                  <p>                <b><i>${doc.data().descrip}</i></b></p>
                  <p>                <b><i>${doc.data().addver}</i></b></p>
                  <p>                <b><i>${doc.data().price}</i></b></p>
                  <p>                <b><i>${doc.data().numb}</i></b></p>
                  <p>                <b><i>${doc.data().prove}</i></b></p>
                  <p><button  onclick="chatbox(${getid})">goto chat </button></p>
                </div>
                <div class="card-action">
        
                </div>
              </div>
            </div>
          </div>`
        })
    })
    function search1()
{

   // document.getElementById("mycard1").style.visibility = "hidden";
    var mycard12=document.getElementById("olxcard");
     mycard12.innerHTML+="";
var serach=document.getElementById("myInput").value
   //var mycard=document.getElementById("mycard");
   if(serach=="laptops" || serach=="laptop" || serach=="Laptops" )
   {
    db.collection("addds").where("selectcategories","==",serach).get()
   
    .then(function(querysnapshot){
        querysnapshot.forEach(function(doc){
            console.log(doc.data())
            mycard12.innerHTML +=`<div class="card" style="width:250px; height:300px;">
    <div class="card-image waves-effect waves-block waves-light"  >
      <img class="activator" class="materialboxed" width="650" class="responsive" src='${doc.data().url}' >
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${doc.data().addver}<i class="material-icons right">more_vert</i></span>
      <p><a href="#">This is a link</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${doc.data().descrip}<i class="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div>`
        })
    })
   
    
   }
else  if(serach=="mobiles" || serach=="Mobiles" || serach=="mobile")
   {
 db.collection("addds").where("selectcategories","==", serach).get()
    .then(function(querysnapshot){
        querysnapshot.forEach(function(doc){
            console.log(doc.data())
            mycard12.innerHTML +=`<div class="card" style="width:250px; height:300px;">
    <div class="card-image waves-effect waves-block waves-light"  >
      <img class="activator" class="materialboxed" width="650" class="responsive" src='${doc.data().url}' >
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${doc.data().addver}<i class="material-icons right">more_vert</i></span>
      <p><a href="#">This is a link</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${doc.data().descrip}<i class="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div>`
        })
    })
     
   }
   else  if(serach=="cars" || serach=="Car" || serach=="Vehicles" || serach=="Cars")
   {
 db.collection("addds").where("selectcategories","==", serach).get()
    .then(function(querysnapshot){
        querysnapshot.forEach(function(doc){
            console.log(doc.data())
            mycard12.innerHTML +=`<div class="card" style="width:250px; height:300px;">
    <div class="card-image waves-effect waves-block waves-light"  >
      <img class="activator" class="materialboxed" width="650" class="responsive" src='${doc.data().url}' >
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${doc.data().addver}<i class="material-icons right">more_vert</i></span>
      <p><a href="#">This is a link</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${doc.data().descrip}<i class="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div>`
        })
    })
     
   }
  
    
     else   if(serach=="") {
 db.collection("addds").get()
    .then(function(querysnapshot){
        querysnapshot.forEach(function(doc){
            console.log(doc.data())
            mycard12.innerHTML +=`<div class="card" style="width:250px; height:300px;">
    <div class="card-image waves-effect waves-block waves-light"  >
      <img class="activator" class="materialboxed" width="650"  class="responsive" src='${doc.data().url}' >
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${doc.data().addver}<i class="material-icons right">more_vert</i></span>
      <p><a href="#">This is a link</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${doc.data().descrip}<i class="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div>`
        })
    })
     serach="";
   }
  
    else
    {
        alert("this is invalid category!!!");
        serach="";
    }
}

    
    function chatbox(getid)
    {
    localStorage.setItem("getid1", getid);
    window.location.href="chat.html"
    
    }


    function getuser(){
        var docreff= db.collection("users").doc(iduser1);
            docreff.get().then(function(doc){
            
                console.log("document data " , doc.data());
                var name=doc.data().name;
            localStorage.setItem("currentuser",name)
            
        
            
            }).catch(function(error)
            {
                //console.log("error",error)
            })
          }
    