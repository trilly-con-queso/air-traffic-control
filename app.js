const { App } = require('@slack/bolt');
require('dotenv').config();

// Initialize app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000
});

(async () => {
  // Start app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();