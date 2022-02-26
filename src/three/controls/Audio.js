export default class Audio {
  constructor() {
    this.sound = null
    this.mute = false
    this.soundFile = "https://s3-us-west-2.amazonaws.com/bitbonkers/bitbonk.mp3"
    this.gainNodes = []
    //this.AudioContext = AudioContext || webkitAudioContext;

    var AudioContext =
      window.AudioContext || // Default
      window.webkitAudioContext || // Safari and old versions of Chrome
      false

    if (AudioContext) {
      // Do whatever you want using the Web Audio API
      this.context = new AudioContext()
    } else {
      // Web Audio API is not supported
      // Alert the user
      alert(
        "Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox"
      )
    }

    //this.context = new AudioContext();

    this.maxVol = 0.3

    this.loadSound(this.soundFile)

    //#################################################
    // MAIN VOLUME NODE
    //#################################################

    this.mainGain = this.context.createGain()
    this.mainGain.connect(this.context.destination)
    this.mainGain.gain.value = this.maxVol

    //#################################################
    // DELAY NODE
    //#################################################

    //this.delayNode = this.context.createDelay( 1 );
    //this.delayNode.delayTime.value = 0.05;
    //this.delayNode.connect( this.mainGain );

    //#################################################
    // INDIVIDUAL VOLUMES FOR DIFFERENT SIZE TX
    //#################################################

    this.gainNodes.push(this.context.createGain())
    this.gainNodes.push(this.context.createGain())
    this.gainNodes.push(this.context.createGain())
    this.gainNodes.push(this.context.createGain())
    this.gainNodes.push(this.context.createGain())
    this.gainNodes.push(this.context.createGain())

    this.gainNodes[0].gain.value = 0.025
    this.gainNodes[1].gain.value = 0.05
    this.gainNodes[2].gain.value = 0.1
    this.gainNodes[3].gain.value = 0.25
    this.gainNodes[4].gain.value = 0.5
    this.gainNodes[5].gain.value = 0.75

    for (var i = 0; i < this.gainNodes.length; i++) {
      //this.gainNodes[i].connect(this.delayNode);
      this.gainNodes[i].connect(this.mainGain)
    }
  }

  //#################################################
  // LOAD SOUND
  //#################################################

  loadSound(file) {
    var request = new XMLHttpRequest()
    request.open("GET", file, true)
    request.responseType = "arraybuffer"

    request.onload = function() {
      this.context.decodeAudioData(
        request.response,
        function(buffer) {
          this.sound = buffer
        }.bind(this),
        function() {
          console.log("Error Loading Audio")
        }
      )
    }.bind(this)
    request.send()
  }

  //#################################################
  // PLAY SOUND
  //#################################################

  playSound(speed, volume) {
    var source = this.context.createBufferSource()
    source.buffer = this.sound
    source.playbackRate.value = speed
    //mainGain.gain.value = volume;

    source.connect(this.gainNodes[volume])
    source.start(0)
  }

  //#################################################
  // MUTE SOUND
  //#################################################

  muteSound(mute) {
    this.mainGain.gain.exponentialRampToValueAtTime(
      mute ? 0.001 : this.maxVol,
      this.context.currentTime + 1
    )
  }
}
