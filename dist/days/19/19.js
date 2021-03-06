const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
        console.log(localMediaStream);
        // 新版 Chrome 已經不適用，需使用 "srcObject"
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err => {
        console.error('Oh NO!!!', err);
    });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        //take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        //mess with them
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.1;
        // put them back
        ctx.putImageData(pixels, 0, 0);

    }, 16);
}

function takePhoto() {
    // played the sound
    snap.currentTime = 0;
    snap.play();

    // take data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    console.log(data);
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man"/>`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+= 4) {
        pixels.data[i] = pixels.data[i] + 100; // red.data
        pixels.data[i+1] = pixels.data[i+1] - 50; //green
        pixels.data[i+2] = pixels.data[i+2] * 0.5; // blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i+= 4) {
        pixels.data[i-500] = pixels.data[i]; // red.data
        pixels.data[i+100] = pixels.data[i+1]; //green
        pixels.data[i-150] = pixels.data[i+2]; // blue
    }
    return pixels;
}

getVideo();


video.addEventListener('canplay', paintToCanvas);