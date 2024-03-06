export const showMultipleToasts = (messages, type) => {
  console.log("messages: ", messages);
  // Get the toast container
  var toastContainer = document.getElementById("toastContainer");

  const color = type === "Error" ? "red" : "green";
  const background = type === "Error" ? "toast-error-bg" : "toast-success-bg";
  const image =
    type === "Error"
      ? "Red-Cross-Transparent-PNG.png"
      : "check-mark-icon-png.webp";

  // Loop through the messages array and create a toast for each message
  messages.forEach(function (message) {
    // Create a new toast element
    var toastElement = document.createElement("div");
    toastElement.className = "toast";

    // Add other necessary classes for styling
    toastElement.classList.add("show");
    toastElement.classList.add(color);

    // Set the content of the toast
    toastElement.innerHTML = `
        <div class="d-flex toast-header ${background} justify-content-between p-3">
        <div class="d-flex flex-start gap-3 align-items-center" style="color: ${color};">
          <img src="/assets/${image}" style="width: 20px; height: 20px;"></img>
          <p style="color: ${color};" class="me-auto"><span style="color: ${color}; font-weight:800;">${type}</span>: ${message}</p>
        </div>
          <button id="close-toast-btn" type="button" style="color: ${color};" class="btn-close" data-dismiss="toast" aria-label="Close"></button>
        </div>
      `;
    //        <div class="toast-body">
    //   <h4>${message}</h4>
    // </div>

    const closeButton = toastElement.querySelector("#close-toast-btn");
    closeButton.addEventListener("click", function () {
      // Manually close the toast
      const bsToast = new bootstrap.Toast(toastElement);
      bsToast.hide();
    });

    toastElement.classList.add("toast-error-bg");

    // Append the toast to the toast container
    toastContainer.appendChild(toastElement);

    // Initialize the Bootstrap Toast
    var bootstrapToast = new bootstrap.Toast(toastElement, {
      delay: 5000,
    });
    bootstrapToast.show();
  });
};

export const containsOnlyNumbersOrAlphabets = (str) => {
  return /^[0-9]+$|^[a-zA-Z]+$/.test(str);
};

export const validateTournamentUserInput = (
  userOneInput,
  userTwoInput,
  userThreeInput,
  userFourInput
) => {
  console.log("userinput: ", userOneInput);
  if (
    userOneInput.value.trim() !== "" &&
    userTwoInput.value.trim() !== "" &&
    userThreeInput.value.trim() !== "" &&
    userFourInput.value.trim() !== ""
  ) {
    if (
      containsOnlyNumbersOrAlphabets(userOneInput.value.trim()) &&
      containsOnlyNumbersOrAlphabets(userTwoInput.value.trim()) &&
      containsOnlyNumbersOrAlphabets(userThreeInput.value.trim()) &&
      containsOnlyNumbersOrAlphabets(userFourInput.value.trim())
    )
      return true;
  }
  return false;
};
