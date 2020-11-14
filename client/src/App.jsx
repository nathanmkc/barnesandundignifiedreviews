import React from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox.jsx';


class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          allReviews: []
      }
      this.getReviews = this.getReviews.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.findAvgReviewRating = this.findAvgReviewRating.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    axios.get('http://localhost:8000/reviews/4894941353195')
    .then((results) => {
      this.setState({allReviews: results.data[0].reviews});
    })
  }

  handleClick() {

  }

  findAvgReviewRating() {
    var total = this.state.allReviews.reduce((acc, review) => {return acc + review.rating},0);
    var avg = total/this.state.allReviews.length;
    if (isNaN(avg)) {
      avg=0;
    }
    return Number(avg.toFixed(1));
  }

  render() {
      return (
          <div class="main">
            <h2 class="app-header app-component">Customer Reviews</h2>
            <SearchBox avgRating={this.findAvgReviewRating()} reviewCount={this.state.allReviews.length}/>
          </div>
      )
  }
};

export default App;