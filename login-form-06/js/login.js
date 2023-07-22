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
  console.log(data);
  fetch("https://colorful-helmet-slug.cyclic.app/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(data)
     
    })
    .then(response => {
     return response.json()
     
    })
    .then(data => {
      
      if (data.msg) {
  
        alert(data.msg)
      }
      if(data.token){
      localStorage.setItem("name", JSON.stringify(data.name));
      localStorage.setItem("email", JSON.stringify(data.email));
     localStorage.setItem("token", JSON.stringify(data.token));
     window.location.href="../html/index.html"
      }
    }) 
    .catch(error => {
     // console.error(error);
    });
}
