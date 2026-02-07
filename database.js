// database.js - Sistem Database Sederhana menggunakan LocalStorage

const DATABASE_NAME = 'kemacetan_db';
const TABLE_LOKASI = 'lokasi';

// Inisialisasi database
function initDatabase() {
    if (!localStorage.getItem(DATABASE_NAME)) {
        // Data contoh untuk inisialisasi
        const initialData = {
            lokasi: [
                {
                    no: 1,
                    alamat: "Jl. Sudirman No. 123",
                    latitude: -6.2088,
                    longitude: 106.8456,
                    kecamatan: "Tanah Abang",
                    kota: "Jakarta Pusat",
                    provinsi: "DKI Jakarta",
                    kode_pos: "10220",
                    traffic_level: "Macet",
                    created_at: "2024-03-15 14:30:00"
                },
                {
                    no: 2,
                    alamat: "Jl. Thamrin No. 45",
                    latitude: -6.1865,
                    longitude: 106.8222,
                    kecamatan: "Gambir",
                    kota: "Jakarta Pusat",
                    provinsi: "DKI Jakarta",
                    kode_pos: "10110",
                    traffic_level: "Padat",
                    created_at: "2024-03-14 09:15:00"
                },
                {
                    no: 3,
                    alamat: "Jl. Gatot Subroto No. 78",
                    latitude: -6.2250,
                    longitude: 106.8080,
                    kecamatan: "Kuningan",
                    kota: "Jakarta Selatan",
                    provinsi: "DKI Jakarta",
                    kode_pos: "12950",
                    traffic_level: "Lancar",
                    created_at: "2024-03-13 16:45:00"
                },
                {
                    no: 4,
                    alamat: "Jl. S. Parman No. 21",
                    latitude: -6.1781,
                    longitude: 106.7950,
                    kecamatan: "Grogol",
                    kota: "Jakarta Barat",
                    provinsi: "DKI Jakarta",
                    kode_pos: "11470",
                    traffic_level: "Macet",
                    created_at: "2024-03-12 17:20:00"
                },
                {
                    no: 5,
                    alamat: "Jl. Rasuna Said No. 15",
                    latitude: -6.2172,
                    longitude: 106.8301,
                    kecamatan: "Setiabudi",
                    kota: "Jakarta Selatan",
                    provinsi: "DKI Jakarta",
                    kode_pos: "12940",
                    traffic_level: "Padat",
                    created_at: "2024-03-11 10:10:00"
                },
                {
                    no: 6,
                    alamat: "Jl. M.H. Thamrin No. 1",
                    latitude: -6.1823,
                    longitude: 106.8429,
                    kecamatan: "Menteng",
                    kota: "Jakarta Pusat",
                    provinsi: "DKI Jakarta",
                    kode_pos: "10310",
                    traffic_level: "Lancar",
                    created_at: "2024-03-10 08:30:00"
                },
                {
                    no: 7,
                    alamat: "Jl. Hayam Wuruk No. 88",
                    latitude: -6.1465,
                    longitude: 106.8157,
                    kecamatan: "Taman Sari",
                    kota: "Jakarta Barat",
                    provinsi: "DKI Jakarta",
                    kode_pos: "11160",
                    traffic_level: "Lancar",
                    created_at: "2024-03-09 11:45:00"
                },
                {
                    no: 8,
                    alamat: "Jl. Pemuda No. 32",
                    latitude: -6.1894,
                    longitude: 106.8926,
                    kecamatan: "Rawamangun",
                    kota: "Jakarta Timur",
                    provinsi: "DKI Jakarta",
                    kode_pos: "13220",
                    traffic_level: "Padat",
                    created_at: "2024-03-08 13:15:00"
                }
            ]
        };
        
        localStorage.setItem(DATABASE_NAME, JSON.stringify(initialData));
        console.log('Database berhasil diinisialisasi dengan data contoh');
    }
    return true;
}

// Ambil semua data lokasi
function getAllLokasi() {
    const db = JSON.parse(localStorage.getItem(DATABASE_NAME) || '{"lokasi":[]}');
    return db.lokasi;
}

// Ambil data lokasi berdasarkan ID
function getLokasiById(no) {
    const lokasiList = getAllLokasi();
    return lokasiList.find(lokasi => lokasi.no == no) || null;
}

