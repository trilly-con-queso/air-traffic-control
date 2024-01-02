const handleHello = async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
};

const handleSlashNew = async ({ command, ack, payload, context, respond }) => {
  // Acknowledge command request
  ack()

  if (command.text === '') {
    respond({ text: 'Oops, you didn\'t provide a sub-command to your Slash command.' })
  } else {
    // Open a modal powered by Block Kit
    app.client.views.open({
      token: context.botToken,
      trigger_id: payload.trigger_id,
      view: {
        // let's save response_url so we can call it in a few moments in the view_submission action handler
        private_metadata: command.response_url,
        type: 'modal',
        callback_id: 'survey',
        title: {
          type: 'plain_text',
          text: `Survey ${command.text}`,
          emoji: true
        },
        submit: {
          type: 'plain_text',
          text: 'Submit',
          emoji: true
        },
        close: {
          type: 'plain_text',
          text: 'Cancel',
          emoji: true
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: ':wave: Hello!\n\nWe\'d love to hear from you how we can make this place the best place you’ve ever worked.',
              emoji: true
            }
          },
          {
            type: 'divider'
          },
          {
            block_id: 'enjoy_working',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'You enjoy working here at Acme & Co',
              emoji: true
            },
            element: {
              action_id: 'enjoy_working_action',
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select an item',
                emoji: true
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'Strongly Agree',
                    emoji: true
                  },
                  value: 'strongly-agree'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Agree',
                    emoji: true
                  },
                  value: 'agree'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Neither agree nor disagree',
                    emoji: true
                  },
                  value: 'neither-agree-nor-disagree'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Disagree',
                    emoji: true
                  },
                  value: 'disagree'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Strongly disagree',
                    emoji: true
                  },
                  value: 'strongly-disgree'
                }
              ]
            }
          },
          {
            block_id: 'lunch',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'What do you want for our team weekly lunch?',
              emoji: true
            },
            element: {
              action_id: 'lunch_action',
              type: 'multi_static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select your favorites',
                emoji: true
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: ':pizza: Pizza',
                    emoji: true
                  },
                  value: 'pizza'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':fried_shrimp: Thai food',
                    emoji: true
                  },
                  value: 'thai-food'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':desert_island: Hawaiian',
                    emoji: true
                  },
                  value: 'hawaiian'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':meat_on_bone: Texas BBQ',
                    emoji: true
                  },
                  value: 'texas-bbq'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':hamburger: Burger',
                    emoji: true
                  },
                  value: 'burger'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':taco: Tacos',
                    emoji: true
                  },
                  value: 'tacos'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':green_salad: Salad',
                    emoji: true
                  },
                  value: 'salad'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':stew: Indian',
                    emoji: true
                  },
                  value: 'indian'
                }
              ]
            }
          },
          {
            block_id: 'anything_else',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Anything else you want to tell us?',
              emoji: true
            },
            element: {
              action_id: 'anything_else_action',
              type: 'plain_text_input',
              multiline: true
            },
            optional: false
          }
        ]
      }
    })
  }
};

const handleButton = async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
};

module.exports = {
  handleHello,
  handleButton,
  handleSlashNew
}