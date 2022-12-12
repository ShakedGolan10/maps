'use strict'

let gPlaces = (loadFromStorage(PLACES_KEY)) ? loadFromStorage(PLACES_KEY) : []
let gUserPrefs = loadFromStorage(USER_KEY)


function getCenter() {

    const center = gUserPrefs.startLocation.split(`,`)
    return center

}

function init() {

    console.log(gUserPrefs.name)
    render(gUserPrefs)
}

function render(userPrefs) {
    document.body.style.backgroundColor = userPrefs.bgc
    document.body.style.color = userPrefs.textColor
    document.querySelector(`.welcome`).innerHTML =
        `
    <h3>Hello ${userPrefs.name} - welcome to your map</h3>
    
    <p id="locationError"></p>
`
}

function getPosition() {
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
}

function getTime(date) {
    return (date.getHours() + `:00 onClock ` + `at ` + date.getDate() + "/" + (+date.getMonth() + 1))
}

function showLocation() {

    const center = getCenter()
    let latUser = center[0]
    let lngUser = center[1]


    initMap(+latUser, +lngUser)
}


function initMap(lat = 31, lng = 31) {

    renderPlaces()

    var elMap = document.querySelector('.map')
    var options = {
        center: { lat, lng },
        zoom: +gUserPrefs[`zoom`]
    }

    var map = new google.maps.Map(
        elMap,
        options
    )

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'davidovGay'
    })



    map.addListener("click", (mapsMouseEvent) => {
        marker.setMap(null);
        var lat = mapsMouseEvent.latLng.toJSON().lat
        var lng = mapsMouseEvent.latLng.toJSON().lng
        marker = new google.maps.Marker({
            position: { lat, lng },
            map,
        })

        onAddUserPlace(lat, lng)

    })
}


function onAddUserPlace(lat, lng) {
    let isTheMarkIsForSavePlace = confirm(`Do you want to save the place`)
    if (isTheMarkIsForSavePlace) {
        let placeName = prompt(`Choose a name for this place`)
        if (placeName) {
            const newPlace = addPlace(placeName, lat, lng)

            renderPlace(newPlace)
        }
    }

}

function renderPlaces() {
    const elPlace = document.querySelector(`.places-list`)
    let places = gPlaces
    let strHTMLs = places.map(place => `
    <div class="list-group">      
    <button onclick="onChosenPlace(this, '${place.id}')" type="button" class="list-group-item list-group-item-action">
        ${place.placeName} 
        <br>
        <span>Created at: ${place.createdAt} 
    </button>
    <button type="button" class="btn btn-success edit-btn" onclick="onUpdatePlace('${place.id}')">EDIT</button>
    <button type="button" class="btn btn-danger delete-btn" onclick="onDeletePlace('${place.id}')">DELETE</button>
    </div>
    `)
    elPlace.innerHTML = strHTMLs.join('')
}

function renderPlace(newPlace) {
    const elPlace = document.querySelector(`.places-list`)
    console.log(newPlace)
    var strHTMLs = `
    <div class="list-group">      
    <button onclick="onChosenPlace(this, '${newPlace.id}')" type="button" class="list-group-item list-group-item-action">
        ${newPlace.placeName} 
        <br>
        <span>Created at: ${newPlace.createdAt} 
    </button>
    <button type="button" class="btn btn-success edit-btn" onclick="onUpdatePlace('${newPlace.id}')">EDIT</button>
    <button type="button" class="btn btn-danger delete-btn" onclick="onDeletePlace('${newPlace.id}')">DELETE</button>
    </div>`

    elPlace.innerHTML += strHTMLs
}


function onChosenPlace(elCurrentPlaceBtn, placeId) {
    let place = getPlaceById(placeId)
    console.log(place)
    initMap(place.lat, place.lng)

}

function onDeletePlace(placeId) {
    deletePlace(placeId)
    renderPlaces()
}

function onUpdatePlace(placeId) {

    let newName = prompt(`What is your new name?`)
    updatePlace(placeId, newName)

    renderPlaces()

}

function handleLocationError(error) {
    var locationError = document.getElementById("locationError")

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message
            break
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location."
            break
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message
            break
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location."
            break
    }
}
