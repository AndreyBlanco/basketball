import { getPlayerInfoById } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const presetCards = {
  
      "offers": {
        "packs": [
          20000635,
          20002002,
          20002336
        ],
        "buys": [
          20002339,
          20002714,
          20003083
        ],
        "trades": [
          20000539,
          20000848,
          20003153
        ]
      }
  ,
  
      "toBuy":
        [
          {"cant": 1, "playerId": 20000345, "price": 10},
          {"cant": 1, "playerId": 20000457, "price": 15},
          {"cant": 1, "playerId": 20000549, "price": 25},
          {"cant": 1, "playerId": 20000726, "price": 30},
          {"cant": 1, "playerId": 20000758, "price": 5},
          {"cant": 1, "playerId": 20001831, "price": 8},
          {"cant": 1, "playerId": 20001912, "price": 45},
          {"cant": 1, "playerId": 20002296, "price": 16},
          {"cant": 1, "playerId": 20002303, "price": 34}
        ]
  ,
  
    "toTrade":
        [
            20000443,
            20000500,
            20000572,
            20000629,
            20000852,
            20001438,
            20001689,
            20002032,
            20002266
        ]

      };

async function offerTemplate(card) {
    const player = await getPlayerInfoById(card);

    return `<li class="offer-id">
    <a href="../packs/index.html?player-id=${player.PlayerID}">
      <img
        src=${player.PhotoUrl}
        alt="Image of ${player.FirstName} ${player.LastName}"
      />
      <h2 class="card__name">${player.FirstName} ${player.LastName}</h2>
    </a>
  </li>`;
}

export function buyList() {
  let list = getLocalStorage("buyList");
  if (!list) {
    list = [];
  }
  list = presetCards.toBuy;
  
  setLocalStorage("buyList", list);
};

export default async function offerList(){
  
  var htmlStringPacks = [];
  const StringPacks = presetCards.offers.packs.map(element => {
    return element;
  });

  StringPacks.forEach( async card => {
    htmlStringPacks = [await offerTemplate(card)];
    document.querySelector(".specialPack-list").insertAdjacentHTML("afterbegin", htmlStringPacks.join(""))
  });
  
  const StringBuys = presetCards.offers.buys.map(element => {
    return element;
  });

  StringBuys.forEach( async card => {
    htmlStringPacks = [await offerTemplate(card)];
    document.querySelector(".specialBuy-list").insertAdjacentHTML("afterbegin", htmlStringPacks.join(""))
  });

  const StringTrades = presetCards.offers.trades.map(element => {
    return element;
  });

  StringTrades.forEach( async card => {
    htmlStringPacks = [await offerTemplate(card)];
    document.querySelector(".specialTrade-list").insertAdjacentHTML("afterbegin", htmlStringPacks.join(""))
  });
  
}