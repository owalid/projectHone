import React, { Component } from 'react';
import * as d3 from 'd3';
// import '../style/css/.css';

class BarChart extends Component {

  constructor(props) {
     super(props);
     this.state = {
       tag: this.props,
     };
     //get the hash do this.state.tag
   }

   componentDidMount() {
        this.initBarChart(this.state.tag)
    }

    componentDidUpdate(){
        this.initBarChart(this.state.tag)
    }

    initBarChart(tag){

        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        // set the ranges
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        var y = d3.scaleLinear()
            .range([height, 0]);
          // append the svg object to the body of the page
          // append a 'group' element to 'svg'
          // moves the 'group' element to the top left margin
          var svg = d3.select(this.refs.bar).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // get the data
        d3.json("http://localhost:5001/statistics/region/all/"+tag, function(error, regs) {
            if (error) throw error;

            d3.json('http://localhost:5001/statistics/region/Dark-Zone/'+tag,function(err,dz){
              var data=[{name: dz.statistics['0'].Region, tweet: dz.statistics['0'].NumbersOfTweets}]
              for(var reg in regs.statistics){
                console.log(typeof reg)
                data.push({name: regs.statistics[reg].Region, tweet: regs.statistics[reg].NumbersOfTweets})
              }
              // Scale the range of the data in the domains
              x.domain(data.map(function (d) {
                  return d.name
              }));
              y.domain([0, d3.max(data, function (d) {
                  return d.tweet
              })]);

              // append the rectangles for the bar chart
              svg.selectAll(".bar")
                  .data(data)
                  .enter().append("rect")
                  .attr("class", "bar")
                  .attr("x", function (d) {
                      return x(d.name)
                  })
                  .attr("width", x.bandwidth())
                  .attr("y", function (d) {
                      return y(d.tweet)
                  })
                  .attr("height", function (d) {
                      return height - y(d.tweet)
                  });

              // add the x Axis
              svg.append("g")
                  .attr("transform", "translate(0," + height + ")")
                  .call(d3.axisBottom(x));

              // add the y Axis
              svg.append("g")
                  .call(d3.axisLeft(y))
            })
        });
    }
    render() {
        return (
            <div className="ml-auto bar" ref="bar"></div>

        );
    }
}

export default BarChart;
