(function() {
  var childProcess = require("child_process");
  childProcess.spawn = require('cross-spawn');
})();
export default {
  config: {
    onError(e) {
      e.preventDefault();
      // console.error(e.message);
    },
  },
  // plugins: [require('dva-logger')()],
};
