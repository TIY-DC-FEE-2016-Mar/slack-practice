import floop from 'message-sender';

export default class SendPostView {
  constructor(el) {
    this.el = el;

    this.notification = ``;

    this.render();
  }

  listenForClick() {
    this.el.querySelector(`button`).addEventListener(`click`, () => {
      const message = this.el.querySelector(`.post-message`).value;
      const room = this.el.querySelector(`.post-room`).value;

      console.log(`Now sending`, message, `to`, room);

      floop(room, message).
        then(() => {
          this.notification = `Sent '${message}' to '${room}'`;
          this.render();
        }).
        catch((e) => {
          this.notification = `There was an error: ${e}`;
          this.render();
        });
    });
  }

  render() {
    this.el.innerHTML = `
      <h1>Send Post</h1>
      <p>${this.notification}</p>
      <input class='post-message' type='text' placeholder='Message'>
      <input class='post-room' type='text' placeholder='Room Name'>
      <button>Post</button>`;

    this.listenForClick();
  }
}
