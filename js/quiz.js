let sss = {
  username: "",
  qid: 0,
  count: 0,
};
console.log(sss);
const xhttp = new XMLHttpRequest();

function checkAns(i) {
  console.log(sss);
  // let ansCheck = {
  //   questionid: sss.qid,
  //   answer: i,
  // }
  // let str = JSON.stringify(ansCheck);
  // console.log(str);
  xhttp.open(
    "POST",
    "http://ec2-54-212-48-25.us-west-2.compute.amazonaws.com/API/v1/answer/",
    true
  );
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  let params = "questionid=" + sss.qid + "&answer=" + i;
  xhttp.send(params);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let rtrn = JSON.parse(this.response);
      console.log(rtrn);
      if (rtrn.is_correct) {
        document.getElementById("question").innerHTML = "asnwer is correct";
        sss.count++;
        nextQuestion();
      } else {
        document.getElementById("question").innerHTML = "asnwer is incorrect";
        document.getElementById("answers").innerHTML = "";
        sendScore();
        setTimeout(() => {
          document.location.href = "index.html";
        }, 3000);
        // document.location.href = 'index.html';
      }
    }
  };
}

function sendScore() {
  // let score = {
  //   username: "name",
  //   score: sss.count
  // }
  console.log("hey bitch");
  let params = "username=" + sss.username + "&score=" + sss.count;
  xhttp.open(
    "POST",
    "http://ec2-54-212-48-25.us-west-2.compute.amazonaws.com/API/v1/score/",
    true
  );
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  console.log("sending");
  xhttp.send(params);
  console.log("after send");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("rasdfas send");
      console.log(this.response);
    }
  };
}

function nextQuestion() {
  document.getElementById("start-button").style.visibility = "hidden";
  sss.username = document.getElementById("username").value;
  document.getElementById("answers").innerHTML = "";
  xhttp.open(
    "GET",
    "http://ec2-54-212-48-25.us-west-2.compute.amazonaws.com/API/v1/question/",
    true
  );
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let qobj = JSON.parse(this.responseText);
      console.log(qobj);
      document.getElementById("question").innerHTML = qobj.question;
      document.getElementById("category").innerHTML = qobj.category;
      for (i = 0; i < qobj.answers_list.length; i++) {
        let ans = document.createElement("p");
        let butt = document.createElement("button");
        ans.innerHTML = qobj.answers_list[i];
        butt.innerHTML = i + 1;
        butt.id = i;
        let nsr = qobj.answers_list[i];
        butt.onclick = function () {
          checkAns(nsr);
        };
        let div = document.createElement("div");
        div.appendChild(ans);
        div.appendChild(butt);
        document.getElementById("answers").appendChild(div);
      }
      console.log(qobj.questionid);
      sss.qid = qobj.questionid;
      console.log(sss);
    }
  };
}
