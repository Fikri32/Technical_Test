// dataServices
const path = require('path');
const fs = require('fs');
const dataFilePath = path.join(__dirname, '../data/form_data.json');

// Get last data ID and generate id for next data
const getNextId = async () => {
    try {
        const existingData = await getFormData();
        const lastId = existingData.length > 0 ? existingData[existingData.length - 1].id : 0;

        if (!isNaN(lastId)) {
            return lastId + 1;
        } else {
            // Jika tidak ada ID sebelumnya, kita mulai dari 1
            return 1;
        }
    } catch (error) {
        console.error('Error getting next ID:', error);
        throw error;
    }
};


// Save data to file form_data.json
const saveFormData = async (data) => {
    try {
        data.id = await getNextId();
        const existingData = await getFormData();
        existingData.push(data);
        fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error saving form data:', error);
        throw error; 
    }
};

//Get All Data from form_data.json
const getFormData = async () => {
    try {
        const rawData = fs.readFileSync(dataFilePath, { encoding: 'utf-8' });
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading form data file:', error);
        return [];
    }
};


//Get Data By ID from form_data.json
const getFormDataById = async (id) => {
    try {
        const existingData = await getFormData();
        const data = existingData.find(item => String(item.id) === String(id));
        return data || null;
    } catch (error) {
        console.error('Error getting form data by ID:', error);
        return null;
    }
};


//Update Data form_data.json
const editFormDataById = async (id, newData) => {
    try {
        const existingData = await getFormData();
        const index = existingData.findIndex(item => String(item.id) === String(id));
        if (index !== -1) {
            existingData[index] = { ...existingData[index], ...newData };
            fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2), 'utf-8');
        } else {
            console.error('Error editing form data: Data not found');
        }
    } catch (error) {
        console.error('Error editing form data:', error);
    }
};

// Delete Data form_data.json
const deleteFormDataById = async (id) => {
    try {
        const existingData = await getFormData();
        const index = existingData.findIndex(item => String(item.id) === String(id));
        if (index !== -1) {
            existingData.splice(index, 1);
            fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), 'utf-8', (err) => {
                if (err) {
                    console.error('Error deleting form data:', err);
                } else {
                    console.log('Data deleted successfully');
                }
            });
        } else {
            console.error('Error deleting form data: Data not found');
        }
    } catch (error) {
        console.error('Error deleting form data:', error);
    }
};



module.exports = {
    saveFormData,
    getFormData,
    getFormDataById,
    editFormDataById,
    deleteFormDataById
};
