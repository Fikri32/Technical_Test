const { Builder, By, until } = require('selenium-webdriver');

async function runTestDelete() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://127.0.0.1:8081/'); 

        //Mencari button delete dan melakukan action click
        const deleteButton = await driver.findElement(By.id('deleteData'));
        await deleteButton.click();

        // Tunggu hingga Sweet Alert muncul
        await driver.wait(until.elementLocated(By.css('.swal2-popup')), 5000);

        // Dapatkan teks dari Sweet Alert
        const sweetAlertText = await driver.findElement(By.css('.swal2-html-container')).getText();
        console.log('Sweet Alert Text:', sweetAlertText);

        // Klik tombol "OK" pada Sweet Alert
        await driver.findElement(By.css('.swal2-confirm')).click();

        //Validasi data : Jika data dengan id:nama_Edit sudah tidak muncul ditable maka delete berhasil
        try {
            const deletedNameElement = await driver.wait(
                until.elementLocated(By.id('nama_Edit')),
                5000
            );
            const isDeleted = await deletedNameElement.isDisplayed();

            if (isDeleted) {
                console.error('Error: Data is still displayed after deletion');
            } else {
                console.log('Data successfully deleted!');
            }
        } catch (error) {
            // Tangkap NoSuchElementError dan anggap sebagai sukses
            console.log('Data successfully deleted!');
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await driver.quit();
    }
}

module.exports = { runTestDelete };
