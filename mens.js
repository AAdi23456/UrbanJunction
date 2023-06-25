document.addEventListener('DOMContentLoaded', function() {
  const main = document.getElementById("main");

  localStorage.setItem("token", JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh2ayIsImlhdCI6MTY4NzM3OTM5NX0.3MeNTPonff9E9ZGm7cmffMraV6nUZ0Qb8soQxyw8Qrs"));

  const url = "http://localhost:3000/men/show";
  const Cart_url = "http://localhost:3000/cart/add";
  
  FetchData(url);

  function FetchData(url) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(data => {
        MappingtheResponse(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function MappingtheResponse(data) {
    data.forEach(e => {
      const cards = DynamicCards(e.img, e.title, e.brand, e.price);
      main.insertAdjacentHTML('beforeend', cards);
    });
  }

  function DynamicCards(img, title, brand, price) {
    return `<div id="card">
        <img class="card_img" src="${img}">
        <p class="card_title">${title}</p>
        <h5 class="card_brand">${brand}</h5>
        <p class="card_price">${price}</p>
        <button class="cart-button">Add to cart</button>
      </div>`;
  }

  const cart_button = document.querySelector(".cart-button");

  function AddtoCart(img, title, brand, price, Cart_url) {
    let data = {
      img,
      title,
      brand,
      price,
     
    };
    
    fetch(Cart_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "token": JSON.parse(localStorage.getItem("token")),
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
        console.log(data);
        alert(data.msg);
      })
      .catch(error => {
        console.error(error);
      });
  }

  main.addEventListener("click", function(event) {
    if (event.target.classList.contains("cart-button")) {
      const card = event.target.closest("#card");
      const card_img = card.querySelector(".card_img").src;
      const card_title = card.querySelector(".card_title").textContent;
      const card_brand = card.querySelector(".card_brand").textContent;
      const card_price = card.querySelector(".card_price").textContent;
      AddtoCart(card_img, card_title, card_brand, card_price, Cart_url);
    }
  });
});
