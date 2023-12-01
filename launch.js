import { exec } from "child_process";

const command = "npm run run";
console.log("Launching SWVOTE...");
const execCommand = () => {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
  });
};
execCommand();
setInterval(execCommand, 1000 * 60 * 35); // 24 hours
