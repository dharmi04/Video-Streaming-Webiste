# Stream Forge

## Overview

This backend application is built using Node.js with the Express framework. It facilitates the upload of video files, converts them into HLS (HTTP Live Streaming) format using FFmpeg, and provides a URL to access the converted video. The backend also uses `multer` for handling file uploads and `uuid` for generating unique identifiers.

## Prerequisites

- Node.js (>= 16.x)
- [FFmpeg installed globally ](https://ffmpeg.org/download.html)


## Directory Structure

- `./uploads`: Directory where uploaded files and converted videos are stored.
- `./uploads/courses`: Subdirectory under `uploads` for storing converted video segments.



### Detailed Explanation

#### Node.js with Express Framework

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine, enabling server-side execution of JavaScript code. It is designed for building scalable network applications with its non-blocking, event-driven architecture, which is well-suited for handling file uploads.

- **Express**: A minimal and flexible Node.js web application framework that simplifies routing and handling HTTP requests. It provides a robust set of features for building web and mobile applications efficiently.

#### File Upload and Conversion Process

1. **File Upload Handling:**

   - **Multer**: A middleware for handling `multipart/form-data`, used to upload files. In this application:
     - Files are stored in the `./uploads` directory.
     - Each file is given a unique name by appending a UUID to the original filename, ensuring there are no conflicts.
     - `multer` manages the file upload process seamlessly, saving the file with a unique identifier to avoid overwrites.

2. **Video Conversion to HLS Format:**

   - **FFmpeg**: An open-source tool for processing multimedia files. This application uses FFmpeg to convert uploaded video files into HLS format:
     - **Video Codec**: `libx264` is used for encoding the video.
     - **Audio Codec**: `aac` is used for encoding the audio.
     - **Segment Duration**: `-hls_time 10` specifies that each video segment will be approximately 10 seconds long.
     - **Playlist Type**: `-hls_playlist_type vod` indicates that the video is for Video On Demand.
     - **Segment Filename**: `-hls_segment_filename "segment%03d.ts"` sets the format for naming the video segments.
     - **Starting Number**: `-start_number 0` starts the segment numbering from 0.
   - The conversion command is executed using Node.js’s `child_process.exec` to run shell commands from within the Node.js environment.

3. **Providing Access to the Converted Video:**

   - After successful conversion, the server generates a URL to the HLS playlist file (`index.m3u8`) and returns this URL to the client.
   - The converted video segments and playlist are stored in a directory named with a unique `lessonId`, located under `./uploads/courses`.

#### Additional Functionalities

- **CORS (Cross-Origin Resource Sharing):** The server is configured to allow cross-origin requests from `http://localhost:3000` and `http://localhost:5173`, enabling frontend applications hosted on these domains to interact with the backend.

- **Static File Serving:** The server serves static files from the `./uploads` directory, allowing direct access to the converted video segments and playlist files via HTTP requests.

- **Error Handling:** The application handles errors during file upload and video conversion, returning appropriate error messages and status codes to the client.

## API Endpoints

### `POST /upload`

Uploads a video file and converts it to HLS format.

**Request:**

- **Form-data:**
  - `file`: The video file to be uploaded (must be a single file).

**Response:**

- **Success (200 OK):**
  ```json
  {
    "message": "Video converted to HLS format",
    "videoUrl": "http://localhost:8000/uploads/courses/<lessonId>/index.m3u8",
    "lessonId": "<lessonId>"
  }
