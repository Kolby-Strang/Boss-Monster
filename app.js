const heroes = [
    {
        name: 'Slate Slabrock',
        type: 'dwarf',
        damage: 5,
        health: 100,
        maxHealth: 100
    },
    {
        name: 'Flint Ironstag',
        type: 'elf',
        damage: 10,
        health: 50,
        maxHealth: 50
    }
]

const bosses = [{
    name: 'Bluey Boy',
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1,
    image: 'images/monster.png'
},
{
    name: 'Blob Monster',
    health: 50,
    maxHealth: 100,
    damage: 20,
    level: 1,
    image: 'https://endangeredtigers.org/wp-content/uploads/2021/09/Blobfish-The-Hero-of-Conservation-project-endangered-tigers.png'
}
]

let boss = bosses[0]

let killCount = 0
let gold = 0

function attackBoss() {
    let attackPower = 0
    heroes.forEach(hero => {
        if (hero.health > 0) attackPower += hero.damage
    })
    boss.health -= attackPower
    if (boss.health <= 0) {
        levelUpBoss()
    }
    draw()
}

function bossAttacksHeroes() {
    heroes.forEach(hero => {
        if (hero.health > 0) {
            hero.health -= boss.damage
        }
        if (hero.health <= 0) {
            hero.health = 0
            document.getElementById(hero.name + " heal").classList.add('d-none')
            document.getElementById(hero.name + " revive").classList.remove('d-none')
        }
    })
    draw()
}

function draw() {
    let bossHealthElem = document.getElementById('bosshp')
    bossHealthElem.style.width = boss.health / boss.maxHealth * 100 + '%'
    let bossLvlElem = document.getElementById('bossLvl')
    bossLvlElem.innerText = boss.level.toString()
    let bossImgElem = document.getElementById('bossImg')
    bossImgElem.setAttribute('src', boss.image)
    document.getElementById('bossName').innerText = boss.name

    let killCountElem = document.getElementById('kill count')
    killCountElem.innerText = killCount.toString()

    let goldElem = document.getElementById('gold')
    goldElem.innerText = gold.toString()

    // hero hp draw
    let slateSlabrockHP = document.getElementById('slateHealth')
    let flintIronstagHP = document.getElementById('flintHealth')

    let slateSlabrock = heroes.find(hero => hero.name == 'Slate Slabrock')
    let flintIronstag = heroes.find(hero => hero.name == 'Flint Ironstag')

    flintIronstagHP.style.width = flintIronstag.health / flintIronstag.maxHealth * 100 + "%"
    slateSlabrockHP.style.width = slateSlabrock.health / slateSlabrock.maxHealth * 100 + "%"
}

function levelUpBoss() {
    gold += boss.level * 10
    killCount++
    boss.level++
    boss.maxHealth = 100 * boss.level
    boss.health = boss.maxHealth
    cycleBossArray()
}

function healHero(heroName) {
    let hero = heroes.find(hero => hero.name == heroName)
    if (gold >= 20 && hero.health > 0) {
        hero.health = hero.maxHealth
        gold -= 20
    }
    draw()
}

function reviveHero(heroName) {
    let hero = heroes.find(hero => hero.name == heroName)
    if (gold >= 100) {
        hero.health = hero.maxHealth
        gold -= 20
    }
    document.getElementById(hero.name + " heal").classList.remove('d-none')
    document.getElementById(hero.name + " revive").classList.add('d-none')
    draw()
}

function cycleBossArray() {
    let killedBoss = bosses[0]
    bosses.splice(0, 1)
    bosses.push(killedBoss)
    boss = bosses[0]
}

setInterval(bossAttacksHeroes, 5000)
draw()