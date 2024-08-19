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
