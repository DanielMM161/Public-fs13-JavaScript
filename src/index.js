function printExercise(exercise) {
    console.log(`--- Exercise ${exercise} ---\n`)
}

/*
1. Fix the bugs in the codes below, to make the console print out different numbers
from 0 to 100
 */

const printNum = () => {
    for (var i = 0; i <= 100; i++) {        
        console.log(i)         
    }
    console.log("\n")
}

printExercise(1)
printNum()

/*
2. Given the array below:
myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']
the array above has serveral dates, written in order month-day-year
Write the code inside function fixDate(array) below to transform the array to new
format dates day-month-year
expected result: ['24-12-2014', '23-09-2022', '30-12-2021', '08-02-2021', '15-07-2018', '14-12-2019', '14-12-2022'] . 
You only need to produce the same array as expected result, no need to consider other 
possibility.
 */

let myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']
const fixDate = (array) => {
    return array.map(date => {            
        const sordData = date.split('-').sort((a, b) => a - b)      
        return [sordData[0], sordData[1], sordData[2]].join('-')
    });
}
let newArr = fixDate(myArr)

printExercise(2)
console.log(newArr)
console.log("\n")

/*
3. Counter function
Write a counter funtion to print out in console the time difference between 2 given date
Expected result in the console: 11 days - 13 hours - 38 minutes - 20 seconds
*/
const dateFrom = new Date(500000)
const dateTo = new Date(1000000000)
const counter = (from, to) => {
    const difference = (a, b) => Math.abs(a - b) 
    const days = difference(dateFrom.getDate(), dateTo.getDate()) + " Days - "
    const hours = difference(dateFrom.getHours(), dateTo.getHours()) + " Hours - "
    const minutes = difference(dateFrom.getMinutes(), dateTo.getMinutes()) + " Minutes - "
    const seconds = difference(dateFrom.getSeconds(), dateTo.getSeconds()) + " Seconds"

    return days + hours + minutes + seconds
}
const timer = counter(dateFrom, dateTo)
printExercise(3)
console.log(timer)
console.log("\n")

/* 
4. Check the url and read documentation: https://restcountries.com
- Write a function to get all countries, sorted in alphabetical order
- Write a function to find one country based on the search input
The data fetched from url should be displayed in index.html.
*/

const grid = document.querySelector('.results-countries-grid')
const searchButton = document.querySelector('.form-button')
const searchInput = document.querySelector('.form-input')
const resultTitle = document.querySelector('.results-title')
const spinner = document.querySelector('.spinner-wrapper')
const subtitle = document.querySelector('.results-subtitle')

searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    if(!searchInput.value == "") {
        getCountry(searchInput.value)
    }
})

function handleChange() {
    if(searchInput.value == "") {
        getAllCountries()
    }    
}

const createEelement = (element) => {
    const divCard = document.createElement('div')
    divCard.classList.add('results-item-card')
    const h3 = document.createElement('h3')
    h3.innerHTML = `${element.name.common}`

    const divCardContent = document.createElement('div')
    divCardContent.classList.add('results-item-card-content')
    const img = document.createElement('img')
    img.setAttribute('src', element.flags.png)
    const hr = document.createElement('hr')

    const divContentInfo = document.createElement('div')
    divContentInfo.classList.add('results-item-card-content-info')

    const divResultInfo = document.createElement('div')
    divResultInfo.classList.add('result-info')
    const div = document.createElement('div')
    const continentH2 = document.createElement('h2')
    continentH2.innerHTML = 'Continent:'
    const continentH3 = document.createElement('h3')
    continentH3.innerHTML = element.continents[0]
    div.append(continentH2,continentH3)


    const divSecond = document.createElement('div')
        const capitaltH2 = document.createElement('h2')
        capitaltH2.innerHTML = 'Capital:'
        const capitaltH3 = document.createElement('h3')
        capitaltH3.innerHTML = element.capital
        divSecond.append(capitaltH2, capitaltH3);

    const populationH2 = document.createElement('h2')
    populationH2.innerHTML = `Population: ${element.population}`

    divResultInfo.append(div, divSecond)
    divContentInfo.append(divResultInfo, populationH2)
    divCardContent.append(img, hr, divContentInfo)
    divCard.append(h3, divCardContent)
    return divCard
}

const fetchAllCountries = async () => {        
    return await fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
}

const fetchCountry = async (countryName) => {        
    return await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
}

const resetSearch = () => {
    if(grid.hasChildNodes()) {
        grid.innerHTML = ""        
    }
    spinner.classList.add('flex')
    subtitle.innerHTML = `Total 0 results`
    resultTitle.innerHTML = "Results:"
}

