const xhttp = new XMLHttpRequest();
const endPointRoot =
  "http://ec2-54-212-48-25.us-west-2.compute.amazonaws.com/API/v1/stats/";

function getAll() {
  let url = endPointRoot;
  let params =
    "?username=" +
    document.getElementById("username").value +
    "&pass=" +
    document.getElementById("password").value;
  url = url + params;
  console.log(url);
  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.resonse);
      document.getElementById("data").innerHTML = this.responseText;
    }
  };
}
