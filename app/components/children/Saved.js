// Include React
var React = require("react");

// Creating the Results component
var Saved = React.createClass({

    onItemClick: function(article, e) 
  {
    this.props.deleteArticle(article._id)
  },

  // Here we describe this component's render method
  render: function() {
      console.log(this.props);
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        <div className="panel-body text-center">
          {this.props.saved.map(function(article, i){
              let boundItemClick = this.onItemClick.bind(this, article);
                return <div key = {article.id}>
                      <h3><a href={article.url}>{article.title}</a></h3>
                      <p>{article.date}</p>
                      <button className = "btn btn-primary" 
                      onClick={boundItemClick}
                      >
                      Delete</button>
                      <hr/>
                      </div>;
            }.bind(this))}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
