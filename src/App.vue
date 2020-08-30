<template>
  <div id="app">
    <CreateRoomButton/>
  </div>
</template>

<script>
import webSocketService from "@/service/webSocketService";
// eslint-disable-next-line no-unused-vars
import Peer from 'peerjs';
import CreateRoomButton from "@/components/CreateRoomButton";

export default {
  name: 'App',
  components: { CreateRoomButton },
  data: () => ({
    src: '',
    sender: false,
    peerConnection: null,
    message: ''
  }),
  mounted() {
    webSocketService.connect(() => {
      webSocketService.stompClient.subscribe('/topic/guestList', (guest) => {
        console.log(guest);
      });
    }, () => {
      console.warn('HERE');
    });

    fetch('http://localhost:8080/api/room/create').then(async res => {
      console.log(await res.text());
    })
  }
  // async mounted() {
  //   const configuration = {
  //     'iceServers': [
  //       {
  //         'urls':
  //           'stun:stun.l.google.com:19302'
  //       },
  //       { "urls": "turn:numb.viagenie.ca", "username": "webrtc@live.com", "credential": "muazkh" }
  //     ]
  //   }
  //   this.peerConnection =  new RTCPeerConnection(configuration);
  //
  //   this.peerConnection.on('connection', (conn) => {
  //     conn.on('data', (data) => {
  //       console.log(data);
  //     })
  //   })
  //   const remoteStream = new MediaStream();
  //
  //   this.peerConnection.onicecandidate =
  //     e => this.peerConnection.addIceCandidate(e.candidate,
  //       () => console.log('succes'),
  //       () => console.log('error'));
  //
  //   this.peerConnection.addEventListener('track', (event) => {
  //     remoteStream.addTrack(event.track);
  //
  //     this.$refs.video.srcObject = remoteStream;
  //     this.$refs.video.autoplay = true;
  //     this.$refs.video.playsInline = true;
  //     this.$refs.video.muted = true;
  //   });
  //
  //   webSocketService.stompClient.connect({}, async () => {
  //     webSocketService.stompClient.subscribe('/topic/peer', async msg => {
  //       const body = await JSON.parse(msg.body);
  //
  //       if (body.answer && this.sender) {
  //         const remoteDesc = await new RTCSessionDescription(body.answer);
  //         await this.peerConnection.setRemoteDescription(remoteDesc);
  //
  //       } else if (body.offer && !this.sender) {
  //         await this.peerConnection.setRemoteDescription(new RTCSessionDescription(body.offer));
  //
  //         const answer = await this.peerConnection.createAnswer();
  //         await this.peerConnection.setLocalDescription(answer);
  //
  //         await webSocketService.sendMessage({ 'answer': answer });
  //       }
  //     })
  //   });
  // },
  // methods: {
  //   async addMessage() {
  //     const gumStream = await navigator.mediaDevices.getUserMedia(
  //       { audio: false, video: true });
  //
  //     const video = document.createElement('video');
  //     video.srcObject = gumStream;
  //     video.id = 'vid';
  //     document.querySelector('#app').appendChild(video);
  //     document.querySelector('#vid').play();
  //
  //     for (const track of gumStream.getTracks()) {
  //       this.peerConnection.addTrack(track, gumStream);
  //     }
  //
  //     this.sender = true;
  //     const offer = await this.peerConnection.createOffer();
  //     await this.peerConnection.setLocalDescription(offer);
  //     await webSocketService.sendMessage({ 'offer': offer });
  //   }
  // }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
