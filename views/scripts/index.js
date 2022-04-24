console.log("index.js is being used");
function index() {
  $.ajax(`${baseURL}/podcasts`, {
    type: "GET",
    dataType: "json",
    success: function (res) {
      for (var i = 0; i < 3; i++) {
        var podcast = res[i];
        console.log(podcast.title);
        var authorsString = "";
        podcast.authors.forEach((author) => {
          authorsString += `<a class="text-dark" href="author.html?index=${author}">${author}</a>\t`;
        });
        //console.log(authorsString)
        $("#search-results").append(
          `
                        <div class="item col-md-6 mx-auto m-3 p-4 bg-light">
                        <p class="fs-5">${podcast.title}</p>
                        <div>
                          <p>By ${authorsString}</p>
                          <p>Journal: ${podcast.journal}</p>
                          <p>DOI: ${podcast.doi}</p>
                        </div>
                        <button type="button" class="btn btn-dark" value="${podcast.id}" id ="savep">Save podcast</button>
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
                      </div>
                    `
        );
      }
    },
    error: function (errorMessage) {
      console.log("Error" + errorMessage);
    },
  });
}
index();
