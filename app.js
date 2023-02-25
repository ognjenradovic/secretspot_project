"use strict";

class App {
  #map;
  #mapZoomLevel = 11;
  #latandlng;
  #mapEvent;
  #places = [];
  #cities = [];
  #fullScreen = 0;
  #categories = [];
  #minimize = false;
  #editMode = false;
  #addPlaceState = false;
  #editPlaceState = false;
  #currentEditPlace=null;
  #resizeEvent = false;
  #removePlaceState=false;
  #generatedPlaces=[];
  #currentGeneratedPlaceIndex=0;


  constructor() {
    const modalCloseButtons = document.querySelectorAll(".modalClose");
    const enterEditMode = document.querySelector(".modalTabButton");
    const modalCategory = document.querySelector(".modalCategory");
    const modalTabClose = document.querySelector(".modalTabClose");
    const modal = document.querySelector(".modal");
    const resizerWrapper = document.querySelector(".resizerWrapper");
    const fullScreenButton = document.querySelector(".fullScreenButton");
    const modalSubmit = document.querySelector(".modalSubmit");

    this._initalizeCategories();
    this._initializePlaces();
    this._addPlacesToCategory();
    this._getPosition();

    document.onmousemove = this._resizerWrapper.bind(this);
    modalCloseButtons.forEach(element => {
        element.addEventListener("click", this._modalClose);
    });    
    enterEditMode.addEventListener("click", this._editMode);
    modalCategory.addEventListener("click", this._modalCategoriesAdd);
    modalTabClose.addEventListener("click", this._modalButtonClose);
    modal.addEventListener("click", this._modalClicked);
    document.addEventListener("mouseup", () => {this.resizeEvent = false;});
    resizerWrapper.addEventListener("mousedown", (e) => {this.resizeEvent = true;});

    fullScreenButton.addEventListener("click", this._fullScreenPhone);
    this._addCity(new City("Beograd", "null", "beograd je prestonica srbije"));
    this._addCity(new City("Nis", "null", "Nis nije prestonica srbije"));
    modalSubmit.addEventListener("click", this._modalSubmit.bind(this));
}
  _modalClicked(e){
    if (e.target.closest(".moreCategoryCard")) {
     app._generatePlaceCategory( e.target.getAttribute("category"));
     app._modalClose();
    }
  }
  set categories(categories) {
    this.#categories = categories;
  }
  _exitEditMode(){
    this.editMode=false;
    this.addPlaceState=false;
    this.editPlaceState=false;
    this.removePlaceState=false;
    modalTabButton.style.display="block";
    modalTabTitle.textContent="Edit mode";
    modalTabText.textContent="Do you want to help us improve library of locations? Now you can with edit mode!";

    workspaceWrapper.innerHTML="";
    const html=sidebarHTML;
  workspaceWrapper.insertAdjacentHTML("afterbegin", html);
  modalTab.style.display="block";
  }
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
  }
  _modalButtonClose() {
    modalTab.style.display="none";
  }
  _initalizeCategories(){
    this._addCategory(
      new Category(
        "Chill by the river",
        "river",
        "icons/empty.png",
        "Enjoy a day of relaxation by the river! Take a refreshing swim, try stand-up paddleboarding or kayaking, or simply bask in the sun and work on your tan. Whether you're with friends or solo, it's the perfect way to unwind and enjoy the natural beauty of the outdoors."
      )
    );
    this._addCategory(
      new Category(
        "Watch a sunset on a rooftop",
        "rooftop",
        "icons/empty.png",
        "Watching a sunset from a rooftop in the city is an experience like no other. As the sun begins to dip below the horizon, the sky fills with vibrant hues of orange, pink, and purple. From these vantage points, you can see the city in a whole new light, with iconic landmarks silhouetted against the colorful sky."
      )
    );
    this._addCategory(
      new Category(
        "Do some urban exploring",
        "urbex_underground",
        "icons/empty.png",
        "Get ready to discover the city's hidden secrets and forgotten corners on an urban exploring adventure! This thrilling activity takes you off the beaten path and into the heart of the city's most intriguing and mysterious locations. From abandoned buildings and hidden tunnels to secret rooftops and forgotten landmarks, urban exploring is an unforgettable way to experience the city's unique history and character."
      )
    );

    this._addCategory(
      new Category(
        "Go on street art walk",
        "street_art",
        "icons/empty.png",
        "Experience the vibrant and expressive world of street art on a graffiti and arts walking tour! Explore the city's most colorful neighborhoods, discover hidden gems and murals, and learn about the artists and their unique styles. This tour is perfect for art enthusiasts, photographers, and anyone who wants to see the city from a fresh perspective."
      )
    );

    this._addCategory(
      new Category(
        "Explore underground",
        "underground",
        "icons/empty.png",
        "Discover a whole new world beneath the surface on an underground tunnel exploration adventure! Descend into the depths of the city and explore the mysterious network of tunnels, catacombs, and underground passageways that lie hidden beneath your feet. From historical sites and abandoned subway stations to secret bunkers and hidden chambers, there's no telling what you might discover on this thrilling journey into the unknown. "
      )
    );

    this._addCategory(
      new Category(
        "Watch a starry skynight",
        "skynight",
        "icons/empty.png",
        "Experience the magic and wonder of the universe by watching a starry night sky! Gaze up at the twinkling stars, planets, and constellations and immerse yourself in the beauty of the night sky."
      )
    );

    this._addCategory(
      new Category(
        "Explore some weird museums",
        "weird_museums",
        "icons/empty.png",
        "Get ready to discover the strange and unusual world of weird museums! From quirky and eccentric collections to bizarre artifacts and exhibits, these museums offer a one-of-a-kind experience that's unlike anything else. Explore the weird and wonderful"
      )
    );

    this._addCategory(
      new Category(
        "Eat some weird food",
        "weird_food",
        "icons/empty.png",
        "Mesto gde mozete da budete na krovu"
      )
    );

    this._addCategory(
      new Category(
        "Explore haunted spots",
        "haunted_spots",
        "icons/empty.png",
        "Are you ready to get spooked? Embark on an adventure into the supernatural world of haunted spots! From abandoned asylums and old prisons to haunted hotels and cemeteries, there's no shortage of spooky locations to explore. Listen to chilling tales of ghostly encounters and unexplained phenomena, and maybe even experience some ghostly encounters of your own."
      )
    );


    this._addCategory(
      new Category(
        "Explore eccentric architecture",
        "eccentric_architecture",
        "icons/empty.png",
        "Embark on a journey of discovery and explore the strange and surreal world of weird architecture! From twisted and contorted buildings to gravity-defying structures and bizarre designs, there's no shortage of architectural oddities to discover. Whether you're exploring a city or traveling the world, these unconventional and striking buildings will leave you in awe and amazement."
      )
    );

    this._addCategory(
      new Category(
        "Or do some other stuff!",
        "other",
        "icons/empty.png",
        "No description."
      )
    );


  }
