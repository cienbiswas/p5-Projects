const APIkey = "uuZJd9Y5KhOSeNuSMImMPNdRlvCrUEBf";
let boredAPI = "https://www.boredapi.com/api/activity";
let giphyAPI = "https://api.giphy.com/v1/gifs/search";

function setup() {
    
  noCanvas();

  wordGIF()
  .then(results => {
    createP(results.word).style("text-align", "center").style("font-size", "30px");
    for(let i of results.imgs)
      createImg(i, "GIF");
  })
  .catch(err => console.error(err));
}

async function wordGIF(){
  let response1 = await fetch(boredAPI);
  let json1 = await response1.json();

  let url = new URL(giphyAPI);
  let params = {api_key: APIkey, q: json1.type, limit: 10};
  url.search = new URLSearchParams(params).toString();

  let response2 = await fetch(url);
  let json2 = await response2.json();

  let img_urls = [];
  for(let i = 0; i < json2.data.length; i++){
    img_urls.push(json2.data[i].images["fixed_height"].url);
  }

  return {
    word: json1.type,
    imgs: img_urls
  }
}

function draw() {
  // put drawing code here
}
