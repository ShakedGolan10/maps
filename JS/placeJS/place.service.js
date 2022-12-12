'use strict'

function createPlace(placeName, lat, lng) {
    return {
        id: makeId(),
        placeName,
        createdAt: getTime(new Date()),
        lat,
        lng
    }
}
function addPlace(placeName, lat, lng) {
    const place = createPlace(placeName, lat, lng)
    gPlaces.push(place)
    saveToStorage(PLACES_KEY, gPlaces)
    return place
}

function deletePlace(placeId) {
    const placeIdx = gPlaces.findIndex(place => placeId === place.id)
    gPlaces.splice(placeIdx, 1)
    saveToStorage(PLACES_KEY, gPlaces)

}

function updatePlace(placeId, newName) {
    const place = gPlaces.find(place => placeId === place.id)
    place.placeName = newName
    saveToStorage(PLACES_KEY, gPlaces)

}

function getPlaceById(placeId) {
    const place = gPlaces.find(place => placeId === place.id)
    return place
}