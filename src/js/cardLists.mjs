import { getPlayersList } from "./externalServices.mjs";

const players = getPlayersList();

export default function playersList(){
     return players;
}

