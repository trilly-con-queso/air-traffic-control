const { App, HTTPReceiver } = require('@slack/bolt');
const axios = require('axios');
const { handleHello, handleButton, handleSlashNew } = require('./eventHandlers');
require('dotenv').config();

// Initialize app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: false,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});



(async () => {
  try {
    // Start app
    await app.start();
    console.log('⚡️ Bolt app is running!');
  } catch (error) {
    console.error('Error starting Bolt app:', error);
  }
})();
