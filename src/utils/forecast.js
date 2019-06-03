const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/d6be10c23176a9837d31a89b3a5b3213/${lat},${long}`;

  request(
    { url, json: true },
    (
      error,
      {
        body: {
          error: localError,
          currently: { temperature, precipProbability, pressure },
          timezone
        }
      }
    ) => {
      if (error) {
        callback("Unable to connect to darksky service!", undefined);
      } else if (localError) {
        callback("Unable to find location!", undefined);
      } else {
        callback(
          undefined,
          `It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain. Pressure - ${pressure} Timezone: ${timezone}`
        );
      }
    }
  );
};

module.exports = forecast;
