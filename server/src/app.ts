import loaders, { dbLoader } from './loaders';
import * as express from 'express';
import config from './config';

export const app = express();

export async function startServer() {
  await loaders({ expressApp: app });
  await dbLoader({});
}

function listenServer() {
  app.listen(config.PORT, () => {
    console.log(`✅ Your server is ready !`);
  });  
}

if (process.env.NODE_ENV !== 'test'){
  startServer().then(()=>{
    listenServer();
  })
}