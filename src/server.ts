process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import validateEnv from '@utils/validateEnv';
import ProfileRoute from './routes/profile.route';


validateEnv();

const app = new App([ new AuthRoute() , new ProfileRoute()]);

app.listen();
