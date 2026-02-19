//API URL
const DOG_TEXT_URL = "https://dogapi.dog/api/v2/"

//DOM Elements
const randomDogFactsList = document.querySelector("#random-dog-facts")
const getNewDogFactsButton = document.querySelector("#get-new-dog-facts")

const breedName = document.querySelector("#breed-name")
const breedDescription = document.querySelector("#breed-description")
const breedLifeSpan = document.querySelector("#breed-life-span")
const breedMaleWeight = document.querySelector("#breed-male-weight")
const breedFemaleWeight = document.querySelector("#breed-female-weight")
const breedHypoallergenic = document.querySelector("#breed-hypoallergenic")

const changeDogBreedArea = document.querySelector("#change-dog-breed-area")

//Variables
let allDogBreeds = []
let featuredDogBreed

//Functions

//initialize the page
async function initialize() {
    await getAllDogBreeds()
    featuredDogBreed = getRandomDogBreed(allDogBreeds)
    populateFeaturedBreedSection(featuredDogBreed)
}

//get an array of all dog breeds in the API
async function getAllDogBreeds() {
    const response = await fetch(DOG_TEXT_URL + "breeds?page[size]=1000")
    const breedObj = await response.json()
    // console.log(breedObj)
    allDogBreeds = breedObj.data
    console.log(allDogBreeds)
}

//get a random dog breed
function getRandomDogBreed(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    console.log(array[randomIndex])
    return array[randomIndex]
}

//populate the featured dog breed section
function populateFeaturedBreedSection(dogBreedObj) {
    const breedAttributes = dogBreedObj.attributes
    breedName.textContent = breedAttributes.name
    breedDescription.textContent = breedAttributes.description
    breedLifeSpan.textContent = `${breedAttributes.life.min} - ${breedAttributes.life.max} years`
    breedMaleWeight.textContent = `${breedAttributes.male_weight.min} - ${breedAttributes.male_weight.max} lbs`
    breedFemaleWeight.textContent = `${breedAttributes.female_weight.min} - ${breedAttributes.female_weight.max} lbs`
    
    if (breedAttributes.hypoallergenic) {
        breedHypoallergenic.textContent = `${breedAttributes.name}s are hypoallergenic`
    } else{
        breedHypoallergenic.textContent = `${breedAttributes.name}s are NOT hypoallergenic`
    }
}


initialize()