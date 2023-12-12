import { getLocalStorage } from "./utils.mjs";
import { getPlayersList } from "./externalServices.mjs";

var players = []

async function getPlayers() {
    players = await getPlayersList();
}

getPlayers();

export function buylists() {
    var buyList = getLocalStorage("buyList");
    players.forEach(player => {
        buyList.forEach(elem => {
            if (player.PlayerID == elem.playerId) {
                const card = `<li class="myCard">
                    <a href="../buy_page/index.html?player-id=${player.PlayerID}">   
                        <img class="photo" src=${player.PhotoUrl} alt="Image of ${player.FirstName} ${player.LastName}"/>
                        <p class="card__name">${player.FirstName} ${player.LastName}</p>
                        <p>Price $${elem.price}</p>
                    <a>
                </li>`
    
                document.querySelector("#buyAll").insertAdjacentHTML("afterbegin", card)    
            }
        })
    })
}
