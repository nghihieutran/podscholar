var urlParam = getAllUrlParams()["index"];
console.log(urlParam)
$("#author").html(`${urlParam}'s profile:`)
search(urlParam)