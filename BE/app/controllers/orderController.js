const db = require('../config/db');

const orderController = {
    getAllOrder: async (req, res) => {
        try {
            // Lấy tất cả đơn hàng từ cơ sở dữ liệu kèm thông tin của người dùng
            const query = `
                SELECT o.*, u.email AS user_email, u.phone AS user_phone, u.username AS user_username
                FROM orders o
                LEFT JOIN users u ON o.user_id = u.id
            `;
            const [rows] = await db.execute(query);
            res.status(200).json({ data: rows });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getOrderById: async (req, res) => {
        const { id } = req.params;
        try {
            // Lấy đơn hàng theo ID từ cơ sở dữ liệu kèm thông tin của người dùng
            const query = `
                SELECT o.*, u.email AS user_email, u.phone AS user_phone, u.username AS user_username
                FROM orders o
                LEFT JOIN users u ON o.user_id = u.id
                WHERE o.id = ?
            `;
            const [rows] = await db.execute(query, [id]);
            if (rows.length > 0) {
                res.status(200).json({ data: rows[0] });
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createOrder: async (req, res) => {
        const { userId, address, billing, description, status, products, orderTotal } = req.body;
        try {
            // Tạo đơn hàng trong cơ sở dữ liệu
            const [result] = await db.execute(
                'INSERT INTO orders (user_id, address, billing, description, status, products, order_total) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [userId, address, billing, description, status, JSON.stringify(products), orderTotal]
            );

            res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteOrder: async (req, res) => {
        const { id } = req.params;
        try {
            // Xóa đơn hàng từ cơ sở dữ liệu
            await db.execute('DELETE FROM orders WHERE id = ?', [id]);
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateOrder: async (req, res) => {
        const { id } = req.params;
        const { userId, address, billing, description, status, products, orderTotal } = req.body;
        try {
            // Xây dựng câu lệnh SQL cập nhật dựa trên các trường được gửi trong body request
            let updateQuery = 'UPDATE orders SET ';
            let updateParams = [];
            
            // Kiểm tra và thêm các trường cần cập nhật
            if (userId !== undefined) {
                updateQuery += 'user_id=?, ';
                updateParams.push(userId);
            }
            if (address !== undefined) {
                updateQuery += 'address=?, ';
                updateParams.push(address);
            }
            if (billing !== undefined) {
                updateQuery += 'billing=?, ';
                updateParams.push(billing);
            }
            if (description !== undefined) {
                updateQuery += 'description=?, ';
                updateParams.push(description);
            }
            if (status !== undefined) {
                updateQuery += 'status=?, ';
                updateParams.push(status);
            }
            if (products !== undefined) {
                updateQuery += 'products=?, ';
                updateParams.push(JSON.stringify(products));
            }
            if (orderTotal !== undefined) {
                updateQuery += 'order_total=?, ';
                updateParams.push(orderTotal);
            }
            
            // Xóa dấu phẩy cuối cùng và thêm điều kiện WHERE cho ID
            updateQuery = updateQuery.slice(0, -2) + ' WHERE id=?';
            updateParams.push(id);
    
            // Thực thi câu lệnh SQL
            await db.execute(updateQuery, updateParams);
    
            res.status(200).json({ message: 'Order updated successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    

    searchOrderByName: async (req, res) => {
        const { query } = req.query;
        try {
            // Tìm kiếm đơn hàng theo tên từ cơ sở dữ liệu
            const [rows] = await db.execute('SELECT * FROM orders WHERE name LIKE ?', [`%${query}%`]);
            res.status(200).json({ data: rows });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getOrderByUser: async (req, res) => {
        const { id } = req.params;
        console.log(id)
        try {
            // Lấy tất cả đơn hàng của một người dùng từ cơ sở dữ liệu
            const [rows] = await db.execute('SELECT * FROM orders WHERE user_id = ?', [id]);
            res.status(200).json({ data: rows });
        } catch (err) {
            res.status(401).send('Unauthorized');
        }
    }
};

module.exports = orderController;
