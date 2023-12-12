import { mycards, newcards } from "./collection.mjs";
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const mylist = getLocalStorage("my-cards");
if (mylist) {
    mycards();
}

if (getLocalStorage("opened") == "true") {
    document.querySelector("#openBtn").style.display = "display: none";
    newcards();
} else {
    const list = getLocalStorage("buyed-cards");
    console.log(list);
    if (!list) {
        document.querySelector("#openBtn").style = "display: none;";
    } else {
        document.querySelector("#openBtn").style.display = "display: block";
    }
}

