// Initializer
const form = document.getElementById("postForm")

// An empty ARRAY
const postArr = [];
let bookMarkArr = []

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
        <h2>${title}</h2>
        <p id="content">${sliceText(content)}</p>
        <ul>
            <li>
                <a href="#" class="btn btn-more readMore">Read More</a>
            </li>
            <li>
                <a href="#" class="btn btn-more bookmarkFunc" >Add To Bookmark</a>
            </li>
        </ul>
    `;

    document.getElementById('posts').appendChild(postDiv);

    // Call clearForm()
    clearForm()

    // When click bookmark button the post is add in the post
    const addBookmarkBtn = postDiv.querySelector(".bookmarkFunc");
    addBookmarkBtn.addEventListener("click", function() {
        bookMark(newPost);
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
