// Initializer
const form = document.getElementById("postForm")

// An empty ARRAY
const postArr = [];

// Create dynamic post and dynamically create a array
function createPost() {
    // Give value from Title and Content
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    localStorage.setItem("myObj", JSON.stringify({title: title,content: content}))

    // if the user no title and no content provide Alert him!
    if(!title && !content){
        alert("Fill all the box!")
        return 0;
    }

    // Create a Array
    const newPost = {title,content}
    postArr.push(newPost)
    console.log(postArr)

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
                <a href="#" class="btn btn-more" >Add To Bookmark</a>
            </li>
        </ul>
    `;

    document.getElementById('posts').appendChild(postDiv);

    // Call clearForm()
    clearForm()
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

