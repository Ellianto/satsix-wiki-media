const Canvas = require('canvas');
const Discord = require('discord.js');
const Attachment = Discord.MessageAttachment

const fs = require('fs');
const axios = require('axios').default;

const getImageBufferFromUrl = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    return Buffer.from(response.data, 'binary').toString('base64')
  } catch (error) {
    console.error(error);
  }

  return null;
};

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		context.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (context.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return context.font;
};

// TODO: Improve the layout by experimenting here
const generateCanvasImage = async (textContent, charImageUrl, statImageUrls) => {
  console.log("Processing Canvas Image...");
  const width = 1080;
  const height = 1920;
  
  // Create a 700x250 pixel canvas and get its context
  // The context will be used to modify the canvas
  const canvas = Canvas.createCanvas(width, height);
  const context = canvas.getContext('2d');

  const padding = 20;

  // Load Char Image
  const characterImage = await Canvas.loadImage(charImageUrl);
  const charImageWidth = 480;
  const charImageHeight = (charImageWidth * (characterImage.naturalHeight / characterImage.naturalWidth));
  context.drawImage(characterImage, padding, padding, charImageWidth, charImageHeight);

  // Load Stats Image
  const radarChartImage = await Canvas.loadImage(statImageUrls[0]);
  const radarChartWidth = 550;
  const radarChartHeight = (radarChartWidth * (radarChartImage.naturalHeight / radarChartImage.naturalWidth));
  context.drawImage(radarChartImage, (padding + charImageWidth), padding, radarChartWidth, radarChartHeight);

  const statsBarImage = await Canvas.loadImage(statImageUrls[1]);
  const statsBarWidth = radarChartWidth;
  const statsBarHeight = (statsBarWidth * (statsBarImage.naturalHeight / statsBarImage.naturalWidth));
  context.drawImage(statsBarImage, (padding + charImageWidth), (padding + radarChartHeight), statsBarWidth, statsBarHeight);

  // Load Text
  const textXPos = padding;
  const textYPos = Math.max(charImageHeight, (radarChartHeight + statsBarHeight)) + 32;
  // context.font = applyText(canvas, textContent);
  context.font = '48px sans-serif';
  context.fillStyle = '#ffffff';
	context.fillText(textContent, textXPos, textYPos);

  console.log("Uploading canvas image...");
  const canvasBuffer = canvas.toBuffer();
  fs.writeFile(`./canvas-image.png`, canvasBuffer, () => 
    console.log('finished saving!'));
  return new Attachment(canvasBuffer, 'final-image.png');
};

module.exports = {
  generateCanvasImage,
};