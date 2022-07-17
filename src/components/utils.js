function checkImageAvailable(imageUrl) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageUrl;
        image.onload = resolve;
        image.onerror = reject;
    });
}


export {checkImageAvailable};