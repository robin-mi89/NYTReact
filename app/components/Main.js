// Include React
var React = require("react");

// Here we include all of the sub-components


var Form = require("./children/Form");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

// Helper Function
var helpers = require("./utils/helpers.js");
var Article = require("./Article.js");
// This is the main component.
var Main = React.createClass({

  //3 states to save in main component: the search term for articles, the list of results, and the list of saved articles. 

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return { searchTerm: "", begin_date: 0, end_date: 0, results: [], saved: [] };
  },

  //function to get saved articles
  getSavedArticles: function()
  {
    
  },

  //componentDidMount will run when the components load. This code will be run to get saved articles. 
  componentDidMount: function() 
  {
    //first time the component rendered
    //We get the saved articles, then set results array with the response data which should be a list of all articles. 
    helpers.getArticles().then(function(response)
    {

      if(response !== this.state.saved && response !== undefined)
      {
        console.log(response);
        this.setState({saved: response.data});
      }
    }.bind(this));
  },

  

  //If the component updates we'll run this code
  componentDidUpdate: function(prevProps, prevState) {

    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("UPDATED");
      console.log(this.state.searchTerm + " " + this.state.begin_date + " " + this.state.end_date);

      helpers.runQuery({q: this.state.searchTerm, begin_date: this.state.begin_date, end_date: this.state.end_date}).then(function(data) {
        if (data !== this.state.results) {
          console.log("Running search");
          console.log(data);

          this.setState({ results: data.data });
          console.log(JSON.stringify(this.state.results, null, 2));
        }
        else
        {
          console.log("data same as current result");
          console.log(data);
        }
        // This code is necessary to bind the keyword "this" when we say this.setState
        // to actually mean the component itself and not the runQuery function.
      }.bind(this));

        //hoping to attach to the event that runs query for search.
        //this will save an article.  
      // helpers.saveArticle(article).then(function(data)
      // {
      //   console.log("Search Saved");
      //   console.log(JSON.stringify(data, null, 2));

      //   helpers.getArticles().then(function(data)
      //   {
      //     this.setState({results: data.data});
      //   }.bind(this));
      // }.bind(this));

      
    }
  },

  //We use this function to allow children to update the parent with searchTerms.
  setTerm: function(search) {
    this.setState({ searchTerm: search.term, begin_date: search.begin, end_date: search.end });
  },

  saveArticle: function(article)
  {
    helpers.saveArticle(article).then(function(data)
    {
      console.log(data);
      this.setState({saved: this.state.saved.concat([article])})
    }.bind(this))
  },

  deleteArticle: function(articleID)
  {
    helpers.deleteArticle(articleID).then(function(data)
    {
      let index = this.state.saved.indexOf(data);

      var newSaved = this.state.saved.slice(); //copy array
      newSaved.splice(index, 1); //remove element
      this.setState({saved: newSaved}); //set state of saved as new array. 
      
    }.bind(this));
  },

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

          <div className="row">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="row">
            <Saved saved={this.state.saved} deleteArticle = {this.deleteArticle}/>
          </div>

          <div className="row">

            <Results results={this.state.results} saveArticle = {this.saveArticle}/>

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
