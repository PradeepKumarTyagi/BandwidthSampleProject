import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import './Bandwidth.css';
/**
 * Component to show Bandwidth chart
 * 
 */
class Bandwidth extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      chartdata: {
        labels: [],
        datasets: [
          {
            label: ['Bandwidth Usage'],
            backgroundColor: '#A3E4D7',
            borderColor: '#17A589',
            borderWidth: 2,
            hoverBackgroundColor: '#17A589',
            hoverBorderColor: '#17A589',
            data: []
          }
        ]
      },
      dayValue: 'today'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    //show loading text during api call
    if (this.state.isLoading) {
      return <span>Loading...</span>
    }
    return (
      <div className="root">
        <div className="header">
          <h2>Bar Chart(Bandwidth Usage)</h2>
          <select className="selecttime" onChange={this.handleChange} value={this.state.dayValue}>
            <option value="Today" >Today</option>
            <option value="Yesterday" >Yesterday</option>
          </select>
        </div>

        <Bar
          data={this.state.chartdata}
          width={30}
          height={200}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }

  /**
   * Method to call api to get data for chart based on day
   * @param {*} day 
   */
  getChartData(day) {
    var labels = [];
    var usageData = [];
    //fetching data from server
    fetch('http://localhost:8080/?day=' + day)
      .then(response => {
        this.setState({ isLoading: false });
        this.setState({ dayValue: day });
        return response.json();
      }).then(data => {
        data.data.map((number) => {
          labels.push(number[0]);
          usageData.push(number[1]);
          return false;
        })

        //updating state so that chart can be updated with latest data
        this.setState({
          chartdata: {
            labels: labels,
            datasets: [
              {
                label: ['Bandwidth Usage'],
                backgroundColor: '#A3E4D7',
                borderColor: '#17A589',
                borderWidth: 2,
                hoverBackgroundColor: '#17A589',
                hoverBorderColor: '#17A589',
                data: usageData
              }
            ]
          }
        });
      })

  }

  componentDidMount() {
    //calling server api during page load
    this.getChartData('Today');
  }

  //handle select change and call to to server to get updated data
  handleChange(event) {
    this.setState({ isLoading: true });
    this.getChartData(event.target.value);
  }

}

export default Bandwidth;
