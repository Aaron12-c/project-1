// Get references to default text and calculations container
const defaultText = document.getElementById("default-text");
const calculationsContainer = document.getElementById("calculations-container");

// Handle radio button selection for mortgage type
document.querySelectorAll(".mortgage-type").forEach((input) => {
  input.addEventListener("change", function () {
    document.querySelectorAll(".radio-inputs").forEach((div) => {
      div.classList.remove("selected");
    });
    if (this.checked) {
      this.parentElement.classList.add("selected");
    }
  });
});

// Calculate button click event
document.getElementById("calculate-btn").addEventListener("click", () => {
  // Retrieve values from inputs
  const amount = parseFloat(document.getElementById("mortgage-amount").value);
  const term = parseFloat(document.getElementById("mortgage-term").value);
  const rate = parseFloat(document.getElementById("interest-rate").value) / 100;
  const mortgageType = document.querySelector(
    'input[name="mortgage-type"]:checked'
  );

  let isValid = true;

  // Clear previous error styles
  document
    .querySelectorAll(".form-flex")
    .forEach((el) => el.classList.remove("error"));
  document.querySelectorAll(".form-alert").forEach((alert) => {
    alert.style.display = "none";
  });

  // Validate Mortgage Amount
  if (isNaN(amount) || amount <= 0) {
    document.getElementById("amount-alert").style.display = "block";
    document.getElementById("mortgage-amount-main").classList.add("error");
    isValid = false;
  }

  // Validate Mortgage Term
  if (isNaN(term) || term <= 0) {
    document.getElementById("term-alert").style.display = "block";
    document.getElementById("mortgage-term-main").classList.add("error");
    isValid = false;
  }

  // Validate Interest Rate
  if (isNaN(rate) || rate <= 0) {
    document.getElementById("rate-alert").style.display = "block";
    document.getElementById("interest-rate-main").classList.add("error");
    isValid = false;
  }

  // Validate Mortgage Type selection
  if (!mortgageType) {
    document.getElementById("type-alert").style.display = "block";
    document
      .querySelectorAll(".radio-inputs")
      .forEach((el) => el.classList.add("error"));
    isValid = false;
  }

  if (isValid) {
    let monthlyPayment = 0;
    let totalRepayment = 0;

    // Hide default text and show calculations container
    defaultText.classList.add("hide");
    calculationsContainer.classList.add("show");

    if (mortgageType.value === "repayment") {
      // Calculate monthly rate for repayment mortgage
      const monthlyRate = rate / 12;
      const n = term * 12;
      if (monthlyRate > 0) {
        monthlyPayment =
          (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
      } else {
        monthlyPayment = amount / n;
      }
      totalRepayment = monthlyPayment * n;
    } else if (mortgageType.value === "interest-only") {
      // Interest-only calculation
      monthlyPayment = (amount * rate) / 12;
      totalRepayment = amount + monthlyPayment * term * 12;
    }

    // Update results on the page
    document.getElementById("result").innerText = `$${monthlyPayment.toFixed(
      2
    )}`;
    document.getElementById(
      "term-result"
    ).innerText = `$${totalRepayment.toFixed(2)}`;
  } else {
    // If invalid, clear results and show default text
    document.getElementById("result").innerText = "";
    document.getElementById("term-result").innerText = "";
    defaultText.classList.remove("hide");
    calculationsContainer.classList.remove("show");
  }
});

// Clear button event handler
document.getElementById("clear-btn").addEventListener("click", () => {
  document.getElementById("mortgage-form").reset();
  document.getElementById("result").innerText = "";
  document.getElementById("term-result").innerText = "";

  // Remove error styles and messages
  document.querySelectorAll(".form-alert").forEach((alert) => {
    alert.style.display = "none";
  });
  defaultText.classList.remove("hide");
  calculationsContainer.classList.remove("show");
  document.querySelectorAll(".radio-inputs").forEach((div) => {
    div.classList.remove("selected");
  });
  document.querySelectorAll(".form-flex").forEach((el) => {
    el.classList.remove("error");
  });
});

// Initially hide all form alerts
document.querySelectorAll(".form-alert").forEach((alert) => {
  alert.style.display = "none";
});
