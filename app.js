const { App } = require('@slack/bolt');

require('dotenv').config();

const base_player_url = "https://api.beatleader.com/player/"

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

async function get_player(player_id) {
  try {
    const response = await fetch(base_player_url + player_id);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

app.message("beatleader ", async ({ message, say }) => {
  app.logger.info("message received")
  let data = {}
  if (true) {
    let username = message.text.replace("beatleader ", "")
    data = await get_player(username)
  }

  await say({
    attachments: [
      {
            "mrkdwn_in": ["text"],
            "color": "#36a64f",
            "pretext": " ",
            "author_name": data.player,
            "author_link": "http://flickr.com/bobby/",
            "author_icon": data.avatar,
            "title": "BeatLeader",
            "title_link": "https://beatleader.com/" + data.id,
            "text": "Rank: #" + data.rank,
            "thumb_url": data.avatar,
            "fields": 
            [
                {
                    "title": "Top PP Play",
                    "value": data.scoreStats.topPp + " PP",
                    "short": true
                },
                {
                    "title": "Average Accuracy",
                    "value": data.scoreStats.averageAccuracy + "%",
                    "short": true
                }
            ],
            "footer": "footer",
            "footer_icon": "https://avatars.githubusercontent.com/u/98843512?s=200&v=4",
            "ts": 123456789
        }
    ],
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  app.logger.info('App running');
})();
