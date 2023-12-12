import { loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

document.querySelector("#newopen").addEventListener("click", function() {
  let idItems = getLocalStorage("opened");
  if (!idItems) {
    setLocalStorage("opened", "true");
  } else {
    setLocalStorage("opened", "true");
  }            
  
  window.open("../collection/index.html", "_self");
});
