import React from 'react'
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'
import './GiftGraphs.scss'
import axios from 'axios';

class GiftGraphs extends React.Component {
    
    state={
        giftChartData: null,
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
                    giftChartData: {
                        labels: ['Solar System Crystal Ball','No Face with Night Lamp','Insulated Wine Tumbler with Straw and Lid','Spotify Plaque Christmas Gifts','Custom Camera Roll Pictures Keychain'],
                        datasets: [
                            {
                                label: 'Nov 2021',
                                data:[this.state.novData[10],this.state.novData[11],this.state.novData[12],this.state.novData[13],this.state.novData[14]],
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
                                label: 'Dec 2021',
                                data:[this.state.decData[10],this.state.decData[11],this.state.decData[12],this.state.decData[13],this.state.decData[14]],
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
                <h2 className='graph__header'>Sales(cad) - Gift</h2>
                <div className='graph__bar'>
                    <Bar 
                        height={50}
                        width={200}
                        data={this.state.giftChartData}
                        option={{
                            maintainAspectRatio: false,
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default GiftGraphs
