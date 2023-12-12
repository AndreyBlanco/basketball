import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { getPlayerInfoById, getPlayerTeam, getPlayerStatsById, getPlayerNews } from "./externalServices.mjs";

let playerItems = {};
let playerTeam = {};
let playerStats = [];
let playerIdNews = {};

export default async function playerDetails(playerId) {
    
    playerItems = await getPlayerInfoById(playerId);

    let teams = await getPlayerTeam();

    playerIdNews = await getPlayerNews(playerItems.PlayerID);
    
    teams.forEach((team) => {
        if (team.TeamID == playerItems.TeamID) {
            playerTeam = team;
        }
    })

    renderPlayerDetails();
    playerData();
    playerNews();
   
    document.getElementById("addToSellList").addEventListener("click", addToCart);
}

async function playerData() {
    
    var season = new Date().getFullYear();
    playerStats = [];

    for (var i = 0; i < 3; i++) {
        playerStats.push(await getPlayerStatsById(season - i, playerItems.PlayerID));
    }

    document.querySelector("#stTable").innerHTML = renderStatsTable();
}

async function playerNews() {
    document.querySelector("#news").innerHTML = renderPlayerNews();
}

function renderPlayerNews() {
    const updated = new Date(playerIdNews.Updated).toLocaleDateString();
    return `<h1>News:</h1>
            <h2>${playerIdNews.Title}</h2>
            <p>Updated: ${updated}</p>
            <p>${playerIdNews.Content}</p>
            <a class="btns" href='${playerIdNews.Url}' target="_blank">Source: ${playerIdNews.Source}</a>`;
}

