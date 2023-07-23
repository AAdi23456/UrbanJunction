let data=JSON.parse(localStorage.getItem("token"))
const token=data
let total=0
let total_price=document.querySelector(".total-price")
let discount_price=document.getElementById("discount-price")
let total_pr=document.getElementById("total-pr")
let total_item=document.getElementById("total-item")
let total_pay=document.getElementById("total-pay")
let Remove_Url=`https://colorful-helmet-slug.cyclic.app/cart/Remove/`
let totalprice ;
if(!data){
  alert("Please login first")
  window.location.href="../login-form-06/index.html"
}
fetch("https://colorful-helmet-slug.cyclic.app/cart/show", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "token":data
    },

   
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
    total_item.innerText=data.length
    MappingtheResponse(data)
   let TotalSum=CalTotalPtice(data) 
   totalprice=TotalSum
   console.log(TotalSum);
   total_price.textContent=TotalSum
   total_pay.textContent=TotalSum
   localStorage.setItem("Amount", TotalSum);
  }) 
  .catch(error => {
    console.error(error);
  });
  
  function DynamicCards(img, title, brand, price, id, quantity) {
    return `<div id="card">
        <img class="card_img" src="${img}">
        <p class="card_title">${title}</p>
        <h5 class="card_brand">${brand}</h5>
        <p class="card_price">${price}</p>
        <div>
          <button class="quantity-button decrease" data-id="${id}">-</button>
          <input type="number" class="quantity-input" value="${quantity}">
          <button class="quantity-button increase" data-id="${id}">+</button>
          <button class="enter-button" data-id="${id}">Enter</button>
          <button class="remove-button" data-id="${id}">Remove</button>
        </div>
      </div>`;
  }
  
  
  function MappingtheResponse(data) {
    data.forEach(e => {
      const cards = DynamicCards(e.img, e.title, e.brand, e.price, e._id, e.quantity);
      main.insertAdjacentHTML('beforeend', cards);
    });
  }
  
  
  main.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-button")) {
      const card = event.target.closest("#card");
      const cardId = event.target.dataset.id;
      const result = confirm("Do you want to Remove?");
      if(result){
        RemoveFromCart(cardId);
        card.remove();
      }
    
    }else if (event.target.classList.contains("increase")) {
      const cardId = event.target.dataset.id;
      const quantityInput = event.target.parentElement.querySelector(".quantity-input");
      const quantity = parseInt(quantityInput.value);
      const newQuantity = quantity + 1;
   
      quantityInput.value = newQuantity;
    } else if (event.target.classList.contains("decrease")) {
      const cardId = event.target.dataset.id;
      const quantityInput = event.target.parentElement.querySelector(".quantity-input");
      const quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        const newQuantity = quantity - 1;
        
         quantityInput.value = newQuantity;
      }
    }else if (event.target.classList.contains("enter-button")) {
      const cardId = event.target.dataset.id;
      const quantityInput = event.target.parentElement.querySelector(".quantity-input");
      const quantity = parseInt(quantityInput.value);
      updateQuantity(cardId, quantity);
    }
  });
  function updateQuantity(cardId, newQuantity) {
    const updateUrl = `https://colorful-helmet-slug.cyclic.app/cart/quantity/${cardId}`;
    fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'token': data
      },
      body: JSON.stringify({ q: newQuantity })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    })
    .then(data => {
      console.log(data);
      if (data.msg) {
        alert(data.msg);
       // AgaincallTotalprice()
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  function RemoveFromCart(cardId) {
   
   
   
      fetch(`${Remove_Url}${cardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': data
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Request failed with status ' + response.status);
          }
        })
        .then(data => {
          console.log(data);
          alert(data.msg);
          location.reload();
        })
        .catch(error => {
          console.error(error);
        });
    
  }
  
  function CalTotalPtice(data){
    data.map((e)=>{
      
      const price = parseFloat(e.price.replace(/₹|,/g, ''))*e.quantity

      total+=+price
    })
    total_pr.innerText=total
    discount_price.innerText=Math.floor(total*.2) 
    return Math.floor(total-(total*.2)) 
  }
  main.addEventListener("keypress", function(event) {
    if (event.target.classList.contains("quantity-input") && event.key === "Enter") {
      const cardId = event.target.parentElement.querySelector(".enter-button").dataset.id;
      const newQuantity = parseInt(event.target.value);
      updateQuantity(cardId, newQuantity);
    }
  });
  async function paymentpage(){
    const res=await fetch("https://colorful-helmet-slug.cyclic.app/cart/show",{
         method:"POST",
         headers:{
          "Content-Type": "application/json",
          token:token
         },
         
    });
    if(res.ok){
      const resdata=await res.json()
      if(resdata.length<=0){
        return alert("please add some product in cart")
      }
      try {
        const url = "https://colorful-helmet-slug.cyclic.app/order/new";
       const obj={
        products:resdata,
        quantity:resdata.length,
        totalprice:JSON.parse(localStorage.getItem("Amount")),
        Arriving:Date.now(),
        status:"pending"
       }
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type as JSON
            // Add any other headers as required (e.g., Authorization header with token)
            "token":token
          },
          body: JSON.stringify(obj), 
        });
      
        if (response.ok) {
          // Successful response (status code 2xx)
          const responseData = await response.json(); // Parse the JSON response
          console.log("Response data:", responseData);
          window.location.href="orders.html"
        } else {
          // Handle error responses (status codes other than 2xx)
          const errorData = await response.json(); // Parse the JSON error response
          console.error("Error data:", errorData);
        }
      } catch (error) {
        // Handle any network errors or exceptions
        console.error("An error occurred:", error);
      }
      
      
    }
   
   
  }