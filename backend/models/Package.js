import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError (important)
const Package =
  mongoose.models.Package || mongoose.model('Package', packageSchema);

export default Package;
