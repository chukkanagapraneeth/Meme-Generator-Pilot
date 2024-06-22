const imageFileInput = document.querySelector("#imageFileInput");
const topText = document.querySelector("#topText");
const bottomText = document.querySelector("#bottomText");

const canvas = document.querySelector("#meme");

let image;

imageFileInput.addEventListener("change", () => {
  const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

  console.log(imageDataUrl);

  image = new Image();
  image.src = imageDataUrl;
  topText.value = "";
  bottomText.value = "";

  image.addEventListener(
    "load",
    () => {
      updateMemeCanvas(canvas, image, topText.value, bottomText.value);
    },
    { once: true }
  );
});

topText.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topText.value, bottomText.value);
});

bottomText.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topText.value, bottomText.value);
});

function updateMemeCanvas(canvas, image, topText, bottomText) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
  const yOffSet = Math.floor(height / 25);
  const xOffSet = Math.floor(width / 2);

  //update canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  // prepare text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  //add top text
  ctx.textBaseline = "top";
  ctx.strokeText(topText, xOffSet, yOffSet);
  ctx.fillText(topText, xOffSet, yOffSet);

  //add bottom text

  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, xOffSet, height - yOffSet);
  ctx.fillText(bottomText, xOffSet, height - yOffSet);
}
