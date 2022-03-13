var p_fname;
var p_lname;
var p_email;
var article_title;
var journal;
var publish_date;
var DOI;
var keywords;
var audio_file;

$("#upload-form").on("submit", function (e) {
  e.preventDefault();
  p_fname = $("#p_fname").val();
  p_lname = $("#p_lname").val();
  p_email = $("#p_email").val();
  article_title = $("#p_article_title").val();
  journal = $("#p_journal").val();
  publish_date =$("#p_publish_date").val();
  DOI = $("#p_doi").val();
  keywords=$("#p_keyword").val().split();
  console.log($("#p_keyword").val().split(" "))
  audio_file = "skip";
  uploadPodcast(p_fname, p_lname, p_email, article_title, journal, publish_date, DOI, keywords, audio_file)
  
});

function uploadPodcast(fname, lname, email, article_title, journal, publish_date, DOI, keywords, audio_file) {
  $.ajax(`${baseURL}/podcasts`, {
    type: "POST",
    data: {
      fname: fname,
      lname: lname,
      email: email,
      article_title: article_title,
      journal:journal,
      publish_date: publish_date,
      DOI: DOI,
      keywords:keywords,
      audio_file:audio_file
    }, // data to submit
    success: function () {
      console.log("success");
      alert("Uploaded")
      $("#manuscript").html(`
        <div><h1 class="text-center mt-4">Your podcast had been uplaoded</h1>
        <h3 class="text-center mt-4">Your podcast ${article_title} has been uploaded</h3>
        </div>`
      )
     
    },
    error: function (errorMessage) {
      alert("Something went wrong")
      console.log("Error" + errorMessage);
    },
  });
}



function checkSession() {
  if (window.sessionStorage.getItem("userId") == null) {
    alert("You are not logged in")
    window.location.href = "index.html";
  }
}
checkSession();

