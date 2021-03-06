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
    macdsinal: {},
    graficoTratado: [{ y:0, label: "loading"}],
    ema9Tratado: [{ y:0, label: "loading"}],
    ema12Tratado: [{ y:0, label: "loading"}],
    ema26Tratado: [{ y:0, label: "loading"}],
    macdLinhaTratado: [{ y:0, label: "loading"}],
    macdHTratado: [{ y:0, label: "loading"}],
    macdSinalTratado: [{ y:0, label: "loading"}],
  }
  
  graficosEp = "https://hb-abc.herokuapp.com/abc-hb/api/grafico";
  //graficosEp = 'http://localhost:8080/abc-hb/api/grafico';

  componentDidMount() {
    axios.get(this.graficosEp)
      .then(response => {
       
        this.setState(
          {
            grafico: response.data[0], 
            ema9: response.data[1],
            ema12: response.data[2],
            ema26: response.data[3],
            macd: response.data[4],
            macdH: response.data[5],
            macdsinal: response.data[6]
          })

          this.setState({graficoTratado: this.montaGrafico(this.state.grafico.dia)});
          this.setState({ema9Tratado: this.montaGrafico(this.state.ema9.dia)});
          this.setState({ema12Tratado: this.montaGrafico(this.state.ema12.dia)});
          this.setState({ema26Tratado: this.montaGrafico(this.state.ema26.dia)});
          this.setState({macdLinhaTratado: this.montaGrafico(this.state.macd.dia)});
          this.setState({macdHTratado: this.montaGrafico(this.state.macdH.dia)});
          this.setState({macdSinalTratado: this.montaGrafico(this.state.macdsinal.dia)});
          
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
        name: "MACD (26,12)",
        showInLegend: true,
        dataPoints: this.state.macdLinhaTratado
      },
      {
        type: "spline",
        name: "MACD (9))",
        showInLegend: true,
        dataPoints: this.state.macdSinalTratado
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
        <p>Thiago Orlandini Carvalho Antunes</p>
        <p>Marcos de Moraes</p>
      </div>
    );
  }
}

export default App;