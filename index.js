import puppeteer from "puppeteer";
import fs from "fs";
import { createDiffieHellmanGroup } from "crypto";

const PSEUDO = "Badozzz";
const PATH = "screenshots/" + PSEUDO + "_";
const ENABLE_VOTE_2 = true;
// const ENABLE_VOTE_3 = true; //captcha
const ENABLE_VOTE_4 = true;
const ENABLE_VOTE_5 = true;
const ENABLE_VOTE_6 = false;
const ENABLE_VOTE_7 = true;

const save_html = async (page, path) => {
  const content = await page.content();
  fs.writeFileSync(path, content);
};

const getsUrl = async (pages) => {
  const debutsURL = [];

  for (const page of pages) {
    const url = await page.url();
    console.log(url);
    const debutURL = url.split("/")[2]; // Tronquer avant le premier slash
    debutsURL.push(debutURL);
  }
  return debutsURL;
};

const skip_popup = async (page) => {
  await page.waitForTimeout(3000);
  await page.mouse.click(369, 117);
};

const getPagePos = (pages, url) => {
  for (var i = 0; i < pages.length; i++) {
    if (pages[i] == url) {
      console.log("i: " + i);
      return i;
    }
  }
};

const login = async (page) => {
  await page.goto("https://survivalworld.fr/vote");
  await page.setViewport({ width: 1080, height: 1024 });
  // login
  const champTexteSelector = "#stepNameInput";
  await page.waitForSelector(champTexteSelector);
  const texteAInserer = PSEUDO;
  await page.type(champTexteSelector, texteAInserer);
  await page.keyboard.press("Enter");
  await page.waitForNetworkIdle();
  await skip_popup(page);
  await page.waitForNetworkIdle();
  await page.waitForTimeout(3000);
  await page.waitForNetworkIdle();
};

//vote 2 - 5
if (ENABLE_VOTE_2 || ENABLE_VOTE_5) {
  console.log("vote 2 et 5");
  try {
    await (async () => {
      // Launch the browser and open a new blank page
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // init
      await login(page);

      await page.screenshot({ path: PATH + "login.png" });

      //lien 2 OK
      if (ENABLE_VOTE_2) {
        await page.mouse.click(243, 134);
        await skip_popup(page);
        await page.waitForTimeout(7000);
        await page.mouse.click(732, 589);
        await page.waitForTimeout(1000);
      }
      //lien 5 OK
      if (ENABLE_VOTE_5) {
        await page.mouse.click(228, 343);
        await skip_popup(page);
        await page.waitForTimeout(7000);
        await page.mouse.click(732, 589);
        await page.waitForTimeout(1000);
      }
      await browser.close();
    })();
  } catch (err) {
    console.log(err);
  }
}

//vote 4
if (ENABLE_VOTE_4) {
  try {
    await (async () => {
      // Launch the browser and open a new blank page
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await login(page);

      await page.mouse.click(222, 274);
      await skip_popup(page);
      await page.waitForTimeout(7000);
      await page.screenshot({ path: PATH + "tmp1.png" });
      const pages = await browser.pages();
      const urls = await getsUrl(pages);
      if (pages.length > 2) {
        const page4pos = getPagePos(urls, "serveur-minecraft-vote.fr");
        const page4 = pages[page4pos];
        await page4.waitForNetworkIdle();
        await page4.type("#pseudo", PSEUDO);
        await page4.click("#vote-button-action");
        await page.waitForTimeout(5000);
      }
      await browser.close();
    })();
  } catch (err) {
    console.log(err);
  }
}

if (ENABLE_VOTE_7) {
  try {
    console.log("vote 7");
    await (async () => {
      // Launch the browser and open a new blank page
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // init
      await login(page);

      await page.mouse.click(228, 477);
      await skip_popup(page);
      await page.waitForTimeout(7000);
      const pages = await browser.pages();
      const urls = await getsUrl(pages);
      if (pages.length > 2) {
        const page7pos = getPagePos(urls, "top-serveurs.net");
        const page7 = pages[page7pos];
        await page7.waitForNetworkIdle();
        await page7.click("button.fc-button.fc-cta-consent.fc-primary-button");
        await page7.waitForNetworkIdle();
        await page7.click(
          "button.btn.btn-success.rounded.btn-lg.btn-submit-vote"
        );
        await page7.waitForNetworkIdle();
        await page.waitForTimeout(5000);
        await page.mouse.click(732, 589);
        await page.waitForTimeout(1000);
      }

      await browser.close();
    })();
  } catch (err) {
    console.log(err);
  }
}

//lien 6 ok vers lien
// await page.mouse.click(246, 405);
// await skip_popup(page);
// await page.waitForTimeout(7000);
// await page.mouse.click(732, 589);
// await page.waitForTimeout(1000);
if (ENABLE_VOTE_6) {
  console.log("vote 6");
  try {
    await (async () => {
      // Launch the browser and open a new blank page
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // init
      await login(page);

      await page.mouse.click(246, 405);
      await skip_popup(page);
      await page.waitForTimeout(7000);
      const pages = await browser.pages();
      const urls = await getsUrl(pages);
      if (pages.length > 2) {
        const page6pos = getPagePos(urls, "www.liste-serveurs-minecraft.org");
        const page6 = pages[page6pos];
        await page6.evaluate(() => {
          const curseur = document.createElement("div");
          curseur.style.position = "absolute";
          curseur.style.width = "10px";
          curseur.style.height = "10px";
          curseur.style.backgroundColor = "red";
          document.body.appendChild(curseur);

          window.addEventListener("mousemove", (e) => {
            curseur.style.left = e.pageX + "px";
            curseur.style.top = e.pageY + "px";
          });
        });
        await page6.mouse.click(386, 281);
        await page6.screenshot({ path: PATH + "tmp1.png" });
        await page6.waitForNetworkIdle();

        await page6.mouse.click(594, 564);
        await page6.screenshot({ path: PATH + "tmp2.png" });
        await page.waitForTimeout(7000);
        await page.mouse.click(732, 589);
        await page.waitForTimeout(1000);
      }
      await browser.close();
    })();
  } catch (err) {
    console.log(err);
  }
}

await (async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // init
  await login(page);

  await page.screenshot({ path: PATH + "final.png" });
  await browser.close();
})();
