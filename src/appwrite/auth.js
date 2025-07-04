import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";


export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.endPoint) 
      .setProject(conf.projectId);
  }
  
} 

const authService = new AuthService();

export default AuthService