_generatePlace() {
  const places = this.#places;
  if (places.length === 0) return;

  const place = places[Math.floor(Math.random() * places.length)];
  app._showPlaceOnSidebar(place);
  panToPlace(place);
}

_removePlace(place) {
  const index = this.#places.indexOf(place);
  if (index !== -1) {
    this.#places.splice(index, 1);
  }
  this.#map.removeLayer(place.placeMarker);
  app._setLocalStorage();
}

_editPlace(place) {
  this._modalOpen(place);
  // modalTitle.textContent = "Edituj mesto";
}

_showPlaceOnSidebar(place) {
  menuWrapper.style.width = "44%";
  workspaceWrapper.innerHTML = "";

  const picturesHtml = place.pictures.map((picture, i) => {
    const slideshowPictureContainerClass = i === 0 ? "slideshowPictureContainer slideshowFocused" : "slideshowPictureContainer";
    return `<div class="${slideshowPictureContainerClass}" serialno="${i}">
              <img src="${picture}" class="focusedPlacePicture">
            </div>`;
  }).join("");

  const buttonsHtml = place.pictures.length === 1 ? "" : `
    <button class="prev">&#10094;</button>
    <button class="next">&#10095;</button>
  `;

  const html = `
    <div class="focusedPlaceWrapper">
      <button class="focusedPlaceBackButton">&#10094; Back</button>
      <div class="slideshowContainer">
        ${buttonsHtml}
        ${picturesHtml}
      </div>
      <h3 class="focusedPlaceTitle">${place.name}</h2>
      <h2 class="focusedPlaceType">${place.category.name}</h2>
      <p class="focusedPlaceDescription">${place.category.defaultDescription}</p>
      <button class="generateButton generateMore">Generate one more</button>
    </div>
  `;

  workspaceWrapper.insertAdjacentHTML("afterbegin", html);
  if (place.pictures.length === 1) {
    document.querySelector(".prev").style.display = "none";
    document.querySelector(".next").style.display = "none";
  }
}

