const { exec } = require("child_process");
const cron = require("node-cron");

// Schedule the build process every 10 minutes
cron.schedule("*/10 * * * *", () => {
  console.log("Starting React build process...");
  
  // Run the build command in the client folder
  exec("cd ../client && npm run build", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during build: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Build stderr: ${stderr}`);
    }
    console.log(`Build stdout: ${stdout}`);
    console.log("React build process completed.");
  });
});

console.log("Build scheduler is running...");
