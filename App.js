import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { updateLocationCallback, createBackgroundTask, startBackgroundTask, startForegroundTask } from './lib';
import * as Location from 'expo-location';

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
  };

  constructor(props) {
    super(props);
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _handleNotification = notification => {
    // do whatever you want to do with the notification
    this.setState({ notification: notification });
  };

  componentDidMount() {
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  componentWillUnmount() {
    this._notificationSubscription.remove();
  }

  _getLocationAsync = async () => {
    let locationRequest = await Permissions.askAsync(Permissions.LOCATION);

    this.setState({ location: 'before location permission' });
    if (locationRequest.status !== 'granted') {
      this.setState({
        errorMessage: 'You need to grant location permission for this app to work',
      });
    }

    let notificationRequest = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    this.setState({ location: 'before notification permissions' });
    if (notificationRequest.status !== 'granted') {
      this.setState({
        errorMessage: 'You need to grant notification permission for this app to work',
      });
    }

    // Get the token that identifies this device
    this.setState({ location: 'before notifications' });
    let token = await Notifications.getExpoPushTokenAsync();

    // Get current location to try permission
    this.setState({ location: 'before location' });
    let locationImmediatate = await Location.getCurrentPositionAsync({});

    let _this = this;
    updateLocation = updateLocationCallback({
      locationPostUrl,
      clientId: token,
      callback: ({locationPost}) => {
        _this.setState({ location: JSON.stringify(locationPost) });
      }
    });

    startBackgroundTask();
    startForegroundTask((location) => updateLocation({location: location, method: 'watchPositionAsync'}));

    this.setState({ location: 'testing' });
  };

  render() {
    let text = JSON.stringify(this.state);
    // if (this.state.errorMessage) {
    //   text = this.state.errorMessage;
    // } else if (this.state.location) {
    //   text = JSON.stringify(this.state.location);
    // }

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
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
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});