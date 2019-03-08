const { Expo } = require("expo-server-sdk");
const { User, Station } = require("../models");
const expo = new Expo();

const handlePushTokens = async arg => {
  let { direction, station, status_update } = arg;

  let notifications = [];

  getUsers = () => {
    return User.findAll({
      where: {
        notifications_setting: 1,
        home_station: station
      }
    }).then(res => res);
  };

  let users = await getUsers();

  if (users) {
    users.map(selectUser => {
      let { expo_token } = selectUser.dataValues;
      if (Expo.isExpoPushToken(expo_token)) {
        notifications.push({
          to: expo_token,
          sound: "default",
          title: `Update at ${station}`,
          body: `${direction} bound trains running ${status_update}`
        });
      } else return;
    });
  }

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log("RECEIPTS:", receipts);
      } catch (error) {
        console.error("ERROR FROM EXPO:", error);
      }
    }
  })();
};

module.exports.handlePushTokens = handlePushTokens;

// const handlePushTokensMorning = async arg => {
//   let notifications = [];

//   getUsers = () => {
//     return User.findAll({
//       where: {
//         notifications_setting: 1
//       }
//     }).then(res => res);
//   };

//   let users = await getUsers();

//   getStations = () => {
//     return Station.findAll().then(res => res.map(stat => stat.dataValues));
//   };

//   let stations = await getStations();

//   if (users) {
//     users.map(selectUser => {
//       let { expo_token, home_station } = selectUser.dataValues;
//       if (Expo.isExpoPushToken(expo_token)) {
//         notifications.push({
//           to: expo_token,
//           sound: "default",
//           title: `${home_station} `,
//           body: `The ${direction} has been updated to: ${status_update}`
//         });
//       } else return;
//     });
//   }

//   let chunks = expo.chunkPushNotifications(notifications);

//   (async () => {
//     for (let chunk of chunks) {
//       try {
//         let receipts = await expo.sendPushNotificationsAsync(chunk);
//         console.log("RECEIPTS:", receipts);
//       } catch (error) {
//         console.error("ERROR FROM EXPO:", error);
//       }
//     }
//   })();
// };

// module.exports.handlePushTokensMorning = handlePushTokensMorning;
