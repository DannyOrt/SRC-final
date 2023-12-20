import puppeteer from "puppeteer-core";

export const scrap = async () => {
    const browser = await puppeteer.launch({
        executablePath: process.env.CHROME_BIN || null,
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })

    const page = await browser.newPage();

    await page.goto('http://www.ssn.unam.mx/');

    const lastSismo = await page.evaluate(() => {
        const date = [...document.querySelectorAll(".date")]
        const time = [...document.querySelectorAll(".time")]
        const mag = [...document.querySelectorAll(".mag")]
        const episub = [...document.querySelectorAll(".epi-sub")]
        const loc = [...document.querySelectorAll(".loc")]
        const prof = [...document.querySelectorAll(".prof")]

        const cleanDate = date[1].innerText.split("Fecha:  ")[1];
        const cleanTime = time[0].innerText.split("Hora:  ")[1];
        const cleanMag = mag[0].innerText.split("MAGNITUD: ")[1];
        const cleanlat = episub[1].innerText.split("Latitud:  ")[1];
        const cleanlon = episub[2].innerText.split("Longitud:  ")[1];
        const cleanloc = loc[0].innerText.split("LOCALIZACIÓN: ")[1];
        const cleanprof = prof[0].innerText.split("PROFUNDIDAD: ")[1];

        return {
            date: cleanDate,
            time: cleanTime,
            mag: cleanMag,
            lat: cleanlat,
            lon: cleanlon,
            loc: cleanloc,
            prof: cleanprof
        }
    });

    await browser.close();

    return lastSismo;
}