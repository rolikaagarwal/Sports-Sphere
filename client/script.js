const hamburger = document.querySelector(".hamburger");
const wrapper = document.querySelector(".wrapper");
const baseUrl = "http://localhost:3000";

hamburger.addEventListener("click", function () {
  wrapper.classList.toggle("collapse");
});



const notify = () => {
  alert("Sure! You will be nofied");
};

const cookieValue = localStorage.getItem("cookieName");
console.log(cookieValue);

// get posts

const getPosts = () => {
  
  fetch(baseUrl + "/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookieValue}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".postcontainer").innerHTML="";
      console.log(data);
      data.reverse().forEach((post) => {
        document.querySelector(".postcontainer").innerHTML += `<div class="new-post-section">
          <div class="name-user">
            <img src="/img/user.jpg" alt="">
            <p> ${post.userId.firstName}  <br> Basketball Player <br> 300 followers</p>
          </div>
          <div class="post-text">
            <p>${post.caption} </p>
          </div>
          <div class="post-image">
            <img src="${post.imgURL}" alt="">
          </div>
          <p class="likes">0 Likes<i class="fa-solid fa-heart"></i></p>
          <div class="post-last-row">
            <h4 class="likeButton"><i class="fa-solid fa-thumbs-up"></i>Like</h4>
            <h4><i class="fa-solid fa-comment"></i>Comment</h4>
            <h4><i class="fa-solid fa-arrow-up-right-from-square"></i>Repost</h4>
            <h4><i class="fa-solid fa-share"></i>Send</h4>
          </div>
        </div>
        `;
      });

      // Select all likeButton elements
      const likeButtons = document.querySelectorAll(".likeButton");

      // Loop through the likeButtons NodeList and attach an event listener to each element
      likeButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', function(){
          const likes = likeButton.parentNode.parentNode.querySelector('.likes');
          let currentLikes = parseInt(likes.innerText);
          console.log(currentLikes);
          currentLikes++;
          likes.innerText = currentLikes  + " likes  🖤";
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

getPosts();

// sports news

const newsSection = () => {
  fetch(baseUrl + "/news", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((news) => {
        document.querySelector(".newscontainer").innerHTML += `
       <li> <h4><a href="${news.url}"><i class="fa-solid fa-circle"></i>${news.title}</a></h4>
        
        </li>
       `;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
newsSection();

// create new post

const createPost = () => {
  const inputCaption = document.getElementById("inputCaption").value;
  console.log(inputCaption);

  generateImage(inputCaption)
    .then((imgURL) => {
      fetch(baseUrl + "/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieValue}`,
        },
        body: JSON.stringify({
          caption: inputCaption,
          imgURL: imgURL,
          
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(imgURL)
          document.getElementById("inputCaption").value = "";
          getPosts();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const generateImage = (caption) => {
  return fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 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",
    },
    body: JSON.stringify({
      prompt: caption,
      n: 1,
      size: "512x512",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      console.log(data.data[0].url);
      return data.data[0].url;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};


const likeButton=document.querySelector(".likeButton");
likeButton.addEventListener('click', function(){
  const likes = document.querySelector('.likes');
  let currentLikes = parseInt(likes.innerHTML);
  console.log(currentLikes)
  currentLikes++;
  likes.innerText = currentLikes  + " likes  🖤";
})



// add likes 
// function addlikes(){
//   const likeButton = document.querySelector('.likeButton');


// let currentLikes = parseInt(likes.innerText);

// console.log(currentLikes)
// likeButton.addEventListener('click', function() {
//   // console.log("clicked");
//   currentLikes++;
//   // console.log(currentLikes)
//   likes.innerText = currentLikes  + " likes  🖤";
// });
   
// }
// addlikes();



