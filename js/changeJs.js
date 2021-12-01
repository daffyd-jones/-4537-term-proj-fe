const xhttp = new XMLHttpRequest();
const endpoint = "http://localhost:8000/API/v1/question/";

// Id names
const q_id = "q_id"
const q_cat = "q_cat";
const q_type = "q_type";
const q_diff = "q_diff";
const question = "question";
const q_answer = "q_answer";
const q_incorrect1 = "q_incorrect1";
const q_incorrect2 = "q_incorrect2";
const q_incorrect3 = "q_incorrect3";
const submit_msg = "submit_msg"

const submit_btn = "submit_btn";
const btn = document.getElementById(submit_btn);

btn.addEventListener("click", addToDB);

function validation(q_id, cat, type, diff, q, answer, incorrect) {
    let msg = document.getElementById(submit_msg);

    if (isNaN(q_id) | cat == "" || type == "" || diff == "" || q == "" || answer == "" || incorrect == "") {
        msg.textContent = "Not a valid input"
        return false;
    } else {
        return true;
    }
}

function addToDB() {
    let id = document.getElementById(q_id).value;
    let category = document.getElementById(q_cat).value;
    let type = document.getElementById(q_type).value;
    let diff = document.getElementById(q_diff).value;
    let q = document.getElementById(question).value;
    let answer = document.getElementById(q_answer).value;
    let incorrect1 = document.getElementById(q_incorrect1).value;
    let incorrect2 = document.getElementById(q_incorrect2).value;
    let incorrect3 = document.getElementById(q_incorrect3).value;
    let incorrect = new Array(incorrect1, incorrect2, incorrect3);
    let invalid_msg = "Invalid Input";
    let success_msg = "Added question to database";
    let failure_msg = "Failed to add question";

    if (validation(id, category, type, diff, q, answer, incorrect)) {
        incorrect = JSON.stringify(incorrect);
        let params = "category=" + category + "&type=" + type + "&difficulty=" + diff 
                     + "&question=" + q + "&correct_answer=" + answer 
                     + "&incorrect_answer=" + incorrect + "&questionid=" + id;
        xhttp.open("PUT", endpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        xhttp. onreadystatechange = function () {
          if (this.readyState = 4 && this.status == 200) {
            document.getElementById(submit_msg).textContent = success_msg;
          } else {
            document.getElementById(submit_msg).textContent = failure_msg;
          }
        }
    } else {
      document.getElementById(submit_msg).textContent = invalid_msg;
    };
}