// custom.d.ts
import { IUser } from './src/models/User';
declare global {
  namespace Express {
    interface Request {
      user?: IUser;  // Add optional user property to the Request interface
    }
  }
}
