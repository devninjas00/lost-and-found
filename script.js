const firebaseConfig = {
  apiKey: "AIzaSyBcoa2LEXqWzV9otofqKB7gpYzAVbGaaYQ",
  authDomain: "lost-and-found-5fee0.firebaseapp.com",
  databaseURL: "https://lost-and-found-5fee0-default-rtdb.asia-southeast1.firebasedatabase.app", 
  projectId: "lost-and-found-5fee0",
  storageBucket: "lost-and-found-5fee0.appspot.com", 
  messagingSenderId: "454929712249",
  appId: "1:454929712249:web:09c49e8ac660d1c6fc40a8",
  measurementId: "G-FYN1K8CCLR"
};

firebase.initializeApp(firebaseConfig)

const data = firebase.database()




const form = document.getElementById("form")
const itemlist = document.getElementById("itemlist")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const items = document.getElementById("item").value
    const desc = document.getElementById("textarea").value
    const loc = document.getElementById("location").value
    const name = document.getElementById("name").value
    const contact = document.getElementById("contact").value
    const status = document.getElementById("status").value
    const identity = document.getElementById("identity").value  
   
    const item = {
        name: name,
        items: items,
        desc: desc,
        loc: loc,
        contact: contact,
        identity: identity,
        date: new Date().toLocaleString(),
        status: status
        
    }


    data.ref("iit").push(item)

    form.reset()

});


data.ref("iit").on("child_added", (snapshot) => {
    const item = snapshot.val()
    displayitem(item)
});
function displayitem(item) {
    const div = document.createElement("div")
    div.classList.add("msg")
    div.innerHTML = `
    <h3>item name: ${item.items}</h3>
    <p>item description: ${item.desc}</p>
    <p>item location: ${item.loc}</p>
    <p>item contact: ${item.contact}</p>
    <p>item identity: ${item.identity}</p>
    <p>item date: ${item.date}</p>
    <p>item status: ${item.status}</p>
    `
    itemlist.appendChild(div)
}
