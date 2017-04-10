import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from '../../components/Button/Button'
import InputText from '../../components/InputText/InputText'

import * as userActions from '../../actions/userActions'

class Login extends Component {
  constructor( props ) {
    super( props)

    this.navigate = this.navigate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  navigate( id ) {
    this.props.navigator.push({ id });
  }

  handleFormSubmit() {
    try {
      console.log(this.state.email);
      console.log(this.state.password);
      userActions.userLogin(this.state.email, this.state.password);

      if(this.state.fetched) {
        this.props.navigator.push({ id: 'Home' });
      }
    } catch(error) {
      console.log('Error', error);
    }
  }

  render() {
    return(
      <View style={styles.formContainer}>
        <InputText
          onchange={(email) => this.setState({ email })}
          type='default'
          placeholder='EMAIL'
          secure={false}
        />
        <InputText
          onchange={(password) => this.setState({ password })}
          type='default'
          placeholder='PASSWORD'
          secure={true}
        />
        <Button onpress={() => this.handleFormSubmit()} text='LOGIN' />
        <Button onpress={() => this.navigate('Register')} text='REGISTER' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 40,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = state => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Login)