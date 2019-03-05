const { Expo } = require("expo-server-sdk");
const { User } = require("../models");
const expo = new Expo();

let savedPushTokens = [];

const handlePushTokens = arg => {
  let { train, station, status_update } = arg;

  // Create the messages that you want to send to clents
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
    notifications.push({
      to: "ExponentPushToken[z1S5H1CSP3kJzwtKBc3Y1j]",
      sound: "default",
      title: "Message received!",
      body: "TEST"
    });
  }
  notifications.push({
    to: "ExponentPushToken[z1S5H1CSP3kJzwtKBc3Y1j]",
    sound: "default",
    title: `Update at ${station}`,
    body: `The ${train} has been updated to: ${status_update}`
  });

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

module.exports.handlePushTokens = handlePushTokens;