// Tambah data lokasi baru
function addLokasi(data) {
    const db = JSON.parse(localStorage.getItem(DATABASE_NAME) || '{"lokasi":[]}');
    
    // Generate nomor baru (auto increment)
    const lastNo = db.lokasi.length > 0 ? Math.max(...db.lokasi.map(l => l.no)) : 0;
    const newNo = lastNo + 1;
    
    // Tambahkan timestamp
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
    
    const newLokasi = {
        no: newNo,
        alamat: data.alamat || '',
        latitude: parseFloat(data.latitude) || 0,
        longitude: parseFloat(data.longitude) || 0,
        kecamatan: data.kecamatan || '',
        kota: data.kota || '',
        provinsi: data.provinsi || '',
        kode_pos: data.kode_pos || '',
        traffic_level: data.traffic_level || 'Tidak diketahui',
        created_at: formattedDate
    };
    
    db.lokasi.push(newLokasi);
    localStorage.setItem(DATABASE_NAME, JSON.stringify(db));
    
    return newLokasi;
}

// Update data lokasi
function updateLokasi(no, data) {
    const db = JSON.parse(localStorage.getItem(DATABASE_NAME) || '{"lokasi":[]}');
    const index = db.lokasi.findIndex(lokasi => lokasi.no == no);
    
    if (index === -1) return false;
    
    // Update data
    db.lokasi[index] = {
        ...db.lokasi[index],
        alamat: data.alamat || db.lokasi[index].alamat,
        latitude: parseFloat(data.latitude) || db.lokasi[index].latitude,
        longitude: parseFloat(data.longitude) || db.lokasi[index].longitude,
        kecamatan: data.kecamatan || db.lokasi[index].kecamatan,
        kota: data.kota || db.lokasi[index].kota,
        provinsi: data.provinsi || db.lokasi[index].provinsi,
        kode_pos: data.kode_pos || db.lokasi[index].kode_pos,
        traffic_level: data.traffic_level || db.lokasi[index].traffic_level
    };
    
    localStorage.setItem(DATABASE_NAME, JSON.stringify(db));
    return true;
}

// Hapus data lokasi
function deleteLokasi(no) {
    const db = JSON.parse(localStorage.getItem(DATABASE_NAME) || '{"lokasi":[]}');
    const initialLength = db.lokasi.length;
    
    db.lokasi = db.lokasi.filter(lokasi => lokasi.no != no);
    
    if (db.lokasi.length < initialLength) {
        localStorage.setItem(DATABASE_NAME, JSON.stringify(db));
        return true;
    }
    
    return false;
}

// Hitung statistik
function getStatistics() {
    const lokasiList = getAllLokasi();
    const total = lokasiList.length;
    
    const lancar = lokasiList.filter(l => l.traffic_level === 'Lancar').length;
    const padat = lokasiList.filter(l => l.traffic_level === 'Padat').length;
    const macet = lokasiList.filter(l => l.traffic_level === 'Macet').length;
    
    const lancar_pct = total ? Math.round((lancar / total) * 100) : 0;
    const padat_pct = total ? Math.round((padat / total) * 100) : 0;
    const macet_pct = total ? Math.round((macet / total) * 100) : 0;
    
    return {
        total,
        lancar,
        padat,
        macet,
        lancar_pct,
        padat_pct,
        macet_pct
    };
}

// Cari data berdasarkan kota
function searchByKota(keyword) {
    const lokasiList = getAllLokasi();
    if (!keyword) return lokasiList;
    
    return lokasiList.filter(lokasi => 
        lokasi.kota.toLowerCase().includes(keyword.toLowerCase()) ||
        lokasi.alamat.toLowerCase().includes(keyword.toLowerCase()) ||
        lokasi.kecamatan.toLowerCase().includes(keyword.toLowerCase())
    );
}

// Sorting data
function sortLokasi(lokasiList, field = 'kota', order = 'ASC') {
    return [...lokasiList].sort((a, b) => {
        let aValue = a[field];
        let bValue = b[field];
        
        if (typeof aValue === 'string') aValue = aValue.toLowerCase();
        if (typeof bValue === 'string') bValue = bValue.toLowerCase();
        
        if (order === 'ASC') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
}

// Export fungsi
window.Database = {
    initDatabase,
    getAllLokasi,
    getLokasiById,
    addLokasi,
    updateLokasi,
    deleteLokasi,
    getStatistics,
    searchByKota,
    sortLokasi
};

// Inisialisasi otomatis saat script dimuat
initDatabase();