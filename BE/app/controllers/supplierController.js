const db = require('../config/db');

const supplierController = {
    getAllSuppliers: async (req, res) => {
        try {
            const [suppliers] = await db.execute('SELECT * FROM suppliers');
            res.json(suppliers);
        } catch (error) {
            console.error('Error getting suppliers:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    getSupplierById: async (req, res) => {
        const { id } = req.params;
        try {
            const [singleSupplier] = await db.execute('SELECT * FROM suppliers WHERE id = ?', [id]);
            if (singleSupplier.length > 0) {
                res.json(singleSupplier[0]);
            } else {
                res.status(404).send('Supplier not found');
            }
        } catch (error) {
            console.error('Error getting supplier by ID:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    createSupplier: async (req, res) => {
        const { name, description, image } = req.body;
        try {
            await db.execute('INSERT INTO suppliers (name, description, image) VALUES (?, ?, ?)', [name, description, image]);
            res.json({ message: 'Supplier created successfully' });
        } catch (error) {
            console.error('Error creating supplier:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    updateSupplierById: async (req, res) => {
        const { id } = req.params;
        const { name, description, image } = req.body;
        try {
            await db.execute('UPDATE suppliers SET name=?, description=?, image=? WHERE id=?', [name, description, image, id]);
            res.json({ message: 'Supplier updated successfully' });
        } catch (error) {
            console.error('Error updating supplier:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteSupplierById: async (req, res) => {
        const { id } = req.params;
        try {
            await db.execute('DELETE FROM suppliers WHERE id = ?', [id]);
            res.json({ message: 'Supplier deleted successfully' });
        } catch (error) {
            console.error('Error deleting supplier:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    searchSuppliers: async (req, res) => {
        const { name } = req.query;
        try {
            const [suppliers] = await db.execute('SELECT * FROM suppliers WHERE name LIKE ? OR description LIKE ?', [`%${name}%`, `%${name}%`]);
            res.json(suppliers);
        } catch (error) {
            console.error('Error searching suppliers:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = supplierController;
