/**FLICKR
 * const key= '05be6248bf2f1e0f922813fb44b11191'
 * const secret= 'daad362f29936164'
 */

//key,results per request=10 
//let tag = this.props.modalTitle

export const fetchFlickrImages = (tag) => {
  let target = document.getElementById('images')
  let h = document.createElement("H1")
  //console.log(tag)
  const request = `https://api.flickr.com/services/rest/?
&api_key=05be6248bf2f1e0f922813fb44b11191
&method=flickr.photos.search
&format=json&nojsoncallback=1
&per_page=10
&tag_mode=all
&tags=syros%2C+${tag}
`
  //console.log(request)
  fetch(request)
    .then(response => response.json())
    .then((data) => {

      if(data.photos.total==0){
        h.innerHTML+='No Image from Flickr<br>We hope to fix this in the future';
        target.appendChild(h);
        console.log('no photo')}

      data.photos.photo.forEach(({ farm, server, id, secret, title }) => {
        let img = document.createElement("img");
        img.src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        img.setAttribute("alt", `Image tile:${title}`)
        img.setAttribute("href", "https://www.flickr.com")
        target.appendChild(img)
      });
    })
    .catch(error => {       
    h.innerHTML+='No Network, <br> or no response from Flickr';
    target.appendChild(h);
    console.warn(error) })
}
