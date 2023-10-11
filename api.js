






let battle = false;
let shot = false;
let user = 1;
let finished = false;
let count = 0;
let names_of_fighters = [];
let flyBoys = [];
let defenders = [];
let Dhealth = 120;
let Fhealth = 100;
let increase = 1;
let counts = 1;

let comment = document.getElementById("comment");
let gaz = document.getElementById("gaz");
let is = document.getElementById("is");
let btn = document.getElementById("btn");

function shakeBackground() {
  const body = document.body;
  body.classList.add("shake");
  setTimeout(() => {
    body.classList.remove("shake");
  }, 8000)
}

setTimeout(shakeBackground, 4000);

let music = new Audio("battle1.mp3")
const introSong = async() => {
    music.play();
}

let action = new Audio("modern.mp3")

const battleSong = async() => {
    action.play()
}

const time = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

async function pilots() {
  try {
    for (let i = 0; i < 10; i++) {
      let url = `https://jsonplaceholder.typicode.com/users/${user}`;
      let request = new Request(url, {
        method: "GET",
      });
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error("Couldn't complete fetching: " + response.statusText);
      }
      const data = await response.json();
      user++;
      names_of_fighters.push(data.name);
    }
    finished = true;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

const sendPilots = () => {
  if (finished === true) {
    comment.value = "ISRAELI PILOTS";
    for (let i = 0; i < names_of_fighters.length; i++) {
      flyBoys.push(`${names_of_fighters[i]}`);
      comment.value = `${names_of_fighters[i]}`;
      count++;
      if (count === 3) {
        break;
      }
    }
  }
};

const anti_aircraft = () => {
  comment.value = "GAZA TROOPS";
  for (let i = 3; i < names_of_fighters.length; i++) {
    defenders.push(` ${names_of_fighters[i]}`);
    comment.value = `${names_of_fighters[i]}`;
    count++;
    if (count === 10) {
      break;
    }
  }
};

let randFighter = () => {
  let random = Math.floor(Math.random() * flyBoys.length);
  return flyBoys[random];
};

let randDefender = () => {
  let random = Math.floor(Math.random() * defenders.length);
  return defenders[random];
};

const Deffire = () => {
  let pin_pilot = randFighter();
  let Defammo = [pin_pilot, "•", "•", "•"];
  for (let i = 0; i < 1; i++) {
    const random = Math.floor(Math.random() * Defammo.length);
    comment.value = `${Defammo[random]}`;
  }
};

const pilotfire = () => {
  let pin_def = randDefender();
  let flyammo = [pin_def, "•", "•", "•"];
  for (let i = 0; i < 3; i++) {
    const random = Math.floor(Math.random() * flyammo.length);
    comment.value = `${flyammo[random]}`;
  }
};

const pilotBattle = async () => {
  while (Dhealth > 0 && Fhealth > 0) {
    const pin_pilot = randFighter();
    const hitTarget = Math.random() < 0.5;

    if (hitTarget) {
      comment.value = `Gaza fighter ${pin_pilot} is hit!`;
      Dhealth -= 10;
      is.value = increase;
      increase++;
    } else {
      comment.value = "Target missed.";
    }

    if (increase === counts && Dhealth <= 0) {
      comment.value = "It was a draw";
      return "None";
    } else if (Dhealth <= 0) {
      comment.value = "All targets destroyed... ISRAEL WINS";
      return "ISRAEL";
    }

    await time(1800);
  }
};

const tankBattle = async () => {
  while (Dhealth > 0 && Fhealth > 0) {
    const pin_def = randDefender();
    const hitTarget = Math.random() < 0.5;

    if (hitTarget) {
      comment.value = `Israel Pilot ${pin_def} is hit!`;
      Fhealth -= 15;
      gaz.value = counts;
      counts++;
    } else {
      comment.value = "Target missed.";
    }

    if (increase === counts && Fhealth <= 0) {
      comment.value = "It was a draw";
      return "None";
    } else if (Fhealth <= 0) {
      comment.value = "All targets destroyed... ISRAEL WINS";
      return "GAZA";
    }

    await time(2000);
  }
};

let clicked = true
btn.addEventListener("click",() => {
    if(clicked){
        battleSong()
    }else{
       // battleSong()
        clicked = !clicked
    }
    
})

pilots()
  .then(async () => {
    comment.value = "ALIVEXEMTECH 2023 WARFARE";
  //  introSong()
    await time(4000);
    comment.value = "ISRAEL VS GAZA";
    await time(5000);
    sendPilots();
    await time(5000);
    anti_aircraft();
    await time(5000);
    comment.value = "BATTLE BEGINS IN";
    await time(2000);
    comment.value = "3";
    await time(2000);
    comment.value = "2";
    await time(2000);
    comment.value = "1";
 //   battlesong()
    await time(4000);

    Promise.race([tankBattle(), pilotBattle()]).then((winner) => {
      if (winner === "ISRAEL") {
        comment.value = "All targets destroyed... GAZA WINS";
      } else if (winner === "GAZA") {
        comment.value = "All targets destroyed... ISRAEL WINS";
      } else {
        comment.value = "It was a draw";
      }
    });
  });
