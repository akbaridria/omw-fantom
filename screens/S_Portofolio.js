import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card, Subheading, Divider, Portal, Dialog, Button, Paragraph, Provider, TextInput, RadioButton} from "react-native-paper";
import Coin from "../components/Coin";
import Balance from "../components/Balance";
import Chart from "../components/Chart";
import ItemTransaction from "../components/ItemTransaction";
import { Ionicons, Entypo } from '@expo/vector-icons';
import axios from "axios"
import { AddressProvider, AddressConsumer} from "../address"
import { useRoute, useNavigation } from '@react-navigation/native';

const S_Portofolio = ({data}) => {
  console.log(data)
  const [value, setValue] = React.useState('USD');
  const [text, setText] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false)
    };
  const getData = () => {
    asd.changeAddress(text)
    asd.changeCurrency(value)
    console.log(asd.address)
    console.log(asd.currency)
    getTokens()
  }
  
 
  const asd = React.useContext(AddressConsumer);
  const [tokens, setTokens] = React.useState([])
  const [currency, setCurrency] = React.useState('USD')
  const [total, setTotal] = React.useState(0)
  const [lastAll, setLastAll] = React.useState(0)
  React.useEffect(() => {
    getTokens()
  }, [])

  function getTokens() {
   
   
    const API_KEY = "ckey_4e7ba38c8e50410a92ed0989d8f";
    const URL = `https://api.covalenthq.com/v1/250/address/${data.address}/balances_v2/?quote-currency=${data.currency}&nft=true&key=${API_KEY}`
    axios.get(URL).then((response) => {
      setTokens(response.data.data.items)
      setCurrency(response.data.data.quote_currency)
      getTotal(response.data.data.items)
    })
  }

  function getTotal(tokens) {
    let total = 0;
    let totalLast = 0;
    tokens.map((dat) => {
      total += Number(dat.quote)
      if(Number(dat.quote) > 0) {
        totalLast += (Number(dat.balance_24h)/Number(dat.balance))
      }
    })
    setTotal(total)
    setLastAll(totalLast)
  }
  
  return (
    
    <Provider style={{flex : 1}}>
    <View style={styles.card}>
      
      <View style={styles.rowCard}>
      <Entypo name="menu" size={30} color="white" onPress={showDialog} />
      <Text style={{ color : 'white', fontSize : 14}}>Portofolio Balance</Text>
      <Ionicons name="notifications" size={24} color="white" />
      </View>
      <Balance total = {total} currency={data.currency} totalLast={lastAll} />
      
    </View>
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Fantom Wallet</Dialog.Title>
      
         
              <Dialog.Content>
                <TextInput
                  label="your wallet"
                  color="#000"
                  defaultValue={asd.address}
                  onChangeText={text => setText(text)}
                  
                />
              </Dialog.Content>
          
          
         
          <Dialog.Actions>
            <Button onPress={hideDialog}>Dismiss</Button>
            <Button onPress={getData}>Get Data</Button>            
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
    <View >
    <Divider />
    <ScrollView>
    <View style={{flex:1}}>
      {
        tokens.map((data) => {
          return <Coin data={data} currency={currency} />
        })
      }
      </View>
      </ScrollView>
      
    </View>
    </Provider>
    
  )
}

const styles = StyleSheet.create({

  card : {
    height : 200,
    backgroundColor : "#182026"

  },

  rowCard : {
    display : "flex",
    alignItems : "center",
    flexDirection : "row",
    justifyContent : "space-around",
    paddingTop : 20
  }
})
export default S_Portofolio;