function renderStatsTable() {
    return `<table id='statsTable'>
        <tr>
            <td class="tbHead">Season</td>
            <td class="tbHead">${playerStats[2].Season}</td>
            <td class="tbHead">${playerStats[1].Season}</td>
            <td class="tbHead">${playerStats[0].Season}</td>
        </tr>
        <tr>
            <td class="tbHead">Assists</td>
            <td>${playerStats[2].Assists}</td>
            <td>${playerStats[1].Assists}</td>
            <td>${playerStats[0].Assists}</td>
        </tr>
        <tr>
            <td class="tbHead">Blocked Shots</td>
            <td>${playerStats[2].BlockedShots}</td>
            <td>${playerStats[1].BlockedShots}</td>
            <td>${playerStats[0].BlockedShots}</td>
        </tr>
        <tr>
            <td class="tbHead">Defensive Rebounds</td>
            <td>${playerStats[2].DefensiveRebounds}</td>
            <td>${playerStats[1].DefensiveRebounds}</td>
            <td>${playerStats[0].DefensiveRebounds}</td>
        </tr>
        <tr>
            <td class="tbHead">Double Doubles</td>
            <td>${playerStats[2].DoubleDoubles}</td>
            <td>${playerStats[1].DoubleDoubles}</td>
            <td>${playerStats[0].DoubleDoubles}</td>
        </tr>
        <tr>
            <td class="tbHead">Effective Field Goals %</td>
            <td>${playerStats[2].EffectiveFieldGoalsPercentage}</td>
            <td>${playerStats[1].EffectiveFieldGoalsPercentage}</td>
            <td>${playerStats[0].EffectiveFieldGoalsPercentage}</td>
        </tr>
        <tr>
            <td class="tbHead">Field Goals Attempted</td>
            <td>${playerStats[2].FieldGoalsAttempted}</td>
            <td>${playerStats[1].FieldGoalsAttempted}</td>
            <td>${playerStats[0].FieldGoalsAttempted}</td>
        </tr>
        <tr>
            <td class="tbHead">Field Goals Made</td>
            <td>${playerStats[2].FieldGoalsMade}</td>
            <td>${playerStats[1].FieldGoalsMade}</td>
            <td>${playerStats[0].FieldGoalsMade}</td>
        </tr>
        <tr>
            <td class="tbHead">Field Goals %</td>
            <td>${playerStats[2].FieldGoalsPercentage}</td>
            <td>${playerStats[1].FieldGoalsPercentage}</td>
            <td>${playerStats[0].FieldGoalsPercentage}</td>
        </tr>
        <tr>
            <td class="tbHead">Free Throws Attempted</td>
            <td>${playerStats[2].FreeThrowsAttempted}</td>
            <td>${playerStats[1].FreeThrowsAttempted}</td>
            <td>${playerStats[0].FreeThrowsAttempted}</td>
        </tr>
        <tr>
            <td class="tbHead">Free Throws Made</td>
            <td>${playerStats[2].FreeThrowsMade}</td>
            <td>${playerStats[1].FreeThrowsMade}</td>
            <td>${playerStats[0].FreeThrowsMade}</td>
        </tr>
        <tr>
            <td class="tbHead">Free Throws %</td>
            <td>${playerStats[2].FreeThrowsPercentage}</td>
            <td>${playerStats[1].FreeThrowsPercentage}</td>
            <td>${playerStats[0].FreeThrowsPercentage}</td>
        </tr>
        <tr>
            <td class="tbHead">Games</td>
            <td>${playerStats[2].Games}</td>
            <td>${playerStats[1].Games}</td>
            <td>${playerStats[0].Games}</td>
        </tr>
        <tr>
            <td class="tbHead">Minutes</td>
            <td>${playerStats[2].Minutes}</td>
            <td>${playerStats[1].Minutes}</td>
            <td>${playerStats[0].Minutes}</td>
        </tr
        <tr>
            <td class="tbHead">Offensive Rebounds</td>
            <td>${playerStats[2].OffensiveRebounds}</td>
            <td>${playerStats[1].OffensiveRebounds}</td>
            <td>${playerStats[0].OffensiveRebounds}</td>
        </tr
        <tr>
            <td class="tbHead">Personal Fouls</td>
            <td>${playerStats[2].PersonalFouls}</td>
            <td>${playerStats[1].PersonalFouls}</td>
            <td>${playerStats[0].PersonalFouls}</td>
        </tr
        <tr>
            <td class="tbHead">Points</td>
            <td>${playerStats[2].Points}</td>
            <td>${playerStats[1].Points}</td>
            <td>${playerStats[0].Points}</td>
        </tr
        <tr>
            <td class="tbHead">Started</td>
            <td>${playerStats[2].Started}</td>
            <td>${playerStats[1].Started}</td>
            <td>${playerStats[0].Started}</td>
        </tr
        <tr>
            <td class="tbHead">Steals</td>
            <td>${playerStats[2].Steals}</td>
            <td>${playerStats[1].Steals}</td>
            <td>${playerStats[0].Steals}</td>
        </tr
        <tr>
            <td class="tbHead">Three Pointers Attempted</td>
            <td>${playerStats[2].ThreePointersAttempted}</td>
            <td>${playerStats[1].ThreePointersAttempted}</td>
            <td>${playerStats[0].ThreePointersAttempted}</td>
        </tr
        <tr>
            <td class="tbHead">Three Pointers Made</td>
            <td>${playerStats[2].ThreePointersMade}</td>
            <td>${playerStats[1].ThreePointersMade}</td>
            <td>${playerStats[0].ThreePointersMade}</td>
        </tr
        <tr>
            <td class="tbHead">Three Pointers %</td>
            <td>${playerStats[2].ThreePointersPercentage}</td>
            <td>${playerStats[1].ThreePointersPercentage}</td>
            <td>${playerStats[0].ThreePointersPercentage}</td>
        </tr
        <tr>
            <td class="tbHead">Triple Doubles</td>
            <td>${playerStats[2].TripleDoubles}</td>
            <td>${playerStats[1].TripleDoubles}</td>
            <td>${playerStats[0].TripleDoubles}</td>
        </tr
        <tr>
            <td class="tbHead">True Shooting Attempts</td>
            <td>${playerStats[2].TrueShootingAttempts}</td>
            <td>${playerStats[1].TrueShootingAttempts}</td>
            <td>${playerStats[0].TrueShootingAttempts}</td>
        </tr
        <tr>
            <td class="tbHead">True Shooting %</td>
            <td>${playerStats[2].TrueShootingPercentage}</td>
            <td>${playerStats[1].TrueShootingPercentage}</td>
            <td>${playerStats[0].TrueShootingPercentage}</td>
        </tr
        <tr>
            <td class="tbHead">Turnovers</td>
            <td>${playerStats[2].Turnovers}</td>
            <td>${playerStats[1].Turnovers}</td>
            <td>${playerStats[0].Turnovers}</td>
        </tr
        <tr>
            <td class="tbHead">Two Pointers Attempted</td>
            <td>${playerStats[2].TwoPointersAttempted}</td>
            <td>${playerStats[1].TwoPointersAttempted}</td>
            <td>${playerStats[0].TwoPointersAttempted}</td>
        </tr
        <tr>
            <td class="tbHead">Two Pointers Made</td>
            <td>${playerStats[2].TwoPointersMade}</td>
            <td>${playerStats[1].TwoPointersMade}</td>
            <td>${playerStats[0].TwoPointersMade}</td>
        </tr
        <tr>
            <td class="tbHead">Two Pointers %</td>
            <td>${playerStats[2].TwoPointersPercentage}</td>
            <td>${playerStats[1].TwoPointersPercentage}</td>
            <td>${playerStats[0].TwoPointersPercentage}</td>
        </tr
   </table>`;
}

