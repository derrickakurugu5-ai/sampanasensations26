const products=[

{
category:"Perfumes",
name:"Midnight Oud",
old:250,
price:220,
img:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=800"
},

{
category:"Perfumes",
name:"Royal Mist",
old:350,
price:300,
img:"https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800"
},

{
category:"Body Splash",
name:"Golden Splash",
old:120,
price:90,
img:"https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800"
},

{
category:"Chilly",
name:"Velvet Chill",
old:200,
price:180,
img:"https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800"
}

]

let cart=[]

const shop=document.getElementById("shop")

if(shop){

renderProducts()

}

function renderProducts(){

shop.innerHTML=""

const categories=[

"Perfumes",
"Body Splash",
"Chilly"

]

categories.forEach(cat=>{

shop.innerHTML+=`

<h2 class="section-title">${cat}

</h2>`

products

.filter(
p=>p.category===cat
)

.forEach(p=>{

shop.innerHTML+=`

<div class="card"><img src="${p.img}"><h3>${p.name}

</h3><div class="old">GH₵${p.old}

</div><div class="price">GH₵${p.price}

</div><button onclick="addCart('${p.name}')">Add To Cart

</button></div>`

})

})

}

function addCart(name){

const item=
products.find(
p=>p.name===name
)

cart.push(item)

renderCart()

}

function renderCart(){

const items=

document.getElementById(
"cartItems"
)

const count=

document.getElementById(
"cartCount"
)

const totalBox=

document.getElementById(
"total"
)

if(!items)return

items.innerHTML=""

let total=0

cart.forEach(item=>{

total+=item.price

items.innerHTML+=`

<div>${item.name}

—

GH₵${item.price}

</div>`

})

if(count){

count.innerText=

cart.length+

" item(s)"

}

if(totalBox){

totalBox.innerText=

"GH₵"+total

}

}

function checkoutWhatsApp(){

if(cart.length===0){

alert(
"Add items to cart first"
)

return

}

let total=0

let text=

"Hello Sampana Sensations%0A%0A"

text+=

"Order Details:%0A%0A"

cart.forEach(item=>{

text+=

"• "

+ 

item.name

+ 

" — GH₵"

+ 

item.price

+ 

"%0A"

total+=
item.price

})

const delivery=

document
.getElementById(
"delivery"
)
?.value
||

"Pickup"

const payment=

document
.getElementById(
"payment"
)
?.value
||

"Cash On Delivery"

text+=

"%0ATotal: GH₵"

+ 

total

text+=

"%0ADelivery: "

+ 

delivery

text+=

"%0APayment: "

+ 

payment

window.open(

"https://wa.me/233535556878?text="+text,

"_blank"

)

}
