// Tipi analiz edip, ona göre fonksiyonun çağrıldığı yere tipe denk gelen açıklamayı gönderir.
export const detecType = (type) => {
    switch(type) {
        case "park":
            console.log(type);
            return "park yeri";
        case "home":
            console.log(type);
            return "ev";
        case "job":
            console.log(type);
            return "iş";
        case "goto":
            console.log(type);
            return "ziyaret";
        default:
            return ""; // Eğer belirtilen tip dışında bir değer gelirse, boş bir string döndürüyoruz.
    }
};

// Local storage'ı güncelleyecek fonksiyon
export const setStorage = (data) => {
    // Veriyi locale göndermek için stringe çevirme
    const strData = JSON.stringify(data);
    // Local storage'ye veriyi gönderdik.
    localStorage.setItem("notes", strData);
};
var carIcon = L.icon({
    iconUrl: "car.png",
    iconSize: [50, 60],
});
var homeIcon = L.icon({
    iconUrl: "home-marker.png",
    iconSize: [50, 60],
});
var jobIcon = L.icon({
    iconUrl: "job.png",
    iconSize: [50, 60],
});
var visitIcon = L.icon({
    iconUrl: "visit.png",
    iconSize: [50, 60],
});

export const detecIcon = (type) => {
    switch (type) {
        case "park":
            return carIcon;
            case "home":
            return carIcon;
            case"job":
            return jobIcon;
            case"goto":
            return visitIcon;
    }   
};
