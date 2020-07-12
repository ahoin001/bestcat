
// ****************************************************************
//? CONNECT TO DOM  & INITIALIZE VARIABLES
// ****************************************************************

let randomCatContainer = document.querySelector("div.pic-container")
let randomCatPic = document.querySelector("img")

let lovedCatContainer = document.querySelector("div.loved-container")
let lovedCatPicsList = document.querySelector(".loved-cat-list")

let catImageID;
let lovedCats = [];

// console.log(Math.floor(Math.random() * 300000))

const sub_id = `CatLady${Math.floor(Math.random() * 300000)}`;


// ****************************************************************
//? API INTERACTIONs
// ****************************************************************

const fetchCatApi = async (url = "https://api.thecatapi.com/v1/images/search", requestType = "GET", requestBody) => {

    let response;

    if (requestType === "GET") {
        response = await fetch(
            url,
            {
                method: requestType,
                headers: {
                    'x-api-key': '5d07ae96-a25c-474e-94f0-5c6bd5e5a60b',
                    "Content-Type": "application/json"
                }
            })
    } else {

        response = await fetch(
            url,
            {
                method: requestType,
                body: requestBody,
                headers: {
                    'x-api-key': '5d07ae96-a25c-474e-94f0-5c6bd5e5a60b',
                    "Content-Type": "application/json"
                }
            })

    }


    let dataParsed = await response.json();

    // console.log(dataParsed);

    return dataParsed;

}


// ****************************************************************
//? Utility FUNCTIONS
// ****************************************************************

const setRandomCat = async () => {

    const apiResponse = await fetchCatApi()

    randomCatPic.setAttribute("src", apiResponse[0].url)

    catImageID = apiResponse[0].id;


}

const postVoteToCatApi = async (requestBody) => {

    let response = await fetchCatApi("https://api.thecatapi.com/v1/votes", "POST", requestBody)

    console.log('Post Request:', response);

}

const lovedCat = async (catImageId) => {

    let requestBodyVote = JSON.stringify({
        image_id: catImageId,
        sub_id,
        value: 1
    })

    console.log('Your cat vote: ', requestBodyVote)

    await postVoteToCatApi(requestBodyVote)

    setRandomCat()
    getVotedCats();
}

const nopedCat = async (catImageId) => {

    let requestBodyVote = {
        image_id: catImageId,
        sub_id,
        value: 0
    }

    await postVoteToCatApi(JSON.stringify(requestBodyVote))

    await setRandomCat()

}

const getVotedCats = async () => {

    const catsThatWereLoved = await fetchCatApi(`https://api.thecatapi.com/v1/votes?sub_id=${sub_id}`)

    catsThatWereLoved.forEach(async (catObject) => {

        const catID = catObject.image_id;

        const catImageInfo = await fetchCatApi(`https://api.thecatapi.com/v1/images/${catID}`)

        // console.log('******', catImageInfo)

        let lovedCatImg = document.createElement("img");

        lovedCatImg.setAttribute("src", catImageInfo.url)
        lovedCatImg.setAttribute("class", "fav-cat")

        lovedCatPicsList.appendChild(lovedCatImg)

    });


}


// ****************************************************************
//? FUNCTIONS In action 
// ****************************************************************

setRandomCat()
