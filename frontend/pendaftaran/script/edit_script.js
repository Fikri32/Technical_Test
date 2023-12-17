document.addEventListener('DOMContentLoaded', function () {
    // Ambil ID Pendaftaran dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Ambil Data Pendaftaran dari Backend
    fetch(`http://localhost:3000/api/pendaftaran/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Isi Form dengan Data Pendaftaran
            document.getElementById("nama").value = data.nama;
            document.getElementById("email").value = data.email;
            document.getElementById("nomorTelepon").value = data.nomor_telepon;
        })
        .catch(error => console.error('Error fetching data:', error));

    // Tambahkan event listener untuk menanggapi klik tombol "Simpan"
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Ambil nilai formulir setelah pengguna mengubahnya
        const updatedFormData = {
            nama: document.getElementById("nama").value,
            email: document.getElementById("email").value,
            nomor_telepon: document.getElementById("nomorTelepon").value
        };

        // Perbarui Data Pendaftaran pada Backend
        fetch(`http://localhost:3000/api/pendaftaran/${id}/update/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFormData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Response:", data);

                // Tampilkan SweetAlert setelah berhasil update data
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Data berhasil diupdate.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Redirect ke halaman index setelah menutup SweetAlert
                    window.location.href = "/index.html";
                });
            })
            .catch(error => {
                console.error("Update Error:", error);
            });
    });

});

// Validation Form
document.addEventListener('DOMContentLoaded', function () {
    // Temukan semua elemen input yang ingin divalidasi
    var namaInput = document.getElementById('nama');
    var emailInput = document.getElementById('email');
    var nomorTeleponInput = document.getElementById('nomorTelepon');

    // Tambahkan event listener untuk setiap elemen input
    namaInput.addEventListener('blur', checkForValidations);
    emailInput.addEventListener('blur', checkForValidations);
    nomorTeleponInput.addEventListener('blur', checkForValidations);

    // Tambahkan event listener untuk menghapus kelas validasi saat input mendapatkan fokus
    namaInput.addEventListener('focus', removeValidationClass);
    emailInput.addEventListener('focus', removeValidationClass);
    nomorTeleponInput.addEventListener('focus', removeValidationClass);
});

function checkForValidations(evt) {
    var input = evt.target;
    var errorMessage = document.getElementById(input.id + '-error');

    if (!validateInput(input)) {
        shakeAndHighlight(input);
        errorMessage.style.display = 'block';
    } else {
        input.classList.remove('error', 'animated', 'shake');
        errorMessage.style.display = 'none';
    }
}

function validateInput(input) {
    if (emptyField(input)) return false;

    switch (input.id) {
        case 'nama':
            return validateNama(input);
        case 'email':
            return validateEmail(input);
        case 'nomorTelepon':
            return validateNomorTelepon(input);
        default:
            return true;
    }
}

function validateNama(input) {
    var isValid = input.value.length >= 2;
    toggleErrorMessage(input, isValid);
    return isValid;
}

function validateEmail(input) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = emailRegex.test(input.value);
    toggleErrorMessage(input, isValid);
    return isValid;
}

function validateNomorTelepon(input) {
    var nomorTeleponRegex = /^(?:(?:\+|0{0,2})[1-9]\d{0,2}\s?)?(?:\()?\d{3}(?:\))?(?:[\s.-]?)\d{3}(?:[\s.-]?)\d{4}$/;
    var isValid = nomorTeleponRegex.test(input.value);
    toggleErrorMessage(input, isValid);
    return isValid;
}

function toggleErrorMessage(input, isValid) {
    var errorMessage = document.getElementById(input.id + '-error');
    errorMessage.style.display = isValid ? 'none' : 'block';
}

function removeValidationClass(evt) {
    var input = evt.target;
    var errorMessage = document.getElementById(input.id + '-error');

    input.classList.remove('success', 'error', 'animated', 'shake');
    errorMessage.style.display = 'none';
}

function emptyField(input) {
    return input.value === '';
}

function shakeAndHighlight(input) {
    input.classList.add('error', 'animated', 'shake');
}
// End


