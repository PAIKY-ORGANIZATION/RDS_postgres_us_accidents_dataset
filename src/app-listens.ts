import app from "./app-setup.js";


//* Start Express server
const port = process.env.PORT || 3001 //% It is very likely that it will default to 3001 since I'm no longer specifying as an environment variable.

app.listen(port, () => {
    console.log('Server started on port ' + port);
});



//* Prevent app from crashing on uncaught exceptions (Optional)

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Don't call process.exit()
});


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't call process.exit()
});
