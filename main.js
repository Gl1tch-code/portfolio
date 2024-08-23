function mobileMenu() {
  const navbar = document.getElementById("mobile-nav-link");
  const navbarClasses = navbar.className.split(" ");

  if (navbarClasses.includes("closed")) {
    const newObj = navbarClasses.filter((el) => el !== "closed");
    newObj.push("opened");

    navbar.className = newObj.join(" ");
  } else if (navbarClasses.includes("opened")) {
    const newObj = navbarClasses.filter((el) => el !== "opened");
    newObj.push("closed");

    navbar.className = newObj.join(" ");
  }
}

document
  .querySelector(".mobile-humburger-menu")
  .addEventListener("click", mobileMenu);

document.querySelectorAll(".close").forEach((closer) => {
  closer.addEventListener("click", mobileMenu);
});

const form = document.getElementById("contact-me-form");

emailjs.init({
  publicKey: "8yDA8xqgWyprQp-74",
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formObject = {};

  formData.forEach((value, key) => {
    if (formObject[key]) {
      if (!Array.isArray(formObject[key])) {
        formObject[key] = [formObject[key]];
      }
      formObject[key].push(value);
    } else {
      formObject[key] = value;
    }
  });

  document.querySelector(".form-submit-btn").style.display = "none";
  document.querySelector(".form-loading-btn").style.display = "inline-block";

  await emailjs
    .send("service_glpg8gl", "template_c66aeqk", formObject)
    .then((response) => {
      if (response?.status === 200) {
        if (
          window.location.pathname === "/" ||
          window.location.pathname === ""
        ) {
          window.location.search = "";
          window.location.hash = "";
          window.location.pathname = "/thanks";
        } else if (window.location.pathname.includes("index.html")) {
          window.location.search = "";
          window.location.hash = "";
          window.location.pathname = window.location.pathname.replace(
            "index.html",
            "thanks"
          );
        } else if (window.location.pathname.startsWith("/")) {
          const pathArr = window.location.pathname.split("/").filter((el) => {
            if (el === "") {
              return false;
            } else if (el === "/") {
              return false;
            } else if (el.startsWith("#")) {
              return false;
            } else if (el.startsWith("?")) {
              return false;
            } else {
              return true;
            }
          });

          pathArr.unshift("");
          pathArr.push("thanks");

          window.location.search = "";
          window.location.hash = "";
          window.location.pathname = pathArr.join("/");
        }
      }
    });
});
