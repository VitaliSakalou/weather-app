const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoidml0YWxpc2FrYWxvdSIsImEiOiJjanZzbnl0eWIzN3NzNDNvamE2bTQ0dTV0In0.OGfMRvtvmnYM-GZASwrKlg&limit=1`;
  request({ url, json: true }, (error, { body: { message, features } }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (message || features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        place: features[0].place_name,
        long: features[0].center[0],
        lat: features[0].center[1]
      });
    }
  });
};

module.exports = geocode;
