
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/hamro_ghum_gham");
//     console.log("MongoDB Connected ✅");
//   } catch (error) {
//     console.error("MongoDB connection failed ❌", error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
// connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/hamro_ghum_gham");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
};

module.exports = connectDB;
