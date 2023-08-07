
const form=document.getElementById("submit")
form.addEventListener("click",((e)=>{
e.preventDefault()
const email=document.getElementById("email").value
const password= document.getElementById("password").value
const name=document.getElementById("name").value
const data={
    email,
    password,
    name
}
console.log(data);
fetch("https://gifted-tights-yak.cyclic.app/auth/signup", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify(data)
   
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Request failed with status ' + response.status);
    }
  })
  .then(data => {
    
    if (data.msg) {

      alert(data.msg)
    }
    
   localStorage.setItem("token", data.token);
  }) 
  .catch(error => {
    console.error(error);
  })
}))