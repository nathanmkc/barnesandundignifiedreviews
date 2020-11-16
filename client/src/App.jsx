import React from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox.jsx';
import BreakdownBox from './components/BreakdownBox.jsx';

class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          allReviews: [],
          avgRating: 0,
          search: ''
      }
      this.getReviews = this.getReviews.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.findAvgReviewRating = this.findAvgReviewRating.bind(this);
      this.countRecommendedReviews = this.countRecommendedReviews.bind(this);
      this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    axios.get('http://localhost:8000/reviews/4894941353195')
    .then((results) => {
      this.setState({allReviews: results.data[0].reviews}, () => {
        this.findAvgReviewRating();
      });
    })
  }

  handleClick() {

  }

  handleSearchChange(e) {
    e.preventDefault();
    this.setState({search: e.target.value})
    console.log(this.state);
  }

  findAvgReviewRating() {
    var total = this.state.allReviews.reduce((acc, review) => {return acc + review.rating},0);
    console.log(this.state);
    var avg = total/this.state.allReviews.length;
    if (isNaN(avg)) {
      avg=0;
    }
    console.log(avg);
    this.setState({avgRating: Number(avg.toFixed(1))});
  }

  countRecommendedReviews() {
    var total = this.state.allReviews.reduce((acc, review) => {
      if (review.recommended) {
        return acc + 1;
      } else {
        return acc;
      }
    },0);
    return total;
  }

  render() {
      return (
          <div class="main">
            <h2 class="app-header app-component">Customer Reviews</h2>
            <SearchBox avgRating={this.state.avgRating} reviewCount={this.state.allReviews.length} recommendedReviewCount={this.countRecommendedReviews()} handleSearchChange={this.handleSearchChange}/>
            <BreakdownBox avgRating={this.state.avgRating}/>
          </div>
      )
  }
};

export default App;