import React, { useState, useMemo, useEffect } from 'react';

import TotalValues from './TotalValues';
import Box from 'components/Box';
import CustomGrid from './CustomGrid';
import financialsGraphData from 'queries/financials/getGraphData.gql';
import {LineChart, YAxis, XAxis, Grid} from 'react-native-svg-charts'
import { colors } from 'styles/theme'
import { useQuery } from 'urql';
import { styles } from './styles'


const FinancialsGraph = ({activeTab}) => {

    const [data1, setData1] = useState([0])
    const [data2, setData2] = useState([0])
    const [months, setMonths] = useState([0])
    const [cashIn, setCashIn] = useState()
    const [cashOut, setCashOut] = useState()
    const [selectedLine, setSelectedLine] = useState()
    const [selectedDate, setSelectedDate] = useState()

    const monhts = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] 
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const lastYear = new Date().getFullYear() - 1

    const [graphRes, executeQuery] = useQuery({
        query: financialsGraphData,
        variables: {
            isPaid: activeTab=="CASH_IN" ? true : false,
        },
    });

    const getData =()=>{
        setData1(graphRes.data?.financialsGraphData.months.edges.map((item, index) => {
            return(item.node.incoming)}) ?? [0])
        setData2(graphRes.data?.financialsGraphData.months.edges.map((item, index) => {return(item.node.outgoing)}) ?? [0])
        setMonths(graphRes.data?.financialsGraphData.months.edges.map((item, index) => {return(item.node.month)}) ?? [0])

        setCashIn(graphRes.data?.financialsGraphData.totals.incoming)
        setCashOut(graphRes.data?.financialsGraphData.totals.outgoing)
    }

    useMemo(() => {
        getData()

        setSelectedDate(monhts[currentMonth+1] + ', ' + lastYear + ' - ' + monhts[currentMonth] + ', ' + currentYear)
    }, [graphRes])

    const data = [
        {
            data: data2,
            svg: {stroke: colors['graph/out'], strokeWidth: 2.5}
        },
        {
            data: data1,
            svg: {stroke: colors['graph/in'], strokeWidth: 2.5}
        },
    ]
    
    const axesSvg = { fontSize: 12, fill: colors['gray scale/30'], alignSelf: 'center'};
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30

    const gridOnPress = (index) =>{
        setCashIn(data1[index])
        setCashOut(data2[index])
        setSelectedLine(index)
        setSelectedDate(monhts[index] + ', ' + new Date().getFullYear())
        if(selectedLine == index){
            setSelectedLine(null)
            const reducer = (accumulator, curr) => accumulator + curr;
            setCashIn(data1.reduce(reducer))
            setCashOut(data2.reduce(reducer))
            setSelectedDate(monhts[currentMonth+1] + ', ' + lastYear + ' - ' + monhts[currentMonth] + ', ' + currentYear)
        }
    }

    return ( 
        <Box style={styles.mainContainer}>
            <TotalValues 
                date={selectedDate}
                cashIn={cashIn} 
                cashOut={cashOut} 
                title={(activeTab == 'CASH_FLOW') ? 'Net Cash Flow:' : 'Profit'}
                title1={(activeTab == 'CASH_FLOW') ? 'Incoming' : 'Revenue'} 
                title2={(activeTab == 'CASH_FLOW') ? 'Outgoing' : 'Expences'}
            />
            <Box style={styles.axisContainer}>
                <YAxis
                    data={data1}
                    numberOfTicks={5}
                    formatLabel={(data1) => data1}
                    style={styles.yAxis}
                    svg={axesSvg}
                /> 
                <Box style={styles.linesContainer}>
                    <LineChart
                        style={styles.lineChart}
                        data={data}
                        contentInset={verticalContentInset}
                        showGrid={true}
                    >
                        <CustomGrid months={months} 
                            belowChart={true}
                            gridOnPress={gridOnPress}
                            selectedLine={selectedLine}
                        />
                    </LineChart>
                    <XAxis
                        data={months}
                        style={styles.xAxis}
                        svg={axesSvg}
                    /> 
                </Box>
            </Box>
        </Box>
    )
};

export default FinancialsGraph