_showGeneratedPlacesOnSidebar() {
  const place = app.generatedPlaces[app.currentGeneratedPlaceIndex];
  menuWrapper.style.width = "44%";
  workspaceWrapper.innerHTML = "";

  let html = `
    <div class="focusedPlaceWrapper">
      <p class="websiteDescription">We have found <b> ${place.category.places.length} ${place.category.name} spots! </b></p>

      <div class="slideshowContainer">
        <button class="focusedPlaceBackButton">&#10094; Back</button>
        <button class="prev">&#10094;</button>
        <button class="next">&#10095;</button>
  `;

  let i = 0;

  place.pictures.forEach((picture) => {
    const slideshowPictureContainerClass = i === 0 ? 'slideshowPictureContainer slideshowFocused' : 'slideshowPictureContainer';

    html += `
      <div class="${slideshowPictureContainerClass}" serialno="${i}">
        <img src="${picture}" class="focusedPlacePicture">
      </div>
    `;

    i++;
  });

  html += `
      </div>
      <div class="flexSpaceBetween">
        <h2 class="focusedPlaceTitle">${place.name}</h2>
      </div>
      <h3 class="focusedPlaceType">${place.category.name}</h3>
      <p class="focusedPlaceDescription">${place.category.defaultDescription}</p>
      <div class="prevNextWrapper">
        <button class="buttonBasic buttonBasicBlue buttonNextPlace">Next place</button>
      </div>
    </div>
  `;

  workspaceWrapper.insertAdjacentHTML("afterbegin", html);

  if (place.pictures.length === 1) {
    document.querySelector(".prev").style.display = "none";
    document.querySelector(".next").style.display = "none";
  }

  panToPlace(place);
}

_generatePlaceCategory(categoryCode) {
  const category = app.getCategories.find((element) => element.code === categoryCode);

  const places = category.places;

  if (places.length === 0) {
    return;
  }

  const i = Math.floor(Math.random() * places.length);
  const place = places[i];

  workspaceWrapper.innerHTML = "";
  app.#generatedPlaces = places;
  app.#currentGeneratedPlaceIndex = i;
  app._showGeneratedPlacesOnSidebar();

}
  // Refactored _loadMap function
_loadMap(position) {
  const { latitude, longitude } = position.coords;
  const coords = [latitude, longitude];

  this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

  L.tileLayer('https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 22,
    subdomains: 'abcd',
    accessToken: 'd1lJ7ViNJACKX928ueQ8WWpwzEmOWyCf0IamBN6AkCHlsgnB8cenXi71UNGUVrmO'
  }).addTo(this.#map);

  this.#map.on("click", this._showForm.bind(this));

  if (this.#places) {
    this.#places.forEach(place => this._addMarker(place));
  }

  mapHTMLElement.style.display = "";
}


