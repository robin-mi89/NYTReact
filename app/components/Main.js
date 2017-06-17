// Include React
var React = require("react");

// Here we include all of the sub-components


var Form = require("./children/Form");
var Results = require("./children/Results");

// Helper Function
var helpers = require("./utils/helpers.js");
var Article = require("./Article.js");
// This is the main component.
var Main = React.createClass({

  //3 states to save in main component: the search term for articles, the list of results, and the list of saved articles. 

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return { searchTerm: "", results: [], saved: [] };
  },

  //componentDidMount will run when the components load. This code will be run to get saved articles. 
  componentDidMount: function() 
  {
    //first time the component rendered
    helpers.getSearches().then(function(response)
    {
      if(response !== this.state.history)
      {
        this.setState({history: response.data});
      }
    }.bind(this));
  },

  // If the component updates we'll run this code
  // componentDidUpdate: function(prevProps, prevState) {

  //   if (prevState.searchTerm !== this.state.searchTerm) {
  //     console.log("UPDATED");

  //     helpers.runQuery(this.state.searchTerm).then(function(data) {
  //       if (data !== this.state.results) {
  //         console.log("HERE");
  //         console.log(data);

  //         this.setState({ results: data });
  //       }
  //       // This code is necessary to bind the keyword "this" when we say this.setState
  //       // to actually mean the component itself and not the runQuery function.
  //     }.bind(this));

  //       //hoping to attach to the event that runs query for search. 
  //     helpers.saveSearch({"search": this.state.searchTerm, "date": Date.now()}).then(function(data)
  //     {
  //       console.log("Search Saved");
  //       console.log(JSON.stringify(data, null, 2));

  //       helpers.getHistory().then(function(data)
  //       {
  //         this.setState({history: data.data});
  //       }.bind(this));
  //     }.bind(this));

      
  //   }
  // },
  // We use this function to allow children to update the parent with searchTerms.
  // setTerm: function(term) {
  //   this.setState({ searchTerm: term });
  // },

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h2 className="text-center">NYT Search!</h2>
            <p className="text-center">
              <em>Search for a topic on the New York Times</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            

          </div>

          <div className = "row">
            
          </div>

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
