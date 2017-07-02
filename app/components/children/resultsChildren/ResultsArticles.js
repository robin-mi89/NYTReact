// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({

  // Here we describe this component's render method
  render: function() {
      console.log(this.props)
    return (
       <div>
        <h3><a href={this.props.article.url}>{this.props.article.title}</a></h3>
        <p>{this.props.article.date}</p>
        <button className = "btn btn-primary" 
        onClick={this.props.saveArticle(this.props.article)}
        >
        Save</button>
        <hr/>
        </div>
            )}
});

// Export the component back for use in other files
module.exports = Results;
