// Native fetch is available in Node.js 18+

async function test() {
    try {
        console.log("Fetching products from port 3001...");
        const response = await fetch('http://localhost:3001/api/products');
        console.log("Status:", response.status);
        if (response.ok) {
            const data = await response.json();
            console.log("Data length:", data.length);
            console.log("First item:", data[0]);
        } else {
            console.log("Response not OK");
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

test();
