const fs = require('fs');
const Jimp = require('jimp');

const folderPath = '/Users/ralph/Desktop/development-projects/lpc-ss-tool/screenshots'; // Update this with your folder path

// Function to add text to an image
async function addTextToImage(imagePath, text) {
    try {
        const image = await Jimp.read(imagePath);
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE); // Larger font size and white color
        const textWidth = Jimp.measureText(font, text);
        const textHeight = Jimp.measureTextHeight(font, text);
        const x = (image.bitmap.width - textWidth) / 2; // Center horizontally
        const y = (image.bitmap.height - textHeight) / 2; // Center vertically
        image.print(font, x, y, text, textWidth); // Use textWidth to ensure text doesn't overflow
        await image.writeAsync(imagePath);
        console.log(`Text added to ${imagePath}`);
    } catch (error) {
        console.error(`Error adding text to ${imagePath}:`, error);
    }
}

// Function to process all images in a folder
async function processImagesInFolder(folderPath) {
    try {
        const files = fs.readdirSync(folderPath);
        for (const file of files) {
            const imagePath = `${folderPath}/${file}`;
            if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
                const stats = fs.statSync(imagePath);
                const creationDate = stats.birthtime.toDateString();
                const creationTime = stats.birthtime.toLocaleTimeString();
                const text = `Ralph Martin Flores\nDate: ${creationDate}\nTime: ${creationTime}`;
                await addTextToImage(imagePath, text);
            }
        }
    } catch (error) {
        console.error('Error processing images:', error);
    }
}

// Call the function to process images
processImagesInFolder(folderPath);
