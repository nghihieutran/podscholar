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
            `<div class="item col-md-6 mx-auto m-3 p-4 bg-light">
                            <p class="fs-5">${podcast.title}</p>
                            <div>
                              <p id="author">By ${authorsString}</p>
                              <p id="journal">Journal: ${podcast.journal}</p>
                              <p id="doi">DOI: ${podcast.doi}</p>
                            </div>
                            <button type="button" class="btn btn-dark" value="${podcast.doi}" id ="savep">Save podcast</button>
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
                          </div>`
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
$("#search-text-field").keypress(function (event) {
  var keycode = event.keyCode || event.which;
  if (keycode == "13") {
    search($("#search-text-field").val());
  }
});
