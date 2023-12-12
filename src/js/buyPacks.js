import { getParam, loadHeaderFooter } from "./utils.mjs";
import packDetails from "./buyPacks.mjs";

loadHeaderFooter();

const playerId = getParam("player-id");
console.log(playerId);

if (playerId) {
    packDetails(playerId);
} else {
    packDetails("none");
}