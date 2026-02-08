import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');

// Helper to read JSON
const readJson = async (file) => {
    try {
        const data = await fs.readFile(file, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading ${file}:`, err);
        return [];
    }
};

// Helper to write JSON
const writeJson = async (file, data) => {
    await fs.writeFile(file, JSON.stringify(data, null, 2));
};

// GET /api/products
app.get('/api/products', async (req, res) => {
    console.log("GET /api/products request received");
    const products = await readJson(PRODUCTS_FILE);
    res.json(products);
});

// POST /api/orders
app.post('/api/orders', async (req, res) => {
    const newOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...req.body,
        status: 'pending'
    };

    const orders = await readJson(ORDERS_FILE);
    orders.push(newOrder);
    await writeJson(ORDERS_FILE, orders);

    console.log('New Order Received:', newOrder);
    res.status(201).json({ success: true, orderId: newOrder.id, message: "Buyurtma qabul qilindi" });
});

// POST /api/newsletter (Mock)
app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    console.log(`New Newsletter Subscriber: ${email}`);
    res.json({ success: true, message: "Obuna bo'ldingiz!" });
});

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
