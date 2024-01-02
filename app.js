const { App, HTTPReceiver } = require('@slack/bolt');
const axios = require('axios');
const {  } = require('./eventHandlers');
require('dotenv').config();

// Initialize app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: false,
  port: process.env.PORT || 3000,
})

const teamsObj = {
  helpdesk: {
    link: "go/helpdesk",
    description: "This team does low level software and hardware troubleshooting. They are also responsible for general support requests that do not fall under any other support umbrella.",
    examples: ["Any application crashing", "LDAP password resets", "damaged hardware", "non-working hardware", "OS reinstallation", "Computer Upgrades"]
  },
  atlassianSupport: {
    link: "go/atlassiansupport",
    description: "This team deals with Atlassian application customizations and integrations. They also help teams who need a new Jira project, or want to integrate Atlassian applications with third party apps.",
    examples: ["Custom Jira field", "New Jira project", "Jira Admin Support", "Scriptrunner add-on", "Jira API call", "Confluence Admin Support", "Third party jira integration"]
  },
  developerSupport: {
    link: "go/devsupport",
    description: "The dev support team assists with any troubleshooting issues that are related to software engineer developer environment. This includes anything from configuring IntelliJ, to getting started for the first time as a newhire software engineer",
    examples: ["Newhire engineer setup", "IntelliJ Configuration", "Dev environment issue"]
  }
};


(async () => {
  try {
    // Start app
    await app.start();
    console.log('⚡️ Bolt app is running!');
  } catch (error) {
    console.error('Error starting Bolt app:', error);
  }
})();
