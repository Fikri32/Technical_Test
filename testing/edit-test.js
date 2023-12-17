const { Builder, By, until } = require('selenium-webdriver');

async function runTestEdit() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://127.0.0.1:8081/'); // Ganti dengan port frontend yang sebenarnya
        await driver.findElement(By.id('editData')).click();

        // Simpan nilai asli untuk data yang akan diubah untuk perbandingan
        const originalName = await driver.findElement(By.id('nama')).getAttribute('value');
        const originalEmail = await driver.findElement(By.id('email')).getAttribute('value');
        const originalPhoneNumber = await driver.findElement(By.id('nomorTelepon')).getAttribute('value');

        // Hapus nilai lama sebelum memasukkan nilai baru
        await driver.findElement(By.id('nama')).clear();
        await driver.findElement(By.id('email')).clear();
        await driver.findElement(By.id('nomorTelepon')).clear();

        // Masukkan nilai baru
        await driver.findElement(By.id('nama')).sendKeys('Edit'); 
        await driver.findElement(By.id('email')).sendKeys('Edit@example.com'); 
        await driver.findElement(By.id('nomorTelepon')).sendKeys(6281214358152); 
        await driver.findElement(By.id('kirim')).click();

        try {
            // Tunggu hingga Sweet Alert muncul
            await driver.wait(until.elementLocated(By.css('.swal2-popup')), 5000);

            // Dapatkan teks dari Sweet Alert 
            const sweetAlertText = await driver.findElement(By.css('.swal2-html-container')).getText();
            console.log('Sweet Alert Text:', sweetAlertText);

            // Klik tombol "OK" pada Sweet Alert
            await driver.findElement(By.css('.swal2-confirm')).click();

            // Tunggu beberapa saat untuk memastikan element sudah terupdate
            await driver.sleep(7000);

            // Verifikasi bahwa data telah di update jika data dengan id nama_Edit (dsb) sama dengan data yang sudah di update maka edit berhasil
            const updatedName = await driver.findElement(By.id('nama_Edit')).getText();
            const updatedEmail = await driver.findElement(By.id('email_Edit@example.com')).getText();
            const updatedPhoneNumber = await driver.findElement(By.id('nomor_telepon_6281214358152')).getText();

            console.log('Original Name:', originalName);
            console.log('Updated Name:', updatedName);
            console.log('Original Email:', originalEmail);
            console.log('Updated Email:', updatedEmail);
            console.log('Original Phone Number:', originalPhoneNumber);
            console.log('Updated Phone Number:', updatedPhoneNumber);

            // Tambahkan validasi untuk memastikan bahwa data benar-benar berubah
            if (
                updatedName.includes('Edit') &&
                updatedEmail === 'Edit@example.com' &&
                updatedPhoneNumber === '6281214358152'
            ) {
                console.log('Edit Test passed successfully!');
            } else {
                console.error('Edit Test failed: Data not updated correctly.');
            }

        } catch (error) {
            console.error('Test Failed or Timeout', error.message);
        }

    } finally {
        await driver.quit();
    }
}

module.exports = { runTestEdit };
