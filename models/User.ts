import mongoose, { Schema, models, model } from "mongoose";

// Clear any existing model to avoid caching issues
if (models.User) {
  delete models.User;
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  designation: { type: String, trim: true },
  avatar: { type: String, trim: true },
  role: { 
    type: String, 
    enum: ['admin', 'author', 'user'], 
    default: "user" 
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default model("User", UserSchema); 