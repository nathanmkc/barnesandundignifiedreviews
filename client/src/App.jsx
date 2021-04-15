import React from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

import SearchBox from './components/SearchBox.jsx';
import BreakdownBox from './components/BreakdownBox.jsx';
import Review from './components/Review.jsx';
import SortBar from './components/SortBar.jsx';
import NavBar from './components/NavBar.jsx';
import Filters from './components/Filters.jsx';

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
      starsSelected: [],
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
    this.grabRatingReviews = this.grabRatingReviews.bind(this);
    this.filterClickHandler = this.filterClickHandler.bind(this);
    this.clearAllClickHandler = this.clearAllClickHandler.bind(this);
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

    return axios.get(`http://localhost:8000/books/4132539681597/reviews`) //change to http://3.140.58.207:8000/books/${paramIsbn}/reviews for production
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
    //if this rating is already being sorted for
    if (this.state.starsSelected.includes(rating)) {
      return;
    } else {
      //if there are no ratings being sorted for
      if (this.state.starsSelected.length === 0) {
        var thisRatingReviews = this.grabRatingReviews(rating);
        var displayedReviews = thisRatingReviews.slice(0,8);
        this.setState({selectedReviews: thisRatingReviews, displayedReviews: displayedReviews, startIndex: 0, endIndex: displayedReviews.length, starsSelected: [rating]});
        //set selected reviews to be only reviews with this rating
      //if there are already other ratings being sorted for
      } else {
        var thisRatingReviews = this.grabRatingReviews(rating);
        var selectedReviews = this.state.selectedReviews;
        thisRatingReviews.forEach(review => {selectedReviews.push(review)});
        var displayedReviews = selectedReviews.slice(0,8);
        var starsSelected = this.state.starsSelected;
        starsSelected.push(rating);
        starsSelected.sort();
        this.setState({selectedReviews: selectedReviews, displayedReviews: displayedReviews, startIndex: 0, endIndex: displayedReviews.length, starsSelected: starsSelected});
        //add reviews with this rating to selected reviews
      }
    }
  }

  filterClickHandler(filter) {
    if (this.state.starsSelected.length === 1) {
      this.clearAllClickHandler();
    } else {
      var newReviews = [];
      var selectedReviews = this.state.selectedReviews;
      selectedReviews.forEach(review => {
        if (review.rating !== filter) {
          newReviews.push(review);
        }
      })
      var newSelectedStars = [];
      var selectedStars = this.state.starsSelected;
      selectedStars.forEach(star => {
        if (star !== filter) {
          newSelectedStars.push(star);
        }
      })
      var displayedReviews = newReviews.slice(0,8);
      this.setState({selectedReviews: newReviews, displayedReviews: displayedReviews, startIndex: 0, endIndex: displayedReviews.length, starsSelected: newSelectedStars});
    }
  }

  clearAllClickHandler() {
    var selectedReviews = this.state.allReviews;
    var displayedReviews = selectedReviews.slice(0,8);
    this.setState({selectedReviews: selectedReviews, displayedReviews: displayedReviews, startIndex: 0, endIndex: displayedReviews.length, starsSelected: []});
  }

  grabRatingReviews(rating) {
    var result = [];
    this.state.allReviews.forEach(review => {
      if (review.rating === rating) {
        result.push(review)
      }
    })
    return result;
  }

  handleSortMenuChange(e) {
    e.preventDefault();
    switch (e.target.innerHTML.toString()) {
      case 'Featured':
      case '<span class="text">Featured</span>':
        this.sortByFeatured();
        break;
      case 'Most Recent':
      case '<span class="text">Most Recent</span>':
        this.sortByRecent();
        break;
      case 'Most Helpful':
      case '<span class="text">Most Helpful</span>':
        this.sortByHelpful();
        break;
      case 'Highest to Lowest Rating':
      case '<span class="text">Highest to Lowest Rating</span>':
        this.sortByHighestRating();
        break;
      case 'Lowest to Highest Rating':
      case '<span class="text">Lowest to Highest Rating</span>':
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
    return axios.put(`http://localhost:8000/books/4132539681597/review/1234`, {type: type}) //change to http://3.140.58.207:8000/books/${paramIsbn}/review/${id} for production
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
        if (index !== null) {
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
            {this.state.starsSelected.length > 0 &&
              <Filters filters={this.state.starsSelected} filterClickHandler={this.filterClickHandler} clearAllClickHandler={this.clearAllClickHandler}/>
            }
            {this.state.displayedReviews.length > 0 &&
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