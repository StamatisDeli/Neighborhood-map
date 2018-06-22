import React from 'react'
import App from './App'


/**FLICKR
 * const key= '05be6248bf2f1e0f922813fb44b11191'
 * const secret= 'daad362f29936164'
 */ 

//key,results per request=10 
//let tag = this.props.modalTitle


export const fetchFlickrImages = (tag) => {
  let target = document.getElementById('images')
  //let tag = 'azolimnos'
  const request = `https://api.flickr.com/services/rest/?
&api_key=05be6248bf2f1e0f922813fb44b11191
&method=flickr.photos.search
&format=json&nojsoncallback=1
&per_page=10
&tags=syros%2C ${tag}
&text= ${tag}`

  fetch(request)
    .then(response => response.json())
    .then((data) => {
      data.photos.photo.forEach(({ farm, server, id, secret, title }) => {
        let img = document.createElement("img");
        img.src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        img.setAttribute("alt", `Image tile:${title}`)
        img.setAttribute("href", "https://www.flickr.com")
        target.appendChild(img)
      });
    })
    .catch(error => { console.warn(error); })
}



export const getPics = () => {

}