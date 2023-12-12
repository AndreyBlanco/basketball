import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
    const formData = new FormData(formElement), convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            cant: item.cant,
            playerId: item.playerId,
            price: item.price,
            quantity: 1,
        };
    });
    return simplifiedItems;
}

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    tax: 0,
    orderTotal: 0,
    cardsTotal: 0,
    idList:[],
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
        this.calculateCardsSummary();
    },

    calculateItemSummary: function() {
        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal"
        );
        const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
        );
        itemNumElement.innerText = this.list.length;
        const amounts = this.list.map((item) => item.price);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = "$" + this.itemTotal;
    },

    calculateCardsSummary: function() {
        const cards = this.list.map((item) => item.cant);
        this.cardsTotal = cards.reduce((sum, item) => sum + item);
        this.list.forEach((element) => {
            if (element.playerId != "none") {
                this.idList.push(element.playerId);
            }
        })
        this.cardsTotal = this.cardsTotal - this.idList.length;
    },
     
    calculateOrdertotal: function () {
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotal();

    },
    
    displayOrderTotal: function(){
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");
              
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    },
    checkout: async function (form) {
        const json = formDataToJSON(form);

        json.orderDate = new Date().toISOString();
        console.log(json.orderDate);
        json.orderTotal = this.orderTotal;
        json.tax = this.tax,
        json.items = packageItems(this.list);
        console.log(json);
        if (document.getElementById("checkmss")) {
            document.getElementById("checkmss").outerHTML= "";
        }
        try {
            const res = await checkout(json);
            let idItems = getLocalStorage("buyed-cards");
            console.log(this.cardsTotal, this.idList);
            let pack = {"cant": this.cardsTotal, "playerIds": this.idList};
            if (!idItems) {
                idItems = [];
            }
            
            idItems.push(pack);
            setLocalStorage("buyed-cards", idItems);
            localStorage.removeItem('pack-cart');
            localStorage.removeItem('sell-cart');
            localStorage.removeItem('buy-cart');
            localStorage.removeItem('final-cart');

            window.open("success.html", "_self");
        } catch (err) {
            const message = `<p id="checkmss"> Payment Failed. Please check the Credit Card Numbers and try again.`;
            document.querySelector("#checkpay").insertAdjacentHTML("afterbegin", message)
            console.log(err);
            
        }
    },
};

export default checkoutProcess;