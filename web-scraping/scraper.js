const puppeteer = require("puppeteer");

// run in a non-headless mode
const __browserPromise = puppeteer.launch({
  headless: true,
});

const __createPage = async (browserPromise) => {
  // Create new page
  const browserInstance = await browserPromise;
  const page = await browserInstance.newPage();

  // Set browser viewport
  await page.setViewport({ width: 1199, height: 900 });
  return page;
};

const scrapeCharacterUltimate = async (page) => {
  console.log("Scraping ultimate...");
  const characterUltimateElementIdentifier = "#Ultimate";

  // Tries to scrape the Unique Ability

  // We wait until this element loads
  try {
    await page.waitForSelector(characterUltimateElementIdentifier);

    // After it loads we scrape the content

    // Doing $eval will give us the reference element
    // And then inside the function we can use is as a usual HTMLElement
    // We can't do it in Node Environment so will have to resort to this way
    const elementText = await page.$eval(
      characterUltimateElementIdentifier,
      (element) => {
        const parentOfUltimate = element.parentElement;
        const descriptionTable = parentOfUltimate.nextElementSibling;

        const [
          titleRow,
          descRow,
        ] = descriptionTable.querySelectorAll('tr');
        
        const ultimateName = titleRow.innerText;
        const ultimateDesc = descRow.querySelector('td').innerText;

        return `**${ultimateName}** - ${ultimateDesc}`;
      }
    );

    console.log("Scraping done for ultimate!");
    return elementText || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const scrapeCharacterUnique = async (page) => {
  console.log("Scraping unique...");
  const characterUniqueElementIdentifier = "#Unique";

  // Tries to scrape the Unique Ability

  // We wait until this element loads
  try {
    await page.waitForSelector(characterUniqueElementIdentifier);

    // After it loads we scrape the content

    // Doing $eval will give us the reference element
    // And then inside the function we can use is as a usual HTMLElement
    // We can't do it in Node Environment so will have to resort to this way
    const elementText = await page.$eval(
      characterUniqueElementIdentifier,
      (element) => {
        const parentOfUnique = element.parentElement;
        const descriptionTable = parentOfUnique.nextElementSibling;

        const [
          titleRow,
          descRow,
        ] = descriptionTable.querySelectorAll('tr');
        
        const uniqueName = titleRow.innerText;
        const uniqueDesc = descRow.querySelector('td').innerText;

        return `**${uniqueName}** - ${uniqueDesc}`;
      }
    );

    console.log("Scraping done for unique!");
    return elementText || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const scrapeCharacterName = async (page) => {
  console.log("Scraping name...");
  try {
    await page.waitForSelector("aside");

    const charName = await page.$eval("aside", (asideEl) => {
      const nameEl = asideEl.querySelector("h2");

      return nameEl.innerText;
    });

    console.log("Scraping done for name!");
    return charName || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const scrapeCharacterAttribute = async (page) => {
  console.log("Scraping attribute...");
  try {
    await page.waitForSelector("aside");

    const charAttr = await page.$eval("aside", (asideEl) => {
      const dataSourceKey = "attribute";

      const attrEl = asideEl.querySelector(
        `div.pi-item[data-source="${dataSourceKey}"] > div.pi-data-value img`
      );

      const tokenizedAlt = attrEl.alt.split(/[\s\.]+/);
      return tokenizedAlt.length === 3
        ? tokenizedAlt[1].toUpperCase()
        : attrEl.alt;
    });

    console.log("Scraping done for attribute!");
    return charAttr || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const scrapeCharacterRace = async (page) => {
  console.log("Scraping race...");

  try {
    await page.waitForSelector("aside");

    const charRace = await page.$eval("aside", (asideEl) => {
      const dataSourceKey = "race";

      const attrEl = asideEl.querySelector(
        `div.pi-item[data-source="${dataSourceKey}"] > div.pi-data-value img`
      );

      const tokenizedAlt = attrEl.alt.split(/[\s\.]+/);
      return tokenizedAlt.length === 3 ? tokenizedAlt[1] : attrEl.alt;
    });

    console.log("Scraping done for race!");
    return charRace || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const scrapeCharacterEquipment1 = async (page) => {
  console.log("Scraping eq. 1...");

  try {
    await page.waitForSelector("aside");

    const charEq1 = await page.$eval("aside", (asideEl) => {
      const dataSourceKey = "equipment1";

      const targetEl = asideEl.querySelector(
        `div.pi-item[data-source="${dataSourceKey}"] > div.pi-data-value`
      );

      const targetText = targetEl.innerText
        .split(/[\n]+/g)
        .map((word) => word.trim())
        .join(" / ");
      return targetText;
    });

    console.log("Scraping done for eq. 1!");
    return charEq1 || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const scrapeCharacterEquipment2 = async (page) => {
  console.log("Scraping eq. 2...");

  try {
    await page.waitForSelector("aside");

    const charEq1 = await page.$eval("aside", (asideEl) => {
      const dataSourceKey = "equipment2";

      const targetEl = asideEl.querySelector(
        `div.pi-item[data-source="${dataSourceKey}"] > div.pi-data-value`
      );

      const targetText = targetEl.innerText
        .split(/[\n]+/g)
        .map((word) => word.trim())
        .join(" / ");
      return targetText;
    });

    console.log("Scraping done for eq. 2!");
    return charEq1 || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const scrapeCharacterEquipment3 = async (page) => {
  console.log("Scraping eq. 3...");

  try {
    await page.waitForSelector("aside");

    const charEq1 = await page.$eval("aside", (asideEl) => {
      const dataSourceKey = "equipment3";

      const targetEl = asideEl.querySelector(
        `div.pi-item[data-source="${dataSourceKey}"] > div.pi-data-value`
      );

      const targetText = targetEl.innerText
        .split(/[\n]+/g)
        .map((word) => word.trim())
        .join(" / ");
      return targetText;
    });

    console.log("Scraping done for eq. 3!");
    return charEq1 || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const scrapeEquipmentSubstats = async (page) => {
  console.log("Scraping eq substats...");
  const characterUsageElementIdentifier = "#Usage";

  try {
    await page.waitForSelector(characterUsageElementIdentifier);

    const elementText = await page.$eval(
      characterUsageElementIdentifier,
      (element) => {
        const parentOfUsage = element.parentElement;
        let targetSibling = parentOfUsage.nextElementSibling;
        let targetText = '';
        
        // NOTE: A really crude way since the elements are very simple
        // and doesn't have a specific identifier
        while (targetSibling.matches(`${parentOfUsage.tagName.toLowerCase()} ~ p`)) {
          const targetInnerText = targetSibling.innerText;

          if (targetInnerText.includes('Bracer/Ring')) {
            targetText = targetInnerText.split('\n').splice(1, 3).join('\n');
            console.log(targetInnerText);
            break;
          } else {
            targetSibling = targetSibling.nextElementSibling;
          }
        }

        return targetText;
      }
    );

    console.log("Scraping done for eq substats!");
    return elementText || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const scrapeCharacterSkills = async (page) => {
  console.log("Scraping skills...");
  const characterSkillsElementIdentifier = "#Skills";

  // Tries to scrape the Unique Ability

  try {
    await page.waitForSelector(characterSkillsElementIdentifier);

    const elementText = await page.$eval(
      characterSkillsElementIdentifier,
      (element) => {
        // TODO: For some reason we can't pass an external function into this callback
        // investigate later
        const parseSkillText = (rowEl) => {
          const skillRank = rowEl.querySelectorAll('th:not([rowspan])')[0].innerText;
          const skillDesc = rowEl.querySelector('td').innerText;
        
          return `_${skillRank}:_ ${skillDesc}`;
        };

        const parseSkillHTMLTable = (tableEl) => {
          const [
            titleRow,
            firstRowWithImage,
            secondRow,
            thirdRow,
          ] = tableEl.querySelectorAll('tr');
        
          return `**${titleRow.innerText}**\n${parseSkillText(firstRowWithImage)}\n${parseSkillText(secondRow)}\n${parseSkillText(thirdRow)}`;
        };

        const parentOfSkills = element.parentElement;
        const firstSkillTable = parentOfSkills.nextElementSibling;
        const secondSkillTable = firstSkillTable.nextElementSibling.nextElementSibling;

        const firstSkill = parseSkillHTMLTable(firstSkillTable);
        const secondSkill = parseSkillHTMLTable(secondSkillTable);

        return firstSkill + '\n\n' + secondSkill;
      }
    );

    console.log("Scraping done for unique!");
    return elementText || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

async function getCharacterImage(wikiLink) {
  const browserPage = await __createPage(__browserPromise);
  await browserPage.goto(wikiLink);

  await browserPage.waitForSelector("aside");

  const imageUrl = await browserPage.$eval("aside", (asideEl) => {
    const imageEl = asideEl.querySelector("img");

    return imageEl.src;
  });

  return imageUrl || null;
}

// This is very dependent on the format of the page
async function scrape7DSWiki(wikiLink) {
  const browserPage = await __createPage(__browserPromise);
  await browserPage.goto(wikiLink);

  // TODO: Investigate how to handle allSettled better
  // TODO: Since we're using allSettled here, make sure each function
  // has a valid return value and proper error catching later
  const [
    characterName,
    characterAttr,
    charEq1,
    charEq2,
    charEq3,
    charEqSubstats,
    characterSkills,
    characterRace,
    characterUltimate,
    characterUnique,
  ] = await Promise.allSettled([
    scrapeCharacterName(browserPage),
    scrapeCharacterAttribute(browserPage),
    scrapeCharacterEquipment1(browserPage),
    scrapeCharacterEquipment2(browserPage),
    scrapeCharacterEquipment3(browserPage),
    scrapeEquipmentSubstats(browserPage),
    scrapeCharacterSkills(browserPage),
    scrapeCharacterRace(browserPage),
    scrapeCharacterUltimate(browserPage),
    scrapeCharacterUnique(browserPage),
  ]);

  return `**${characterName.value || "`Failed to scrape name :(`"}**

Attribute: ${characterAttr.value || "`Failed to scrape attribute :(`"}
Race: ${
    characterRace.value
      ? `${characterRace.value[0].toUpperCase()}${characterRace.value.slice(1)}`
      : "`Failed to scrape race :(`"
  }

Recommended Gears:
${
  charEq1.value ? `Set 1 : ${charEq1.value}` : "`Failed to scrape eq. set 1 :(`"
}
${
  charEq2.value ? `Set 2 : ${charEq2.value}` : "`Failed to scrape eq. set 2 :(`"
}
${charEq3.value ? `Set 3 : ${charEq3.value}` : ""}
${charEqSubstats.value ? `Eq. Substats:\n${charEqSubstats.value}` : ""}

Skills:
${characterSkills.value || "`Failed to scrape skills :(`"}

Ultimate: 
${characterUltimate.value || "`Failed to scrape ultimate :(`"}

Unique: 
${characterUnique.value || "`Failed to scrape unique :(`"}
  `;
}

module.exports = {
  scrape7DSWiki,
  getCharacterImage,
};