// Refactored _showForm function
_showForm(mapE) {
  this.#mapEvent = mapE;
  this.#latandlng = this.#mapEvent.latlng;

  if (app.addPlaceState) {
    this._modalOpen();
  }
}

  _initializePlaces() {


    this.#places.push(new Place(
      "X Team Island - Boathouse cafe",
      [44.79354702701885, 20.38275578511109],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      this.getCategories[0]
    ));
    this.#places[0]._addPicture(new URL(' https://nyamie.com/uploads/photos/medium/Entity-Jtgyh9svtEeHve2w.jpg'));
    this.#places[0]._addPicture(new URL('https://nyamie.com/uploads/photos/medium/Entity-O5ERp7Rt9aD88drR.jpg'));
    this.#places[0]._addPicture(new URL('https://cdn.navidiku.rs/firme/galerija4/s49625/xteam-island-izdavanje-prostora-za-zurke-i-rodjendane-fd4391-2.jpg'));


    this.#places.push(new Place(
      "Silosi - Ponta 011",
      [44.8286423,20.4715837],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      this.getCategories[0]
    ));

    this.#places[1]._addPicture(new URL('https://www.datocms-assets.com/49609/1626861433-get-louder-with-hugo1.jpeg'));
    this.#places[1]._addPicture(new URL('https://www.u-beogradu.com/uploads/2021/07/Ponta.011-svetlana-823x420.jpg'));
    this.#places[1]._addPicture(new URL('https://www.datocms-assets.com/49609/1666121365-zalazakponta.jpg?auto=compress%2Cformat%2Cenhance&w=600'));




    this.#places.push(new Place(
      "Bela Stena riverbeach - Island of Crazies",
      [44.8488351,20.5858939],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      this.getCategories[0]
    ));

    this.#places[2]._addPicture(new URL('https://media.danubeogradu.rs/2019/08/bela-stena-07.jpg'));
    this.#places[2]._addPicture(new URL('https://www.gdenapecanje.com/wp-content/uploads/2017/04/1581_bela-stena-3.jpg'));
    this.#places[2]._addPicture(new URL('https://visitpancevo.rs/wp-content/uploads/2020/12/Bela-stena-kupaci.jpg'));

    this.#places.push(new Place(
      "Watch a sunset from New Belgrade suburbs",
      [44.8209442,20.4189684],
      "Watching a sunset from a rooftop in the city is an experience like no other. As the sun begins to dip below the horizon, the sky fills with vibrant hues of orange, pink, and purple. From these vantage points, you can see the city in a whole new light, with iconic landmarks silhouetted against the colorful sky.",
      this.getCategories[1]
    ));

    this.#places[3]._addPicture(new URL('https://i.imgur.com/KKvGmZE.png'));
    this.#places[3]._addPicture(new URL('https://web.archive.org/web/20161010021606if_/http://static.panoramio.com/photos/large/1282325.jpg'));


    this.#places.push(new Place(
      "Watch a sunset from restaurant Caruso",
      [44.8135267,20.4609094],
      "Watching a sunset from a rooftop in the city is an experience like no other. As the sun begins to dip below the horizon, the sky fills with vibrant hues of orange, pink, and purple. From these vantage points, you can see the city in a whole new light, with iconic landmarks silhouetted against the colorful sky.",
      this.getCategories[1]
    ));

    this.#places[4]._addPicture(new URL('https://poslovne-strane.com/wp-content/uploads/2018/07/Restoran-Caruso-Beograd-8.jpg'));
    this.#places[4]._addPicture(new URL('https://media-cdn.tripadvisor.com/media/photo-s/18/29/fd/f9/pogled-iz-restorana.jpg'));


    this.#places.push(new Place(
      "Watch a sunset from suburbs",
      [44.8131224,20.4890052],
      "Watching a sunset from a rooftop in the city is an experience like no other. As the sun begins to dip below the horizon, the sky fills with vibrant hues of orange, pink, and purple. From these vantage points, you can see the city in a whole new light, with iconic landmarks silhouetted against the colorful sky.",
      this.getCategories[1]
    ));

    this.#places[5]._addPicture(new URL('https://branasdivineworld.com/wp-content/uploads/2022/03/heritage_2-e1647514731609.jpg'));
    this.#places[5]._addPicture(new URL('https://www.heritagebelgrade.com/zips/index-galerija-gallery/bigs/Heritage%20Rooftop-8.jpg'));


    this.#places.push(new Place(
      "Abandoned vault in Zemun",
      [44.8422297,20.4047305],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      this.getCategories[4]
    ));

    this.#places[6]._addPicture(new URL('https://undergrad.rs/content/uploads/lagum-u-zemunu-ulaz.jpg'));
    this.#places[6]._addPicture(new URL('https://undergrad.rs/content/uploads/lagum-u-zemunu-2.jpg'));
    this.#places[6]._addPicture(new URL('https://undergrad.rs/content/uploads/lagum-u-zemunu-hodnik-2.jpg'));


    this.#places.push(new Place(
      "Military bunker underneath Botanical Garden",
      [44.8159467,20.4740084],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      this.getCategories[4]
    ));

    this.#places[7]._addPicture(new URL('https://undergrad.rs/content/uploads/skloniste-botanicka-basta-hodnik-drugi-deo.jpg'));
    this.#places[7]._addPicture(new URL('https://undergrad.rs/content/uploads/skloniste-botanicka-basta-spolja.jpg'));


    this.#places.push(new Place(
      "Zvezdara forest observatorium",
      [44.8021015,20.5135863],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      this.getCategories[5]
    ));

    this.#places[8]._addPicture(new URL('https://slobodna.rs/wp-content/uploads/2019/08/beogradski-glas-opservatorija.jpg'));
    this.#places[8]._addPicture(new URL('https://images.unsplash.com/photo-1527871899604-f1425bcce779?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhcmdhemluZ3xlbnwwfHwwfHw%3D&w=1000&q=80'));

    this.#places.push(new Place(
      "Watch a sunset from famous Genex tower",
      [44.8204134,20.4051157],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      this.getCategories[1]
    ));

    this.#places[9]._addPicture(new URL('https://www.capital.ba/wp-content/uploads/2010/09/geneks-kugla.jpg'));
    this.#places[9]._addPicture(new URL('https://web.archive.org/web/20161014013524if_/http://static.panoramio.com/photos/large/29978654.jpg'));
    this.#places[9]._addPicture(new URL(' https://ocdn.eu/pulscms-transforms/1/vKtk9kpTURBXy9lZGU1YzNhMWU1NTA1YjQ4ZGIzMjdjMzZhNzFjZDU0OC5qcGeRkwLNAf4A3gABoTAB'));
   

    this.#places.push(new Place(
      "Doctors tower - abandoned asylum",
      [44.7979306,20.4544581],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      this.getCategories[8]
    ));

    this.#places[10]._addPicture(new URL('https://upload.wikimedia.org/wikipedia/sr/0/07/Doktorova_kula%2C_Beograd.jpg'));
    this.#places[10]._addPicture(new URL('https://i.imgur.com/wAo7OSd.jpeg'));
   

    
    this.#places.push(new Place(
      "Graffiti walk in Block 45",
      [44.7993494,20.3764251],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      this.getCategories[3]
    ));

    this.#places[11]._addPicture(new URL('http://1.bp.blogspot.com/-rbsEFlnZsZw/UlbyoM0PZUI/AAAAAAAAMwE/BHLC8u2cbfs/s1600/NBG%252C+45+blok%252C+Foto+TL.JPG'));
    this.#places[11]._addPicture(new URL('https://lookerweekly.com/wp-content/uploads/2021/02/6X1A4605.jpg'));
    this.#places[11]._addPicture(new URL('https://i.pinimg.com/originals/84/a1/52/84a152fec254cb6e2fa31b69145562e7.jpg'));


    this.#places.push(new Place(
      "Power plant of Strength and Light",
      [44.8300422,20.4650148],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      this.getCategories[2]
    ));

    this.#places[12]._addPicture(new URL('https://nova.rs/wp-content/uploads/2020/12/BG-MARINA-DORCOL-PKG-150819-VPS-20190815-181755045-.mxf_.00_01_51_04.Still006-725x408.jpg'));
    this.#places[12]._addPicture(new URL('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJJHQ3SojhYODc8X5C9BzKoErmEu5GLa7YJZ4iAka83ijv1pDxoMLNyJYms-RZtr1G8dA&usqp=CAU'));



    this.#places.push(new Place(
      "Ada Safari - a small oasis besides a river",
      [44.7930188,20.4157463],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      this.getCategories[0]
    ));

    this.#places[13]._addPicture(new URL('https://adasafari.co.rs/wp-content/uploads/2016/05/ribolov-slide.jpg'));
    this.#places[13]._addPicture(new URL('https://www.gdecemo.rs/images/company/large/59452965_2650489505022685_1355595977603416064_o-xa9u.jpg'));




  }

  get currentGeneratedPlaceIndex(){
    return this.#currentGeneratedPlaceIndex;
  }
  set currentGeneratedPlaceIndex(currentGeneratedPlaceIndex){
    this.#currentGeneratedPlaceIndex=currentGeneratedPlaceIndex;
  }
  get getPlaces() {
    return this.#places;
  }
  get generatedPlaces(){
    return this.#generatedPlaces;
  }
  
  get currentEditPlace() {
    return this.#currentEditPlace;
  }
  set currentEditPlace(place) {
    this.#currentEditPlace = place;
  }
  set editMode(value) {
    this.#editMode = value;
  }
  set addPlaceState(value) {
    this.#addPlaceState = value;
  }
  set removePlaceState(value) {
    this.#removePlaceState = value;
  }
  set editPlaceState(value) {
    this.#editPlaceState = value;
  }
  set resizeEvent(value) {
    this.#resizeEvent = value;
  }
  get getMinimize() {
    return this.#minimize;
  }
  set setMinimized(value) {
    this.#minimize = value;
  }
  get getCategories() {
    return this.#categories;
  }
  get getCities() {
    return this.#cities;
  }
  _addCategory(category) {
    const existingCategory = this.#categories.find(c => 
      c.code === category.code
    );
  
    // If the category already exists, do not add it again
    if (existingCategory) {
      return;
    }
  
    // Otherwise, add the new category to the list
    this.#categories.push(category);
  }
  _addCity(city) {
    this.#cities.push(city);
  }
  get map() {
    return this.#map;
  }
  get editMode() {
    return this.#editMode;
  }
  get addPlaceState() {
    return this.#addPlaceState;
  }
  get removePlaceState() {
    return this.#removePlaceState;
  }
  get editPlaceState() {
    return this.#editPlaceState;
  }
  get resizeEvent() {
    return this.#resizeEvent;
  }
  get fullScreen() {
    return this.#fullScreen;
  }
  set fullScreen(value) {
    this.#fullScreen = value;
  }
  get getLatlng() {
    return this.#latandlng;
  }

  _modalClose() {
    [modal, modalCategory, modalWindow, categoryModalWindow].forEach(elem => elem.style.display = "none");
  }

  _editMode() {
    const html = `<p class="websiteDescription">
    You are now in edit mode! <br>
    Feel free to add some new cool places or edit existing ones!
  </p>
  <div class="weatherWrapper"></div>
  <h2 class="sidebarTitle">Actions</h2>
    <h3>Places</h3>
    <button class="buttonBasic buttonEditMode newPlaceButton stateButton">
      Add new place
    </button>
    <button class="buttonBasic buttonEditMode editPlaceButton">
      Edit existing place
    </button>
    <button class="buttonBasic buttonEditMode removePlaceButton">
      Remove existing place
    </button>
    <h3>Categories</h3>
    <button class="buttonBasic buttonEditMode addCategoryButton">
      Add new category
    </button>
    <h3>Settings</h3>
    <button style="background-color:#FBB76E; color:black" class="buttonBasic buttonEditMode exitEditModeButton">
      Exit edit mode
    </button>
  </div>`;

    workspaceWrapper.innerHTML = html;
    modalTab.style.display = "none";
  }

  _toggleAddPlaceState() {
    const newPlaceButton = document.querySelector(".newPlaceButton");
    app.addPlaceState = !app.addPlaceState;

    if (app.addPlaceState) {
      modalTabTitle.textContent = "Add place";
      modalTabText.textContent = "Press on the map to add a place";
      modalTabButton.style.display = "none";
      newPlaceButton.classList.add("buttonFocused");
      modalTab.style.display = "block";

      if (app.editPlaceState) app._toggleEditPlaceState();
      if (app.removePlaceState) app._toggleRemovePlaceState();
    } else {
      newPlaceButton.classList.remove("buttonFocused");
      modalTab.style.display = "none";
    }
  }

 _toggleEditPlaceState() {
    const editPlaceButton = document.querySelector(".editPlaceButton");
    app.editPlaceState = !app.editPlaceState;
    editPlaceButton.classList.toggle("buttonFocused", app.editPlaceState);
    modalTabTitle.textContent = app.editPlaceState ? "Edit place" : "";
    modalTabText.textContent = app.editPlaceState ? "Press on the place marker to edit it" : "";
    modalTabButton.style.display = app.editPlaceState ? "none" : "";
    modalTitle.textContent = app.editPlaceState ? "Edit place" : "";
    modalSubmit.textContent = app.editPlaceState ? "Submit edit" : "";
    if (app.addPlaceState) {
      _toggleAddPlaceState();
    }
    if (app.removePlaceState) {
      _toggleRemovePlaceState();
    }
    modalTab.style.display = app.editPlaceState ? "block" : "none";
  }
  
 _toggleRemovePlaceState() {
    const removePlaceButton = document.querySelector(".removePlaceButton");
    app.removePlaceState = !app.removePlaceState;
    removePlaceButton.classList.toggle("buttonFocused", app.removePlaceState);
    modalTabTitle.textContent = app.removePlaceState ? "Delete place" : "";
    modalTabText.textContent = app.removePlaceState ? "Press on the place marker to delete it" : "";
    modalTabButton.style.display = app.removePlaceState ? "none" : "";
    if (app.editPlaceState) {
      _toggleEditPlaceState();
    }
    if (app.addPlaceState) {
      _toggleAddPlaceState();
    }
    modalTab.style.display = app.removePlaceState ? "block" : "none";
  }
  
 _resizerClick() {
    app.resizeEvent = !app.editMode;
  }
  
 _resizerWrapper(event) {
    if (app.resizeEvent) {
      event = event || window.event;
      const currentPercentage = Math.round((event.pageX / window.innerWidth) * 100);
      if (currentPercentage > 35 && currentPercentage < 60) {
        menuWrapper.style.width = currentPercentage + `%`;
      }
    }
  }
  _categoryModalOpen() {
    modal.style.display = "block";
    categoryModalWindow.style.display = "flex";
    modalCategoryWindow.style.display = "block";
    let html = "";
    moreCategoriesGrid.innerHTML = "";
    app.getCategories.forEach((category) => {
      html += `<button class="moreCategoryCard" category="${category.code}">
        ${category.name}
      </button>`;
    });
    moreCategoriesGrid.insertAdjacentHTML("afterbegin", html);
  }

  
  _modalOpen(place) {
    modal.style.display = "block";
    modalWindow.style.display = "flex";
  
    modalPlaceName.value = "";
    modalPlaceDescription.value = "";
  
    if (modalPlaceCategory.innerHTML == "") {
      app.getCategories.forEach((category) => {
        const html = `<option value="${category.name}">${category.name}</option>`;
        modalPlaceCategory.insertAdjacentHTML("afterbegin", html);
      });
      app.getCities.forEach((city) => {
        const html = `<option value="${city.name}">${city.name}</option>`;
        modalPlaceCity.insertAdjacentHTML("afterbegin", html);
      });
    }
  
    if (app.editPlaceState) {
      app.currentEditPlace = place;
      modalPlaceName.value = place.name;
      modalPlaceDescription.value = place.description;
      modalPlaceCategory.value = place.category.name;
    }
  }
  
  _modalSubmit() {
    if (app.editPlaceState) {
      this._editPlaceSubmit();
    }
    if (app.addPlaceState) {
      this._addPlace();
    }
  }
  
  _editPlaceSubmit() {
    const place = app.currentEditPlace;
    this._modalClose();
    place.name = modalPlaceName.value;
    place.description = modalPlaceDescription.value;
    const { lat, lng } = this.#mapEvent.latlng;
    place.lat = lat;
    place.lng = lng;
    place.category = app.getCategories.find(element => element.name == modalPlaceCategory.value);
    place.city = app.getCities.find(element => element.name == modalPlaceCity.value);
    const popupContent = `<img class="popupPicture"src="${place.pictures[0]}"></img> <h3 class="popupTitle" >${place.name}</h3> <h3 class="popupCategory">${place.category.name}</h3> <p class="popupDescription">${place.description}<p>`;
    place.placeMarker.setPopupContent(popupContent);
    app._setLocalStorage();
    app.currentEditPlace = null;
  }
  
  _addPlace() {
    this._modalClose();
    const name = modalPlaceName.value;
    const description = modalPlaceDescription.value;
    const { lat, lng } = this.#mapEvent.latlng;
    const category = app.getCategories.find(element => element.name == modalPlaceCategory.value);
    const city = app.getCities.find(element => element.name == modalPlaceCity.value);
    const place = new Place(name, [lat, lng], description, category, city);
    const pictures = uploadPhoto.files;
    let file = null;
  
    for (let i = 0; i < pictures.length; i++) {
      if (pictures[i].type.match(/^image\//)) {
        file = pictures[i];
        if (file !== null) {
          place._addPicture(URL.createObjectURL(file));
        }
      }
    }
  
    this.#places.push(place);
    category._pushPlace(place);
    city._addPlace(place);
    this._addMarker(place);
    app._setLocalStorage();
  }

  _slideshowChange(number) {
  const pictures = document.querySelectorAll(".slideshowPictureContainer");
  const numberOfPictures = pictures.length;
  const currentPicture = document.querySelector(".slideshowFocused");
  const currentNumber = currentPicture.getAttribute("serialno");
  
  const mod = (n, m) => ((n % m) + m) % m;
  const newNumber = mod(Number(currentNumber) + Number(number), numberOfPictures);

  if (newNumber < numberOfPictures && newNumber >= 0) {
    currentPicture.classList.remove("slideshowFocused");
    pictures[newNumber].classList.add("slideshowFocused");
  }
}

_addMarker(place) {
  const blueIcon = L.icon({
    iconUrl: "icons/pin.png",
    shadowUrl: "icons/pin.png",
    iconSize: [40, 40],
    shadowSize: [0, 0],
    iconAnchor: [20, 40],
    shadowAnchor: [4, 62],
    popupAnchor: [0, -40],
  });
  
  const popupContent = `<img class="popupPicture"src="${place.pictures[0]}"></img>
                        <h2 class="popupTitle">${place.name}</h2>
                        <h3 class="popupCategory">${place.category.name}</h3>
                        <p class="popupDescription">${place.description}</p>
                        <button class="buttonBasic googleMapsButton buttonBasicBlue" 
                                onclick="window.open('${place.googleMapsURL}','_blank')"
                                type="button">
                          View on google maps
                        </button>`;

  const placeMarker = L.marker(place.coords, { icon: blueIcon })
    .addTo(this.#map)
    .bindPopup(L.popup({
        maxWidth: 350,
        minWidth: 150,
        autoPan: false,
        autoClose: true,
        closeOnClick: false,
        className: "placePopup",
      })
      .setContent(popupContent))
    .on("click", (e) => {
      if (app.editPlaceState) {
        app._editPlace(place);
      }
      if (app.removePlaceState) {
        app._removePlace(place);
      }
      if (!app.addPlaceState && !app.editPlaceState && !app.removePlaceState) {
        app._showPlaceOnSidebar(place);
      }
    });

  place.placeMarker = placeMarker;
}
_setLocalStorage() {
  const places = this.getPlaces;
  const stringPlaces = JSON.stringify(places); 
  window.localStorage.setItem('places', stringPlaces); 
}

_getLocalStorage() {
  const places = JSON.parse(localStorage.getItem('places'));
  if (!places) return;
  places.forEach(place => {
    const category = this.getCategories.find(element => element.code == place.category);
    const newPlace = new Place(place.name, place.coords, place.description, category, place.city);
    this.#places.push(newPlace);
  });
}

_addPlacesToCategory() {
  this.#places.forEach(place => {
    place.category._addPlace(place);
  });
}

