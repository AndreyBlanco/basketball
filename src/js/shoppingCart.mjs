import { getLocalStorage, renderWithTemplates, renderListWithTemplate } from "./utils.mjs";
import { getPlayersList } from "./externalServices.mjs";

var buyItems = getLocalStorage("buyList");
var players = await getPlayersList();
const cartItems = getLocalStorage("sell-cart");
const packItems = getLocalStorage("pack-cart");
const outputEl = document.querySelector(".product-list");
const outputPack = document.querySelector(".product-pack-list");

export default function shoppingCart() {
    if (cartItems) {
      renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
    }
    if (packItems) {
      packItemTemplate();
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

function packItemTemplate() {
    players.forEach(player => {
      packItems.forEach(item =>{
        if (item.playerId == "none") {
          let message = `<li class="pack-divider">
          <table>
            <tr>
              <td>Pack with ${packItem.cant} cards | </td>
              <td>Without a fixed Player | </td>
              <td>Price: $${item.price}.00</td>
            </tr>
          </table>
        </li>`;
        addMessage(message);
      } else if (player.PlayerID == item.playerId) {
          console.log(player.PlayerID, item.playerId);
          let message = `<li class="pack-divider">
          <table>
            <tr>
              <td>Pack with ${item.cant} cards | </td>
              <td>Fixed Player: ${player.FirstName} ${player.LastName} | </td>
              <td>Price: $${item.price}.00</td>
            </tr>
          </table>
        </li>`;
        addMessage(message);
      }
    })
  })
}

function addMessage(message) {
  outputPack.insertAdjacentHTML("afterbegin", message);
}
