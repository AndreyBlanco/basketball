import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";
import playersList from "./cardLists.mjs";

var buyItems = getLocalStorage("buyList");

export default function shoppingCart() {
    const cartItems = getLocalStorage("sell-cart");
    const packItems = getLocalStorage("pack-cart");
    

    const outputEl = document.querySelector(".product-list");
    const outputPack = document.querySelector(".product-pack-list");
    if (cartItems) {
      renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
    }
    if (packItems) {
      renderListWithTemplate(packItemTemplate, outputPack, packItems);
    }
}

function cartItemTemplate(item) {
    var price = "";
  
    buyItems.forEach(card => {
      if (card.playerId == item.PlayerID) {
        price = card.price
      }
    })

    const newItem = `<li class="card-card-divider">
        <table>
          <tr>
            <td><img class="imgCart" src=${item.PhotoUrl} alt="Image of ${item.FirstName} ${item.LastName}"/></td>
            <td>   ${item.FirstName} ${item.LastName} | </td>
            <td>Price: $${price}.00</td>
          </tr>
        </table>
      </li>`;

    return newItem;
}

function packItemTemplate(item) {
  let message = "";
  let players = [];
  if (item.playerId == "none") {
      message = "Without a fixed Player | ";
  } else {
    players = playersList(); 
    players.forEach(player => {
      if (player.PlayerID == item.playerid) {
        message = `Fixed Player: ${player.FirstName} ${player.LastName} | `;
      }
    })
  }

  const newItem = `<li class="pack-divider">
      <table>
        <tr>
          <td>Pack with ${item.cant} cards | </td>
          <td>${message}</td>
          <td>Price: $${item.price}.00</td>
        </tr>
      </table>
    </li>`;
  
  return newItem;

}