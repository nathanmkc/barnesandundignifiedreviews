import React from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

import SearchBox from './components/SearchBox.jsx';
import BreakdownBox from './components/BreakdownBox.jsx';
import Review from './components/Review.jsx';
import SortBar from './components/SortBar.jsx';
import NavBar from './components/NavBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      selectedReviews: [],
      displayedReviews: [],
      startIndex: 0,
      endIndex: 0,
      ratingSummary: {},
      search: '',
    };
    this.getReviews = this.getReviews.bind(this);
    this.createRatingSummary = this.createRatingSummary.bind(this);
    this.countRecommendedReviews = this.countRecommendedReviews.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSortMenuChange = this.handleSortMenuChange.bind(this);
    this.sortByFeatured = this.sortByFeatured.bind(this);
    this.sortByHelpful = this.sortByHelpful.bind(this);
    this.sortByHelpful = this.sortByHelpful.bind(this);
    this.sortByHighestRating = this.sortByHighestRating.bind(this);
    this.sortByLowestRating = this.sortByLowestRating.bind(this);
    this.voteClickHandler = this.voteClickHandler.bind(this);
    this.leftArrowClickHandler = this.leftArrowClickHandler.bind(this);
    this.rightArrowClickHandler = this.rightArrowClickHandler.bind(this);
    this.countStars = this.countStars.bind(this);
    this.ratingClickHandler = this.ratingClickHandler.bind(this);
  }

  componentDidMount() {
    return this.getReviews();
  }

  handleSearchChange(e) {
    e.preventDefault();
    this.setState({search: e.target.value});
  }

  getReviews() {
    var queryUrl = window.location.search;
    var urlParams = new URLSearchParams(queryUrl);
    var paramIsbn = urlParams.get('isbn');

    return axios.get(`http://localhost:8000/books/${paramIsbn}/reviews`)
      .then((results) => {
      this.setState({allReviews: results.data, selectedReviews: results.data, displayedReviews: results.data.slice(0,8), endIndex: results.data.slice(0,8).length}, () => {
          this.createRatingSummary();
        });
      })
      .catch((err) => {
        console.log('error in get request to reviews:' + err);
      });
  }


  createRatingSummary() {
    const total = this.state.allReviews.reduce((acc, review) => {return acc + review.rating},0);
    var avg;
    if (this.state.allReviews.length === 0) {
      avg=0;
    } else {
      avg = total/this.state.allReviews.length;
    }
    var ratingSummary = {
      avgRating: Number(avg.toFixed(1)),
      total: this.state.allReviews.length,
      fiveStarTotal: this.countStars(5),
      fourStarTotal: this.countStars(4),
      threeStarTotal: this.countStars(3),
      twoStarTotal: this.countStars(2),
      oneStarTotal: this.countStars(1)
    }
    this.setState({ratingSummary: ratingSummary});
  }

  countStars(number) {
    var counter = 0;
    if (this.state.allReviews.length > 0) {
      this.state.allReviews.forEach(review => {
        if (review.rating === number) {
          counter++;
        }
      })
    }
    return counter;
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

  ratingClickHandler(rating) {
    console.log(rating);
  }

  handleSortMenuChange(e) {
    e.preventDefault();
    switch (e.target.innerHTML) {
      case 'Featured':
        this.sortByFeatured();
        break;
      case 'Most Recent':
        this.sortByRecent();
        break;
      case 'Most Helpful':
        this.sortByHelpful();
        break;
      case 'Highest to Lowest Rating':
        this.sortByHighestRating();
        break;
      case 'Lowest to Highest Rating':
        this.sortByLowestRating();
    }
  }

  sortByFeatured() {
    var selectedReviews = this.state.selectedReviews.slice();
    selectedReviews.sort((a, b) => b.authorReviews - a.authorReviews);
    var displayedReviews = selectedReviews.slice(0,8);
    this.setState({selectedReviews: selectedReviews, displayedReviews: displayedReviews, startIndex: 0, endIndex: displayedReviews.length});
  }

  sortByRecent() {
    var selectedReviews = this.state.selectedReviews.slice();
    selectedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    var displayedReviews = selectedReviews.slice(0,8);
    this.setState({selectedReviews: selectedReviews, displayedReviews: displayedReviews, startIndex: 0, endIndex: displayedReviews.length});
  }

  sortByHelpful() {
    var selectedReviews = this.state.selectedReviews.slice();
    selectedReviews.sort((a, b) => (b.helpfulYes - b.helpfulNo) - (a.helpfulYes - a.helpfulNo));
    var displayedReviews = selectedReviews.slice(0,8);
    this.setState({selectedReviews: selectedReviews, displayedReviews: displayedReviews, startIndex: 0, endIndex: displayedReviews.length});
  }

  sortByHighestRating() {
    var selectedReviews = this.state.selectedReviews.slice();
    selectedReviews.sort((a, b) => b.rating - a.rating);
    var displayedReviews = selectedReviews.slice(0,8);
    this.setState({selectedReviews: selectedReviews, displayedReviews: displayedReviews, startIndex: 0, endIndex: displayedReviews.length});
  }

  sortByLowestRating() {
    var selectedReviews = this.state.selectedReviews.slice();
    selectedReviews.sort((a, b) => a.rating - b.rating);
    var displayedReviews = selectedReviews.slice(0,8);
    this.setState({selectedReviews: selectedReviews, displayedReviews: displayedReviews, startIndex: 0, endIndex: displayedReviews.length});
  }

  voteClickHandler(type, id) {
    if (this.state[id]) {
      return;
    }
    var queryUrl = window.location.search;
    var urlParams = new URLSearchParams(queryUrl);
    var paramIsbn = urlParams.get('isbn');
    return axios.put(`http://localhost:8000/books/${paramIsbn}/review/${id}`, {type: type})
    .then(() => {
      this.setState({[id]: 'disabled'},()=> {
        var index = null;
        for (var i = 0 ; i < this.state.displayedReviews.length ; i++) {
          if (this.state.displayedReviews[i]._id === id) {
            index = i;
            break;
          }
        }
        var tempReviews = this.state.displayedReviews.slice();
        if (index) {
          type === 'yes' ? tempReviews[index].helpfulYes++ : tempReviews[index].helpfulNo++;
          this.setState({displayedReviews: tempReviews});
        }
      });
    })
    .catch((err) => {
      console.log('error in put' + err);
    })
  }

  leftArrowClickHandler() {
    if (this.state.startIndex === 0) {
      return new Promise((resolve, reject) => {
        resolve('success');
        reject('error');
      });
    }
    if (this.state.startIndex < 8) {
      return this.setState({startIndex: 0, endIndex: this.state.selectedReviews.slice(0,8).length}, () => {
        this.setState({displayedReviews: this.state.selectedReviews.slice(this.state.startIndex, this.state.endIndex)}, () => {
          return new Promise((resolve, reject) => {
            resolve('success');
            reject('error');
          });
        });
      });
    } else {
      this.setState({startIndex: this.state.startIndex - 8, endIndex: this.state.endIndex - 8}, () => {
        this.setState({displayedReviews: this.state.selectedReviews.slice(this.state.startIndex, this.state.endIndex)}, () => {
          return new Promise((resolve, reject) => {
            resolve('success');
            reject('error');
          });
        });
      })
    }
  }

  rightArrowClickHandler() {
    if (this.state.endIndex === this.state.selectedReviews.length) {
      return
    }
    if (this.state.endIndex > this.state.selectedReviews.length -8) {
      this.setState({startIndex: this.state.selectedReviews.length-9, endIndex: this.state.selectedReviews.length}, () => {
        this.setState({displayedReviews: this.state.selectedReviews.slice(this.state.startIndex, this.state.endIndex)});
      });
    } else {
      this.setState({startIndex: this.state.startIndex + 8, endIndex: this.state.endIndex + 8}, () => {
        this.setState({displayedReviews: this.state.selectedReviews.slice(this.state.startIndex, this.state.endIndex)});
      })
    }
  }

  render() {
      return (
          <div className="main">
            <h2 className="app-header app-component">Customer Reviews</h2>
            <SearchBox avgRating={this.state.ratingSummary.avgRating} reviewCount={this.state.allReviews.length} recommendedReviewCount={this.countRecommendedReviews()} handleSearchChange={this.handleSearchChange}/>
            <BreakdownBox ratingSummary={this.state.ratingSummary} ratingClickHandler={this.ratingClickHandler}/>
            <SortBar start={this.state.startIndex} end={this.state.endIndex} total={this.state.selectedReviews.length} handleSortMenuChange={this.handleSortMenuChange}/>
            {this.state.displayedReviews.length !== 0 &&
              this.state.displayedReviews.map((review) => {
                return <Review review={review} voteClickHandler={this.voteClickHandler} key={review._id} disabled={this.state[review._id]}/>
              })
            }
            <NavBar start={this.state.startIndex} end={this.state.endIndex} total={this.state.selectedReviews.length} leftArrowClickHandler={this.leftArrowClickHandler} rightArrowClickHandler={this.rightArrowClickHandler}/>
          </div>
      )
  }
};

export default App;