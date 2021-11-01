import loaders from './loaders';
import * as express from 'express';
import 'dotenv/config';

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(process.env.PORT, () => {
    // if (err) {
    //   console.log(err);
    //   return;
    // }
    console.log(`✅ Your server is ready !`);
  });
}

startServer();
