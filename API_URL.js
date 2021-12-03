import Constants from "expo-constants";
const { manifest } = Constants;

const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? "http://"+manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `http://3.101.141.11:3000`;
  export default api