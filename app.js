const Jimp = require('jimp');
const fs = require('fs');

// Function to compare two images with different dimensions
async function compareImages(imagePath1, imagePath2) {
  try {
    // Load images using Jimp
    const image1 = await Jimp.read(imagePath1);
    const image2 = await Jimp.read(imagePath2);

    // Resize images to a common size
    const commonWidth = Math.max(image1.getWidth(), image2.getWidth());
    const commonHeight = Math.max(image1.getHeight(), image2.getHeight());

    image1.resize(commonWidth, commonHeight);
    image2.resize(commonWidth, commonHeight);

    // Compare images pixel by pixel
    let differences = 0;
    const threshold = 0.1; // Adjust this threshold as needed

    image1.scan(0, 0, commonWidth, commonHeight, (x, y, idx) => {
      const pixel1 = Jimp.intToRGBA(image1.getPixelColor(x, y));
      const pixel2 = Jimp.intToRGBA(image2.getPixelColor(x, y));

      // Compare RGB values
      if (
        Math.abs(pixel1.r - pixel2.r) > threshold * 255 ||
        Math.abs(pixel1.g - pixel2.g) > threshold * 255 ||
        Math.abs(pixel1.b - pixel2.b) > threshold * 255
      ) {
        differences++;
      }
    });

    // Calculate the difference ratio
    const totalPixels = commonWidth * commonHeight;
    const differenceRatio = differences / totalPixels;

    // Display the result
    console.log('Image difference ratio:', differenceRatio);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example usage
const image1Path = 'images/image5.png';
const image2Path = 'images/image4.png';

compareImages(image1Path, image2Path);
