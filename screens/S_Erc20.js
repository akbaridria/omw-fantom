import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import ItemErc from '../components/ItemErc';
import Constants from 'expo-constants';
import axios from 'axios';

const S_Erc20 = ({ data }) => {

  const [erc20, setErc20] = React.useState([])
  
  React.useEffect(() => {
    setErc20([])
    const API_KEY = 'ckey_4e7ba38c8e50410a92ed0989d8f';
    const URL = `https://api.covalenthq.com/v1/250/address/${data.address}/balances_v2/?quote-currency=${data.currency}&nft=true&key=${API_KEY}`;
    axios.get(URL).then((response) => {
      getContractAddress(response.data.data.items);
    });
  }, []);

  function getContractAddress(dataContract) {
    let temp = [];
    dataContract.map((da) => {
      if (parseFloat(da.quote) > 0) {
        temp.push(da.contract_address);
      }
    });
    temp.map((d) => {
      const API_KEY = 'ckey_4e7ba38c8e50410a92ed0989d8f';
      const URL = `https://api.covalenthq.com/v1/250/address/${data.address}/transfers_v2/?quote-currency=${data.currency}&contract-address=${d}&key=${API_KEY}`;
      axios.get(URL).then((response) => {
        getErc20(response.data.data.items)
      })
    })
  }

  function getErc20(dataErc) {
    dataErc.map((d) => {
      setErc20(prevArray => [...prevArray, d])
    })
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {
          
          erc20.map((erc) => {
            return <ItemErc data={erc} />
          })
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight,
    marginTop: 30,
  },
});

export default S_Erc20;
