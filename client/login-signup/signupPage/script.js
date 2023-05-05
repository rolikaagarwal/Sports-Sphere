
let user;
const verify = ()=>{
  user.fullname = document.getElementById("fullname").value;
  user.username = document.getElementById("username").value;
  user.mobile = document.getElementById("mobile").value;
  user.pass = document.getElementById("pass").value;

  

  // Navigate to the verification page
  window.location.href = "./verification.html";
}

var clientid;
const sendOTP=()=>{
  document.querySelector(".sendOTP").style.display="none";
  document.querySelector(".otp").style.display="block";
  document.querySelector(".submitOTP").style.display="inline-block";

  const adhaar = document.querySelector("#adhaar").value;

  fetch("https://api.emptra.com/aadhaarVerification/requestOtp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "secretKey": "R84q1Vjx13I1MCM640D22jMLbmm5yMqEt6mEBLOgklpv7w1KjlPPyoTTwMVNEA5ef",
      "clientId": "671bb34f4d68fee50be35ce26393090a:92dfdfe6baf7bef36251c054c8460ea7"
    },
    body: JSON.stringify({
      aadhaarNumber : adhaar,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if(data.result.status_code==200){
        console.log(data)
        clientid = data.result.data.client_id;
        console.log(clientid)
      }else{
        alert("incorrect adhar number")
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const submitOTP = ()=>{
  const otp = document.querySelector(".otp").value;
  console.log(clientid)

  fetch("https://api.emptra.com/aadhaarVerification/submitOtp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "secretKey": "R84q1Vjx13I1MCM640D22jMLbmm5yMqEt6mEBLOgklpv7w1KjlPPyoTTwMVNEA5ef",
      "clientId": "671bb34f4d68fee50be35ce26393090a:92dfdfe6baf7bef36251c054c8460ea7"
    },
    body: JSON.stringify({
      client_id: clientid,
      otp: otp
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(data.result.status_code==200){
        signup();
        window.location.href = "/";
      }else{
        alert("incorrect OTP");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


const signup = () => {
  fetch("https://sports-sphere.vercel.app/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.user.token)
      if (!data.user.token) alert("Wrong Credentials");
      else {
        console.log(data.user.token);
        const cookieValue = data.user.token;
        localStorage.setItem("cookieName", cookieValue);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};