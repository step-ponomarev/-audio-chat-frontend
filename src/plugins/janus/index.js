import { Janus } from 'janus-gateway';
import adapter from 'webrtc-adapter';

Janus.init({
  debug: true,
  dependencies: Janus.useDefaultDependencies({ adapter }),
  callback: () => {}
});
