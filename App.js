import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { updateLocationCallback, createBackgroundTask, startBackgroundTask, startForegroundTask } from './lib';
import * as Location from 'expo-location';
import * as Font from 'expo-font';
import OnboardingOne from './assets/onboarding/1.svg';
import HelpIcon from './assets/icons/action/help.svg';
import Divider from './components/Divider';
import Button from './components/Button';
import Link from './components/Link';
import OnboardingCarousel from './components/OnboardingCarousel';
import theme from './assets/theme';
import { human } from 'react-native-typography'
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
        <ScrollView contentContainerStyle={styles.hero}>
          <OnboardingCarousel />
        </ScrollView>

        <View style={styles.bottom}>
          <Divider />
          <Link>Learn more about privacy</Link>
          <Button>Tell me more</Button>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: theme.gutters,
    paddingTop: Constants.statusBarHeight,
  },
  hero: {
    flexGrow: 1,
    justifyContent: "center",
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
  },
});