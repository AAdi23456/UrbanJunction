const form=document.getElementById("sumbit")
form.addEventListener("click",(e)=>{
  e.preventDefault()
  loginData()
})


function loginData(){
  const email=document.getElementById("Email").value
  const password= document.getElementById("password").value
  
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
      
     localStorage.setItem("token", JSON.stringify(data.token));
    }) 
    .catch(error => {
      console.error(error);
    });
}
