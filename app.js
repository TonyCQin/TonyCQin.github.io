class Participant {
    constructor(username, tier, rank, LP, orderingScore, snapshotPoints = 0) {
      this.username = username;
      this.tier = tier;
      this.rank = rank;
      this.LP = LP;
      this.orderingScore = orderingScore;
      this.snapshotPoints = snapshotPoints;
    }
    tierMapping(tier) {
      const tierMap = new Map();
      tierMap.set("IRON", 1000);
      tierMap.set("BRONZE", 2000);
      tierMap.set("SILVER", 3000);
      tierMap.set("GOLD", 4000);
      tierMap.set("PLATINUM", 5000);
      tierMap.set("DIAMOND", 6000);
      tierMap.set("MASTER", 7000);
      tierMap.set("GRANDMASTER", 7000);
      tierMap.set("CHALLENGER", 7000);
      return tierMap[tier];
    }
    rankMapping(rank) {
      const rankMap = new Map();
      rankMap.set("IV", 100);
      rankMap.set("III", 200);
      rankMap.set("II", 300);
      rankMap.set("I", 400);
      rankMap(rank);
    }
    static compareFn(a, b) {
      if (a.orderingScore > b.orderingScore) {
        return -1;
      }
      if (a.orderingScore < b.orderingScore) {
        return 1;
      }
      return 0;
    }
    addSnapshotPoints(n) {
      this.snapshotPoints += n;
    }
  }
//function to write innerHTML
const participantInnerHTML = function (
  summonerName,
  tier,
  rank,
  leaguePoints,
  snapshotPoints
) {
  let players = document.querySelector(".centre-align");

  let player = document.createElement("div");
  player.classList.add("player");

  let docUsername = document.createElement("a");
  docUsername.innerText = `${summonerName}`;
  docUsername.setAttribute("id", "username");

  let docRank = document.createElement("a");
  docRank.innerText = `${tier} ${rank} ${leaguePoints} LP`;
  docRank.setAttribute("id", "rank");

  let docSnapshotPoints = document.createElement("a");
  docSnapshotPoints.innerText = `${snapshotPoints}`;
  docSnapshotPoints.setAttribute("id", "snapshot-points");

  let playerStats = [docUsername, docRank, docSnapshotPoints];
  playerStats.forEach(function (html) {
    player.append(html);
  });

  players.append(player);
};


fetch("tft.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // You can now access the parsed data as a JavaScript object
    data.forEach((player) => {
      participantInnerHTML(
        player.username,
        player.tier,
        player.rank,
        player.LP,
        player.snapshotPoints
      );
    });
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
  });