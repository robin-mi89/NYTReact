// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

  runQuery: function(location) {

    console.log(location);

    // Figure out the geolocation
    var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;

    return axios.get(queryURL).then(function(response) {

      console.log(response);
      return response.data.results[0].formatted;
    }).catch(function(err)
    {
      console.log(err);
    });

  },

  saveSearch: function(searchInfo)
  {
    console.log("search info is: " + JSON.stringify(searchInfo));
    return axios.post("/search", searchInfo);
    // $.post("/search", searchInfo, function(err, data)
    // {
    //   return data;
    // })
  },

  getSearches: function()
  {
    return axios.get("/search");
  }

};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
