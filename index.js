// Allow the use of .env file
require('dotenv').config();

const scraper = require('./web-scraping/scraper');

const discordBotToken = process.env.BOT_TOKEN;
const prefix = '~';

const BOT_COMMANDS = {
  PING : 'ping',
  SCRAPE : 'scrape',
  TESTING : 'test',
};


// require the discord.js module
const Discord = require('discord.js');
const canvasHandler = require('./canvasHandler');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// login to Discord with your app's token
client.login(discordBotToken);

/*
  TODO:
  1) Use Web Scraper (puppetteer)
  2) Params : Accept the wiki link and type (since diff wikis can use diff formats)
  3) Scrape the essential text contents form the page
  4) Layout them using HTML5 Canvas
*/

// Continuously listen to message
client.on('message', async message => {
  // If command doesn't start with prefix or sent by BOT, ignore
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Removes prefix and saves the command into a separate variable
  // Also reads the remaining space separated string and save it into args
  const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

  try {
    switch (command) {
      case BOT_COMMANDS.PING:
        return message.channel.send('Pong.');
      case BOT_COMMANDS.SCRAPE:
        if (!args.length) {
          return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
  
        // TODO: Add check to make sure the link passed is of the correct domain
        console.log(args);
  
        const scrapedText = await scraper.scrape7DSWiki(args[0]);
        return message.channel.send(scrapedText ? `Here's what I scraped:\n${scrapedText}` : `Failed to scrape anything from that link :(`);
      case BOT_COMMANDS.TESTING:
        console.log("Scraping...");
        const testingWikiLink = 'https://7dsgc.fandom.com/wiki/Blue_%22The_One%22_Escanor';
        // const textContent = await scraper.scrape7DSWiki(testingWikiLink);
        // const charImageUrl = await scraper.getCharacterImage(testingWikiLink);
        // const statsImageUrls = await scraper.getStatsImages(testingWikiLink);

        const {
          textContent,
          charImageUrl,
          statsImageUrls,
        } = await scraper.scrape7DSWiki(testingWikiLink);

        const fileImage = charImageUrl && statsImageUrls[0] ? {
          embeds: [
            {
              thumbnail: {
                url: 'attachment://charImage.png',
              }
            },
            {
              thumbnail: {
                url: 'attachment://statsImage.png',
              }
            }
          ],
          files: [{
            attachment: charImageUrl,
            name: 'charImage.png',
          },{
            attachment: statsImageUrls[0],
            name: 'statsImage.png',
          }],
        } : {}

        // return message.channel.send({
        //   files: [await canvasHandler.generateCanvasImage(textContent, charImageUrl, statsImageUrls)]
        // })

        return message.channel.send({
          content: textContent,
          ...fileImage,
        });
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
});