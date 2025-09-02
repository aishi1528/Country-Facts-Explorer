const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const countryInfo = document.getElementById("countryInfo");

async function fetchCountry(country){
    countryInfo.style.display = "block";
    countryInfo.innerHTML = "<p style='padding:20px;'>⏳ Loading country info...</p>";

    try{
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
        if(!res.ok) throw new Error("Country not found");

        const data = await res.json();
        const c = data[0];

        countryInfo.innerHTML = `
      <div class="card-header" style="background-image:url('${c.flags.svg}')">
        <img src="${c.coatOfArms.svg || c.flags.png}" alt="${c.name.common}">
      </div>
      <div class="card-body">
        <h2>${c.name.common} (${c.cca2})</h2>
        <div class="info">
          <p>🏛️ <strong>Capital:</strong> ${c.capital ? c.capital[0] : "N/A"}</p>
          <p>🌍 <strong>Region:</strong> ${c.region}</p>
          <p>👥 <strong>Population:</strong> ${c.population.toLocaleString()}</p>
          <p>🗣️ <strong>Languages:</strong> ${c.languages ? Object.values(c.languages).join(", ") : "N/A"}</p>
          <p>💰 <strong>Currency:</strong> ${c.currencies ? Object.values(c.currencies)[0].name : "N/A"}</p>
        </div>
        <a class="map-link" href="${c.maps.googleMaps}" target="_blank">🗺️ View on Google Maps</a>
      </div>
    `;
 } catch (error){
    countryInfo.innerHTML = "<p style='padding:20px;'>❌ Country not found. Try again.</p>";
 }
}
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchCountry(query);
  } else {
    countryInfo.innerHTML = "<p style='padding:20px;'>⚠️ Please enter a country name.</p>";
    countryInfo.style.display = "block";
  }
});

