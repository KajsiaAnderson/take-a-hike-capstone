const form = document.querySelector('form')
const hikeList = document.querySelector('#hike-list')
const nameInput = document.querySelector('#name-input')
const distanceInput = document.querySelector('#distance-input')
const elevationInput = document.querySelector('#elevation-input')
const routeInput = document.querySelector('#route-input-dropdown')


function handleSubmit(e) {
    e.preventDefault()

    if (nameInput.value < 1) {
        alert('You must enter a hike name')
        return
    }
    if (distanceInput.value < 1) {
        alert('You must enter the distance')
        return
    }
    if (elevationInput.value < 1) {
        alert('You must enter the elevation gain')
        return
    }
    if (routeInput.value < 1) {
        alert('You must select a route type')
        return
    }


    let userRating = document.querySelector('input[name="rating"]:checked').value
    // let image = document.querySelector('#img')
    let body = {
        name: nameInput.value,
        distance: distanceInput.value,
        elevation: elevationInput.value,
        route: routeInput.value,
        rating: +userRating,
    }

    axios.post('http://localhost:4455/hikes', body)
        .then(() => {
            nameInput.value = ''
            distanceInput.value = ''
            elevationInput.value = ''
            routeInput.value = ''
            document.querySelector('#rating-one').checked = true
            getHikes()
        })
}

function deleteCard(id) {
    axios.delete(`http://localhost:4455/hikes/${id}`)
        .then(() => getHikes())
        .catch(err => console.log(err))
}

function getHikes() {
    hikeList.innerHTML = ''

    axios.get('http://localhost:4455/hikes')
        .then(res => {
            res.data.forEach(elem => {
                let hikeCard = `<div class="hike-card">
                    <h2>${elem.name}</h2>
                    <p class="card-p">${elem.distance} miles</p>
                    <p class="card-p">${elem.elevation} ft</p>
                    <p class="card-p">${elem.route}</p>
                    <p class="card-p">Rating: ${elem.rating}/5</p>
                    <button class="delete-btn" onclick="deleteCard(${elem.id})">delete</button>
                    </div>
                `

                hikeList.innerHTML += hikeCard
            })
        })
}

getHikes()
form.addEventListener('submit', handleSubmit)