const express = require('express');
const mongoose = require('mongoose');
//const ExcelJS = require('exceljs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/IIEST', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define your schemas and models
const videoSchema = new mongoose.Schema({
  videoUrl: String,
  owner: String,
  length: Number,
  genre: String,
  timestamp: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  address: { type: String, unique: true },
  videos: [videoSchema]
});

const User = mongoose.model('User', userSchema);

// Create endpoint to handle video clicks
app.post('/click-video', async (req, res) => {
  const { address, videoUrl,owner, length, genre } = req.body;

  try {
    let user = await User.findOne({ address });

    if (user) {
      // Update existing user document
      user.videos.push({ videoUrl,owner, length, genre });
      await user.save();
    } else {
      // Create new user document
      user = new User({
        address,
        videos: [{ videoUrl,owner, length, genre }]
      });
      await user.save();
    }

    res.status(200).send('Video data stored successfully');
  } catch (error) {
    res.status(500).send('Error storing video data: ' + error.message);
  }
});

// // Create endpoint to export data to Excel
// app.get('/export-excel', async (req, res) => {
//   try {
//     const users = await User.find();

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Videos');

//     // Add headers
//     worksheet.columns = [
//       { header: 'Address', key: 'address', width: 25 },
//       { header: 'Video Name', key: 'videoName', width: 30 },
//       { header: 'Length', key: 'length', width: 10 },
//       { header: 'Genre', key: 'genre', width: 15 },
//       { header: 'Timestamp', key: 'timestamp', width: 20 }
//     ];

//     // Add rows
//     users.forEach(user => {
//       user.videos.forEach(video => {
//         worksheet.addRow({
//           address: user.address,
//           videoName: video.videoName,
//           length: video.length,
//           genre: video.genre,
//           timestamp: video.timestamp
//         });
//       });
//     });

//     // Write to buffer
//     const buffer = await workbook.xlsx.writeBuffer();

//     // Set headers for file download
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename=videos.xlsx');

//     res.send(buffer);
//   } catch (error) {
//     res.status(500).send('Error exporting data to Excel: ' + error.message);
//   }
// });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
