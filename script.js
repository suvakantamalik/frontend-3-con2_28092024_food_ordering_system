function getMenu () {
  return fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
  .then((response) => response.json())
  .then((foodItems) => {
    let menuDiv = document.getElementById("menu");
    foodItems.forEach((item) => {
      const foodItem = document.createElement("div");
      foodItem.setAttribute("class", "food-item");
      foodItem.innerHTML = `
        <img src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="${item.name}">
        <div class="tag">
          <span>
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
          </span>
          <a>
            <i class="fa-solid fa-plus"></i>
          </a>
        </div>
      `;

      menuDiv.appendChild(foodItem);
    });
  })

  .catch((error) => {
    console.error("Error fetching the menu:", error);
  })
}

function takeOrder () {
  return new Promise((resolve) => {
    setTimeout(() => {
      const burgers = [
        "Cheeseburger",
        "Veggie Burger",
        "Chicken Burger",
        "BBQ Burger",
        "Fish Burger",
      ];
      const selectedBurgers = [];
      for(let i = 0; i <3; i++) {
        selectedBurgers.push(
          burgers[Math.floor(Math.random() * burgers.length)]
        )
      }
      resolve({ burgers: selectedBurgers });
    }, 2500)
  })
}

function orderPrep () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500)
  })
}

function payOrder () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000)
  })
}

function thankYouFnc () {
  alert("Thank you for eating with us today!");
}

function processOrder(){
  getMenu ()
  .then(() => {
    return takeOrder();
  })
  .then((order) => {
    console.log("Order Placed:", order);
    return orderPrep();
  })
  .then((orderStatus) => {
    console.log("Order preparation Status", orderStatus);
    return payOrder();
  })
  .then((paymentStatus) => {
    console.log("Payment Status", paymentStatus);
    if (paymentStatus.paid) {
      thankYouFnc();
    }
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
}

processOrder();