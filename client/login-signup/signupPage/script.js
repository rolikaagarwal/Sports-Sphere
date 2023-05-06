
let user={
  firstName: String,
  email: String,
  password:String,
  contact:String
};
const verify = ()=>{
  user.firstName = document.getElementById("fullname").value;
  user.email = document.getElementById("username").value;
  user.contact = document.getElementById("mobile").value;
  user.password = document.getElementById("pass").value;

  

  // Navigate to the verification page
  window.location.href = "./verification.html";
}

var clientid;
const sendOTP=()=>{
  document.querySelector(".sendOTP").style.display="none";
  document.querySelector(".otp").style.display="block";
  document.querySelector(".submitOTP").style.display="inline-block";

  const adhaar = document.querySelector("#adhaar").value;
  console.log(adhaar)
  fetch("https://api.emptra.com/aadhaarVerification/requestOtp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      secretKey: "tYGNpbvi3V9JZ9G5oKsmpSCElBYe3fyKwIWDKkNKbF5DP6gFhosgFhhANBsdZlSd5",
      clientId: "c206482246552ada15086181162a097f:07ae1c738a2668d057dc9bb8c9a97bdf"
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
      secretKey: "tYGNpbvi3V9JZ9G5oKsmpSCElBYe3fyKwIWDKkNKbF5DP6gFhosgFhhANBsdZlSd5",
      clientId: "c206482246552ada15086181162a097f:07ae1c738a2668d057dc9bb8c9a97bdf"
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
  fetch("https://sports-sphere.onrender.com/auth/signup", {
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