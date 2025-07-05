import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // e.g., "https://cloud.appwrite.io/v1"
      .setProject(conf.appwriteProjectId); // Your Appwrite project ID

    this.account = new Account(this.client);
  }

  // Register a new user
  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(ID.unique(), email, password, name);
      if (user) {
        return this.login({ email, password }); // Auto-login after registration
      }
      return user;
    } catch (error) {
      console.error("Create Account Error:", error.message);
      throw error;
    }
  }

  // Login existing user
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  }

  // Get logged-in user's info
  async getUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // If not logged in, Appwrite throws error, return null instead
      return null;
    }
  }

  // Logout user (delete all sessions)
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("Logout Error:", error.message);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
