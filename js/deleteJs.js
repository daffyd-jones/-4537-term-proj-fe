const xhttp = new XMLHttpRequest();
const endpoint = "http://localhost:8000/API/v1/question/";

const q_id = "q_id";
const server_msg = "server_msg";

const delete_btn = "delete_btn"
const btn = document.getElementById(delete_btn);
btn.addEventListener("click", deleteQuestion)

function deleteQuestion() {
    let msg = document.getElementById(server_msg);
    let id = document.getElementById(q_id).value;

    if (isNaN(id)) {
        msg.textContent = "Question ID is not a Number. Please Enter a Value Question ID"
    } else {
        let params = "questionid=" + id;
        console.log(params)
        xhttp.open("DELETE", endpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let info = JSON.parse(this.responseText);
                if (info.affectedRows != 0) {
                    msg.textContent = "Question has been delete on the database"
                } else {
                    msg.textContent = "Incorrect question ID"
                }
              console.log(info.affectedRows)
    
            } else {
              document.getElementById(server_msg).textContent = "Server Issues"
            }
        }
    }

}