console.log("savedpodcasts.js is being used");
function getUserData() {
    $.ajax({
      url: `${baseURL}/accounts?id=${sessionStorage.userId}`,
      type: "GET",
      success: function (data) {
        $("#userName").append(`<p class="text-start overflow-visible rounded">${data[0].fname} ${data[0].lname}</p>`);
        savedpodcasts(data[0].uploadedpcs);
      },
      error: function (errorMessage) {
        console.log("Error" + errorMessage);
      },
    });
}
function savedpodcasts(uploadedpcs) {
  console.log(uploadedpcs);
  podcastlist = "";
  $.ajax(`${baseURL}/podcasts/`, {
    type: "GET",
    dataType: "json",
    success: function (res) {
      res.forEach((podcast) => {
        if (uploadedpcs.includes(podcast.id.toString())) 
          $("#saved-podcasts").append(
              `<div class="item col-md-6 mx-auto m-3 p-4 bg-light">
                  <p class="fs-5">${podcast.title}</p>
              <div>
                  <p id="author">By ${podcast.authors}</p>
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
      });
    },
    error: function (errorMessage) {
      console.log("Error" + errorMessage);
    },
  });
}
getUserData();
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
      list = { uploadedpcs: list };
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
