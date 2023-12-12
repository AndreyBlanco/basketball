import { mycards, newcards } from "./collection.mjs";
import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const mylist = getLocalStorage("my-cards");
const buyedlist = getLocalStorage("buyed-cards");
var open = getLocalStorage("opened");

if (mylist) {
    mycards();
}

console.log(open, buyedlist.length);

if (open == false && buyedlist.length != 0) {
    document.querySelector("#openBtn").style = "display: block;";   
} else if (open == true && buyedlist.length > 0) {
    newcards();
    document.querySelector("#openBtn").style = "display: none;";
    open = false;
    setLocalStorage("opened", open)
}

