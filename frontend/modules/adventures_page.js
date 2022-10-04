
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search)
 {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split('=')[1];

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city)
 {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try
  {
    const response = await fetch(`http://65.1.118.35:8082/adventures?city=${city}`);
    const citiesData = await response.json();
    return citiesData;
  }catch(err)
  {
    console.log(err)
    return null
  }
  
}


//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(key => 
    {
    var divElement = document.createElement("div");
    divElement.className = "col-6 col-lg-3 mb-3";
    divElement.innerHTML = `
    <a href="detail/?adventure=${key.id}" id="${key.id}">
        <div class="activity-card">
          <img src="${key.image}" alt="${key.name}" />
          <div class="category-banner">${key.category}</div>
          <div class="w-100 p-1">
            <div class="d-flex justify-content-between">
              <h5>${key.name}</h5>
              <p>₹${key.costPerHead}</p>
            </div>
            <div class="d-flex justify-content-between">
              <h5>Duration</h5>
              <p>${key.duration} Hours</p>
            </div>
          </div>
        </div>
      </a>
    `;
    document.getElementById("data").appendChild(divElement);
  })}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) 
{
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const arr = [];
  list.filter((ele) =>
  {
      if(ele.duration>=low && ele.duration<=high)
      {
        arr.push(ele)
      }
  });

  return arr;


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) 
{
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const arr = [];
  list.filter((item) =>
  {
    if(categoryList.includes(item.category))
    {
      arr.push(item)
    }

  });
  return arr;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) 
{
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredlist =[]
  let arr=filters["duration"].split("-")
  let low = arr[0];
  let high = arr[1];
if(filters["category"].length>0&&filters["duration"].length>0)
{

 filteredlist=filterByCategory(list,filters.category)
 filteredlist=filterByDuration(list,low,high)
}

else if(filters["category"].length>0)//Returns Filter by category only
{
  filteredlist=filterByCategory(list,filters.category);
}

else if(filters["duration"].length>0) //Returns Filter by duration only
{
 filteredlist=filterByDuration(list,low,high)
}
else
{
  filteredlist = list; //returns the list if category and duration both are empty
}
  // Place holder for functionality to work in the Stubs
  return filteredlist;
}


  // Place holder for functionality to work in the Stubs
  // return list;

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters)
 {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() 
{
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const fil = JSON.parse( localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return fil;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const data =  document.getElementById('category-list');
  const arr = filters.category;
  arr.forEach((item) =>
  
  {
    const division = document.createElement('div');
    division.setAttribute("class","category-filter");
    division.innerText = item;
    data.appendChild(division);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
