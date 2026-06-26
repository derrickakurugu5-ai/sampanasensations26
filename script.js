const api =
"https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=today&s=Soccer"

async function loadMatches(){

const matchesBox=
document.getElementById("matches")

if(!matchesBox)return

matchesBox.innerHTML=
"Loading matches..."

try{

const res=
await fetch(api)

const data=
await res.json()

matchesBox.innerHTML=""

if(!data.events){

matchesBox.innerHTML=
"No matches found"

return

}

data.events
.slice(0,20)
.forEach(match=>{

const confidence=
Math.floor(
Math.random()*15
)+75

const market=
pickMarket()

matchesBox.innerHTML+=`

<div class="match">

<h3>

${match.strHomeTeam}

vs

${match.strAwayTeam}

</h3>

<p>

Suggestion:
<b>

${market}

</b>

</p>

<div>

Confidence:
${confidence}%

</div>

<button
onclick="
addSlip(
'${match.strHomeTeam}',
'${match.strAwayTeam}',
'${market}'
)
">

Add

</button>

</div>

`

})

}

catch{

matchesBox.innerHTML=
"Couldn't load matches"

}

}

function pickMarket(){

const markets=[

"Home Win",

"Away Win",

"Over 1.5",

"Over 2.5",

"BTTS",

"Draw"

]

return markets[
Math.floor(
Math.random()*
markets.length
)
]

}

let slip=[]

function addSlip(home,away,market){

slip.push({
home,
away,
market
})

renderSlip()

}

function renderSlip(){

const box=
document.getElementById("slip")

if(!box)return

box.innerHTML=""

slip.forEach(s=>{

box.innerHTML+=`

<div>

${s.home}

vs

${s.away}

<br>

${s.market}

</div>

`

})

}

loadMatches()
