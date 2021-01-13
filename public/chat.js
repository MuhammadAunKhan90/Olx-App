var db = firebase.firestore();
var iduser1=localStorage.getItem("userloggin");
var getid= doc.data().iduser1;



function chatbox(getid)
{
localStorage.setItem("getid1", getid);
window.location.href="templete/chat.html"

}
var getid=localStorage.getItem("getid1");
var currentuser=localStorage.getItem("userloggin");
var roomid;
var messageContainer = document.querySelector("#chatlogs");
var form = document.querySelector('.chat-form');
console.log(getid);
console.log(currentuser);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    var msg = form.querySelector('#usermsg').value;
    db.collection('rooms').doc(roomid).collection('messages').add({
        msg,
        senderUid : currentuser,
       // recieverUid : getid,
        createdAt : Date.now()
    })
})

function fetchdata()
{
db.collection("rooms").where(`users.${getid}`,"==",true).where(`users.${currentuser}`,"==",true).get().then(function (snapschot){
console.log(snapschot)
console.log(getid,currentuser)
var users = {
    [getid]:true, 
    [currentuser]:true 
}
console.log(users)
if(snapschot.empty)
{

    db.collection("rooms").add({ 
        users
    }).then(function (quersnapshot)
    {$
roomid=quersnapshot.id
    })
}
else{
    snapschot.forEach( function (res){
        roomid=res.id;
        db.collection("rooms").doc(roomid).collection("messages").onSnapshot(function (res){

            res.docChanges().forEach(function (snapshot){
                messageContainer.innerHTML += `
                    <li>${snapshot.doc.data().msg} </li>
                    <ul class="right">
                    <li>${snapshot.doc.data().senderUid}</li>
                    </ul>
                `
            })
        })
    })
}
})

}


















// function chat(){
// var chatmessage=document.getElementsByClassName("chat-text").value;



// var div1=document.createElement("div");
// var atri=div1.setAttribute("class","chat friend");
// var div2=document.createElement("div");
// var atri2=div2.setAttribute("class","user-photo");
// var para=document.createElement("p");
// var atri3=para.setAttribute("class","chat-message");
// para.innerHTML=chatmessage;

// var obj= div1.appendChild(div2).appendChild(para)
// var logs=document.getElementsByClassName('chatlogs').appendChild(obj)
// }