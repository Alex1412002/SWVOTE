import { exec } from "child_process";

const command = "npm run run";

const execCommand = () => {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
  });
};

setInterval(execCommand, 1000 * 60 * 35); // 24 hours
