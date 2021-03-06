import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';



class CarouselTweet extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.state = {
            activeIndex: 0,
            tweets : [
                {
                    Content: '',
                    Author: '',
                    Date:'',
                    Retweets: ''
                },
            ]

        }
        window.fetch('http://localhost:5001/tweets/getTweetWithTime/Pyeongchang2018')
            .then(res => {
                return res.json()
            })
        .then(res => {

                this.setState( { tweets: res.tweets });
            })
        .catch(error => console.error('Error:', error))

    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const items= this.state.tweets
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        const items= this.state.tweets
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
      const { activeIndex, tweets } = this.state;

      const slides = tweets.map((item,index) => {
          console.log(index);
          return (
                          <CarouselItem
                              onExiting={this.onExiting}
                              onExited={this.onExited}
                              key={index}>
                              <CarouselCaption key={'captioncarousel'+item} className="text-cloud" captionText={ item.Date + " - " + item.Author + " - " + item.Retweets + " retweets "} captionHeader={item.Content} ></CarouselCaption>
                          </CarouselItem>
          );
      });
              console.log(this.state.activeIndex);
      return (
              <Carousel
                  activeIndex={this.state.activeIndex}
                  next={this.next}
                  previous={this.previous}
              >
                  <CarouselIndicators items={
                    tweets.map((tweet, index) => {
                        tweet.key = 'indicator' + index
                        return tweet
                    })
                    } activeIndex={activeIndex} onClickHandler={this.goToIndex} key="test" />
                  {slides}
                  <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous}  key="carouselprev"/>
                  <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} key="carouselnext"  />
              </Carousel>
      );
  }
}


export default CarouselTweet;
