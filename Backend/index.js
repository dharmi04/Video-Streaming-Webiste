import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), function (req, res) {
  const lessonId = uuidv4();
  const videoPath = path.resolve(req.file.path);
  const outputPath = path.resolve(`./uploads/courses/${lessonId}`);
  const hlsPath = path.join(outputPath, 'index.m3u8');

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // ffmpeg command
  const ffmpegCommand = `ffmpeg -i "${videoPath}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${path.join(outputPath, 'segment%03d.ts')}" -start_number 0 "${hlsPath}"`;

  console.log("Executing command:", ffmpegCommand);

  exec(ffmpegCommand, (err, stdout, stderr) => {
    if (err) {
      console.error("Error executing FFmpeg command:", err);
      console.error("stderr:", stderr);
      res.status(500).json({ error: "Video conversion failed" });
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  
    const videoUrl = `http://localhost:8000/uploads/courses/${lessonId}/index.m3u8`;
  
    res.json({
      message: "Video converted to HLS format",
      videoUrl: videoUrl,
      lessonId: lessonId,
    });
  });
});

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", function (req, res) {
  res.json({ message: "Hello" });
});

app.listen(8000, function () {
  console.log("App is listening at port 8000");
});
