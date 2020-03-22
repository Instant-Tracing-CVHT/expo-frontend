import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { updateLocationCallback, createBackgroundTask, startBackgroundTask, startForegroundTask } from './lib';
import * as Location from 'expo-location';
import * as Font from 'expo-font';
import OnboardingOne from './assets/onboarding/1.svg';
import HelpIcon from './assets/icons/action/help.svg';
// import { Divider } from 'react-native-elements';

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
      'SF Pro Text': require('./assets/fonts/San-Francisco-Pro-Fonts/SF-Pro-Display-Regular.otf'),
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

    if(!this.state.fontsLoaded) return null;

    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Hello friend,{"\n"}thanks for caring! ❤️</Text>
        <OnboardingOne style={{margin: 50}}/>
        <View
          style={{
            backgroundColor: '#E6E6E6',
            height: 1,
            width: '80%',
            margin: 60,
          }}
        />
        <Text style={styles.paragraph}>
          Have peace of mind and take the right actions to protect your family, friends and neighbors based on your past exposure to COVID-19.
          {"\n"}No signup info required.
        </Text>
        <View style={styles.bottom}>
          <Text style={styles.learnMore}>
            <HelpIcon /> Learn more about privacy
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Tell me more</Text>
         </TouchableOpacity>
        </View>
      </View>
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

  button: {
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#5359CA',
    // h-offset v-offset blur spread color; more than one shadow
    // boxShadow: 0px 1px 2px rgba(0, 0, 0, 0.18), 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04);
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    padding: 10,
    margin: 10,
  },

  buttonText: {
    color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 17,
  },

  paragraph: {
    // position: 'absolute',
    // left: 3.73,
    // right: 4.8,
    // top: 62.56,
    // bottom: 24.63,

    fontFamily: 'SF Pro Text',
    // font-style: normal;
    // font-weight: normal;
    fontSize: 17,
    lineHeight: 22,
    /* or 129% */

    textAlign: 'center',
    letterSpacing: -0.41,
    marginLeft: 18,
    marginRight: 14,

    /* Black */

    color: '#000000',
  },

  learnMore: {
    fontFamily: 'SF Pro Text',
    // font-style: normal;
    // font-weight: normal;
    fontSize: 17,
    lineHeight: 22,
    /* or 129% */

    letterSpacing: -0.41,
    // verticalAlign: 'middle',

    /* Purple */

    color: '#5D66D3',
  },

  h1: {
    // position: 'absolute',
    // left: '4%',
    // right: '4.53%',
    // top: '6.65%',
    // bottom: '82.24%',

    /* Large Title */

    marginTop: 20,
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
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    width: '100%',
    alignItems: 'center',
  },
});