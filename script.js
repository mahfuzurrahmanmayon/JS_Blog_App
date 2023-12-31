// Initializer
const form = document.getElementById("postForm")

// An empty ARRAY

const postArr = [
    {
      "title": "How to declare a variable in JavaScript?",
      "content": "I'm new to JavaScript and would like to know the correct syntax for declaring variables. Can someone provide an example?"
    },
    {
      "title": "What is the purpose of the 'use strict' directive?",
      "content": "I often see the 'use strict' directive at the beginning of JavaScript files. What does it do, and when should I use it in my code?"
    },
    {
      "title": "Explain the difference between 'let', 'const', and 'var' in JavaScript.",
      "content": "I'm confused about when to use 'let', 'const', and 'var' for variable declarations in JavaScript. Can someone clarify their differences and best use cases?"
    },
    {
      "title": "How does asynchronous programming work in JavaScript?",
      "content": "I've heard about asynchronous programming and the event loop in JavaScript. Could someone provide a simple explanation and example of how asynchronous code execution works?"
    },
    {
      "title": "What are arrow functions in JavaScript?",
      "content": "I've seen arrow functions in JavaScript code, and they look different from regular functions. What are arrow functions, and how do they differ from traditional function expressions?"
    }
]
  

function demoBlog(post){
    const blogContainer = document.getElementById('blog-container');

    // Loop through the posts array and create HTML elements for each post
    postArr.forEach(post => {

    // Create a div for each post
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p id="content">${sliceText(post.content)}</p>
        <ul>
            <li>
                <a href="#" class="btn btn-more readMore">Read More</a>
            </li>
            <li>
                <a href="#" class="btn btn-more bookmarkFunc " >Add To Bookmark</a>
            </li>
        </ul>
    `;

    blogContainer.appendChild(postDiv);
});

}

demoBlog()

const bookMarkArr = [
    
]

// const postArr = JSON.parse(localStorage.getItem("posts")) || [];
// const bookMarkArr = JSON.parse(localStorage.getItem("bookmarks")) || [];



// Create dynamic post and dynamically create a array
function createPost() {
    // Give value from Title and Content
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;


    // if the user no title and no content provide Alert him!
    if(!title && !content){
        alert("Fill all the box!")
        return 0;
    }

    

    // Create a Array
    const newPost = {title,content}
    postArr.push(newPost)

    
    // Update localStorage with the new array
    localStorage.setItem("posts", JSON.stringify(postArr));


    // Create dynamically HTML
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
        <h2>${newPost.title}</h2>
        <p id="content">${sliceText(newPost.content)}</p>
        <ul>
            <li>
                <a href="#" class="btn btn-more readMore">Read More</a>
            </li>
            <li>
                <a href="#" class="btn btn-more bookmarkFunc " >Add To Bookmark</a>
            </li>
        </ul>
    `;

    document.getElementById('posts').appendChild(postDiv);

    // Call clearForm()
    clearForm()

    // When click bookmark button the post is add in the post
    const addBookmarkBtn = postDiv.querySelector(".bookmarkFunc");
    addBookmarkBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // Check if the post is already bookmarked
        const isBookmarked = bookMarkArr.some((item) => {
            return item.title === newPost.title
        });

        console.log(isBookmarked)
        if (isBookmarked) {
            // Remove from bookmarks
            const indexOfClicked = bookMarkArr.findIndex(item => item.title === newPost.title);
            console.log(indexOfClicked)
            if (indexOfClicked >= 0) {
                bookMarkArr.splice(indexOfClicked, 1);
            }
            addBookmarkBtn.textContent = "Add To Bookmark"; // Change button text
            addBookmarkBtn.style.backgroundColor = "#fff";
            addBookmarkBtn.style.color = "#000";
            // Remove the bookmarked post from the bookmark sidebar
            console.log(newPost)
            removeBookmark(newPost.title);
        } else {
            // Add to bookmarks
            bookMark(newPost);
            addBookmarkBtn.textContent = "Remove from bookmark"; // Change button text
            addBookmarkBtn.style.backgroundColor = "#000";
            addBookmarkBtn.style.color = "#fff";
        }


        // bookMark(newPost)
        
        localStorage.setItem("bookmarks", JSON.stringify(bookMarkArr));
        
    });
}

// Clear Title and Content Value after one blog
function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
}
// if text length is above 100 call sliceText()
function sliceText(text){
    let maxLength = 100
    if(text.length > maxLength){
        return text.slice(0, maxLength) + '...';
    }else{
        return text
    }
}

// Form Submited
form.addEventListener('submit', function (e) {
    e.preventDefault()

    window.location.href = "read.html";
});


// Bookmark functionality
function bookMark(bookArr) {
    const bookmark = document.querySelector(".bookmark");
    const bookmarkDiv = document.createElement("div");
    bookmarkDiv.className = "bookmarkDiv";

    const index = bookMarkArr.length + 1;

    bookmarkDiv.innerHTML = `
      <span class="number">${index}</span>
      <h2><a href="#">${bookArr.title}</a></h2>
      <p>${bookArr.content}</p>
    `;
  
    bookmark.appendChild(bookmarkDiv);
    // Add the bookmarked post to bookMarkArr
    bookMarkArr.push(bookArr);


}

// Function to remove a bookmark from the sidebar
function removeBookmark(title) {
    const bookmarkDivs = document.querySelectorAll(".bookmarkDiv");


    // Find and remove the bookmarked post from the sidebar
    for (const div of bookmarkDivs) {
        const h2 = div.querySelector("h2 a");
        console.log(h2)
        if (h2 && h2.textContent === title) {
            div.remove();
            break;
        }
    }
}
