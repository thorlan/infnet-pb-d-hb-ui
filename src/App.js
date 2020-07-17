import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';

import axios from 'axios';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {

  state = {
    grafico: {},
    ema9: {},
    ema12: {},
    ema26: {},
    macd: {},
    macdH: {},
    graficoTratado: [{ y:0, label: "loading"}],
    ema9Tratado: [{ y:0, label: "loading"}],
    ema12Tratado: [{ y:0, label: "loading"}],
    ema26Tratado: [{ y:0, label: "loading"}],
    macdLinhaTratado: [{ y:0, label: "loading"}],
    macdHTratado: [{ y:0, label: "loading"}],
  }

  componentDidMount() {
    axios.get('http://localhost:8080/abc-hb/api/grafico')
      .then(response => {
       
        this.setState(
          {
            grafico: response.data[0], 
            ema9: response.data[1],
            ema12: response.data[2],
            ema26: response.data[3],
            macd: response.data[4],
            macdH: response.data[5]
          })

          this.setState({graficoTratado: this.montaGrafico(this.state.grafico.dia)});
          this.setState({ema9Tratado: this.montaGrafico(this.state.ema9.dia)});
          this.setState({ema12Tratado: this.montaGrafico(this.state.ema12.dia)});
          this.setState({ema26Tratado: this.montaGrafico(this.state.ema26.dia)});
          this.setState({macdLinhaTratado: this.montaGrafico(this.state.macd.dia)});
          this.setState({macdHTratado: this.montaGrafico(this.state.macdH.dia)});
          
      });
  }

  montaGrafico(graficoAMontar){


    let graficoJsonArray = [{}];

    graficoAMontar.forEach(m => {
      graficoJsonArray.push({
        "y": m.close,
        "label": m.date
      });
    })
    graficoJsonArray.shift();
    return graficoJsonArray;
  }

  //montar datapoints label sempre labels[i] e y sempre dia[i]


  render() {
    const options = {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: "Magazine Luiza"
      },
      axisY: {
        includeZero: false
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "spline",
        name: "Gráfico",
        showInLegend: true,
        dataPoints: this.state.graficoTratado
      },
      {
        type: "spline",
        name: "EMA9",
        showInLegend: true,
        dataPoints: this.state.ema9Tratado
      },
      {
        type: "spline",
        name: "EMA12",
        showInLegend: true,
        dataPoints: this.state.ema12Tratado
      }
        ,
      {
        type: "spline",
        name: "EMA26",
        showInLegend: true,
        dataPoints: this.state.ema26Tratado
      }
      ]
    }

    const macdOptions = {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: "MACD"
      },
      axisY: {
        includeZero: false
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "spline",
        name: "MACD Linha",
        showInLegend: true,
        dataPoints: this.state.macdLinhaTratado
      },
      {
        type: "column",
        name: "MACD Histograma",
        showInLegend: true,
        dataPoints: this.state.macdHTratado
      }
      ]
    }

    return (
      <div>
        <CanvasJSChart options={options}/>
        <CanvasJSChart options={macdOptions}/>
      </div>
    );
  }
}

export default App;