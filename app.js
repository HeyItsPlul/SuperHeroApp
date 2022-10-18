let heroCount = 1
const mainEventBody = document.getElementById('mainEventBody')
const themeSwapper = document.getElementById('themeSwapper')
const themeVar = localStorage.getItem("theme")
const compareBtn = document.getElementById('compare')
let searchInput = document.getElementById('search')


window.addEventListener('load', (event) => {
    load20SuperHeroes()
});

themeSwapper.addEventListener('click', function() {
    theme()
})

async function load20SuperHeroes() {
    let themeRetrive = localStorage.getItem('theme')
    let themeResult = JSON.parse(themeRetrive)
    if (heroCount >= 731) {
        return
    }
    if (heroCount % 2 == 1) {
        mainEventBody.innerHTML = ''
    }

    for (let i = heroCount; i <= heroCount + 20; i++){
    let response = await fetch(`https://www.superheroapi.com/api.php/114110998142105/${i}`)
    let result = await response.json()
    createHero(result)
    }

    heroCount += 20
    addNavigation()

}

async function load20previousSuperHeroes() {
    let themeRetrive = localStorage.getItem('theme')
let themeResult = JSON.parse(themeRetrive)
    if (heroCount >= 731) {
        return
    }
    if (heroCount <= 21) {
        return
    }
    if (heroCount % 2 == 1) {
        mainEventBody.innerHTML = ''
    }

    for (let i = heroCount - 40; i <= heroCount - 20; i++){
    let response = await fetch(`https://www.superheroapi.com/api.php/114110998142105/${i}`)
    let result = await response.json()
    createHero(result)
    }

    heroCount -= 20

    addNavigation()
}



function createHero(result) {
    let themeRetrive = localStorage.getItem('theme')
    let themeResult = JSON.parse(themeRetrive)

    function createHeroTheme(theme) {
        mainEventBody.innerHTML += `
        <div class=" ${theme} characterBox" id="${result.id}">
        <img src="${result.image.url}" alt="" class="characterImage">
        <button class="${theme} goToBtn" onclick="loadAbout(${result.id})">${result.name}</button>
        </div>`
    }
    
    if (themeResult.dark == true) {
        createHeroTheme('themeDark')
        document.body.style.backgroundColor = 'black'
        document.getElementById('input').classList.add('themeDark')
        swap(1)}

    if (themeResult.dark == false || themeResult.dark == undefined || themeResult.dark == null) {
        createHeroTheme('')
        document.body.style.backgroundColor = 'white'
        document.getElementById('input').classList.remove('themeDark')
        swap(0)
    }
}

function addNavigation() {
    let themeRetrive = localStorage.getItem('theme')
    let themeResult = JSON.parse(themeRetrive)

    function navTheme(theme) {
        mainEventBody.innerHTML += `<div class="navigateButton">
        <button id="genBtn" class="${theme} genericButton" onclick="load20previousSuperHeroes()"><</button>
        <p class="${theme}" id="count" style="font: larger; border:none; width:fit-content; font-weight: bold;">${heroCount}/731</p>
        <button id="genBtn" onclick="load20SuperHeroes()" class="${theme} genericButton">></button>
        </div>`
    }
    if (themeResult.dark == true) {
        navTheme('themeDark')
    }

    if (themeResult.dark == false || themeResult.dark == undefined || themeResult.dark == null) {
        navTheme('')
    }
    
}

