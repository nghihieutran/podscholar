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
      }
    },
    error: function (errorMessage) {
      console.log("Error" + errorMessage);
    },
  });
}
index();
