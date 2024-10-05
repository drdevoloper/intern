const canvas = document.getElementById('image-canvas');
const ctx = canvas.getContext('2d');
let uploadedImage = null;

document.getElementById('image-upload').addEventListener('change', loadImage);

function loadImage() {
    const fileInput = document.getElementById('image-upload');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            uploadedImage = img;
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
}

function generateMergedImage() {
    if (!uploadedImage) {
        alert("Please upload an image first.");
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "yellow";
    ctx.fillRect(250, 0, canvas.width, canvas.height);

    const maxWidth = 250;
    const maxHeight = canvas.height;

    let ratio = Math.min(maxWidth / uploadedImage.width, maxHeight / uploadedImage.height);
    const newWidth = uploadedImage.width * ratio;
    const newHeight = uploadedImage.height * ratio;
    ctx.drawImage(uploadedImage, 0, (canvas.height - newHeight) / 2, newWidth, newHeight);

    const name = document.getElementById('name').value;
    const std = document.getElementById('std').value;
    const sec = document.getElementById('sec').value;
    const subject = document.getElementById('subject').value;
    const school = document.getElementById('school').value;

    const textStartX = 270;
    const textStartY = 50;
    const lineHeight = 40;

    ctx.font = "bold 40px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(`${name}`, textStartX, textStartY);

    ctx.font = "bold 25px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Std", textStartX, textStartY + lineHeight);
    ctx.fillText("Sec", textStartX + 200, textStartY + lineHeight);
    ctx.fillText("Subject", textStartX, textStartY + lineHeight * 2);
    ctx.fillText("School", textStartX, textStartY + lineHeight * 3);

    ctx.beginPath();
    ctx.moveTo(textStartX + 60, textStartY + lineHeight);
    ctx.lineTo(textStartX + 150, textStartY + lineHeight);
    ctx.moveTo(textStartX + 260, textStartY + lineHeight);
    ctx.lineTo(textStartX + 350, textStartY + lineHeight);
    ctx.moveTo(textStartX + 110, textStartY + lineHeight * 2);
    ctx.lineTo(textStartX + 350, textStartY + lineHeight * 2);
    ctx.moveTo(textStartX + 110, textStartY + lineHeight * 3);
    ctx.lineTo(textStartX + 350, textStartY + lineHeight * 3);
    ctx.stroke();

    ctx.font = "bold 25px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText(`${std}`, textStartX + 60, textStartY + lineHeight);
    ctx.fillText(`${sec}`, textStartX + 260, textStartY + lineHeight);
    ctx.fillText(`${subject}`, textStartX + 110, textStartY + lineHeight * 2);
    ctx.fillText(`${school}`, textStartX + 110, textStartY + lineHeight * 3);
    
}
