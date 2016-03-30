import slackToken from 'slack-token';

// We already had a function to get the channel id from
// a channel name, so we import that from the message-sender file
import * as MS from 'message-sender';

export default class MessageHistoryView {
  getHistory(channelName) {
    // The pattern below is equivalent to
    // MS.findIdForChannel(channelName).then(channel => stuff(channel))
    // (if you don't want to name the channelIdPromise variable)

    // vvv-- this function doesn't actually return a channel id,
    //       but rather a promise that will eventually contain
    //       the channel id
    const channelIdPromise = MS.findIdForChannel(channelName);
    // We need to wait for that promise to resolve before we
    // have and can use the the channel id
    channelIdPromise.then(channelId => { // unwrap the value inside the promise and call it `channelId` in what follows
      // This is the url and parameters that slack needs to do its thing
      const url = `
          https://slack.com/api/channels.history?
          token=${slackToken}&
          channel=${channelId}`;

      fetch(url)
        .then(r => r.json())
        .then(data => console.log(data.messages)) // For now, just log out the messages in the response data
    })
  }
}
