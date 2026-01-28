import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Debug: Check if MONGODB_URI is loaded
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const adminEmail = "Admin@gmail.com";
    const adminPassword = "@Admin2060";
    
    let admin = await User.findOne({ email: adminEmail.toLowerCase() });
    
    if (admin) {
      admin.role = 'admin';
      await admin.save();
      console.log("✅ Updated existing user to admin");
    } else {
      admin = await User.create({
        name: "Admin",
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log("✅ Created new admin user");
    }
    
    console.log("\n🔐 Admin credentials:");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    console.log("Role:", admin.role);
    
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

createAdmin();