async function loadAbout(id) {
    let themeRetrive = localStorage.getItem('theme')
    let themeResult = JSON.parse(themeRetrive)
    let about = await fetch(`https://www.superheroapi.com/api.php/114110998142105/${id}`)
    let response = await about.json()
    console.log(response)
    mainEventBody.classList.remove('mainEventBody')
    mainEventBody.innerHTML = ''

function loadElement(theme, response) {
    mainEventBody.innerHTML =`<div class="aboutBody">
    <button class=" ${theme} genericButton " onclick="reloadHeroPage()" style="position:absolute; left:120px; top:120px;"> X </button>
    <div class=" ${theme} characterBox " id="${response.id}">
    <img src="${response.image.url}" alt="" class=" characterImage">
    <p class=" ${theme} name ">${response.name}</p>
    </div>
    <div  class=" ${theme} characterBox " style="margin-left:20px;" id="${response.id}">
    <p class=" ${theme} name "><span>Intelligence: </span>${response.powerstats.intelligence}</p><div>
    <p class=" ${theme} name"><span>Strength: </span>${response.powerstats.strength}</p><div>
    <p class="${theme} name"><span>Speed:: </span>${response.powerstats.speed}</p><div>
    <p class=" ${theme} name"><span>Durability: </span>${response.powerstats.durability}</p><div>
    <p class="${theme} name"><span>Power: </span>${response.powerstats.power}</p><div>
    <p class="${theme} name"><span>Combat: </span>${response.powerstats.combat}</p><div>
    </div>`
}
    if (themeResult.dark == true) {
        loadElement('themeDark', response)
}

    if (themeResult.dark == false || themeResult.dark == undefined || themeResult.dark == null) {
        loadElement('', response)
    }
}

function reloadHeroPage() {
    let themeRetrive = localStorage.getItem('theme')
    let themeResult = JSON.parse(themeRetrive)
    heroCount -= 20
    mainEventBody.classList.add('mainEventBody')
    load20SuperHeroes()
}

async function searchHero() {
    let themeRetrive = localStorage.getItem('theme')
    let themeResult = JSON.parse(themeRetrive)
 
 let result = await fetch(`https://www.superheroapi.com/api.php/114110998142105/search/${searchInput.value}`)
 let response = await result.json()
 console.log(response)

 if (response.response == 'error') {
    mainEventBody.innerText = response.error
 }

 mainEventBody.innerHTML = ''

 for (let i = 0; i < response.results.length; i++) {
    createHero(response.results[i])

 }

 addNavigation()

}


function theme() {
    let themeRetrive = localStorage.getItem('theme')
    let themeResult = JSON.parse(themeRetrive)

    if (themeResult.dark == false || themeResult.dark == undefined || themeResult.dark == null) {
        console.log('dark')
        console.log(themeResult.dark)
        const darkTheme = {dark: true}
        localStorage.setItem('theme', JSON.stringify(darkTheme))
        document.body.style.backgroundColor = 'black'
        document.querySelectorAll('.goToBtn').forEach((button) => {
            button.classList.add('themeDark')
        })
    document.querySelectorAll(('.genericButton')).forEach((button) => {
        button.classList.add('themeDark')
        })
        document.getElementById('input').classList.add('themeDark')
        document.querySelectorAll('.characterBox').forEach((box) => {
            box.classList.add('themeDark')
        })
        document.getElementById('count').classList.add('themeDark')
        document.getElementById('count').style.border = 'none'
        swap(1)

    }
    if (themeResult.dark == true) {
        console.log('light')
        console.log(themeResult.dark)
        const darkTheme = {dark: false}
        localStorage.setItem('theme', JSON.stringify(darkTheme))
        document.body.style.backgroundColor = 'white'
        document.querySelectorAll('.goToBtn').forEach((button) => {
            button.classList.remove('themeDark')
        })
        
        document.querySelectorAll('.characterBox').forEach((box) => {
            box.classList.remove('themeDark')
        })
        document.getElementById('input').classList.remove('themeDark')
        document.getElementById('input').style.color = 'white'
        document.querySelectorAll(('.genericButton')).forEach((button) => {
        button.classList.remove('themeDark')
        })
        document.getElementById('count').classList.remove('themeDark')
        swap(0)
        return
    }
}

function swap(value) {
    let themeRetrive = localStorage.getItem('theme')
let themeResult = JSON.parse(themeRetrive)
    document.getElementById('themeSwapper').style.filter = `invert(${value})`
    document.getElementById('logo').style.filter = `invert(${value})`
}

