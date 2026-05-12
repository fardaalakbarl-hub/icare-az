const SUPABASE_URL = "https://irwhnuywppwsfcluaelt.supabase.co";
const SUPABASE_KEY = "sb_publishable_3-DgPo74tGElnm0G6qko5Q_8vBpS46M";

const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

/* OPEN MODAL */

function openModal(){
document.getElementById("modal").style.display = "flex";
}

/* CLOSE MODAL */

window.onclick = function(e){
if(e.target.id == "modal"){
document.getElementById("modal").style.display = "none";
}
}

/* ADD CAR */

async function addCar(){

const brand = document.getElementById("brand").value;
const model = document.getElementById("model").value;
const year = document.getElementById("year").value;
const price = document.getElementById("price").value;
const engine = document.getElementById("engine").value;
const body = document.getElementById("body").value;
const seats = document.getElementById("seats").value;
const color = document.getElementById("color").value;
const rentacar = document.getElementById("rentacar").value;
const location = document.getElementById("location").value;
const phone = document.getElementById("phone").value;
const image = document.getElementById("image").value;

if(!brand || !model || !price){
alert("Məlumatları doldur");
return;
}

await supabase.from("cars").insert([
{
brand,
model,
year,
price,
engine,
body,
seats,
color,
rentacar,
location,
phone,
image
}
]);

loadCars();

document.getElementById("modal").style.display = "none";

}

/* LOAD CARS */

async function loadCars(){

const { data } = await supabase
.from("cars")
.select("*")
.order("id",{ascending:false});

const list = document.getElementById("list");

list.innerHTML = "";

data.forEach(car=>{

list.innerHTML += `

<div class="card">

<img src="${car.image}" onclick="openDetail('${car.id}')">

<div class="card-content">

<div class="price">
${car.price} AZN
</div>

<div class="title">
${car.brand} ${car.model}
</div>

<div class="info-grid">

<div class="info">
📅 ${car.year}
</div>

<div class="info">
⚙ ${car.engine}
</div>

<div class="info">
🚘 ${car.body}
</div>

<div class="info">
💺 ${car.seats}
</div>

<div class="info">
🎨 ${car.color}
</div>

<div class="info">
🏢 ${car.rentacar}
</div>

</div>

<div class="location">
📍 ${car.location}
</div>

<div class="location">
📞 ${car.phone}
</div>

<div class="actions">

<button class="favorite">
❤️
</button>

<button class="share"
onclick="navigator.share({
title:'icare.az',
url:window.location.href
})">
🔗
</button>

<button class="message"
onclick="window.open('https://wa.me/${car.phone}')">
💬
</button>

</div>

</div>

</div>

`;

});

}

/* DETAIL */

async function openDetail(id){

const { data } = await supabase
.from("cars")
.select("*")
.eq("id",id)
.single();

const detail = document.getElementById("detail");

detail.style.display = "block";

detail.innerHTML = `

<img src="${data.image}">

<div class="detail-content">

<div class="detail-price">
${data.price} AZN
</div>

<div class="detail-title">
${data.brand} ${data.model}
</div>

<div class="detail-grid">

<div class="detail-info">
📅 ${data.year}
</div>

<div class="detail-info">
⚙ ${data.engine}
</div>

<div class="detail-info">
🚘 ${data.body}
</div>

<div class="detail-info">
💺 ${data.seats}
</div>

<div class="detail-info">
🎨 ${data.color}
</div>

<div class="detail-info">
🏢 ${data.rentacar}
</div>

</div>

<div style="margin-top:15px;">
📍 ${data.location}
</div>

<div style="margin-top:10px;">
📞 ${data.phone}
</div>

<button
style="
width:100%;
padding:15px;
margin-top:20px;
background:#1565ff;
border:none;
border-radius:15px;
color:white;
font-size:16px;"
onclick="closeDetail()">
Bağla
</button>

</div>

`;

}

/* CLOSE DETAIL */

function closeDetail(){
document.getElementById("detail").style.display = "none";
}

/* START */

loadCars();
