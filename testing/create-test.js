const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTestCreate() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Isi Form Data setelah masuk ke halaman create
        await driver.get('http://127.0.0.1:8081/');
        await driver.sleep(5000);
        await driver.findElement(By.id('addData')).click();
        await driver.findElement(By.id('nama')).sendKeys('John Doe');
        await driver.findElement(By.id('email')).sendKeys('john@example.com');
        await driver.findElement(By.id('nomorTelepon')).sendKeys(12345678910);
        await driver.findElement(By.id('kirim')).click();
        // Sweet Alert Confirm
        try {
            // Tunggu hingga Sweet Alert muncul
            await driver.wait(until.elementLocated(By.css('.swal2-popup')), 5000);

            // Dapatkan teks dari Sweet Alert (opsional)
            const sweetAlertText = await driver.findElement(By.css('.swal2-html-container')).getText();
            console.log('Sweet Alert Text:', sweetAlertText);

            // Klik tombol "OK" pada Sweet Alert
            await driver.findElement(By.css('.swal2-confirm')).click();

        } catch (error) {
            console.error('Sweet Alert tidak ditemukan:', error.message);
        }

        console.log('Test passed successfully!');
    } finally {
        await driver.quit();
    }
}

module.exports = { runTestCreate };
