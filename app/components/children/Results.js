// Include React
var React = require("react");
var ResultsArticles = require("./resultsChildren/ResultsArticles");

// Creating the Results component
var Results = React.createClass({
  onItemClick: function(article, e) 
  {
    console.log(this.props)
    this.props.saveArticle(article)
  },

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">
          <h1>articles:</h1>
            {this.props.results.map(function(data, i){
              let article = {"title": data.headline.print_headline, url: data.web_url, date: data.pub_date}
              let boundItemClick = this.onItemClick.bind(this, article);
                return <div>
                      <h3><a href={data.web_url}>{data.headline.print_headline}</a></h3>
                      <p>{data.pub_date}</p>
                      <button className = "btn btn-primary" 
                      onClick={boundItemClick}
                      >
                      Save</button>
                      <hr/>
                      </div>;
            }.bind(this))}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
