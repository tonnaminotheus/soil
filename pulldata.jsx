import React, { Component } from 'react';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import {StyleSheet, View,Text } from 'react-native';
import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css'
class Pulldata extends Component {
    state = {
        temperature: 0,
        moisture: 0,
        humidity: 0,
        sprinkle: 0,
    }
    
    refreshSensor() {
        axios.get('https://api.netpie.io/v2/device/shadow/data', {
            headers: {
                'Authorization': 'Device f436ea82-7c41-41f8-af15-755514f97338:jQKmAd9aQUemRryJtH2vZ5wHFrkdmjja',
            } 
        }).then((res) => {
            this.setState({
                temperature: res.data.data.temperature,
                moisture: res.data.data.Moisture,
                humidity: res.data.data.humidity,
                sprinkle: res.data.data.s,
            })
        })
    }

    getstatus(){
        if (this.state.sprinkle == '1'){
          return require('./picture/checkmark.jpg')
        } else {
          return require('./picture/crossmark.jpg')
        }
    }
    intervalID;

      componentDidMount() {
        this.refreshSensor();
        this.intervalID = setInterval(this.refreshSensor.bind(this), 1000);
      }

      componentWillUnmount() {
        clearInterval(this.intervalID);
      }
    render() {
        let temp = this.state.temperature;
        let mois = (1024 - this.state.moisture)/1024 *100;
        let humi = this.state.humidity;
        let sp = this.state.sprinkle;
        var imageName = require('./picture/sprinkle.jpg');
        var sprinkleimg = this.getstatus();
        return (

                <View  style = {st.container}> 
                    
                    <div style={{ width: 200, height: 200, alignItems: 'center' }}><CircularProgressbar
            value={temp}
            text={`${temp}°C`}
            maxValue = {100}
            minValue = {0}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "butt",
              trailColor: "#eee"
            })}
          /></div>
                    
                     <Text>Temperature: {this.state.temperature}</Text>
                     <div style={{ width: 200, height: 200, alignItems: 'center' }}><CircularProgressbar
            value={mois}
            text={`${mois.toFixed(2)}%`}
            maxValue = {100}
            minValue = {0}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "butt",
              trailColor: "#eee"
            })}
          /></div>
                     <Text>Moisture: {mois}</Text>
                     <div style={{ width: 200, height: 200, alignItems: 'center' }}><CircularProgressbar
            value={humi}
            text={`${humi}%`}
            maxValue = {100}
            minValue = {0}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "butt",
              trailColor: "#eee"
            })}
          /></div>
                    <Text>Humidity: {this.state.humidity}</Text>
                 
                    <img style={{ width: 100, height: 100, alignItems: 'center' }} src={imageName} />
                    <Text>Sprinkle Status:</Text>
                  
                      <img style={{ width: 100, height: 100, alignItems: 'center' }} src={sprinkleimg} />
              
                      
                      
                </View>
        
        )
    }
}

const st = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightblue',
      alignItems: 'center',
      justifyContent: 'center',
     
    }, header: {
      backgroundColor: 'lightblue',
      fontSize: 20,
    },
  });

export default Pulldata;