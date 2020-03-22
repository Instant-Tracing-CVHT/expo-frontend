import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import { Notifications } from 'expo';

// Somewhat global
let updateLocation = null;

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

  _getLocationAsync = async () => {
    await TaskManager.defineTask("LOCATION_UPDATED", ({ data: { locations }, error }) => {
      if (error) {
        // check `error.message` for more details.
        return;
      }

      updateLocation({location: locations, method: 'task'});
      // console.log('Received new locations', locations);
    });

    let { status } = await Permissions.askAsync(Permissions.LOCATION, Permissions.NOTIFICATIONS);

    this.setState({ location: 'before permissions' });
    if (status !== 'granted') {
      this.setState({
        errorMessage: status+' You need to grant location and notification permission for this app to work',
      });
    }

    // Get the token that identifies this device
    this.setState({ location: 'before notifications' });
    let token = await Notifications.getExpoPushTokenAsync();
    this.setState({ location: 'before location' });
    let locationImmediatate = await Location.getCurrentPositionAsync({});

    let _this = this;
    updateLocation = function({location, method}={}){
      let locationPost = {
        deviceId: token,
        // locationRaw: JSON.stringify(location),
        timestamp: location.timestamp,
        sampleDate: new Date(location.timestamp).toISOString(),
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        method: method,
      }

      fetch('http://07d416e9.ngrok.io', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationPost),
      });

      this.setState({ location: JSON.stringify(locationPost) });
    }.bind(this);

    await Location.startLocationUpdatesAsync("LOCATION_UPDATED", {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 15000,
      foregroundService: {
        notificationTitle: "Instant Tracer",
        notificationBody: "Instant Tracer is sending anonymous data",
      }
    });

    await Location.watchPositionAsync({accuracy: Location.Accuracy.Highest}, function(location){
      updateLocation({location: location, method: 'watchPositionAsync'});});

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