const handleSearch = async (fetchData) => {
    resetSearch()
    const countries = await fetchData    
    spinner.classList.remove('flex')

    if(!countries.length) {        
        resultTitle.innerHTML = 'Results: The country you are trying to search does not exist'                
        return
    }

    subtitle.innerHTML = `Total ${countries.length} results`
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
    countries.forEach(element => {
        grid.append(createEelement(element))
    })
}

const getAllCountries = () => {
    handleSearch(fetchAllCountries())
}

const getCountry = (countryName) => {
    handleSearch(fetchCountry(countryName))
}


getAllCountries()

/*
5. Provide logic for function generateNewFolderName, which receive an array as argument. Everytime the function gets called,
it should check for folder name. If the folder named 'New Folder' does not exist, it should add the name 'New Folder' to array.
If folder 'New Folder' exists, it should add 'New Folder (1)' to array. If 'New Folder (1)' exists, it should add 'New Folder (2)'
to array, and so on.
*/


const generateNewFolderName = (existingFolders) => {
    let folderName = 'New Folder'
    const existFolder = existingFolders.find(element =>  element == folderName)
    if(!existFolder) {
        existingFolders.push(folderName)
    } else {
        const totalFolders = existingFolders.length
        folderName = `New Folder (${totalFolders})`
        existingFolders.push(folderName)
    }
}

let folder = []
generateNewFolderName(folder)
generateNewFolderName(folder)
generateNewFolderName(folder)
generateNewFolderName(folder)

printExercise(5)
console.log(folder); //expect to see ['New Folder', 'New Folder (1)', 'New Folder (2)', 'New Folder (3)']
console.log("\n")

/* 
6. Complete class Book:
- class Book should have 3 properties: title (read-only, must be a string but cannot be empty), cost (private, must be positive number) and profit (private, positive number > 0 and =< 0.5)
(error should be thrown if data is not valid)
- give the logic to get book's price and profit separately.
- give the logics to increase and decrease the price with a certain amount 
- give the logic to calculate price based on cost and profit. For example: cost 14, profit 0.3 => expected price is 20.

Complete class TaxableBook: 
- inherit Book, but have 1 more private parameter in the constructor: taxRate. 
- give the logic to calculate price with taxRate. For example: 
cost 14, profit 0.3 , tax 24% => expected price is 30.43
*/
class Book {

    _title
    _cost
    _profit
    _price

    constructor(title, cost, profit) {
        if(title.trim() == "" || typeof title != 'string') {
            throw new Error ('The Data title must be a string and no empty')
        }
        if(cost < 0 || typeof cost != 'number') {
            throw new Error ('The Data cost must be a positive number')
        }
        if(profit <= 0 && profit > 0.5) {
            throw new Error ('The Data profit must be a positive number and cannot be greater than than 0.5')
        }

        this._title = title
        this._cost = cost
        this._profit = profit        
        this._price = this._cost / (1 - this._profit) 
    }

    get title() {
        return this._title
    }

    get cost() {
        return this._cost
    }

    get profit() {        
        return this._profit
    }

    get price() {
        return this._price
    }

    increasePrice(value) {
        this._price += value
    }

    decreasePrice(value) {
        this._price -= value
    }

    calculatedProfit() {
        return this._price - this._cost
    }
}

class TaxableBook extends Book {
    
    _taxRate
 
    constructor(title, cost, profit, taxRate) {
        super(title, cost, profit)
        this._taxRate = taxRate
    }

    get taxRate() {
        return this._taxRate
    }

    calculatePriceWithTax() {
        return this._price + (this._price * this._taxRate / 100 )
    }
}

const book = new Book("The Power of Habits", 14, 0.3)
const taxableBook = new TaxableBook("The Power of Habits", 14, 0.3, 24)

printExercise(6)
console.log(`Book Without Taxes`);
console.log(`   - Book title: ${book.title}`);
console.log(`   - Book Price: ${book.price}`);
console.log(`   - Book Cost: ${book.cost}`);
console.log(`   - Book Profit: ${book.profit}`);
console.log(`   - Profit Calculated: ${book.calculatedProfit()}`);

console.log(' ');
console.log('------------------------------------------');
console.log(' ');

console.log(`Book With Taxes`);
console.log(`   - Book title: ${taxableBook.title}`);
console.log(`   - Book Price: ${taxableBook.price}`);
console.log(`   - Book Taxes: ${taxableBook.taxRate} %`);
console.log(`   - Price With Taxes: ${taxableBook.calculatePriceWithTax()}`);