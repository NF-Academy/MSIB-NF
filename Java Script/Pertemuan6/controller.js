// controller.js
const lihatData = () => {
    window.data.map((item, index) => {
        console.log(`${index + 1}. Nama: ${item.nama}, Umur: ${item.umur}, Alamat: ${item.alamat}, Email: ${item.email}`);
    });
};

const tambahData = (nama, umur, alamat, email) => {
    window.data.push({ nama, umur, alamat, email });
    console.log(`Data ${nama} berhasil ditambahkan!`);
};

const hapusData = (nama) => {
    const index = window.data.findIndex(item => item.nama === nama);
    if (index !== -1) {
        window.data.splice(index, 1);
        console.log(`Data ${nama} berhasil dihapus!`);
    } else {
        console.log(`Data ${nama} tidak ditemukan!`);
    }
};

// Contoh penggunaan
lihatData();
tambahData("Kiki", 23, "Solo", "kiki@email.com");
tambahData("Lina", 27, "Bali", "lina@email.com");
lihatData();
hapusData("Budi");
lihatData();
