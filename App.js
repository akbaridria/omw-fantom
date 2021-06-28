import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import S_Portofolio from "./screens/S_Portofolio";
import S_Analytics from "./screens/S_Analytics";
import S_Transactions from "./screens/S_Transactions";
import S_Nfts from "./screens/S_Nfts";
import S_Erc20 from "./screens/S_Erc20";
import {AddressProvider, AddressConsumer} from "./address";


function Portofolio() {
  
  return (
    <AddressProvider>
    <AddressConsumer>
    { (value) => (
      <View style={styles.containerPortofolio}>
        <S_Portofolio data={value}  />
      </View>
    )
    }
    </AddressConsumer>
    </AddressProvider>
  );
}

function Transactions() {
  return (
    <AddressProvider>
    <AddressConsumer>
    { (value) =>( 
        <View>
          <S_Transactions data={value} />
        </View>
      )
    }
    </AddressConsumer>
    </AddressProvider>
  );
}

function Nfts() {
  return (
    <AddressProvider>
    <AddressConsumer>
    {(value) => (
      <View>
        <S_Nfts data={value} />
      </View>
    )}
    </AddressConsumer>
    </AddressProvider>
  );
}

function Analytics({navigation}) {
  
  return (
    <AddressProvider>
    <AddressConsumer>
    {(value) => (
      <View>
        <S_Analytics data={value} />
      </View>
    )
    }
    </AddressConsumer>
    </AddressProvider>
    
  );
}

function Profile() {
  return (
    <AddressProvider>
    <AddressConsumer>
    {(value)=>(
      <View>
        <S_Erc20 data={value} />
      </View>
    )}
    </AddressConsumer>
    </AddressProvider>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="black"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: "#ffffff" }}
    >
      <Tab.Screen
        name="Feed"
        component={Portofolio}
        options={{
          tabBarLabel: 'Portofolio',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({ color }) => (
            <AntDesign name="shrink" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Nfts"
        component={Nfts}
        
        options={{
          tabBarLabel: 'Nfts',
          tabBarIcon: ({ color }) => (
            <Entypo name="folder-images" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({ color }) => (
            <AntDesign name="piechart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Erc20',
          tabBarIcon: ({ color }) => (
            <AntDesign name="swap" size={26} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  containerPortofolio : {
    flex : 1,
    flexDirection : 'column',
    paddingTop: Constants.statusBarHeight,
    backgroundColor : 'white'
  }
})

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
