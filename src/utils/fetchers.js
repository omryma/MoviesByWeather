export const getLocation = async () => {
  const locationRes = await fetch('http://ip-api.com/json/?fields=16593')
    .catch((e) => {
      console.log(e);
    });
  const location = await locationRes.json()
  if (location.status === 'fail') return false
  return location;
}

const weatherApiKey = 'hqXB1f6tFcH2FG9ngBOOhroEyG8BKrJ6'
export const autoCompleteLocation = async (query) => {
  const optionsRes = await fetch(`http://dataservice.accuweather.com//locations/v1/cities/autocomplete?apikey=${weatherApiKey}&q=${query}`)
    .catch((e) => console.log(e))
  const options = await optionsRes.json()
  return options.length > 7 ? options.slice(0, 7) : options
}

const moviesApiKey = 'dce24c91'
export const movieSearch = async (query) => {
  const optionsRes = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${moviesApiKey}&type=movie`)
    .catch((e) => console.log(e))
  const options = await optionsRes.json()
  if (options.Response === 'False') return false
  return options.Search;
}
