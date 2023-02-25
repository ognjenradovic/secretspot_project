"use strict";

// Buttons
const generateButton = document.querySelector(".generateButton");
const fullScreenButton = document.querySelector(".fullScreenButton");
const enterEditMode = document.querySelector(".modalTabButton");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const removePlaceButton = document.querySelector(".removePlaceButton");
const addCategoryButton = document.querySelector(".addCategoryButton");
const editCategoryButton = document.querySelector(".editCategoryButton");
const removeCategoryButton = document.querySelector(".removeCategoryButton");
const modalSubmit = document.querySelector(".modalSubmit");
const modalTabButton = document.querySelector(".modalTabButton");
const modalCategorySubmit = document.querySelector(".modalCategorySubmit");
const modalCategoryClose = document.querySelector(".modalCategoryClose");
const uploadPhoto = document.querySelector(".uploadPhoto");

// Wrappers and containers
const generatedPlacesWrapper = document.querySelector(".generatedPlacesWrapper");
const savedPlacesWrapper = document.querySelector(".savedPlacesWrapper");
const menuWrapper = document.querySelector(".menuWrapper");
const workspaceWrapper = document.querySelector(".workspaceWrapper");
const moreCategories = document.querySelector(".moreCategories");
const categoryModal = document.querySelector(".categoryModal");
const moreCategoriesGrid = document.querySelector(".moreCategoriesGrid");
const resizerWrapper = document.querySelector(".resizerWrapper");
const modal = document.querySelector(".modal");
const mapWrapper = document.querySelector(".mapWrapper");
const modalWindow = document.querySelector(".modalWindow");
const modalCategoryWindow = document.querySelector(".modalCategoryWindow");

// Form fields and input elements
const modalPlaceName = document.querySelector(".modalPlaceName");
const modalPlaceDescription = document.querySelector(".modalPlaceDescription");
const modalPlaceCategory = document.querySelector(".modalPlaceCategory");
const modalPlaceCity = document.querySelector(".modalPlaceCity");
const modalTabTitle = document.querySelector(".modalTabTitle");
const modalTabText = document.querySelector(".modalTabText");
const modalCategoryTitle = document.querySelector(".modalCategoryTitle");
const modalCategoryName = document.querySelector(".modalCategoryName");
const modalCategoryCode = document.querySelector(".modalCategoryCode");
const modalCategoryDescription = document.querySelector(".modalCategoryDescription");
const modalCategoryPlaceName = document.querySelector(".modalCategoryPlaceName");
const modalTitle = document.querySelector(".modalTitle");

// Map-related elements
const map = document.querySelector("#map");
const mapHTMLElement = document.getElementById("map");

// Modal-related elements
const modalCloseButtons = document.querySelectorAll(".modalClose");
const modalTabClose= document.querySelector(".modalTabClose");
const modalTab= document.querySelector(".modalTab");
const modalCategory = document.querySelector(".modalCategory");
const modalCategoryTitleBar = document.querySelector(".modalCategoryTitleBar");
const categoryModalWindow =document.querySelector(".categoryModalWindow");

