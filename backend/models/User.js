// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//     select: false
//   },
//   savedPackages: Array,
//   savedDestinations: Array,
//   createdAt: { type: Date, default: Date.now }
// });

// // FIXED: Removed 'next' and replaced next() calls with 'return'
// userSchema.pre('save', async function () {
//   // If password isn't modified, just exit the function
//   if (!this.isModified('password')) return;

//   // Hash the password
//   this.password = await bcrypt.hash(this.password, 12);
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   // Since 'password' is set to 'select: false', ensure it's available 
//   // when calling this method in your controller.
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model('User', userSchema);


// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  savedPackages: Array,
  savedDestinations: Array,
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);