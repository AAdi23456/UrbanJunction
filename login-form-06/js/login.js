const email=document.getElementById("email").value
const password= document.getElementById("password").value
const form=document.querySelector("#form")
const data={
    email,
    password
}
fetch("http://localhost:3000/auth/login", {
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
  });