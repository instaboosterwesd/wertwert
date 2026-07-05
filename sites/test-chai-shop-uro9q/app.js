const SITE_DATA = {
  businessName: "Test Chai Shop",
  phone: "0300-1234567",
  address: "Lahore, Pakistan",
  hours: "9am - 9pm",
  instagram: "",
};

function render(data) {
  const app = document.getElementById("app");
  const igHandle = data.instagram ? data.instagram.replace(/^@/, "") : "";

  const rows = [];
  if (data.phone) {
    rows.push(
      '<div class="detail"><div class="label">Phone</div><div class="value"><a href="tel:' +
        data.phone +
        '">' +
        data.phone +
        "</a></div></div>",
    );
  }
  if (data.address) {
    rows.push(
      '<div class="detail"><div class="label">Address</div><div class="value">' +
        data.address +
        "</div></div>",
    );
  }
  if (data.hours) {
    rows.push(
      '<div class="detail"><div class="label">Hours</div><div class="value">' +
        data.hours +
        "</div></div>",
    );
  }
  if (igHandle) {
    rows.push(
      '<div class="detail"><div class="label">Instagram</div><div class="value"><a href="https://instagram.com/' +
        igHandle +
        '" target="_blank" rel="noopener">@' +
        igHandle +
        "</a></div></div>",
    );
  }

  app.innerHTML =
    '<div class="card">' +
    "<h1>" +
    data.businessName +
    "</h1>" +
    '<div class="tagline">Welcome to ' +
    data.businessName +
    "</div>" +
    '<div class="divider"></div>' +
    rows.join("") +
    "</div>";
}

render(SITE_DATA);
