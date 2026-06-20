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
category:"Body Spray",
name:"Fresh Spray",
old:110,
price:85,
img:"https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800"
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

const shop=
document.getElementById(
"shop"
)

function showCategory(cat){

shop.innerHTML=""

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

}

function addCart(name){

const found=

cart.find(
x=>x.name===name
)

if(found){

found.qty++

}

else{

const item=

products.find(
p=>p.name===name
)

cart.push({

...item,

qty:1

})

}

renderCart()

toast()

}

function renderCart(){

const box=

document.getElementById(
"cartItems"
)

let total=0

box.innerHTML=""

cart.forEach(item=>{

total+=

item.qty*
item.price

box.innerHTML+=`

<div>${item.name}

x${item.qty}

<button onclick="minus('${item.name}')">−

</button><button onclick="plus('${item.name}')">+ 

</button><button onclick="removeItem('${item.name}')">❌

</button></div>`

})

document.getElementById(
"cartCount"
).innerText=

cart.length+

" item(s)"

document.getElementById(
"total"
).innerText=

"GH₵"+

total

}

function plus(name){

cart.find(
x=>x.name===name
).qty++

renderCart()

}

function minus(name){

let item=

cart.find(
x=>x.name===name
)

item.qty--

if(
item.qty<=0
){

removeItem(name)

return

}

renderCart()

}

function removeItem(name){

cart=

cart.filter(
x=>x.name!==name
)

renderCart()

}

function checkoutWhatsApp(){

if(
cart.length===0
){

alert(
"Cart empty"
)

return

}

let msg=

"Hello Sampana Sensations%0A%0A"

let total=0

cart.forEach(i=>{

msg+=

i.name+

" x"+

i.qty+

" GH₵"+

i.qty*
i.price+

"%0A"

total+=

i.qty*
i.price

})

msg+=

"%0ATotal GH₵"+

total

window.open(

"https://wa.me/233535556878?text="+msg

)

}

function toast(){

const t=

document.createElement(
"div"
)

t.innerText=

"✓ Added to Cart"

t.style=
"position:fixed;bottom:20px;right:20px;background:#d4af37;padding:10px"

document.body.appendChild(
t
)

setTimeout(
()=>t.remove(),
1500
)

}

showCategory(
"Perfumes"
)
