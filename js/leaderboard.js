const xhttp = new XMLHttpRequest();
const endpoint =
  "http://ec2-54-212-48-25.us-west-2.compute.amazonaws.com/API/v1/score/";

const lead = "lead";
const leaderboard = "leaderboard";
const error_msg = "error_msg";

const enter_btn = "enter_btn";
const btn = document.getElementById(enter_btn);
btn.addEventListener("click", loadLeaderboard);

function loadLeaderboard() {
<<<<<<< HEAD
    let amount = document.getElementById(lead).value;
    let params = "count=" + amount;
    xhttp.open("GET", endpoint, true);
    xhttp.send(params);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let leader = document.getElementById(leaderboard);
=======
  let amount = document.getElementById(lead).value;
  let params = "?count=" + amount;
  xhttp.open("GET", endpoint, true);
  xhttp.send(params);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let leader = document.getElementById(leaderboard);
>>>>>>> 71c26e91fc2f14f5550a1b68fdfb2b8a4b198c5c

      let info = JSON.parse(this.responseText);
      for (let i = 0; i < info.length; i++) {
        let new_li = document.createElement("li");
        new_li.textContent =
          "Username: " + info[i].username + " | " + "Score: " + info[i].score;
        leader.appendChild(new_li);
      }
    }
  };
}
