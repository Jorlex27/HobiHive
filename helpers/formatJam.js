const FormatJam = (tanggal) => {
    const difference = new Date() - new Date(tanggal)
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    if (hours === 0){
        return minutes + " minutes ago"
    }
    if (minutes === 0){
        return hours + " hours ago"
    }
    return hours + " hours " + minutes + " minutes " + "ago";
}

const FormatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleString()
}

const FormatTanggalIndonesia = (dateString) => {
    const date = new Date(dateString);

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const dayName = days[date.getUTCDay()];
    const day = date.getUTCDate();
    const monthName = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
}


module.exports = {FormatJam, FormatTanggal, FormatTanggalIndonesia}