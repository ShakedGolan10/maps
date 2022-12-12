'use strict'

const USER_KEY = `mapDB`
const PLACES_KEY = `placesDB`
const apiKey = `AIzaSyCQS40wGS1rfn9ZdHeUT8DbRjTRkze38Qs`

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}