import React, {Component, createContext} from "react";
const {Provider, Consumer} = createContext();


class AddressProvider extends Component {

  constructor(props) {
    super(props);
    this.state = {"address" : "0xfFF33c0bde72f6472f1D185166b7CbFcc3E9e150",
    "currency" : "USD"};
  }

  changeAddress = (text) => {

    this.setState({
      "address" : text
    })
  }

  changeCurrency =(val)=> {

    this.setState({
      "currency" : val
    })
    console.log(this.state.address)
  }
  
  render() {
    return <Provider value={{"address" : this.state.address, "currency" : this.state.currency, changeAddress : this.changeAddress, changeCurrency : this.changeCurrency}}>{this.props.children}</Provider>;
    
  }
}
export { AddressProvider, Consumer as AddressConsumer };
