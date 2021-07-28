const puppeteer = require('puppeteer');

// run in a non-headless mode
const __browserPromise = puppeteer.launch({     
  headless: true,
});

const __createPage = async (browserInstance) => {
  // Create new page
  const page = await browserInstance.newPage();

  // Set browser viewport
  await page.setViewport({ width: 1199, height: 900 });
  return page;
};


// This is very dependent on the format of the page
async function scrape7DSWiki(wikiLink) {
  const browserInstance = await __browserPromise;
  const browserPage = await __createPage(browserInstance);
  await browserPage.goto(wikiLink);

  // Tries to scrape the Unique Ability
  await browserPage.waitForSelector('#Unique');
  // const uniqueHeadingElement = await browserPage.$('#Unique');

  // Doing $eval will give us the reference element
  // And then inside the function we can use is as a usual HTMLElement
  // We can't do it in Node Environment so will have to resort to this way
  const elementText = await browserPage.$eval('#Unique', (element) => {
    const parentOfUnique = element.parentElement;
    console.log("Parent of Unique");
    console.log(parentOfUnique);
    const siblingOfHeading = parentOfUnique.nextElementSibling;
    console.log("Sibling of Heading");
    console.log(siblingOfHeading);

    const uniqueText = siblingOfHeading.querySelector('tbody > tr:nth-child(2) > th:nth-child(2)').innerText;
    console.log("Unique Text");
    console.log(uniqueText);
    return uniqueText;
  })

  if (elementText) {
    return elementText ||  null;
  } else {
    return null;
  }
  
  // const uniqueHeadingElement = await browserPage.$('#Unique');

  // return null;

  // if (!uniqueHeadingElement) {
  //   return null;
  // }

  // const parentOfUnique = await uniqueHeadingElement.getProperty('parentNode');


  // if (!parentOfUnique) {
  //   return null;
  // }
  
  // const targetContainer = await parentOfUnique.getProperty('nextSibling');

  // console.log(targetContainer);

  // if (!targetContainer) {
  //   return null;
  // }

  // const targetElement = await targetContainer.$('tbody > tr:nth-child(2)');

  // const targetText = await targetElement.$eval('th:nth-child(2)', (element) => element.innerText);
  // console.log(targetText);
  // if (targetText) {
  //   return targetText ||  null;
  // } else {
  //   return null;
  // }
};

module.exports = {
  scrape7DSWiki
};
