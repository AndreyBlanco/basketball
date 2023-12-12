import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { getPlayerInfoById, getPlayerTeam, getPlayerStatsById, getPlayerNews } from "./externalServices.mjs";

let playerItems = {};

export default async function packDetails(playerId) {
    console.log(playerId);
    if (playerId != "none") {
        playerItems = await getPlayerInfoById(playerId);
        const playerImage = renderPlayerImage();
        console.log(playerImage);
        document.querySelector(".packsTitle").insertAdjacentHTML("afterend", playerImage);
    }
    
       document.getElementById("add20pack").addEventListener("click", function() {
        this.style = "display: none;"        
        let idItems = getLocalStorage("pack-cart");
        let pack = {"cant": "20", "playerId": playerId, "price": "50"};
        if (!idItems) {
            idItems = [];
        }
        
        idItems.push(pack);
        setLocalStorage("pack-cart", idItems);
    });

    document.getElementById("add10pack").addEventListener("click", function() {
        this.style = "display: none;" 
        let idItems = getLocalStorage("pack-cart");
        let pack = {"cant": "10", "playerId": playerId, "price": "28"};
        if (!idItems) {
            idItems = [];
        }
        
        idItems.push(pack);
        setLocalStorage("pack-cart", idItems);
    });

    document.getElementById("add5pack").addEventListener("click", function() {
        this.style = "display: none;" 
        let idItems = getLocalStorage("pack-cart");
        let pack = {"cant": "5", "playerId": playerId, "price": "15"};
        if (!idItems) {
            idItems = [];
        }
        
        idItems.push(pack);
        setLocalStorage("pack-cart", idItems);
    });

    document.getElementById("add3pack").addEventListener("click", function() {
        this.style = "display: none;" 
        let idItems = getLocalStorage("pack-cart");
        let pack = {"cant": "3", "playerId": playerId, "price": "8"};
        if (!idItems) {
            idItems = [];
        }
        
        idItems.push(pack);
        setLocalStorage("pack-cart", idItems);
    });
}

function renderPlayerImage() {
    return `<div class="fixPlayer">
        <img
            src=${playerItems.PhotoUrl}
            alt="Image of ${playerItems.FirstName} ${playerItems.LastName}"
        />
        <div id="fixbanner">
            <h2 class="card__name">${playerItems.FirstName} ${playerItems.LastName}</h2>
            <p> Purchase any of this packs and find ${playerItems.FirstName} ${playerItems.LastName} inside of it! </p>
        </div>
        </div>`
}
