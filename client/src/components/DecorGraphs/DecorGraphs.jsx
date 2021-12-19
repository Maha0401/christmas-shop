import React from 'react'
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'
import './DecorGraphs.scss'
import axios from 'axios';

class DecorGraphs extends React.Component {
    
    state={
        decorChartData: null,
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
                    decorChartData: {
                        labels: ['Max mit Christmas Stockings, Hanging','24 Mini Glitter Christmas Tree Balls','Christmas Inflatable Outdoor Decor','12 Inch Artificial Christmas Wreath'],
                        datasets: [
                            {
                                label: 'Dec 2021',
                                data:[this.state.decData[7],this.state.decData[8],this.state.decData[9],this.state.decData[10]],
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
                                data:[this.state.novData[7],this.state.novData[8],this.state.novData[9],this.state.novData[10]],
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
                <h2 className='graph__header'>Sales(cad) - Decor</h2>
                <div className='graph__bar'>
                    <Bar 
                        height={50}
                        width={200}
                        data={this.state.decorChartData}
                        option={{
                            maintainAspectRatio: false,
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default DecorGraphs