function addToCart() {
    document.getElementById("addToSellList").style = "display: none;";
    
    let idItems = getLocalStorage("sell-cart");

    if (!idItems) {
        idItems = [];
    }

    idItems.push(playerItems)
    setLocalStorage("sell-cart", idItems);

    let reference = getLocalStorage("buyList");
    let buydef = [];  
    
    idItems.forEach(elem => {
        reference.forEach(ref => {
            console.log(elem.PlayerID, ref.playerId);
            if (elem.PlayerID == ref.playerId) {
                const pack = {"cant": 1, "playerId": elem.PlayerID, "price": ref.price};
                buydef.push(pack);
            }
        })
    })
    localStorage.removeItem('buy-cart');
    setLocalStorage("buy-cart", buydef);
}
function renderPlayerDetails() {
    document.querySelector("#playerImage").src = playerItems.PhotoUrl;
    document.querySelector("#playerImage").alt = playerItems.FirstName;
    document.querySelector("#playerFirstname").innerText = playerItems.FirstName + " " + playerItems.LastName;
    document.querySelector("#playerTeam").innerText = "Team: " + playerTeam.Name + " " + playerItems.Team;
    document.querySelector("#teamImage").src = playerTeam.WikipediaLogoUrl;
    document.querySelector("#teamImage").alt = playerTeam.Name;
    document.querySelector("#playerHeight").innerText = "Height: " + playerItems.Height + " ''";
    document.querySelector("#playerWeight").innerHTML = "Weight: " + playerItems.Weight + " lbs";
    const birthDate = new Date(playerItems.BirthDate).toLocaleDateString();
    document.querySelector("#playerBirthDate").innerText = "BirthDate: " + birthDate;
    document.querySelector("#playerBirthCity").innerHTML = "BirthCity: " + playerItems.BirthCity + ", " + playerItems.BirthState + ", " + playerItems.BirthCountry;
    document.querySelector("#playerCollege").innerText = "College: " + playerItems.College;
    document.querySelector("#playerSalary").innerHTML = "Salary: $" + Intl.NumberFormat('en-US').format(playerItems.Salary);
    document.querySelector("#addToSellList").dataset.id = playerItems.PlayerID;
}
  
 
