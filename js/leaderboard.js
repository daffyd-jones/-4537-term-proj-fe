const xhttp = new XMLHttpRequest();
const endpoint =
  "http://ec2-54-212-48-25.us-west-2.compute.amazonaws.com/API/v1/score/";

const leaderboard = "leaderboard";
const error_msg = "error_msg";


function loadLeaderboard() {
    let pullAmount = 10;
    let params = "count=" + pullAmount;
    xhttp.open("GET", endpoint, true);
    xhttp.send(params);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let leader = document.getElementById(leaderboard);

          let info = JSON.parse(this.responseText);
          console.log(info)
          for (let i = 0; i < info.length; i++) {
            let new_li = document.createElement("li");
            new_li.textContent =
              "Username: " + info[i].username + " | " + "Score: " + info[i].score;
            leader.appendChild(new_li);
          }
        }
    };
}

loadLeaderboard()