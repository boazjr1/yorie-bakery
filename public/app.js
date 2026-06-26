let cart = [];

/* =====================
   ADD TO CART
===================== */
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    updateCart();
}

/* =====================
   UPDATE CART UI
===================== */
function updateCart() {
    let cartList = document.getElementById("cart");
    let totalDisplay = document.getElementById("total");

    cartList.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        let li = document.createElement("li");

        li.innerHTML = `
            ${item.name} x${item.qty} - K${item.price * item.qty}
            <button onclick="changeQty(${index}, -1)">-</button>
            <button onclick="changeQty(${index}, 1)">+</button>
            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartList.appendChild(li);
    });

    totalDisplay.innerText = "Total: K" + total;
}

/* =====================
   CHANGE QUANTITY
===================== */
function changeQty(index, change) {
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

/* =====================
   REMOVE ITEM
===================== */
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

/* =====================
   CHECKOUT (WHATSAPP)
===================== */
function checkout() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let deliveryType = document.getElementById("deliveryType").value;
let location = document.getElementById("location").value;
    
    if (deliveryType === "delivery" && location === "") {
    alert("Please select a delivery area");
    return;
}

    let message = "🍰 YORIE'S BAKERY ORDER%0A%0A";

    let total = 0;

    cart.forEach(item => {
        message += `${item.name} x${item.qty} - K${item.price * item.qty}%0A`;
        total += item.price * item.qty;
    });

    message += `%0ATOTAL: K${total}%0A%0A`;

    message += `Name: ${name}%0APhone: ${phone}%0AAddress: ${address}%0A`;

    if (deliveryType === "delivery") {
    message += `Delivery: YES (Yango Rider)%0A`;
    message += `Area: ${location}%0A`;
} else {
    message += `Delivery: Pickup%0A`;
}    

    if (location) {
        message += `Location: ${location}%0A`;
    }

    let whatsappNumber = "260761089989";

    let url = "https://wa.me/" + whatsappNumber + "?text=" + message;

    window.open(url, "_blank");
}