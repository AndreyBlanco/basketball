import { getParam, loadHeaderFooter } from "./utils.mjs";
import playerDetails from "./cardDetails.mjs";

loadHeaderFooter();

const playerId = getParam("player-id");
playerDetails(playerId);


