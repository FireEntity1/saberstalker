require('dotenv').config();
const { App } = require('@slack/bolt');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    port: process.env.PORT || 3000,
  });
  
  app.message(async ({ message, say }) => {
    await say(`Got your message, <@${message.user}>!`);
  });
  
  (async () => {
    await app.start();
  
    app.logger.info('⚡️ Bolt app is running!');
  })();
