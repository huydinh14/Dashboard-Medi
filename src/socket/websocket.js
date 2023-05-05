class WebSocketClient {
  constructor(url) {
    this.websocket = null;
    this.url = "ws://157.245.204.4:5000";
    this.listeners = {};
  }

  connect() {
    this.websocket = new WebSocket(this.url);
    this.websocket.onopen = () => {
      console.log("WebSocket connected");
      this.websocket.send(JSON.stringify({
        event: "sync",
        data: { warning: "BT" },
      }));
    };

    this.websocket.onclose = () => {
      console.log("WebSocket disconnected");
      this.websocket = null;
      this.reconnect();
    };

    this.websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { type } = data;
      if (type in this.listeners) {
        this.listeners[type].forEach((listener) => {
            return listener(data)
        })
      }
    };
  }

  reconnect() {
    setTimeout(() => {
      console.log("WebSocket reconnecting...");
      this.connect();
      //window.location.reload();
    }, 1000);
  }

  addListener(type, listener) {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  }

  removeListener(type, listener) {
    if (type in this.listeners) {
      this.listeners[type] = this.listeners[type].filter((l) => l !== listener);
    }
  }

  send(data) {
    if (this.websocket) {
      this.websocket.send(JSON.stringify(data));
    }
  }

  disconnect() {
    if (this.websocket) {
      this.websocket.close();
    }
  }
}

const webSocketClient = new WebSocketClient("ws://localhost:5000");

export { webSocketClient };
