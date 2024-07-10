// const mongoose = require('mongoose');
// const express = require('express');
// const app = express();

// const videoSchema = new mongoose.Schema({
//   videoName: String,
//   length: Number,
//   genre: String,
//   timestamp: { type: Date, default: Date.now }
// });

// const userSchema = new mongoose.Schema({
//   address: { type: String, unique: true },
//   videos: [videoSchema]
// });

// const User = mongoose.model('User', userSchema);

// mongoose.connect('mongodb://localhost:27017/IIEST', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });

// const express = require('express');
// const app = express();
// app.use(express.json());

// app.post('/click-video', async (req, res) => {
//   const { address, videoName, length, genre } = req.body;

//   try {
//     const user = await User.findOne({ address });

//     if (user) {
//       // Update existing user document
//       user.videos.push({ videoName, length, genre });
//       await user.save();
//     } else {
//       // Create new user document
//       const newUser = new User({
//         address,
//         videos: [{ videoName, length, genre }]
//       });
//       await newUser.save();
//     }

//     res.status(200).send('Video data stored successfully');
//   } catch (error) {
//     res.status(500).send('Error storing video data');
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

