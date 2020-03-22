import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { updateLocationCallback, createBackgroundTask, startBackgroundTask, startForegroundTask } from './lib';
import * as Location from 'expo-location';
import * as Font from 'expo-font';
import OnboardingOne from './assets/onboarding/1.svg';

// Somewhat global
let updateLocation = null;
const locationPostUrl = 'http://07d416e9.ngrok.io';

try {
  createBackgroundTask(() => updateLocation);
} catch(err) {
  console.log("Error createBackgroundTask: "+err);
}

export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
    notification: null,
    fontsLoaded: false,
  };

  constructor(props) {
    super(props);
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      // this._getLocationAsync();
    }
  }

  _handleNotification = notification => {
    // do whatever you want to do with the notification
    this.setState({ notification: notification });
  };

  async componentDidMount() {
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    await Font.loadAsync({
      'SF Pro Display Bold': require('./assets/fonts/San-Francisco-Pro-Fonts/SF-Pro-Display-Bold.otf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentWillUnmount() {
    this._notificationSubscription.remove();
  }

  render() {
    // let text = JSON.stringify(this.state);
    // if (this.state.errorMessage) {
    //   text = this.state.errorMessage;
    // } else if (this.state.location) {
    //   text = JSON.stringify(this.state.location);
    // }

    return (
      this.state.fontsLoaded ? (
        <View style={styles.container}>
          <Text style={styles.h1}>Hello friend,{"\n"}thanks for caring! ❤️</Text>
          <OnboardingOne />
        </View>
      ) : null
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },

  h1: {
    position: 'absolute',
    left: '4%',
    right: '4.53%',
    top: '6.65%',
    bottom: '82.24%',

    /* Large Title */

    fontFamily: 'SF Pro Display Bold',
    // fontStyle: 'normal',
    // fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 38,
    /* or 127% */

    letterSpacing: 0.41,

    /* Black */

    color: '#000000',
  },
});