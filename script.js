const products = [

{
name:"Midnight Oud",
old:250,
price:220,
img:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=800"
},

{
name:"Golden Splash",
old:120,
price:90,
img:"https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800"
},

{
name:"Royal Mist",
old:350,
price:300,
img:"https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800"
},

{
name:"Velvet Chill",
old:200,
price:180,
img:"https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800"
}

]

let cart=[]

const shop=document.querySelector("#shop")

function drawProducts(){

shop.innerHTML=""

products.forEach((p,index)=>{

shop.innerHTML+=`

<div class="card"><img src="${p.img}"><h3>${p.name}</h3><div class="old">
GH₵${p.old}
</div><div class="price">
GH₵${p.price}
</div><button onclick="addCart(${index})">Select Item

</button></div>`

})

}

function addCart(index){

cart.push(products[index])

updateCart()

}

function updateCart(){

let total=0

const box=
document.getElementById(
"cartItems"
)

box.innerHTML=""

cart.forEach(item=>{

total+=item.price

box.innerHTML+=`

<p>${item.name}

—

GH₵${item.price}

</p>`

})

document.getElementById(
"total"
)

.innerText=

"GH₵"+total

}

function checkoutWhatsApp(){

if(cart.length===0){

alert("Select items")

return

}

let msg=

"Hello Sampana Sensations%0A%0A"

let total=0

cart.forEach(i=>{

msg+=

i.name+

" - GH₵"+

i.price+

"%0A"

total+=i.price

})

msg+=

"%0ATotal: GH₵"+

total

window.location=

"https://wa.me/233535556878?text="+msg

}

drawProducts()
