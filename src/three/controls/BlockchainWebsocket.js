export default class BlockchainWebsocket {
  constructor(callbacks) {
    this._websocketConnected = false
    this.callbacks = callbacks

    this.openConnection()
  }

  openConnection() {
    this._bchainWsUri = "wss://ws.blockchain.info/inv"
    this._txSocket = new WebSocket(this._bchainWsUri)

    var self = this

    this._txSocket.onopen = function(evt) {
      self.onTxOpen(evt)
    }
    this._txSocket.onclose = function(evt) {
      self.onTxClose(evt)
    }
    this._txSocket.onmessage = function(evt) {
      self.onTxMessage(evt)
    }
    this._txSocket.onerror = function(evt) {
      self.onTxError(evt)
    }
  }

  onTxOpen(evt) {
    console.log("API connected")
    this._websocketConnected = true
    this.callbacks.connectionStatus(this._websocketConnected)
    //this.doTxSend('{"op":"ping_block"}{"op":"blocks_sub"}{"op":"unconfirmed_sub"}');
    this.doTxSend('{"op":"unconfirmed_sub"}')
    this.doTxSend('{"op":"ping_block"}')
    this.doTxSend('{"op":"blocks_sub"}')
  }

  onTxClose(evt) {
    console.log("API disconnected")
    this._websocketConnected = false
    console.log(evt)
    this.callbacks.connectionStatus(this._websocketConnected)
  }

  onTxMessage(evt) {
    if (evt.length === 0) return

    var data = JSON.parse(evt.data)
    //console.log(data);

    //#########################################################################################
    // TRANSACTION RECIEVED
    //#########################################################################################
    if (data.op === "utx") {
      this.callbacks.addTransaction(data.x)
    }

    //#########################################################################################
    // BLOCK RECIEVED
    //#########################################################################################
    if (data.op === "block") {
      this.callbacks.addBlock(data.x)
    }
  }

  onTxError(evt) {
    console.log("API connection error")
    this._websocketConnected = false
    console.log(evt)
  }

  doTxSend(message) {
    if (this._websocketConnected === true) {
      this._txSocket.send(message)
    } else {
      console.log("error sending message to API")
    }
  }

  closeConnection() {
    if (this._websocketConnected === true) {
      console.log("closing connection to API")
      this._txSocket.close()
      this._websocketConnected = false
    } else {
      console.log("not connected to API")
    }
  }
}
