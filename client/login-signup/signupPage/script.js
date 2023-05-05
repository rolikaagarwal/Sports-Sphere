const signup = () => {
  const fullname = document.getElementById("fullname").value;
  const username = document.getElementById("username").value;
  const mobile = document.getElementById("mobile").value;
  const pass = document.getElementById("pass").value;
  console.log(fullname, username, mobile, pass);

  fetch("https://sports-sphere.vercel.app/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: fullname,
      email: username,
      contact: mobile,
      password: pass,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.user.token)

      if (!data.user.token) alert("Wrong Credentials");
      else {
        console.log(data.user.token);
        const cookieValue = data.user.token;
        localStorage.setItem("cookieName", cookieValue);
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
