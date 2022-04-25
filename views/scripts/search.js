console.log("Search.js is being used");
function search(search) {
  var search = search.split(" ").map((element) => {
    return element.toLowerCase();
  });
  console.log(search);
  var count = 0;
  $("#search-results").html("");
  $.ajax(`${baseURL}/podcasts`, {
    type: "GET",
    dataType: "json",
    success: function (res) {
      res.forEach((podcast) => {
        if (
          podcast.keywords
            .map((element) => {
              return element.toLowerCase();
            })
            .some((item) => search.includes(item)) ||
          podcast.authors
            .map((element) => {
              return element.toLowerCase();
            })
            .some((item) => search.includes(item)) ||
          podcast.title
            .split(" ")
            .map((element) => {
              return element.toLowerCase();
            })
            .some((item) => search.includes(item)) ||
          search.includes(podcast.journal.toLowerCase())
        ) {
          console.log(podcast.title);
          var authorsString = "";
          podcast.authors.forEach((author) => {
            authorsString += `<a class="text-dark" href="author.html?index=${author}">${author}</a>\t`;
          });
          $("#search-results").append(
            `
            <div class="item  mx-auto m-3 p-4 bg-light">
              <p class="fs-5"><strong>${podcast.title}</strong></p>
              <div>
                <p><strong>By: </strong>${authorsString}</p>
                <p><strong>Journal: </strong>${podcast.journal}</p>
                <p><strong>DOI: ${podcast.doi}</strong></p>
                <p><strong>Date uploaded: </strong>${podcast.publishDate}</p>
              </div>
              <div>
              <button type="button" class="btn btn-dark btn-sm" value="${podcast.id}" id="like">Like</button>
              <button type="button" class="btn btn-secondary btn-sm" value="${podcast.id}" id="savep">Bookmark</button>
              </div>
              <p><br><strong>Abstract:</strong> ${podcast.abstract}</p>
              <div class="player mt-4">
                <audio
                  id="player2"
                  preload="none"
                  controls
                  style="max-width: 100%"
                  class="w-100"
                >
                  <source
                    src=${podcast.audio_file}
                    type="audio/mp3"
                  />
                </audio>
  
              </div>
              <div class="row">
              <div class="span8">
                  <p></p>
                  <p>
                     
                      
                      ${podcast.likes} likes
                      |  ${podcast.bookmarks} bookmarks
                      | <i class="icon-tags"></i> Tags : 
                      <a href="#"><span class="btn btn-dark btn-sm label label-info">Tag1</span></a>
                      <a href="#"><span class="btn btn-dark btn-sm label label-info">Tag2</span></a>
                      <a href="#"><span class="btn btn-dark btn-sm label label-info">Tag3</span></a>
                      <a href="#"><span class="btn btn-dark btn-sm label label-info">Tag5</span></a>
                  </p>
              </div>
          </div>
            </div>
            </div>
                  `
          );
        } else {
          console.log(`No match with ${search}`);
        }
      });
    },
    error: function (errorMessage) {
      console.log("Error" + errorMessage);
    },
  });
}
$(document).on("click", "#savep", function (e) {
  e.preventDefault();
  e.stopPropagation();
  var podcast_id = $(this).val();
  if (window.sessionStorage.getItem("userId") == null) {
    alert("You are not logged in");
    window.location.href = "index.html";
  }
  $.ajax({
    url: `${baseURL}/accounts/${window.sessionStorage.userId}`,
    type: "GET",
    success: function (data) {
      list = [].concat(data.savedpcs);
      if (!list.includes(podcast_id)) list.push(podcast_id);
      list = { savedpcs: list };
      $.ajax({
        traditional: true,
        url: `${baseURL}/accounts/${window.sessionStorage.userId}`,
        type: "PATCH",
        data: list,
        dataType: "json",
        success: function (data) {
          console.log(data);
        },
      });
    },
  });
});
$(document).on("click", "#like", function (e) {
  e.preventDefault();
  e.stopPropagation();
  var podcast_id = $(this).val();
  if (window.sessionStorage.getItem("userId") == null) {
    alert("You are not logged in");
    window.location.href = "index.html";
  }
  $.ajax({
    url: `${baseURL}/podcasts/${podcast_id}`,
    type: "GET",
    success: function (data) {
      like = parseInt(data.likes)+1;
      temp = {likes : like}

      $.ajax({
        traditional: true,
        url: `${baseURL}/podcasts/${podcast_id}`,
        type: "PATCH",
        data: temp,
        dataType: "json",
        success: function (data) {
          console.log(data);
        },
      });
    },
  });
});
$("#search-text-field").keypress(function (event) {
  var keycode = event.keyCode || event.which;
  if (keycode == "13") {
    search($("#search-text-field").val());
  }
});
