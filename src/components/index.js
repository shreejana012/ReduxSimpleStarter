import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from '../containers/search_bar';
import VideoDetail from '../containers/video_detail';
import VideoList from '../containers/video_list';
import {store} from '../stores/store';
import {Provider} from 'react-redux';

const API_KEY =  'AIzaSyDOkIHRmlpR0p2BCEvwePv8xlDP3YMo_UI';

// Creata a new component.This component produce some HTML
// Take this component's generated HTML and put it
// On the page (in the DOM)
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    }
    this.videoSearch('nepali');    
  }

  videoSearch(term){
    YTSearch({key: API_KEY,term: term},(data) => {
      this.setState({
        videos: data,
        selectedVideo: data[0]
      });
    });
  }
  
  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300)
    return(
      <div>
        <SearchBar onSelectTermChange= {videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
        onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
        videos={this.state.videos} />
      </div>
    );
  }
}
ReactDOM.render(
<Provider store = {store}>
  <App />
</Provider>, document.querySelector('.container'));
// ReactDOM.render(<App />, document.querySelector('.container'));