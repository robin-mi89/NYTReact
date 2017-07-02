// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { term: "" , begin: "2015-01-01", end: "2017-01-01"};
  },

  // This function will respond to the user input
  changeSearchTerm: function(event) {

    this.setState({ term: event.target.value });

  },
  //event handler for changes in begin date. 
  changeBeginDate: function(event) {
    this.setState({ begin: event.target.value });
  },

  //event handler for changes in end date.
  changeEndDate: function(event) {
    this.setState({end: event.target.value })
  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    //Using the setTerm function passed by parent via props. 
    this.props.setTerm({"term": this.state.term, "begin": this.state.begin, "end": this.state.end});
    
    this.setState({ term: "" });

    
  },
  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Query</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Article Search</strong>
              </h4>

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <input
                value={this.state.term}
                type="text"
                className="form-control text-center"
                id="term"
                onChange={this.changeSearchTerm}
                required
              />
              <input
                value={this.state.begin}
                type="date"
                className="form-control"
                id="startdate"
                onChange={this.changeBeginDate}
                required
              />
              <input
                value={this.state.end}
                type="date"
                className="form-control"
                id="enddate"
                onChange={this.changeEndDate}
                required
              />
              <br />
              <button
                className="btn btn-primary"
                type="submit"
                
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Form;
