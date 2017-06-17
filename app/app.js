// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the Main Component
var Main = require("./components/Main");

// This code here allows us to render our main component (in this case "Main")
ReactDOM.render(<Main />, document.getElementById("app"));


//design guide: 
//Search component, will hold both forms and results component
//Form.js, takes care of the form for new york times search. needs the function for what to do when submit is hit. 
//results component. will display all articles from search, likely have a prop that is the list of article objects. renders each object. 

//saved component: holds all saved articles. likely similar in code as results, a prop that holds a list of saved article objects. 

//possible react router: switch view between search component and saved component. 
