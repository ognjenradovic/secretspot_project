class Category {
  #name;
  #code;
  #icon;
  #places;
  #defaultDescription;

  constructor(name, code, icon, defaultDescription) {
    this.#name = name;
    this.#code = code;
    this.#icon = icon;
    this.#defaultDescription = defaultDescription;
    this.#places = [];
  }
  get name() {
    return this.#name;
  }
  set name(name) {
    this.#name = name;
  }
  get code() {
    return this.#code;
  }
  get icon() {
    return this.#icon;
  }
  get places() {
    return this.#places;
  }
  _addPlace(place) {
    this.#places.push(place);
  }
  set places(places) {
    this.#places = places;
  }
  get defaultDescription() {
    return this.#defaultDescription;
  }
  _pushPlace(place) {
    this.#places.push(place);
  }
  toJSON() {
    return {
      name: this.#name,
      code: this.#code,
      icon: this.#icon,
      defaultDescription: this.#defaultDescription,
    }
  }
}

class City {
  #name;
  #coords;
  #description;
  #places = [];
  constructor(name, coords, description) {
    this.#name = name;
    this.#coords = coords;
    this.#description = description;
  }
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }
  get coords() {
    return this.#coords;
  }
  _addPlace(place) {
    this.#places.push(place);
  }
}

class Place {
  #name;
  #coords;
  #Address;
  #description;
  #placeMarker;
  #googleMapsURL;
  #pictures = [];
  #category;
  #city;
  constructor(name, coords, description, category, city) {
    this.#name = name;
    this.#coords = coords;
    this.#description = description;
    this.#googleMapsURL = `http://maps.google.com/maps?q=loc:${coords[0]},${coords[1]}`;
    this.#pictures = [];
    this.#category = category;
    this.#city = city;
  }
  toJSON() {
    const categoryName=this.#category.code;
    const cityName=this.#city.name;
    return {
      name: this.#name,
      coords: this.#coords,
      description:this.#description,
      googleMapsURL:this.#googleMapsURL,
      pictures:this.#pictures,
      category:categoryName,
      city:cityName
    }
  }
  set placeMarker(marker) {
    this.#placeMarker = marker;
  }
  get name() {
    return this.#name;
  }
  set name(name) {
    this.#name = name;
  }
  get googleMapsURL() {
    return this.#googleMapsURL;
  }
  set googleMapsURL(googleMapsURL) {
    this.#googleMapsURL = googleMapsURL;
  }
  get pictures() {
    return this.#pictures;
  }
  _addPicture(picture) {
    this.#pictures.push(picture);
  }
  get placeMarker() {
    return this.#placeMarker;
  }
  get city() {
    return this.#city;
  }
  set city(city) {
    this.#city = city;
  }
  get category() {
    return this.#category;
  }
  set category(category) {
    this.#category = category;
  }
  set pictures(pictures) {
    this.#pictures = pictures;
  }
  get description() {
    return this.#description;
  }
  set description(description) {
    this.#description = description;
  }
  get coords() {
    return this.#coords;
  }
}
class PlaceByRiver extends Place {
  #river;
  #swimmableWater;
  constructor(name, coords, description, river, swimmableWater) {
    super(name, coords, description);
    this.#river = river;
    this.#swimmableWater = swimmableWater;
  }
}
class Campsite extends Place {
  #carAccess;
  #shower;
  #activities = [];
  constructor(name, coords, description, carAccess, shower, activites) {
    super(name, coords, description);
  }
}
