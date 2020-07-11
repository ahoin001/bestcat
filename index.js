
// ****************************************************************
//? CONNECT TO DOM  & INITIALIZE VARIABLES
// ****************************************************************

let randomCatContainer = document.querySelector("div.pic-container")
let randomCatPic = document.querySelector("img")

let lovedCatContainer = document.querySelector("div.loved-container")
let lovedCatPic = document.querySelector("img")

let catImageID;
const sub_id = "CatLady99";


// ****************************************************************
//? API INTERACTIONs
// ****************************************************************

const fetchCatApi = async (url = "https://api.thecatapi.com/v1/images/search") => {

    let response = await fetch(
        url,
        {
            method: "GET",
            headers: {
                'x-api-key': '5d07ae96-a25c-474e-94f0-5c6bd5e5a60b',
                "Content-Type": "application/json"
            }
        })

    let dataParsed = await response.json();

    // console.log(dataParsed);

    return dataParsed;

}

const getVotedCats = async () => {

    console.log(`Going to make get votes with sub_id: https://api.thecatapi.com/v1/votes?sub_id=${sub_id}`)
    console.log(`Version 2 of call: https://api.thecatapi.com/v1/votes?sub_id`)

    // const apiResponse = await fetchCatApi(`https://api.thecatapi.com/v1/votes?sub_id=${sub_id}`)
    const apiResponse = await fetchCatApi(`https://api.thecatapi.com/v1/votes`)

    console.log('Voted Cats: ', apiResponse)



}

const postVoteToCatApi = async (requestBody) => {

    let response = await fetch(
        "https://api.thecatapi.com/v1/votes",

        {
            method: "POST",
            body: requestBody,
            headers: {
                "Content-Type": "application/json"
            }
        }

    )

    let dataParsed = await response.json();

    console.log('Post Request:', dataParsed);

}

// ****************************************************************
//? Utility FUNCTIONS
// ****************************************************************

const setRandomCat = async () => {

    const apiResponse = await fetchCatApi()

    // console.log(apiResponse)

    randomCatPic.setAttribute("src", apiResponse[0].url)

    catImageID = apiResponse[0].id;

    

}

const lovedCat = async (catImageId) => {

    let requestBodyVote = {
        image_id: catImageId,
        sub_id,
        value: 1
    }

    console.log('Your cat vote: ', requestBodyVote)

    await postVoteToCatApi(JSON.stringify(requestBodyVote))

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




// ****************************************************************
//? FUNCTIONS In action 
// ****************************************************************

setRandomCat()
