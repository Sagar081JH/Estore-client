export const fetchCountries = (setCountryList) => {
  fetch("/Util/CountryList.json")
    .then((response) => response.json())
    .then((data) => {
      setCountryList(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchIndianState = (setIndianStateList) => {
  fetch("/Util/IndianStateList.json")
    .then((response) => response.json())
    .then((data) => {
      setIndianStateList(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
