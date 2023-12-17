document.addEventListener('DOMContentLoaded', function () {
    // Inisialisasi DataTable
    const dataTable = new DataTable('#dataTable', {
        responsive:true,
        columns: [
            { data: 'nama' },
            { data: 'email' },
            { data: 'nomor_telepon' },
            {
                data: null,
                render: function (data, type, row) {
                    // Create action buttons for each row
                    return `<div class="action-buttons">
                                <button class="edit-button" id="editData" onclick="editData('${row.id}')"><i class="fa fa-pencil fa-solid" aria-hidden="true"></i></button>
                                <button class="delete-button" id="deleteData" onclick="deleteData('${row.id}')"><i class="fa fa-trash" aria-hidden="true"></i></button>
                            </div>`;
                }
            }
        ],
        dom: 'Bfrtip',
        buttons: [

            {
                text: '<i class="fa fa-plus"></i> Tambah Pendaftar',
                className: 'add-button',
                action: function () {
                    // Arahkan ke URL yang disimpan di atribut data-href
                    const targetUrl = `pendaftaran/view/create.html`;
                    window.location.href = targetUrl;
                }, attr: {
                    id: 'addData'
                }
            }, 'copy', 'csv', 'excel', 'pdf', 'print',
        ],
        createdRow: function (row, data, dataIndex) {
            // Setel ID pada elemen <td> sesuai dengan nama kolom
            const columns = dataTable.settings()[0].aoColumns;
            for (let i = 0; i < columns.length; i++) {
                const columnName = columns[i].data;
                const cell = row.cells[i];
                cell.id = `${columnName}_${data[columnName]}`;
            }
        }
    });
    // Emd
    // Fetch data dari backend
    fetch('http://localhost:3000/api/pendaftaran')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            dataTable.rows.add(data).draw();
        })
        .catch(error => console.error('Error fetching data:', error));
        // End
});

// Action Button
function addData() {
    // Arahkan ke URL yang disimpan di atribut data-href
    const targetUrl = `pendaftaran/view/create.html`;
    window.location.href = targetUrl;
}
function editData(id) {
    // Arahkan ke URL yang disimpan di atribut data-href
    const targetUrl = `pendaftaran/view/edit.html?id=${id}`;
    window.location.href = targetUrl;
}

function deleteData(id) {
    // Tampilkan konfirmasi SweetAlert
    Swal.fire({
        title: 'Anda yakin?',
        text: 'Data akan dihapus secara permanen!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            // Jika pengguna menekan "Ya", kirim permintaan DELETE ke backend
            fetch(`http://localhost:3000/api/pendaftaran/${id}/delete/`, {
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Delete Response:", data);
                    // Redirect to index.html after successful delete
                    window.location.href = "/index.html";
                })
                .catch(error => {
                    console.error("Delete Error:", error);
                });
        }
    });
}


