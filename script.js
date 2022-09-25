const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

async function fetchData(receiver) {
  path = `http://localhost:8000/api/v1/hack_boston/?id=${receiver}`
    const res=await fetch(path, {
      method: 'GET', 
      cache: 'no-cache',
      })
    console.log(res);
    const result = await res.json();
    var myObj = JSON.parse(result);
    document.getElementById("level").innerHTML= myObj.data.trust_level;
    var table = document.getElementById("myTable");
    for (var i = 0; i < myObj.data.risk_details.length; i++) {
      var node = document.createElement('li');
    node.appendChild(document.createTextNode(myObj.data.risk_details[i].name));
    document.querySelector('ul').appendChild(node);
    }  
    let myElement = document.querySelector("#my-pie-chart");
    myElement.style.background = `conic-gradient(green 0.00% ${myObj.data.trust_score}%, red ${100-parseFloat(myObj.data.trust_score)}% )`;

}

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const receiver = loginForm.receiver.value;
    if (receiver !== null) {
      fetchData(receiver);
    }
        
})

