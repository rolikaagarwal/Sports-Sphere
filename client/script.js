const hamburger = document.querySelector(".hamburger");
const wrapper = document.querySelector(".wrapper");

hamburger.addEventListener("click", function () {
  wrapper.classList.toggle("collapse");
});

const notify = () =>{
        alert("Sure! You will be nofied");
}

const cookieValue = localStorage.getItem("cookieName");
console.log(cookieValue);


fetch("https://sports-sphere.vercel.app/posts", {
  method: "GET",
  headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieValue}`,
      },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach(post => {
        document.querySelector(".postcontainer").innerHTML+=`<div class="new-post-section">
        <div class="name-user">
            <img src="/img/user.jpg" alt="">
            <p> Rolika Agarwal   <br> Basketball Player <br> 300 followers</p>
        </div>
        <div class="post-text">
            <p>${post.caption} </p>
        </div>
        <div class="post-image">
            <img src="/img/post1.jpg" alt="">
        </div>
        <h5><i class="fa-solid fa-heart"></i>1000 likes</h5>
        <div class="post-last-row">
            <h4><i class="fa-solid fa-thumbs-up"></i>Like</h4>
            <h4><i class="fa-solid fa-comment"></i>Comment</h4>
            <h4><i class="fa-solid fa-arrow-up-right-from-square"></i>Repost</h4>
            <h4><i class="fa-solid fa-share"></i>Send</h4>
        </div>
    </div>
        `

    })

    
  })
  .catch((error) => {
    console.error("Error:", error);
  });
