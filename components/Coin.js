import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card, Badge } from "react-native-paper";

const Coin = ({data, currency}) => {
  const currencies = {
    USD : '$',
    EUR : '€',
    JPY : '¥'
  }
  const [last24, setLast24] = React.useState(0)

  React.useEffect(()=> {
    last24h()
  }, [])

  function last24h() {
    if(data.balance_24h !== undefined || data.balance_24h !== '0') {
      let da = Number(data.balance_24h)/Number(data.balance)
      setLast24(parseFloat(da).toFixed(4))
    }
    else {
      setLast24(0)
    }
    
  }
  return (
      <View style={styles.container} elevation={5}>
      <View style={{display : "flex", flexDirection : "row"}}>
        <Image
          style={styles.imageDecoration}
          source={require("../assets/image/image.png")}
          />
        <View style={styles.columnTickerandTitle}>
        <Text style={{fontWeight: "bold", color : "black"}}>{data.contract_name}</Text>
        <Text style={{fontSize : 10, color : "gray"}}>{data.contract_ticker_symbol}</Text>
        </View>
      </View>
      <View style={{display : "flex", flexDirection : "row", alignItems : "center"}}>
      <View style={{marginRight : 10}}>
      
      {
        last24 > 0.00001 && !isNaN(last24) ?
        <Badge style={{ backgroundColor : 'green'}}>{"+ " + last24*100 + "%"}</Badge>
        :
        <Badge style={{ backgroundColor : 'gray', color : "white"}}>0%</Badge>
      }
      </View>
      <View>
        <Text style={{fontSize : 10, color : "black"}}>{(Number(data.balance)/Math.pow(10,Number(data.contract_decimals))).toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
        <Text style={{fontSize : 10, color : "gray"}}>{currencies[currency] + " " +  (data.quote).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
      </View>
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
  imageDecoration : {
    width : 40,
    height : 40,
    borderRadius : 100,
    marginRight : 10
  },
  container : {
    display : "flex",
    flexDirection : "row",
    marginTop : 10,
    alignItems : "center",
    justifyContent : "space-between",
    padding : 10,
    marginLeft : 30,
    marginRight : 30,
    borderRadius : 10,
    backgroundColor:'white',
    shadowColor: "#d9d9d9",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },

  columnTickerandTitle : {
    display : "flex",
    flexDirection : "column",
   
  }
})

export default Coin;