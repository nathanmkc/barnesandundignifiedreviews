import React from 'react';
import axios from 'axios';

import SearchBox from './components/SearchBox.jsx';
import BreakdownBox from './components/BreakdownBox.jsx';
import Review from './components/Review.jsx';
import SortBar from './components/SortBar.jsx';

class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          allReviews: [],
          selectedReviews: [],
          displayedReviews: [],
          startIndex: 0,
          endIndex: 0,
          avgRating: 0,
          search: ''
      }
      this.getReviews = this.getReviews.bind(this);
      this.findAvgReviewRating = this.findAvgReviewRating.bind(this);
      this.countRecommendedReviews = this.countRecommendedReviews.bind(this);
      this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    axios.get('http://localhost:8000/books/5628928328257/reviews')
    .then((results) => {
      this.setState({allReviews: results.data, selectedReviews: results.data, displayedReviews: results.data.slice(0,8), endIndex: results.data.slice(0,8).length}, () => {
        console.log(this.state);
        this.findAvgReviewRating();
      });
    })
    .catch((err) => {
      console.log('error in get request to reviews:' + err);
    })
  }

  handleSearchChange(e) {
    e.preventDefault();
    this.setState({search: e.target.value})
  }

  findAvgReviewRating() {
    var total = this.state.allReviews.reduce((acc, review) => {return acc + review.rating},0);
    var avg;
    if (this.state.allReviews.length === 0) {
      avg=0;
    } else {
      var avg = total/this.state.allReviews.length;
    }
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
            <SortBar start={this.state.startIndex + 1} end={this.state.endIndex} total={this.state.selectedReviews.length}/>
            {this.state.displayedReviews.length !== 0 &&
              this.state.displayedReviews.map((review) => {
                return <Review review={review} />
              })
            }
          </div>
      )
  }
};

export default App;