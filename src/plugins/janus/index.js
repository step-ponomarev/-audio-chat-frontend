import Janus from './janus.js';
import adapter from 'webrtc-adapter';

const janus = () => Janus.useDefaultDependencies({
  adapter,
});

export default janus;
