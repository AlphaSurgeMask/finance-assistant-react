// Requiring express packages to handle routing and uploading
import express from "express";
import fileUpload from "express-fileupload";

// Creating express app
const app = express();

// Use fileUpload as a express middleware
app.use(fileUpload());

// Handle POST requests to the /upload path
app.post("/api/upload", function (req, res) {
  // Check if a valid file has been uploaded
  if (req.files && Object.keys(req.files).length !== 0) {
    // Set the uploaded path
    const uploadedFile = req.files.uploadFile;

    // Logging the uploading of the file
    console.log(uploadedFile);

    // Upload path
    const uploadPath = __dirname + "/uploads/" + uploadedFile.name;

    // Saving the file by using the mv() function
    uploadedFile.mv(uploadPath, function (err) {
      if (err) {
        console.log(err);
        res.send("Failed !!");
      } else {
        res.redirect('/analysis'); 
      }
    });
  } else res.send("No file uploaded !!");
});

// Handle GET requests to the base path
app.get("/", function (req, res) {
  res.status(404).send('<p>Page not found</p>');
});

// Launch the app running on port 3000
app.listen(3000, function () {
  console.log("Started listening to port 3000");
});
