// ****************************************************************
//? CONNECT TO DOM  & INITIALIZE VARIABLES
// ****************************************************************

let picContainer = document.querySelector("div.pic-container")
let pic = document.querySelector("img")

let catID;
const sub_id = "User-CatLady99";


// ****************************************************************
//? API INTERACTIONs
// ****************************************************************

const fetchCatApi = async (requestType = "GET") => {

    let response = await fetch(
        "https://api.thecatapi.com/v1/images/search",
        {
            method: requestType,
            headers: {
                "X-Auth-Token": "5d07ae96-a25c-474e-94f0-5c6bd5e5a60b",
                "Content-Type": "application/json"
            }
        })

    let dataParsed = await response.json();

    // console.log(dataParsed);

    return dataParsed;

}


const postVoteToCatApi = async (requestBody) => {

    let response = await fetch(
        "https://api.thecatapi.com/v1/votes",

        {
            method: "POST",
            body: requestBody,
            headers: {
                "X-Auth-Token": "5d07ae96-a25c-474e-94f0-5c6bd5e5a60b",
                "Content-Type": "application/json"
            }
        }
    )

    let dataParsed = await response.json();

    console.log(dataParsed);

}

// ****************************************************************
//? Utility FUNCTIONS
// ****************************************************************

const setRandomCat = async (requestType) => {

    const apiResponse = await fetchCatApi(requestType)

    // console.log(apiResponse)

    pic.setAttribute("src", apiResponse[0].url)

    catID = apiResponse[0].id;

    // console.log(catID)

}

const lovedCat = async (catId) => {

    let requestBodyVote = {
        image_id: catId,
        sub_id,
        value: 1
    }

    await postVoteToCatApi(JSON.stringify(requestBodyVote))

    setRandomCat()

}

const nopedCat = async (catId) => {

    let requestBodyVote = {
        image_id: catId,
        sub_id,
        value: 0
    }

    await postVoteToCatApi(JSON.stringify(requestBodyVote))

    setRandomCat()

}



// ****************************************************************
//? FUNCTIONS In action 
// ****************************************************************

setRandomCat()




