
const login = () => {
    const loginemail = document.getElementById("loginemail").value;
    const loginpass = document.getElementById("loginpass").value;
    console.log(loginemail, loginpass);


    fetch("https://sports-sphere.onrender.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify({
        email: loginemail,
        password:loginpass,
        
    })
    })
    .then(response => response.json())
    .then(data => {
        if(!data.token) alert("Wrong Credentials");
        else{
            console.log(data.token);
            const cookieValue=data.token;
            localStorage.setItem("cookieName", cookieValue );
            window.location.href = "/";

        }
      

      })
      .catch((error) => {
        console.error('Error:', error);
      });



}



