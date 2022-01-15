const auth = "563492ad6f91700001000001c6b497aa0385478988c0bc528435afa4";
const nextElm = document.querySelector(".next");
const input = document.querySelector("input");
const searchButtonElm = document.querySelector(".searchButton");

let pageNum = 1;
let search = false;
let query = "";

input.addEventListener("input",(e)=>{
    e.preventDefault();
    query=e.target.value;
});

async function createPhotos(pageNum){
    const data = await fetch(
        `https://api.pexels.com/v1/curated?per_page=15&page=${pageNum}`,
        {
            method: "GET",
            headers: {
             Accept: "application/json",
             Authorization: auth,
            },
        }
    );
    const result = await data.json();
    //console.log(result);
    result.photos.forEach(photo => {
        const pic = document.createElement("div");
        pic.innerHTML=`<img src=${photo.src.large}>
        <p>photo: ${photo.photographer}</P>
        <a href=${photo.src.large}>Download</a>
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
}

async function SearchPhotos(query,pageNum){
    const data = await fetch(
        `https://api.pexels.com/v1/search?query=${query}e&per_page=15&page=${pageNum}`,
        {
            method: "GET",
            headers: {
             Accept: "application/json",
             Authorization: auth,
            },
        }
    );
    const result = await data.json();
    //console.log(result);
    result.photos.forEach((photo) => {
        const pic = document.createElement("div");
        pic.innerHTML=`<img src=${photo.src.large}>
        <p>photo: ${photo.photographer}</P>
        <a href=${photo.src.large}>Download</a>
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
}

searchButtonElm.addEventListener("click", () => {
    if(input.value === "") return;
    clear();
    search = true;
    SearchPhotos(query, pageNum);
    pageNum++;
});

function clear(){
    input.value = "";
    document.querySelector(".gallery").innerHTML="";
    page = 1;
}


nextElm.addEventListener("click",()=>{
    if(!search){
        pageNum++;
        curatePhotos(pageNum);
    }
    else{
        if(query.value==="")return;
        pageNum++;
        SearchPhotos(query,pageNum);

        
    }
})

createPhotos(pageNum);





