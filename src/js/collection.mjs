import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { getPlayersList } from "./externalServices.mjs";

var newList = getLocalStorage('buyed-cards');
var myList = getLocalStorage("my-cards");
var players = await getPlayersList();

var list = [];
var secList = [];

document.querySelector("#openBtn").addEventListener("click", function() {
    document.querySelector("#openBtn").style = "display: none;";
    newcards();
});

export function mycards() {
    players.forEach(player => {
        myList.forEach(list => {
            list.forEach(pID =>{
                if (player.PlayerID == pID) {
                    const card = `<li class="myCard">
                        <a href="../player_page/index.html?player-id=${player.PlayerID}">
                            <img
                                src=${player.PhotoUrl} class="photo"
                                alt="Image of ${player.FirstName} ${player.LastName}"
                            />
                            <p class="card__name">${player.FirstName} ${player.LastName}</p>
                        </a>
                    </li>`

                    document.querySelector("#collection").insertAdjacentHTML("afterbegin", card);    
                }
            })
        })
    })
    document.querySelector("#openBtn").style = "display: none;";
}

export function newcards() {
    if (newList) {
        newList.forEach(element => {
            for (var i=0; i<element.cant; i++) {
                list.push(getRandomInt(players.length));
            }
            list.forEach(pID => {
                console.log(players[pID].PlayerID);
                secList.push(players[pID].PlayerID);
            })

            element.playerIds.forEach(pId => {
                secList.push(pId);
            })            
        });
    }
    let idItems = getLocalStorage("my-cards");
    if (!idItems) {
        idItems = [];
    }
            
    idItems.push(secList);
    setLocalStorage("my-cards", idItems);
    localStorage.removeItem('buyed-cards');
    localStorage.setItem("opened", "false")

    renderPlayerCards();
}

function getRandomInt(max) {
    return Math.floor(Math.random()* max );
}

function renderPlayerCards() {
    players.forEach(player => {
        secList.forEach(pID =>{
            if (player.PlayerID == pID) {
                const card = `<li class="myCard">
                    <a href="../player_page/index.html?player-id=${player.PlayerID}">
                        <img
                            src=${player.PhotoUrl}
                            alt="Image of ${player.FirstName} ${player.LastName}"
                        />
                        <p class="card__name">${player.FirstName} ${player.LastName}</p>
                    </a>
                </li>`

                document.querySelector("#newCollection").insertAdjacentHTML("afterbegin", card);    
            }
        })
    })
}

