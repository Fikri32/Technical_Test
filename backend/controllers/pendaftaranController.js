// pendaftaranController.js
const  dataServices  = require("../data_services/dataServices");

const getData = async (req, res) => {
    const formData = await dataServices.getFormData();
    res.json(formData);
};

const storeData = async (req, res) => {
    const dataForm = req.body;
    dataServices.saveFormData(dataForm);
    res.json({ pesan: 'Data formulir diterima dengan sukses' });
};

const getDataById = async (req, res) => {
    const id = req.params.id;
    const data = await dataServices.getFormDataById(id);
    res.json(data);
};

const updateData = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    dataServices.editFormDataById(id, newData);
    res.json({ pesan: 'Data formulir berhasil diubah' });
};

const deleteData = async (req, res) => {
    const id = req.params.id;
    dataServices.deleteFormDataById(id);
    res.json({ pesan: 'Data formulir berhasil dihapus' });
};

module.exports = {
    getData,
    storeData,
    getDataById,
    updateData,
    deleteData
};