_reset() {
  localStorage.removeItem('places');
  location.reload();
}

_fullScreenPhone = function(e) {
  const menuWrapper = document.querySelector('.menuWrapper');
  if (!app.fullScreen) {
    menuWrapper.style.position = 'absolute';
    menuWrapper.style.top = '1em';
    menuWrapper.style.height = '100%';
    menuWrapper.style.transform = 'translate(0%,0%)';
    app.fullScreen = true;
  } else {
    menuWrapper.style.position = 'relative';
    menuWrapper.style.top = '';
    menuWrapper.style.transform = 'translate(0%,40%)';
    app.fullScreen = false;
  }
};
}

const app = new App();

const panToPlace = function (place) {
  app.map.panTo(new L.LatLng(place.coords[0], place.coords[1]));
  place.placeMarker.openPopup();
};
const backButtonClicked = function (e) {
  e.preventDefault();
  const generatedPlace = document.querySelector(".generatedPlace");
  const genereatePlaceComponent = e.target;

  if (e.target.closest(".moreCategories")) {
    app._categoryModalOpen();
  }
  if (
    e.target.closest(".generateButton") ||
    e.target.closest(".generateButton")
  ) {
    app._generatePlace();
  }
  if (e.target.closest(".genereatePlaceComponent")) {
    app._generatePlaceCategory(
      e.target.closest(".genereatePlaceComponent").getAttribute("category")
    );
  }
  if (e.target.closest(".prev")) {
    app._slideshowChange(-1);
  }
  if (e.target.closest(".next")) {
    app._slideshowChange(1);
  }

  //Add place button clicked
  if (e.target.closest(".newPlaceButton")) {
   app._toggleAddPlaceState();
  }
  if (e.target.closest(".buttonNextPlace")) {
    app.currentGeneratedPlaceIndex=(app.currentGeneratedPlaceIndex +1)%(app.generatedPlaces.length);
    app._showGeneratedPlacesOnSidebar();
   }
  if (e.target.closest(".addCategoryButton ")) {
    modal.style.display = "block";
    modalCategory.style.display="flex";
    modalCategorySubmit.addEventListener('click',()=>{
      app._addCategory(
      new Category(
        modalCategoryName.value,
        modalCategoryCode.value,
        "logo.png",
        modalCategoryDescription.value
      ));
      modalCategory.style.display = "none";
      modal.style.display = "none";
    
    }

      );
  }
  if (e.target.closest(".exitEditModeButton")) {
    app._exitEditMode();
  }
  if (e.target.closest(".editPlaceButton")) {
    app._toggleEditPlaceState();
  }
  if (e.target.closest(".removePlaceButton")) {
    app._toggleRemovePlaceState();
  }


  if (e.target.classList.contains("focusedPlaceBackButton")) {
    workspaceWrapper.innerHTML = "";
    menuWrapper.style.width = "50%";
    const html = sidebarHTML;
    workspaceWrapper.insertAdjacentHTML("afterbegin", html);
  }
};

// generateFilter.addEventListener('click',toggleFilterMenu());
workspaceWrapper.addEventListener("click", backButtonClicked);

// savedPlacesWrapper.addEventListener('click',placeCardClick());
