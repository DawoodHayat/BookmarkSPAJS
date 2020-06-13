// Listen for form Submit;

document.getElementById('myForm').addEventListener('submit',saveBookmark);
// add bookmark
function saveBookmark(e){
  // get Form Values

   var  siteName = document.getElementById('siteName').value;
 var  siteUrl = document.getElementById('siteUrl').value;



if(!validateForm(siteName,siteUrl)){
  return false;
}



// create an onject array to save this form values in local storage
// Note : local storage values only store strings


 var bookMark = {
   name: siteName,
   url: siteUrl
 }
 // local storage Text

/*localStorage.setItem('text','Hello world');
console.log(localStorage.getItem('text'));
localStorage.removeItem('text');
console.log(localStorage.getItem('text'));
*/

//fetch local storage value if its null on local storage so we goonna write

if(localStorage.getItem('bookmarks')=== null){
// initilaize array for elements
  var bookmarks = [];

  // add to array for oush method
  bookmarks.push(bookMark);
  // set to local localStorage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks)); // use jason.stringy key word to turn into strings for local storage
} else {
  // get/ fetch boobkmar for localstorage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // JSON.parse method turn string into JSON
//add bookmark to array
bookmarks.push(bookMark);
// reset back to loacal storage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}

// Clear form
document.getElementById('myForm').reset();

//refetch bookmark
 fetchBookmarks();
 // prevent form for submitting
  e.preventDefault();
}


// Delete Bookmark
function deleteBookmark(url){
  // fetch/get bookmark from local localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop thorugh bookmarksResults

  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      // remove from array
      bookmarks.splice(i,1);
    }
  }
  //Reset back to localStorage

  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

  fetchBookmarks();
}

// Fetch bookmarks

function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // get output id

  var bookmarksResults = document.getElementById('bookmarksResults');
  // build output

    bookmarksResults.innerHTML = '';
// we can use for lop to get output one by one

for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  '<a onclick= "deleteBookmark(\''+url+'\')"class="btn btn-default" target="_blank" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}

// function validation-Form

function validateForm(siteName,siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill up the form');
    return false;
  }
  //rgular exprssion for validation Form
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
