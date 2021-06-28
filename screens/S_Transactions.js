import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Chart from "../components/Chart";
import {Card, Subheading, Divider,Avatar} from "react-native-paper";
import Constants from 'expo-constants';
import ItemTransaction from "../components/ItemTransaction";
import axios from "axios";

const S_Transactions = ({data}) => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [transactions, setTransactions] = React.useState([])
  React.useEffect(()=>{
    getAllTransactions()
  }, [])
  function getAllTransactions() {
    console.log("ok")
    const API_KEY = "ckey_4e7ba38c8e50410a92ed0989d8f"
    const URL = `https://api.covalenthq.com/v1/250/address/${data.address}/transactions_v2/?quote-currency=${data.currency}&key=${API_KEY}`
    axios.get(URL).then((response) => {
      setTransactions(response.data.data.items)
    })
  }
  return (
    <View>
    <View style={{padding : 20}}>
    <Subheading style={{paddingTop: Constants.statusBarHeight,fontWeight : 'bold', color : '#000'}}>Your Transactions</Subheading>
    <Divider />
    </View>
    <ScrollView>
    <View style={{flex:1}}>
    {
      transactions.map((trans)=> {
        return <ItemTransaction data={trans} currency={data.currency} />
      })
    }
    </View>
    </ScrollView>
    </View>
  )
}

export default S_Transactions;