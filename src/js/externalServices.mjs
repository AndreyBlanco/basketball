const baseURL = import.meta.env.VITE_SERVER_URL;
const statsURL = import.meta.env.VITE_SERVER_STATS;
const apikey = import.meta.env.VITE_SERVER_KEY;
const checkURL = import.meta.env.VITE_SERVER_CHECK;

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: data };
  }
}

export async function getPlayersList() {
  var dataList = [];
  await fetch(baseURL + `Players` + apikey).then(response => response.json()).then(data => {dataList=data;});
  return dataList;
}

export async function getPlayerInfoById(playerID) {
  console.log(playerID);
  var dataList = [];
  await fetch(baseURL + `Player/` + playerID + apikey).then(response => response.json()).then(data => {dataList=data;});
  return dataList;
}

export async function getPlayerTeam() {
  var dataList = [];
  await fetch(baseURL + `AllTeams` + apikey).then(response => response.json()).then(data => {dataList=data;});
  return dataList;
}

export async function getPlayerStatsById(season, playerID) {
  var dataList = [];
  await fetch(statsURL + season + `/` + playerID + apikey).then(response => response.json()).then(data => {dataList=data;});
  return dataList;
}

export async function getPlayerNews(playerID) {
  var dataList = [];
  await fetch(baseURL + `NewsByPlayerID/` + playerID + apikey).then(response => response.json()).then(data => {dataList=data;});
  dataList = dataList[0];
  console.log(dataList);
  return dataList;  
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(checkURL + "checkout", options).then(convertToJson);
}
