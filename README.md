# TweetBot Workshop

## INTRO

### Goal

TweetBot is Twitter delivered by a Facebook Messenger Bot!

The goal of this workshop is to learn how to develop a first Messenger bot from scratch, including...
* Setting up the bot environment with a Facebook page and a Facebook app
* Working with Facebook Graph to get users' profile information
* Working with Twitter to fetch data from an external API
* Working with text, quick-replies and generic bot templates
* Working with Recast.ai to understand natural language inputs from users

### Prerequisite knowledge

Beginner coding skills. Git and Github. Knowledge of JavaScript and Node.js will help you work faster.

### Prerequisite tools

* A text editor like [Sublime](https://www.sublimetext.com/3) or [Atom](https://atom.io/)
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/download/) with NPM
* [Ngrok](https://ngrok.com/download)
* [Github](https://github.com/), [Facebook]() and [Twitter]() accounts

## 1. SETUP FACEBOOK ECOSYSTEM

#### Get the starting code
This repository is a fork of Facebook sample code. Start from the original Facebook code (**EchoBot**) or start from this fork (**TweetBot**) and work through the workshop backwards.
* Star repositories [Facebook/EchoBot](https://github.com/fbsamples/messenger-platform-samples) and [Willooz/TweetBot](https://github.com/willooz/messenger-platform-samples)
* Clone the repo: `git clone git@github.com:fbsamples/messenger-platform-samples.git`
* Go to the node folder: `cd messenger-platform-samples/node`
* Open your text editor. We will work with the `app.js` and `config/default.json` files only.

#### Create Facebook page
* Login or create [Facebook](https://www.facebook.com/) account
* Create a Page. Select any page type and category. Add profile and background pictures. Skip everything else.

#### Create Facebook app
* Login or create [Facebook developer](https://developers.facebook.com/) account
* Create an App. Use your bot’s page name for simplicity.
* From the Dashboard, copy **App Secret** and paste it in `config/default.json`

## 2. CONFIGURE AND RUN THE BOT

#### Create Ngrok tunnel
* Create tunnel to port 5000: ```ngrok http 5000```
* Copy **Secure URL** `https://SOMETHING.ngrok.io` and paste it in `config/default.json`

Keep tunnel open in the background even though no server is listening on port 5000 yet.

#### Configure Facebook app
* In PRODUCTS: Add Product > Messenger > Token Generation > Select Page created previously. Copy **Page Access Token** and paste it in `config/default.json`
* Add string of your choice as **Validation Token** in `config/default.json`
* Launch app: `npm start`

You should see the **Node app running on port 5000** in your terminal.

* Return to the Facebook app. In PRODUCTS > Messenger > Webhooks > Setup Webhook, paste Secure URL `https://SOMETHING.ngrok.io/webhook` as **Callback URL**, enter config Validation Token as **Verify Token** and check messages, messaging_postbacks boxes. Save. Subscribe to the Page created earlier.

You should see **Validating token** in your terminal.

#### Talk to your bot! :speech_balloon:
* On your Facebook Page, click the **Send Message** button and start chatting with your bot. Try random messages as well as ‘image’, ‘gif’ and ‘template’.

You have a running bot that echoes your messages! :rocket:

## 3. GREET USERS

#### Add greeting response

All our bot does is echo messages. Let’s have it answer *Hello there!* whenever it receives some sort of greeting.

In `app.js`, all text messages are processed in the `receivedMessage` function and more specifically the switch-case statement. Replace these lines by the following block of code (line 257 to 330).

```javascript
var greeting = new RegExp(/^(yo|ola|hola|howdy|hi|hey|hello)/i);
if (messageText.match(greeting)) {
  sendTextMessage(senderID, "Hello there!");
} else if (messageText.match('image')) {
  sendImageMessage(senderID);
} else if (messageText.match('gif')) {
  sendGifMessage(senderID);
} else if (messageText.match('audio')) {
  sendAudioMessage(senderID);
} else if (messageText.match('button')) {
  sendButtonMessage(senderID);
} else if (messageText.match('generic')) {
  sendGenericMessage(senderID);
} else if (messageText.match('quick reply')) {
  sendQuickReply(senderID);
} else {
  sendTextMessage(senderID, messageText);
}
```

This replaces the switch-case statement by an equivalent if-else statement. We can use if statements to test if text messages match pre-defined string commands like image or gif, but also regular expressions like `greeting`.

* In the terminal, kill the server (Ctrl+C) and restart it `npm start` to greet your bot! :wave:

#### Personalize greeting response

Now let’s have our bot identify users and greet them with their name.

* In the first if-statement that matches greetings, replace the line with the call to `sendTextMessage` by a call to `sayHello` (line 259).
```javascript
if (messageText.match(greeting)) {
  sayHello(senderID);
```
* Define the `sayHello` function that calls Facebook's Graph API and retrieves public user information (line 798).
```javascript
/*
 * Get user profile and say hi with his first name.
 *
 */
function sayHello(senderID) {
  request({
    uri: `https://graph.facebook.com/v2.9/${senderID}`,
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'GET',
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      sendTextMessage(senderID, "Hey " + body.first_name);
    } else {
      console.log(error)
    }
  });
}
```

Restart the server `npm start` to experience a more personal greeting! :sparkles:

## 4. GET TWEETS AND TRENDS

Now to the bot's core purpose. Let’s have it display tweets with illustrations based our a topic of our choice.

#### Create Twitter app
* Login or create [Twitter](https://dev.twitter.com/) account
* Create new App and access your **Consumer Key** and **Consumer Secret** in the Keys and Access Tokens tab
* Obtain an application-only Bearer Token by following [Twitter Oauth2](https://dev.twitter.com/oauth/application-only). This step is tricky. Ask for help when stuck here. Add these Twitter credentials to `config/default.json`
```json
{
  "appSecret": "YOUR_APP_SECRET",
  "pageAccessToken": "YOUR_PAGE_ACCESS_TOKEN",
  "validationToken": "YOUR_VALIDATION_TOKEN",
  "serverURL": "https://SOMETHING.ngrok.io",
  "twitterKey": "YOUR_TWITTER_KEY",
  "twitterSecret": "YOUR_TWITTER_SECRET",
  "twitterBearerToken": "YOUR_TWITTER_BEARER_TOKEN"
}
```

#### Add and configure Twitter client

* Install the Twitter client from the command line: `npm install --save twitter`
* Instantiate the Twitter client in `app.js` (at line 20).
```javascript
var Twitter = require('twitter');
var twitterClient = new Twitter({
  consumer_key: config.get('twitterKey'),
  consumer_secret: config.get('twitterSecret'),
  bearer_token: config.get('twitterBearerToken')
});
```

#### Get Twitter Tweets

* Define a new match pattern for twitter topics in `app.js`, in the `receivedMessage` function (line 265).
```javascript
var hashtag = new RegExp(/^#\w+/i);
```
* Add new match statement (line 274).
```javascript
} else if (messageText.match(hashtag)) {
  var trend = messageText.match(hashtag)[0].replace("#", "%23"); // Make the hashtag API compatible
  getTweets(senderID, trend);
```
* Define new `getTweets` function below the `sayHello` function (line ~830).
```javascript
/*
 * Get tweets for a specific trend, filter those with images and display them as cards.
 *
 */
function getTweets(senderID, trend) {
  twitterClient.get('search/tweets', {q: trend}, function(error, body, response) {
    if (error) {
      console.log(error);
    } else {
      var illustratedTweets = body.statuses.filter(t => { return t.entities.media }).slice(0,3);
      if (illustratedTweets.length > 0) {
        var cards = illustratedTweets.map(t => {
          return {
            title: "@" + t.user.screen_name,
            subtitle: t.text,
            item_url: "https://twitter.com/" + t.user.id_str + "/status/" + t.id_str,
            image_url: t.entities.media[0].media_url
          }
        })
        sendGenericMessage(senderID, cards);
      } else {
        sendTextMessage(senderID, "Sorry, I couldn't find any recent tweets with pictures. 😢")
      }
    }
  });
}
```
* Change the `sendGenericMessage` function to take input data instead of sample data (line 554).
```javascript
function sendGenericMessage(recipientId, cards) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: cards
        }
      }
    }
  };
  callSendAPI(messageData);
}
```

And there we have it, Twitter cards in Messenger! :stuck_out_tongue_closed_eyes:

#### Get Twitter Trends

* Define a new match pattern for when the user wants to learn about trends in `app.js`, in the `receivedMessage` function, under the hastag match (line 277).
```javascript
} else if (messageText.match('trends')) {
  getTrends(senderID);
```
* Define a new `getTrends` function below the `getTweets` function (line ~830).
```javascript
/*
 * Get trends in the Paris area, filter those with # and display them as quick replies.
 *
 */
function getTrends(senderID) {
  twitterClient.get('trends/place', {id: 615702}, function(error, body, response) {
    if (error) {
      console.log(error);
    } else {
      var trends = body[0].trends.filter(t => { return t.name.includes("#") }).slice(0,5).map(t => { return t.name })
      sendQuickReply(senderID, trends);
    }
  });
}
```
* Change the `sendQuickReply` function to take input data instead of sample data (line 644).
```javascript
function sendQuickReply(recipientId, list) {
  var quickReplies = list.map(element => {
    return {
      content_type: "text",
      title: element,
      payload: "DEVELOPER_DEFINED_METADATA"
    }
  })
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Here's what's trending...",
      metadata: "DEVELOPER_DEFINED_METADATA",
      quick_replies: quickReplies
    }
  };
  callSendAPI(messageData);
}
```

Now we know what's trending :fire: before we can sip through related tweets!

## 5. UNDERSTAND NATURAL LANGUAGE

Let’s make our bot understand natural language requests, meaning not just the exact word **trends**, but different inputs that have the same meaning, or intent.

#### Create Recast account
* Login or create a [Recast.ai](https://recast.ai/) account
* Create new Bot and access your **Request Access Token** under the bot's settings
* Add Recast credentials to `config/default.json`
```json
  // ...
  "twitterBearerToken": "YOUR_TWITTER_BEARER_TOKEN",
  "recastRequestAccessToken": "YOUR_RECAST_REQUEST_ACCESS_TOKEN"
}
```

#### Add and configure the Recast client
* Install the Recast Node.js SDK from the command line: `npm install --save recastai`
* Instantiate the Recast client in `app.js` (at line 28).
```javascript
var Recastai = require('recastai')
var recastClient = new Recastai.request(config.get('recastRequestAccessToken'))
```

#### Replace pattern matching by intent-matching
* Replace the entire code inside the `if (messageText)` statement by the following code in `app.js`, in the `receivedMessage` function (line 264 part A.).
```javascript
var hashtag = new RegExp(/^#\w+/i);
if (messageText.match(hashtag)) {
  var trend = messageText.match(hashtag)[0].replace("#", "%23"); // Make the hashtag API compatible
  getTweets(senderID, trend);
} else {
  recastClient.analyseText(messageText).then(function(response) {
    var intent = response.intent().slug
    if (intent == 'greetings') {
      sayHello(senderID)
    } else if (intent == 'goodbye') {
      sendTextMessage(senderID, "Bye, see you soon!")
    } else if (intent == 'trends') {
      getTrends(senderID);
    } else {
      sendTextMessage(senderID, messageText);
    }
  }).catch(function(error) {
    console.log(error)
  })
}
```
Note that the work we did previously is kept in commented part B.

#### Add the new **trends** intent to you Recast bot.

* Under the **train** tab of you bot on the Recast platfrom, create a new intent called **trends**
* Add a few expressions that cover the different ways people might ask for trends. This is how the Recast artificial intelligence engine is trained.

Talk to your bot! And there you have it, a slightly smarter bot that gives you twitter trends and associated tweets. Even when you ask with your own words! :white_check_mark:

Think of how you can make use of the Twitter and Recast APIs to build an even more complete **TweetBot**! :sunglasses:

## REFERENCES

* [Messenger API](https://developers.facebook.com/docs/messenger-platform/)
* [Twitter API](https://dev.twitter.com/rest/reference)
* [Recast.ai API](https://man.recast.ai/)

## License

See the LICENSE file in the root directory of this source tree. Feel free to useand modify the code.
