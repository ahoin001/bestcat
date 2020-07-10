console.log('Hi there!')

let picContainer = document.querySelector("div.pic-container")
let pic = document.querySelector("img")


// ? Get API data

let url = "https://api.thecatapi.com/v1/images/search";

const apiResponse = fetch(url, {
    method: "GET",
    headers: {
        "X-Auth-Token": "5d07ae96-a25c-474e-94f0-5c6bd5e5a60b",
        "Content-Type": "application/json"
    }
})
    .then(resp => resp.json())
    .then((data) => {
        
        // console.log(data)

        pic.setAttribute("src", data[0].url)

    }
    )
    .catch((err) => {
        console.log(er)
    }
    );