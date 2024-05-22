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

module.exports = FormatJam