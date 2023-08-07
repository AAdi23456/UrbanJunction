
document.addEventListener("DOMContentLoaded", function () {
    const productId = localStorage.getItem("selectedProductId");
 
 
    if (productId) {
      fetchProductData(productId);
    } else {
      console.log("Product ID not found in localStorage.");
    }
  });
  
  function fetchProductData(productId) {
    const productContainer = document.querySelector(".product-container");
    const productImage = document.querySelector(".product-image");
    const productTitle = document.querySelector(".product-title");
    const productDescription = document.querySelector(".product-description");
    const productPrice = document.querySelector(".product-price");
  
    fetch(`https://gifted-tights-yak.cyclic.app/product/one/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        const addtocart=document.getElementById("add-to-cart-button")
        const Cart_url = "https://gifted-tights-yak.cyclic.app/cart/add";
      
        productImage.src = data.img;
        productTitle.textContent = data.title;
        productDescription.textContent = data.brand;
        productPrice.textContent = `${data.price}`;
        addtocart.addEventListener("click",(e)=>{
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
        })
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        productContainer.innerHTML = "Error fetching product data.";
      });
  }
  const search=document.getElementById("search")
  search.addEventListener("click",(e)=>{
      e.preventDefault()
      window.location.href="Mens.html"
  })