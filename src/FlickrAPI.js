const request = 'https://api.flickr.com/services/rest/?&api_key=05be6248bf2f1e0f922813fb44b11191&method=flickr.photos.search&format=json&nojsoncallback=1&tags=syros%2Cazolimnos&text=azolimnos'


export const fetchFlickrImages = ()=>{
    let target = document.getElementById('flickr')
    let img = document.createElement("img");

    fetch(request)
      .then(response => response.json())
      .then((data)=>{
        let farm = data.photos.photo[0].farm;
        let server = data.photos.photo[0].server;
        let id = data.photos.photo[0].id;
        let secret = data.photos.photo[0].secret;
        img.src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_n.jpg`
        target.appendChild(img)
    })
      .catch(error => {console.warn(error);})
    }



export const getPics = ()=> {

}