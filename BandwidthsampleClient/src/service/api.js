import { chartDataUrl } from '../service/global'
/**
 * Method to get chart data from server
 */
function getChartDataServer(day){
    return fetch(chartDataUrl + day)
    .then(response => {
      return response.json();
    }).catch(err => {
        return { responseMessage: "Something went wrong. Please try again." }
    });
}

export {getChartDataServer};