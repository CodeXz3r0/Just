// Scroll to menu
function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

// Toggle More Info
function toggleDetails() {
    document.getElementById("details").classList.toggle("hidden");
}

// Open order box
function openOrder() {
    document.getElementById("orderBox").classList.toggle("hidden");
}

// Toggle payment boxes
function togglePayment() {
    const payment = document.querySelector('input[name="payment"]:checked')?.value;
    document.getElementById("ewalletBox").classList.add("hidden");
    document.getElementById("cardBox").classList.add("hidden");
    if (payment === "GCash" || payment === "PayMaya") document.getElementById("ewalletBox").classList.remove("hidden");
    if (payment === "Card") document.getElementById("cardBox").classList.remove("hidden");
}

// Submit order
function submitOrder() {
    const coffee = document.querySelector('input[name="coffee"]:checked');
    const sugar = document.querySelector('input[name="sugar"]:checked');
    const ice = document.querySelector('input[name="ice"]:checked');
    const payment = document.querySelector('input[name="payment"]:checked');

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("contactNumber").value.trim();
    const barangay = document.getElementById("barangay").value;
    const sitio = document.getElementById("sitio").value;

    if (!coffee || !sugar || !ice || !payment || !name || !phone || !barangay || !sitio) {
        alert("Please complete all required fields.");
        return;
    }

    if (!/^\d{11}$/.test(phone)) {
        alert("Phone number must be 11 digits.");
        return;
    }

    let paymentDetails = "";

    if (payment.value === "GCash" || payment.value === "PayMaya") {
        const number = document.getElementById("ewalletNumber").value.trim();
        if (!/^09\d{9}$/.test(number)) {
            alert("Mobile number must be 11 digits and start with 09.");
            return;
        }
        paymentDetails = `Mobile Number: ${number}\nReference Number: ${Math.floor(1000 + Math.random() * 9000)}`;
    }

    if (payment.value === "Card") {
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const expiry = document.getElementById("expiry").value.trim();
        const cvv = document.getElementById("cvv").value.trim();
        const location = document.getElementById("location").value.trim();

        if (!cardNumber || !expiry || !cvv) {
            alert("Please complete all required card details.");
            return;
        }
        if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
            alert("Card number must be 16 digits.");
            return;
        }
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            alert("Expiration date must be MM/YY format.");
            return;
        }
        if (!/^\d{3}$/.test(cvv)) {
            alert("CVV must be 3 digits.");
            return;
        }
        paymentDetails = `Card Number: **** **** **** ${cardNumber.slice(-4)}\nExpiry: ${expiry}`;
        if (location) paymentDetails += `\nBilling Location: ${location}`;
    }

    let basePrice = coffee.value === "Classic Black" ? 20 : coffee.value === "Milk" ? 30 : coffee.value === "Chocolate" ? 45 : 20;
    const icePrice = ice.value === "Yes" ? 5 : 0;
    const subtotal = basePrice + icePrice;
    const vat = subtotal * 0.12;
    const total = subtotal + vat;

    const receipt = `
        <h2>Order Receipt</h2>
        <p>Customer: ${name}</p>
        <p>Phone: ${phone}</p>
        <p>Barangay: ${barangay}</p>
        <p>Purok/Sitio: ${sitio}</p>
        <hr>
        <p>Coffee: ${coffee.value}</p>
        <p>Sugar Level: ${sugar.value}</p>
        <p>Ice: ${ice.value}</p>
        <p>Base Price: ₱${basePrice}</p>
        <p>Ice Fee: ₱${icePrice}</p>
        <p>Subtotal: ₱${subtotal.toFixed(2)}</p>
        <p>VAT (12%): ₱${vat.toFixed(2)}</p>
        <p class="total">TOTAL: ₱${total.toFixed(2)}</p>
        <p>Payment Method: ${payment.value}</p>
        <p>${paymentDetails.replace(/\n/g, "<br>")}</p>
    `;

    document.getElementById("receiptContent").innerHTML = receipt;
    document.getElementById("receiptOverlay").classList.remove("hidden");
}

// Close receipt
function closeReceipt() {
    document.getElementById("receiptOverlay").classList.add("hidden");
}

// Contact form
function submitContactForm(event) {
    event.preventDefault();
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    alert(`CONTACT RECEIPT\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}\n\nThank you for contacting Treat a Cup.`);
}
