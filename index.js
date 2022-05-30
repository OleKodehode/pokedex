const pokeGenerator = document.querySelector('#poke-index')
const indexNr = document.querySelector('#index-number')

indexNr.addEventListener('click', fetchPokemon)

pokeGenerator.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        fetchPokemon()
      }
    });

async function fetchPokemon() {
    
    const boxdiv = document.querySelector('.box')
    const navBtn = document.querySelector('.nav-btn')
    if(boxdiv && navBtn){
        boxdiv.remove()
        navBtn.remove()
    }

    if(pokeGenerator.value < 1){
    pokeGenerator.value = 898
}
    if(pokeGenerator.value > 898){
        pokeGenerator.value = 1
    }
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeGenerator.value}`)
    
    const data = await response.json()
    console.log(data);
    createPokemon(data)
}

function createPokemon(data) {

    const box = document.createElement('div')
    const header = document.createElement('h1')
    const dexIndex = document.createElement('h3')
    const imgFlex = document.createElement('div')
    const defImg = document.createElement('img')
    const shinyImg = document.createElement('img')
    const type = document.createElement('p')
    const navBtn = document.createElement('div')
    const prevBtn = document.createElement('button')
    const nextBtn = document.createElement('button')

    box.classList.add('box')
    imgFlex.classList.add('img-flex')
    navBtn.classList.add('nav-btn')
    prevBtn.classList.add('prev-btn')
    nextBtn.classList.add('next-btn')

    header.textContent = data.name
    dexIndex.textContent = data.id
    shinyImg.src = data.sprites.front_shiny
    console.log(data.sprites.front_shiny);
    defImg.src = data.sprites.front_default
    console.log(data.sprites.front_default);
    
    type.textContent = data.types.map((types) => (types.type.name)); // creds: Rene :D
    
    document.body.append(box)
    imgFlex.append(defImg, shinyImg)
    box.append(header, dexIndex, imgFlex, type)
    document.body.append(navBtn)
    navBtn.append(prevBtn, nextBtn)
    

    type.textContent = type.textContent.replace(',','/')
    prevBtn.textContent = 'Previosly'
    nextBtn.textContent = 'Next'

    prevBtnCounting(prevBtn)
    nextBtnCounting(nextBtn)

}

function prevBtnCounting(prevBtn){
    let count = pokeGenerator.value
    
    prevBtn.addEventListener('click', () => {
        console.log('clicked');
        count--
        let counted = pokeGenerator.textContent + count
        console.log(pokeGenerator.textContent + count);
        if (counted >= 1){
            pokeGenerator.value = counted
        }
        else (counted = 898)
        pokeGenerator.value = counted
        fetchPokemon()
    }
)};

function nextBtnCounting(nextBtn){
    let count = pokeGenerator.value
    
    nextBtn.addEventListener('click', () => {
        console.log('clicked');
        count++
        let counted = pokeGenerator.textContent + count
        console.log(pokeGenerator.textContent + count);
        if (counted <= 898){
            pokeGenerator.value = counted
        }
        else (counted = 1)
        pokeGenerator.value = counted

        fetchPokemon()
    }
)};