import Janus from 'janus-gateway-js';

const janus = new Janus.Client('ws://localhost:8188', {
  token: 'token',
  apisecret: 'apisecret',
  keepalive: 'true'
});

export default janus;
