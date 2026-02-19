//API URL
const DOG_TEXT_URL = "https://dogapi.dog/api/v2/"

//DOM Elements
const loadingIndicator = document.querySelector("#loading-indicator")

const randomDogFactsList = document.querySelector("#random-dog-facts")
const getNewDogFactsButton = document.querySelector("#get-new-dog-facts")

const breedName = document.querySelector("#breed-name")
const breedDescription = document.querySelector("#breed-description")
const breedLifeSpan = document.querySelector("#breed-life-span")
const breedMaleWeight = document.querySelector("#breed-male-weight")
const breedFemaleWeight = document.querySelector("#breed-female-weight")
const breedHypoallergenic = document.querySelector("#breed-hypoallergenic")

const changeDogBreedArea = document.querySelector("#change-dog-breed-area")
const dogBreedSelect = document.querySelector("#dog-breed-select")

//Variables
let allDogBreeds = []
let featuredDogBreed

//Functions

//initialize the page
async function initialize() {
    //sets loadingIndicator to true while we get our data
    setLoading(true)
    //get the array of all dog breeds
    await getAllDogBreeds()
    //select a random dog breed to start with
    featuredDogBreed = getRandomDogBreed(allDogBreeds)
    //populate the featured breed section with the randomly selected breed
    populateFeaturedBreedSection(featuredDogBreed)
    //create an option for the breed select menu for each possible dog breed
    allDogBreeds.forEach(breed => createDogBreedOption(breed))
    //add event listener to handle selecting a new dog breed
    dogBreedSelect.addEventListener("change", handleDogBreedSelection)
    //sets loadingIndcator to false now that we have our data
    setLoading(false)
}

//get an array of all dog breeds in the API
async function getAllDogBreeds() {
    const response = await fetch(DOG_TEXT_URL + "breeds?page[size]=1000")
    const breedObj = await response.json()
    // console.log(breedObj)
    allDogBreeds = breedObj.data
    // console.log(allDogBreeds)
}

//get a random dog breed
function getRandomDogBreed(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    // console.log(array[randomIndex])
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

//create option for select menu to represent a dog breed
function createDogBreedOption(dogBreedObj) {
    const newOption = document.createElement("option")
    newOption.value = dogBreedObj.attributes.name
    newOption.textContent = dogBreedObj.attributes.name
    dogBreedSelect.append(newOption)
}

//handle user selecting a new dog breed
function handleDogBreedSelection(event) {
    const dogBreedName = event.target.value
    featuredDogBreed = allDogBreeds.find(dogBreedObj => dogBreedObj.attributes.name == dogBreedName)
    populateFeaturedBreedSection(featuredDogBreed)
}

//sets display of the loading indicator depending on if it's loading
function setLoading(loading) {
    if (loading) {
        loadingIndicator.style.display = "block"
    } else {
        loadingIndicator.style.display = "none"
    }
}


initialize()