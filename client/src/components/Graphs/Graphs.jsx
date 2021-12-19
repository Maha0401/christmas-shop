import React from 'react'
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'
import './Graphs.scss'
import axios from 'axios';

class Graphs extends React.Component {
    
    state={
        sweaterChartData: null,
        isLoading: true,
        decData: [],
        novData:[]

    }

    componentDidMount() {
        axios.get("http://localhost:8080/order/sale/dec2021").then((res)=>{
            this.setState({
                decData: res.data
            })
        })
        .then(()=>{
            axios.get("http://localhost:8080/order/sale/nov2021").then((res)=>{
                this.setState({
                    novData: res.data
                })
            })
            .then(()=>{
                this.setState({
                    sweaterChartData: {
                        labels: ['Pair Christmas Sweater','Beautiful green sweater','Christmas baby sweater','Reindeer Christmas sweater with beanie cap','christmas dog sweater','Designer christmas sweater'],
                        datasets: [
                            {
                                label: 'Dec 2021',
                                data:[this.state.decData[0],this.state.decData[1],this.state.decData[2],this.state.decData[3],this.state.decData[4],this.state.decData[5]],
                                backgroundColor: [
                                    'rgba(255,99,132,0.6)',
                                    'rgba(54,162,235,0.6)',
                                    'rgba(255,206,86,0.6)',
                                    'rgba(75,192,192,0.6)',
                                    'rgba(153,102,255,0.6)',
                                    'rgba(255,159,64,0.6)',
                                    'rgba(255,99,132,0.6)',
                                ]
                            },
                            {
                                label: 'Nov 2021',
                                data:[this.state.novData[0],this.state.novData[1],this.state.novData[2],this.state.novData[3],this.state.novData[4],this.state.novData[5]],
                                backgroundColor: [
                                    'rgba(255,99,132,0.6)',
                                    'rgba(54,162,235,0.6)',
                                    'rgba(255,206,86,0.6)',
                                    'rgba(75,192,192,0.6)',
                                    'rgba(153,102,255,0.6)',
                                    'rgba(255,159,64,0.6)',
                                    'rgba(255,99,132,0.6)',
                                ]
                            }
                        ]
            
                    },
                    isLoading: false
                })
            })
        })
    }

    render() {

        return this.state.isLoading ? 
            <h1>Snowing and Loading...</h1> 
        :
            (
            <div className='graph'>
                <h2>Total Sale</h2>
                <div className='graph__bar'>
                    <Bar 
                        height={50}
                        width={200}
                        data={this.state.sweaterChartData}
                        option={{
                            maintainAspectRatio: false,
                            title:{
                                display: true,
                                text: 'Ugly christmas Sweaters',
                                fontSize:25
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Graphs
