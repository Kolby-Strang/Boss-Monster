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

const boss = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1
}
let killCount = 0
let gold = 0

function attackBoss() {
    let attackPower = 0
    heroes.forEach(hero => attackPower += hero.damage)
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
        if (hero.health < 0) {
            hero.health = 0
        }
    })
    draw()
}

function draw() {
    let bossHealthElem = document.getElementById('bosshp')
    bossHealthElem.style.width = boss.health / boss.maxHealth * 100 + '%'
    let bossLvlElem = document.getElementById('bossLvl')
    bossLvlElem.innerText = boss.level.toString()

    let killCountElem = document.getElementById('kill count')
    killCountElem.innerText = killCount.toString()

    let goldElem = document.getElementById('gold')
    goldElem.innerText = gold.toString()

    // hero hp draw
    let slateSlabrockHP = document.getElementById('Slate Slabrock hp')
    let flintIronstagHP = document.getElementById('Flint Ironstag hp')

    let slateSlabrock = heroes.find(hero => hero.name == 'Slate Slabrock')
    let flintIronstag = heroes.find(hero => hero.name == 'Flint Ironstag')

    flintIronstagHP.innerText = flintIronstag.health.toString()
    slateSlabrockHP.innerText = slateSlabrock.health.toString()
}

function levelUpBoss() {
    gold += boss.level * 10
    killCount++
    boss.level++
    boss.maxHealth = 100 * boss.level
    boss.health = boss.maxHealth
}

function healHero(heroName) {
    let hero = heroes.find(hero => hero.name == heroName)
    if (gold >= 20 && hero.health > 0) {
        hero.health = hero.maxHealth
        gold -= 20
    }
    draw()
}

setInterval(bossAttacksHeroes, 5000)
