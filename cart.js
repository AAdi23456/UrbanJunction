let data=JSON.parse(localStorage.getItem("token"))
let total=0
let total_price=document.querySelector(".total-price")
let discount_price=document.getElementById("discount-price")
let total_pr=document.getElementById("total-pr")
let total_item=document.getElementById("total-item")
let total_pay=document.getElementById("total-pay")
let Remove_Url=`http://localhost:3000/cart/Remove/`
fetch("http://localhost:3000/cart/show", {
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
   console.log(TotalSum);
   total_price.textContent=TotalSum
   total_pay.textContent=TotalSum
   localStorage.setItem("Amount", TotalSum);
  }) 
  .catch(error => {
    console.error(error);
  });
  
  function DynamicCards(img, title, brand, price, id) {
    return `<div id="card">
        <img class="card_img" src="${img}">
        <p class="card_title">${title}</p>
        <h5 class="card_brand">${brand}</h5>
        <p class="card_price">${price}</p>
        <div>
          <button class="remove-button" data-id="${id}">Remove</button>
        </div>
      </div>`;
  }
  
  function MappingtheResponse(data) {
    data.forEach(e => {
      const cards = DynamicCards(e.img, e.title, e.brand, e.price, e._id);
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
    
    }
  });
  
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
      
      const price = parseFloat(e.price.replace(/₹|,/g, ''));

      total+=+price
    })
    total_pr.innerText=total
    discount_price.innerText=Math.floor(total*.2) 
    return Math.floor(total-(total*.2)) 
  }
