import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Chart from "../components/Chart";
import Constants from 'expo-constants';
import { Subheading, Divider, Card } from 'react-native-paper';
import {AddressConsumer} from "../address"
import { useRoute, useNavigation } from '@react-navigation/native';

import axios from "axios"
const S_Analytics = ({data}) => {
  const [transactions, setTransactions] = React.useState([])
  const [totalGas, setTotalGas] = React.useState(0)
  const [totalNft, setTotalNft] = React.useState(0)
  const [tokensDistribution, setTokenDistribution] = React.useState([])

  const currencies = {
    USD : '$',
    EUR : '€',
    JPY : '¥'
  }
  React.useEffect(()=>{
    getAllTransactions();
    getTokens();
  }, [])
  function getAllTransactions() {
    const API_KEY = "ckey_4e7ba38c8e50410a92ed0989d8f"
    const URL = `https://api.covalenthq.com/v1/250/address/${data.address}/transactions_v2/?quote-currency=${data.currency}&key=${API_KEY}&page-size=99999`
    axios.get(URL).then((response) => {
      setTransactions(response.data.data.items)
      getTotalGas(response.data.data.items)
    })
  }

  function getTotalGas(data) {
    let total = 0
    data.map((trans) => {
      total += parseFloat(trans.gas_quote)
    })
    setTotalGas(total)
  }

  function getTokens() {
    const API_KEY = "ckey_4e7ba38c8e50410a92ed0989d8f";
    const URL = `https://api.covalenthq.com/v1/250/address/${data.address}/balances_v2/?quote-currency=${data.currency}&nft=true&key=${API_KEY}`
    axios.get(URL).then((response) => {
      getNft(response.data.data.items)
      coinDistribution(response.data.data.items)
    })
  }

  function getNft(data) {
    let totalnft = 0
    data.map((da) => {
      if (da.nft_data !== null) {
        totalnft += 1
      }
    })
    setTotalNft(totalnft)
  }

  function coinDistribution(data) {
    let temp = []
    data.map((dat) => {
      if(parseFloat(dat.quote) > 0) {
        let d = {
          x : dat.contract_ticker_symbol,
          y : dat.quote
        }
        temp.push(d)
      }
    })
    setTokenDistribution(temp)
  }
  return (
    <View style={styles.container}>
      <View>
        <Chart dataChart={tokensDistribution} />
      </View>
      <View style={{ padding : 10}}>
      <View style={{ marginBottom : 20}}>
        <Card style={{height : 60, padding : 10, width : 300}}>
          <Text style={{ fontSize : 12, textAlign : "center"}}>Total Transactions</Text>
          <Text style={{ fontSize : 16, fontWeight : 'bold', textAlign : 'center'}}>{transactions.length}</Text>
        </Card>
      </View>
      <View style={{ marginBottom : 20}}>
        <Card style={{height : 60, padding : 10, width : 300}}>
          <Text style={{ fontSize : 12, textAlign : "center"}}>Total Gas Spent</Text>
          <Text style={{ fontSize : 16, fontWeight : 'bold', textAlign : 'center'}}>{ currencies[data.currency] + " " + totalGas.toFixed(2)}</Text>
        </Card>
      </View>
      <View style={{ marginBottom : 20}}>
        <Card style={{height : 60, padding : 10, width : 300}}>
          <Text style={{ fontSize : 12, textAlign : "center"}}>Average Gas Spent</Text>
          <Text style={{ fontSize : 16, fontWeight : 'bold', textAlign : 'center'}}>{ currencies[data.currency] + " " + (totalGas/(transactions.length)).toFixed(4)}</Text>
        </Card>
      </View>
      <View style={{ marginBottom : 20}}>
        <Card style={{height : 60, padding : 10, width : 300}}>
          <Text style={{ fontSize : 12, textAlign : "center"}}>Total Nfts</Text>
          <Text style={{ fontSize : 16, fontWeight : 'bold', textAlign : 'center'}}>{totalNft}</Text>
        </Card>
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    display : "flex",
    alignItems : "center",
    flexDirection : "column",
    textAlign : "center",
    paddingTop : Constants.statusBarHeight
  }
})
export default S_Analytics;