const sidebarHTML=`
<p class="websiteDescription">
Are you bored?<br />
We will show you the best hangout spots in your city!
</p>
<div class="weatherWrapper"></div>
<div class="generateWrapper">
<button class="generateButton">
  <span class="buttonText">Recommend me a new spot!</span>
</button>
<!-- <select
  id="city"
  class="locationDropdown"
  name="city"
  placeholder="Belgrade"
>
  <option value="beograd">Belgrade</option>
  <option value="novisad">Novi Sad</option>
  <option value="niš">Niš</option>
</select> -->
<!-- <button class="changePlaceButton">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="32"
    width="32"
    viewBox="0 0 48 48"
  >
    <path
      d="M30.9 39q-1.05.45-1.825-.075-.775-.525-.775-1.775 0-.5.35-1t.9-.8q3.25-1.55 5.2-4.65 1.95-3.1 1.95-6.9 0-2.15-1.125-4.55t-2.825-4.2L31.5 14v3.9q0 .8-.525 1.3t-1.275.5q-.75 0-1.275-.5-.525-.5-.525-1.3V9.35q0-.8.55-1.35t1.35-.55h8.6q.75 0 1.25.5t.5 1.3q0 .75-.5 1.275-.5.525-1.25.525H34l.4.4q3.1 2.85 4.65 6.125 1.55 3.275 1.55 6.275 0 4.95-2.65 9T30.9 39ZM9.8 40.55q-.8 0-1.3-.525T8 38.75q0-.75.5-1.275.5-.525 1.3-.525h4.3l-.4-.3q-3.25-2.6-4.75-5.675-1.5-3.075-1.5-6.875 0-4.95 2.675-9T17.2 8.95q1.05-.35 1.8.2t.75 1.7q0 .5-.325 1t-.825.75q-3.35 1.55-5.3 4.675-1.95 3.125-1.95 6.825 0 3 1.075 5.25T15.4 33.2l1.25.8v-3.95q0-.75.525-1.25t1.325-.5q.75 0 1.25.5t.5 1.25v8.6q0 .8-.55 1.35t-1.35.55Z"
    />
  </svg>
</button> -->
</div>
<h2 class="sidebarTitle">I want to</h2>
<div class="generatedPlacesWrapper placesWrapper">
<div
  class="genereatePlaceComponent placeComponent place1r1 savedPlace"
  category="river"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="70"
    viewBox="0 0 48 48"
  >
    <path
      d="M3.7 42.3v-3.6q1.85-.1 3.575-.775T10.7 36q1.55 1.25 3.275 1.95 1.725.7 3.375.7 1.55 0 3.375-.725t3.325-1.975q1.75 1.45 3.4 2.075 1.65.625 3.3.625 1.6 0 3.2-.675t3.5-2.025q1.85 1.35 3.575 2 1.725.65 3.275.75v3.6q-1.65-.05-3.525-.55T37.45 40.4q-1.75 1-3.4 1.45-1.65.45-3.3.45-1.55 0-3.275-.45-1.725-.45-3.425-1.45-1.6 1-3.3 1.45-1.7.45-3.4.45t-3.375-.45Q12.3 41.4 10.65 40.4q-1.5.85-3.4 1.35-1.9.5-3.55.55Zm0-9.8v-3.8q0-4.8 1.925-9.05Q7.55 15.4 10.9 12.225 14.25 9.05 18.65 7.2q4.4-1.85 9.35-1.85 1.45 0 3 .15t2.95.45q-1.1 1.7-1.625 3.425Q31.8 11.1 31.8 12.55q0 2.8 1.85 4.875t4.7 2.075h5.95v3.7h-5.95q-4.35 0-7.25-3.15-2.9-3.15-2.9-7.5 0-.6.125-1.425.125-.825.375-1.825-3.95 1.1-6.425 4.325Q19.8 16.85 19.8 20.7q0 1.85.65 3.525.65 1.675 1.75 3.175.45-.35.925-.625.475-.275.925-.625 1.6 1.3 3.4 1.975 1.8.675 3.3.675 1.45 0 3.275-.7t3.425-1.95q1.5 1.15 3.275 1.875 1.775.725 3.575.825v3.65q-1.65-.1-3.525-.575T37.45 30.6q-1.75 1-3.35 1.45-1.6.45-3.35.45-1.7 0-3.5-.525t-3.2-1.375q-1.6.95-3.325 1.4-1.725.45-3.375.5-1.55-.05-3.375-.55T10.65 30.6q-1.5.85-3.4 1.325T3.7 32.5Z"
    />
  </svg>
  <h3>Chill by the river</h3>
</div>
<div
  class="genereatePlaceComponent placeComponent place2r1 savedPlace"
  category="rooftop"
>
<svg xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 96 960 960" width="70"><path d="M792 386q9 9 9 21t-9 21l-43 43q-9.067 9-21.533 9-12.467 0-21.337-9.053-9.13-9.052-8.63-21.5Q698 437 707 428l43-42q9-8 21-8.5t21 8.5ZM110 886q-12.75 0-21.375-8.675Q80 868.649 80 855.825 80 843 88.625 834.5T110 826h740q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T850 886H110Zm370.175-630q12.825 0 21.325 8.625T510 286v60q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T450 346v-60q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625ZM169 384q9-9 21-9t21 9l44 44q9 9.067 9 21.533 0 12.467-9 21.858-9 8.609-21.5 8.109T212 470l-43-44q-8-9-8.5-21t8.5-21Zm31 352q0-117 81.5-198.5T480 456q117 0 198.5 81.5T760 736H200Z"/></svg>              <h3>Watch a sunset on a rooftop</h3>
</div>
<div
  class="genereatePlaceComponent placeComponent place1r2 savedPlace"
  category="underground"
>
<svg xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 96 960 960" width="70"><path d="M355 936q-12 0-23-4.5T312 918L138 744q-9-9-13.5-20t-4.5-23V451q0-12 4.5-23t13.5-20l174-174q9-9 20-13.5t23-4.5h250q12 0 23 4.5t20 13.5l174 174q9 9 13.5 20t4.5 23v250q0 12-4.5 23T822 744L648 918q-9 9-20 13.5t-23 4.5H355Zm125-318 103 103q8 8 20 8t21-9q9-9 9-21t-9-21L522 576l103-103q8-8 8-20t-9-21q-9-9-21-9t-21 9L480 534 377 431q-8-8-20-8t-21 9q-9 9-9 21t9 21l102 102-103 103q-8 8-8 20t9 21q9 9 21 9t21-9l102-102Z"/></svg>              <h3>Explore the underground</h3>
</div>
<div
  class="genereatePlaceComponent placeComponent place2r2 savedPlace"
  category="skynight"
>
<svg xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 96 960 960" width="70"><path d="m384 824-95-209-209-95 209-95 95-209 95 209 209 95-209 95-95 209Zm344 112-47-105-105-47 105-48 47-104 48 104 104 48-104 47-48 105Z"/></svg>
  <h3>Watch starry nightsky</h3>
</div>
<button class="buttonBasic moreCategories place2r3 savedPlace">
  See some more activites in your city!
</button>
</div>`;

if(window.Prototype) {
  delete Object.prototype.toJSON;
  delete Array.prototype.toJSON;
  delete Hash.prototype.toJSON;
  delete String.prototype.toJSON;
}

