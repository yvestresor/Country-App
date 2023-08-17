//globall variables
const BASE_API = "https://restcountries.com/v3.1/all";
const countryDetailsContent = document.querySelector('.country-details-content');
let allCountries = [];

//api call function
const endPoints = async () =>{
    try{
        const data = await fetch(`${BASE_API}`);
        const response = await data.json();
        allCountries = response;
    }catch (error){
        console.log(error);
        return error;
    }
}

//search by country
const searchBtn = document.getElementById('searchBtn');
const selectedCountryName = document.querySelector('.input');

selectedCountryName.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        searchCountry();
    }
})

//creating the div to show details about a country
const showCountry = async (parsedCountryData) =>{
    var currencies = '';
    const currenciesObject = parsedCountryData?.currencies || {};
    for (const currency in currenciesObject) {
        if (currenciesObject.hasOwnProperty(currency)) {
            currencies = currencies + parsedCountryData.currencies[currency]?.name + '(' + parsedCountryData.currencies[currency]?.symbol + '), ';
        }
      }
    currencies = currencies.substring(0, currencies.length - 2);
    var languages = '';
    const languagesObject = parsedCountryData?.languages || {};
    for (const language in languagesObject) {
        if (languagesObject.hasOwnProperty(language)) {
            languages = languages + parsedCountryData.languages[language] + ', ';
        }
      }
    languages = languages.substring(0, languages.length - 2);
    countryDetailsContent.innerHTML = `
        <div class="countryflag">
            <img src="${parsedCountryData.flags.png}" alt="">
        </div>
        <div class="countryinfo">
            <div>
                <h3>${parsedCountryData.name.common}</h3>
                <p><strong>Population: </strong>${parsedCountryData.population}</p>
                <p><strong>Region: </strong>${parsedCountryData.region}</p>
                <p><strong>Sub Region: </strong>${parsedCountryData.subregion}</p>
                <p><strong>Capital: </strong>${parsedCountryData.capital}</p>
                <p><strong>Area: </strong>${parsedCountryData.area} km2</p>
                <!-- Add more details as needed -->
            </div>
            <div>
                <p><strong>Currencies: </strong>${currencies}</p>
                <p><strong>Languages: </strong>${languages}</p>
                <p><strong>View On Map: </strong><a href='${parsedCountryData.maps.googleMaps}' target='_blank'>${parsedCountryData.maps.googleMaps}</a></p>
                <p><strong>Timezones: </strong>${parsedCountryData.timezones}</p>
                <p><strong>Border Countries: </strong>${parsedCountryData.borders}</p>
            </div>
        </div>`;
}


function searchCountry() {
    if (selectedCountryName.value.trim() !== '') {
        const selectedCountry = allCountries.find(countrySearch => countrySearch.name.common.toLowerCase().includes(selectedCountryName.value.trim().toLowerCase()));
        // const selectedCountry = allCountries.find(countrySearch => countrySearch.name.common.toLowerCase() === selectedCountryName.value.trim().toLowerCase());
        if (selectedCountry) {
            countryDetailsContent.innerHTML = '';
            showCountry(selectedCountry);
        } else {
            countryDetailsContent.innerHTML = '<p>No matching country found!</p>';
        }
    }
}


endPoints();
 