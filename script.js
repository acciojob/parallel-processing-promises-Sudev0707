const output = document.getElementById("output");
const loadingDiv = document.createElement('div');
loadingDiv.id = 'loading';
loadingDiv.textContent = 'Loading...';
const errorDiv = document.createElement('div');
errorDiv.id = 'error';

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
    img.src = image.url;
  });
}

function downloadImages() {
  output.innerHTML = '';
  if (document.getElementById('loading')) {
    document.getElementById('loading').remove();
  }
  if (document.getElementById('error')) {
    document.getElementById('error').remove();
  }
  
  document.body.appendChild(loadingDiv);
  
  const promises = images.map(image => downloadImage(image));
  
  Promise.all(promises)
    .then(images => {
      loadingDiv.remove();
      images.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(error => {
      loadingDiv.remove();
      errorDiv.textContent = error.message;
      document.body.appendChild(errorDiv);
    });
}

downloadImages();