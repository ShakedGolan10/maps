`use strict`



function onSubmitUserPrefs(event, value) {
    event.preventDefault()

    event.target[0].value
    // console.log(event)
    let name = event.target[0].value
    let bgc = event.target[1].value
    let textColor = event.target[2].value
    let zoom = event.target[3].value
    let namePlace = event.target[4].value
    let startLocation = event.target[5].value
    const userPrefs = { name, bgc, textColor, zoom, startLocation, namePlace }

    console.log(userPrefs)

    saveToStorage(USER_KEY, userPrefs)
}

