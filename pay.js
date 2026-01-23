// Utility functions
function onlyNumbers(value) {
    return value.replace(/\D/g, "");
}

function limitLength(input, max) {
    input.value = input.value.slice(0, max);
}

// Input elements
const recipientPhone = document.getElementById("recipientPhone");
const ewalletNumber = document.getElementById("ewalletNumber");
const zip = document.getElementById("zip");
const cardNumber = document.getElementById("cardNumber");
const expiry = document.getElementById("expiry");
const cvv = document.getElementById("cvv");

// Apply numeric filters and limits
[recipientPhone, ewalletNumber].forEach(input => {
    if (!input) return;
    input.addEventListener("input", () => {
        input.value = onlyNumbers(input.value);
        limitLength(input, 11);
    });
});

zip.addEventListener("input", () => {
    zip.value = onlyNumbers(zip.value);
    limitLength(zip, 4);
});

cardNumber.addEventListener("input", () => {
    cardNumber.value = onlyNumbers(cardNumber.value);
    limitLength(cardNumber, 16);
});

expiry.addEventListener("input", () => {
    let value = onlyNumbers(expiry.value);
    if (value.length >= 3) value = value.slice(0,2) + "/" + value.slice(2,4);
    expiry.value = value.slice(0,5);
});

cvv.addEventListener("input", () => {
    cvv.value = onlyNumbers(cvv.value);
    limitLength(cvv, 3);
});
function togglePayment() {
    const payment = document.querySelector('input[name="payment"]:checked')?.value;
    const ewalletBox = document.getElementById("ewalletBox");
    const cardBox = document.getElementById("cardBox");

    ewalletBox.classList.remove("active");
    cardBox.classList.remove("active");

    if (payment === "GCash" || payment === "PayMaya") {
        ewalletBox.classList.add("active");
    }

    if (payment === "Card") {
        cardBox.classList.add("active");
    }
}

// Payment section toggle

// Submit order and generate receipt
function submitOrder() {
    // Shipping info
    const fullName = document.getElementById("fullName").value.trim();
    const street = document.getElementById("street").value.trim();
    const province = document.getElementById("province").value;
    const municipality = document.getElementById("municipality").value;
    const barangay = document.getElementById("barangay").value;
    const zipValue = document.getElementById("zip").value.trim();
    const recipientPhoneValue = document.getElementById("recipientPhone").value.trim();

    if (!fullName || !street || !province || !municipality || !barangay || !zipValue) {
        alert("Please complete all shipping information.");
        return;
    }

    if (!/^09\d{9}$/.test(recipientPhoneValue)) {
        alert("Contact number must be 11 digits and start with 09.");
        return;
    }

    // Coffee order from localStorage
    const orderData = JSON.parse(localStorage.getItem("coffeeOrder"));
    if (!orderData) {
        alert("No coffee order found. Go back to select your coffee.");
        return;
    }

    // Payment
    const payment = document.querySelector('input[name="payment"]:checked');
    if (!payment) {
        alert("Please select a payment method.");
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
        const card = document.getElementById("cardNumber").value.trim();
        const exp = document.getElementById("expiry").value.trim();
        const cvvValue = document.getElementById("cvv").value.trim();
        const location = document.getElementById("location").value.trim();

        if (!card || !exp || !cvvValue) {
            alert("Please complete all card details.");
            return;
        }
        if (!/^\d{16}$/.test(card)) { alert("Card number must be 16 digits."); return; }
        if (!/^\d{2}\/\d{2}$/.test(exp)) { alert("Expiry must be MM/YY format."); return; }
        if (!/^\d{3}$/.test(cvvValue)) { alert("CVV must be 3 digits."); return; }

        paymentDetails = `Card Number: **** **** **** ${card.slice(-4)}\nExpiry: ${exp}`;
        if (location) paymentDetails += `\nBilling Location: ${location}`;
    }

    // Prices
    const basePrice = orderData.basePrice;
    const icePrice = orderData.icePrice;
    const subtotal = orderData.subtotal;
    const vat = orderData.vat;
    const total = orderData.total;

    const timestamp = new Date().toLocaleString();

    // Generate receipt
    const receipt = `
        <h2>Order Receipt</h2>
        <p>Name: ${fullName}</p>
        <p>Address: ${street}, ${barangay}, ${municipality}, ${province}</p>
        <p>ZIP Code: ${zipValue}</p>
        <p>Contact Number: ${recipientPhoneValue}</p>
        <hr>
        <p>Coffee: ${orderData.coffee}</p>
        <p>Sugar Level: ${orderData.sugar}</p>
        <p>Ice: ${orderData.ice}</p>
        <p>Base Price: ₱${basePrice}</p>
        <p>Ice Fee: ₱${icePrice}</p>
        <p>Subtotal: ₱${subtotal.toFixed(2)}</p>
        <p>VAT (12%): ₱${vat.toFixed(2)}</p>
        <p class="total">TOTAL: ₱${total.toFixed(2)}</p>
        <p>Payment Method: ${payment.value}</p>
        <p>${paymentDetails.replace(/\n/g, "<br>")}</p>
        <p>Date & Time: ${timestamp}</p>
    `;

    document.getElementById("receiptContent").innerHTML = receipt;
    document.getElementById("receiptOverlay").classList.remove("hidden");
}

// Close receipt
function closeReceipt() {
    document.getElementById("receiptOverlay").classList.add("hidden");
}
