import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = "LOCATION_UPDATED";
export function createBackgroundTask(callback){
  // TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { locations }, error }) => {
  //   if (error) {
  //     console.log("Error when running LOCATION_UPDATED: " + error.message);
  //     return;
  //   }

  //   console.log("LOCATION_UPDATED: " + locations.length);

  //   // Need to defer until the app starts up and we have a callback function that can call setState
  //   let updateLocation = callback();
  //   if(updateLocation) {
  //     for (var i = locations.length - 1; i >= 0; i--) {
  //       updateLocation({location: locations[i], method: 'backgroundTask'});
  //     }
  //   }
  // });

  // const status = await BackgroundFetch.getStatusAsync();
  // switch (status) {
  //     case BackgroundFetch.Status.Restricted:
  //     case BackgroundFetch.Status.Denied:
  //         console.log("Background execution is disabled");
  //         return;

  //     default: {
  //         console.debug("Background execution allowed");

  //         let tasks = await TaskManager.getRegisteredTasksAsync();
  //         if (tasks.find(f => f.taskName === LOCATION_TASK_NAME) == null) {
  //             logger.log("Registering task");
  //             await BackgroundFetch.registerTaskAsync(FETCH_TASKNAME);

  //             tasks = await TaskManager.getRegisteredTasksAsync();
  //             logger.debug("Registered tasks", tasks);
  //         } else {
  //             logger.log(`Task ${LOCATION_TASK_NAME} already registered, skipping`);
  //         }

  //         logger.log("Setting interval to", INTERVAL);
  //         await BackgroundFetch.setMinimumIntervalAsync(INTERVAL);
  //     }
  // }
}

export function updateLocationCallback({locationPostUrl, deviceId, callback}){
  return function({location, method}) {
    let locationPost = {
      deviceId,
      // locationRaw: JSON.stringify(location),
      timestamp: location.timestamp,
      sampleDate: new Date(location.timestamp).toISOString(),
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
      method: method,
    }

    fetch(locationPostUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationPost),
    });

    callback({
      deviceId,
      location,
      locationPost
    });

    return {
      deviceId,
      location,
      locationPost
    };
  };
}

export async function startBackgroundTask(){
  // try {
  //   await Location.startLocationUpdatesAsync("LOCATION_UPDATED", {
  //     accuracy: Location.Accuracy.Highest,
  //     timeInterval: 15000,
  //     foregroundService: {
  //       notificationTitle: "weTrace",
  //       notificationBody: "weTrace is protecting others with your anonymous data",
  //     }
  //   });
  // } catch(err) {
  //   console.log("Couldn't start background task: " + err);
  // }
}

export async function startForegroundTask(callback){
  await Location.watchPositionAsync({accuracy: Location.Accuracy.Highest}, callback);
}

  // _getLocationAsync = async () => {
  //   let locationRequest = await Permissions.askAsync(Permissions.LOCATION);

  //   this.setState({ location: 'before location permission' });
  //   if (locationRequest.status !== 'granted') {
  //     this.setState({
  //       errorMessage: 'You need to grant location permission for this app to work',
  //     });
  //   }

  //   let notificationRequest = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  //   this.setState({ location: 'before notification permissions' });
  //   if (notificationRequest.status !== 'granted') {
  //     this.setState({
  //       errorMessage: 'You need to grant notification permission for this app to work',
  //     });
  //   }

  //   // Get the token that identifies this device
  //   this.setState({ location: 'before notifications' });
  //   let token = await Notifications.getExpoPushTokenAsync();

  //   // Get current location to try permission
  //   this.setState({ location: 'before location' });
  //   let locationImmediatate = await Location.getCurrentPositionAsync({});

  //   let _this = this;
  //   updateLocation = updateLocationCallback({
  //     locationPostUrl,
  //     clientId: token,
  //     callback: ({locationPost}) => {
  //       _this.setState({ location: JSON.stringify(locationPost) });
  //     }
  //   });

  //   startBackgroundTask();
  //   startForegroundTask((location) => updateLocation({location: location, method: 'watchPositionAsync'}));

  //   this.setState({ location: 'testing' });
  // };
    // this.setState({ location: 'testing' });