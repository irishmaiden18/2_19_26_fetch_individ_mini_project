//API URL
const DOG_TEXT_URL = "https://dogapi.dog/api/v2/"

//DOM Elements
const randomDogFactsList = document.querySelector("#random-dog-facts")
const getNewDogFactsButton = document.querySelector("#get-new-dog-facts")

const breedName = document.querySelector("#breed-name")
const breedDscription = document.querySelector("#breed-description")
const breedLifeSpan = document.querySelector("#breed-life-span")
const breedMaleWeight = document.querySelector("#breed-male-weight")
const breedFemaleWeight = document.querySelector("#breed-female-weight")
const breedHypoallergenic = document.querySelector("#breed-hypoallergenic")

const changeDogBreedArea = document.querySelector("#change-dog-breed-area")

//Functions

//get an array of all dog breeds in the API
async function getAllDogBreeds() {
    const response = await fetch(DOG_TEXT_URL + "breeds?page[size]=1000")
    const breedObj = await response.json()

    // console.log(breedObj)
    const breedArray = breedObj.data
    console.log(breedArray)
    return breedArray
}

//get a random dog breed
function getRandomDogBreed(array) {
    console.log(array)
    const randomIndex = Math.floor(Math.random() * array.length)
    console.log(randomIndex)
    console.log(array[randomIndex])
    return array[randomIndex]
}










const breedArray = getAllDogBreeds()
console.log(breedArray)
getRandomDogBreed(breedArray)