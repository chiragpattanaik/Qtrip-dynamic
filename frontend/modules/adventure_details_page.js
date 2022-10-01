import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search)
 {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  return search.split('=')[1];

  // Place holder for functionality to work in the Stubs

}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try
  {
    const response = await fetch(`http://3.7.162.60:8082/adventures/detail?adventure=${adventureId}`);
    const citiesData = await response.json();
    console.log(citiesData);
    console.log("okay Fine!!");
    return citiesData;
  }catch(err)
  {
    console.log(err)
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) 
{
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const photoele = document.getElementById("photo-gallery");
  const advname = document.getElementById("adventure-name");
  advname.innerHTML = adventure.name;
  const advsub = document.getElementById("adventure-subtitle");
  advsub.innerHTML = adventure.subtitle;
  const advcontent = document.getElementById("adventure-content");
  advcontent.innerHTML = adventure.content;
  const advpic = adventure.images;
  advpic.forEach((ele) => 
  {
    const newdiv = document.createElement('div');
    newdiv.innerHTML = `<img src = ${ele} class = "activity-card-image "/>`;
    photoele.appendChild(newdiv);
  });

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) 
{
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
const pgallery = document.getElementById("photo-gallery");
pgallery.innerHTML = 
`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner">
  <div class="carousel-item active">
    <img src= ${images[0]} class="activity-card-image d-block w-100" alt="First Slide">
  </div>
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`
let inner = document.getElementsByClassName("carousel-inner")[0];
for(let i=1;i<images.length;i++)
{

  let item = document.createElement("DIV");
  item.className = "carousel-item";
  let image = document.createElement("IMG");
  image.className = "activity-card-image d-block w-100 ";
  image.setAttribute("src", images[i]);
  item.appendChild(image);
  inner.appendChild(item);
}


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) 
{
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) 
  {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
  } 
  else 
  {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }
  document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) 
{
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const total = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = total;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const myForm=document.getElementById("myForm");
  myForm.addEventListener("submit",async(e)=>
  {
    e.preventDefault();
    let  data={name:myForm.elements["name"].value,date:new Date(myForm.elements["date"].value),person:myForm.elements["person"].value,adventure:adventure["id"]}
    console.log(data);
    try{
      const url=`${config.backendEndpoint}/reservations/new`;
      const res=await fetch(url,{method:"POST",body:JSON.stringify(data),headers: {'Content-Type': 'application/json'},});
     alert("success");
    }
    catch(error){
      console.log(error);
      alert("failed");
    }
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.available)
  {
    document.getElementById("reserved-banner").style.display = "block"
  }
  else
  {
    document.getElementById("reserved-banner").style.display = "none"
  }


}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
