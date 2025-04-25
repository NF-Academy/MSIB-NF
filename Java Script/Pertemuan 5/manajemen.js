document.addEventListener("DOMContentLoaded", function() {
    // Data produk awal
    let products = [
        { id: 1, name: "Laptop", price: 10000 },
        { id: 2, name: "Mouse", price: 20000 },
        { id: 3, name: "Keyboard", price: 50000 },
        { id: 4, name: "Monitor", price: 30000 },
        { id: 5, name: "Printer", price: 15000 }
    ];

    // Fungsi menampilkan produk
    function displayProducts() {
        console.clear();
        console.log("Daftar Produk:");
        products.forEach(({ id, name, price }) => {
            console.log(`${id}. ${name} - Rp${price}`);
        });
    }

    displayProducts();

    // Fungsi menambahkan produk
    function addProduct(...newProducts) {
        products = [...products, ...newProducts];
        displayProducts();
    }

    // Fungsi menghapus produk berdasarkan ID
    function removeProduct(productId) {
        products = products.filter(product => product.id !== productId);
        displayProducts();
    }

    // Pastikan elemen tombol ada sebelum menambahkan event listener
    const addButton = document.getElementById("addProductBtn");
    const removeButton = document.getElementById("removeProductBtn");

    if (!addButton || !removeButton) {
        console.error("Elemen tombol tidak ditemukan! Periksa ID tombol di HTML.");
        return;
    }

    // Event Listener untuk menambahkan produk
    addButton.addEventListener("click", function() {
        const newId = products.length + 1;
        const newName = prompt("Masukkan nama produk:");
        const newPrice = parseInt(prompt("Masukkan harga produk:"));
        if (newName && !isNaN(newPrice)) {
            addProduct({ id: newId, name: newName, price: newPrice });
        } else {
            console.error("Input tidak valid!");
        }
    });

    // Event Listener untuk menghapus produk
    removeButton.addEventListener("click", function() {
        const productId = parseInt(prompt("Masukkan ID produk yang akan dihapus:"));
        if (!isNaN(productId)) {
            removeProduct(productId);
        } else {
            console.error("Input tidak valid!");
        }
    });
});
