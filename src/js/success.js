import { loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

document.querySelector("#newopen").addEventListener("click", function() {
  setLocalStorage("opened", true);            
  
  window.open("../collection/index.html", "_self");
});
