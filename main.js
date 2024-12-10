import {v4 as uuidv4} from 'https://jspm.dev/uuid';
import {detecIcon, detecType,setStorage} from './helpers.js';

//!HTML'den gelenler//
const form = document.querySelector("form")
console.log(form);
const list = document.querySelector("ul");

//! Ortak Kullanım Alanı//
var map;
var layerGroup = [];
var notes = JSON.parse(localStorage.getItem("notes")) || [];
var coords = [];

//! Olay İzleyicileri//
form.addEventListener("submit", handleSubmit);
list.addEventListener("click", handleClick)

// *Kullanıcının konumunu öğrenmek için getCurrent position metodunu kullandık ve bizden iki parametre istedi. 
// 1.Kullanıcı konum iznini verdiğinde çalışacak fonksiyondur.
// 2.Kullanıcı konum iznini vermediğinde çalışacak fonksiyondur.

navigator.geolocation.getCurrentPosition(loadMap, errorFunction);
function errorFunction() {
    console.log ("hata");
}
//*Haritaya tıklanınca çalışır.
function onMapClick(e) {
    //*Haritaya tıklandığında form bileşeninin display özelliğini flex yaptık.
    form.style.display = "flex";
    coords = [e.latlng.lat, e.latlng.lng];

    
}

map.on('click', onMapClick);
//*Kullanıcını konumuna göre haritayı ekrana aktarır.
function loadMap(e) {
    console.log(e);
    //*Haritanın kurulumu
    map = L.map('map').setView([e.coords.latitude, e.coords.longitude], 10);
    //*Haritanın nasıl gözükeceğini belirler.
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    //*3.Haritada ekrana basılacak imleçleri tutacağımız katman
    layerGroup = L. layerGroup().addTo(map);
    //*Localden gelen notesleri listeleme
    renderNoteList(notes);

    //*Haritada bir tıklanma olduğunda çalışacak fonksiyon
    map.on("click",onMapclic);
   
   
    
}
function renderMarker(item) {
// L.marker([50.505,30.57], {icon myIcon}).addTo(map);
//*Markeri oluşturur.
L.marker(item.coords, {icon:detecIcon(item.status)}).addTo(layerGroup)//*İmleçlerin olduğu katmana ekler.

.bindPopup(`${item.desc}`);//*Üxerine tıklanınca açılacak popup ekranı
}

function handleSubmit(e) {
    e.preventDefault(); //Sayfanın yenilenmesini engeller.
    const desc = e.target[0].value; //* Formun içerisindeki inputun değerini alma
    const date = e.target[1].value;//* Formun içerisindeki date inputunun değerini alma
    const status = e.target[2].value;//*Formun içerisindeki select yapısının değerini alma  
notes.push({
   id: uuidv4(), 
   desc,
   date,
   status,
   coords,

});
//*Local storage yi güncelle 
setStorage(notes);

//*renderNoteList fonksiyonuna parametre olarak notes dizisini gönderdik.
renderNoteList(notes);

//*Form gönderildiğinde kapat
form.style.display = "none";

}
//*Ekrana notları aktaracak fonksiyon
function renderNoteList(item) {
    console.log (item);
    //*Notlar (list) alanını temizler
    list.innerHTML = "";
    //*Markerları temizler.
    layerGroup.clearLayers();
    //* Her bir not için li etiketi oluşturur ve içerisini günceller.
    item.forEach((item) => {
       const listElement = document.createElement("li");//*Bir li etiketi oluşturur.
       listElement.dataset.id = item.id;//*li etiketine data id özelliği ekleme
       listElement.innerHTML = `
       <div>
             <p>${item.desc}</p>

              <p><span>Tarih</span>${item.date}</p>
              <p><span>Durum</span>${detecType(item.status)}</p>
             </div>
             <i class="bi bi-x" id="delete"></i>
             <i class="bi bi-airplane-fill" id="fly"></i> `;
             list.ınsertAdjacentElement("afterbegin", listElement);
             renderMarker(item);
    });
    
}
//*Notes alanında tıklanma olayını izler.
function handleClick(e) {
    //*Güncellenecek elemanın id'sini öğrenmek için parentElement kullandık.
    const id = e.target.parentElement.dataset.id;
    if(e.target.id === "delete"){
        //*id sini bildiğimiz elemanı diziden filter kullanarak kaldırdık.
        notes = notes.filter((note) => note.id !=id);
        setStorage(notes);//*localstorage güncelle 
        renderNoteList(notes);//*Ekranı güncelle
    }
    if (e.taget.id === "fly") {
        //*Tıkladığımız elemanın id si ile dizi içerisindeki elemanlardan birinin id si eşleşirse bul
        const nots = notes.find((note) => note.id == id);
        console.log("tıklanıldı");
        map.flyTo(note.coords);//*Haritayı bulduğumuz elemana yönlendirmesi için flyTo methodunu kullandık.
    }
}

