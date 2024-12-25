const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5 MB
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    section: { type: String, required: true },
    semester: { type: String, required: true },
    usn: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    message: { type: String }, // Optional for voters
    photo: { type: String },
});

const voterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    section: { type: String, required: true },
    semester: { type: String, required: true },
    usn: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }
});

const Candidate = mongoose.model('Candidate', candidateSchema);
const Voter = mongoose.model('Voter', voterSchema);

app.post('/api/register', upload.single('photo'), async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    if (req.body.role === 'candidate' && !req.file) {
        return res.status(400).json({ message: "No file uploaded for candidate." });
    }

    try {
        const { name, section, semester, usn, email, message, role } = req.body;
        const photo = req.file ? req.file.filename : null;

        // Validate required fields
        if (!name || !section || !semester || !usn || !email || !role) {
            return res.status(400).json({ message: "All fields are required." });
        }

        console.log("Received data:", { name, section, semester, usn, email, message, role, photo });

        if (role === 'candidate') {
            const newCandidate = new Candidate({ name, section, semester, usn, email, message, photo });
            await newCandidate.save();
            return res.json({ message: "Candidate registration successful!" });
        } else if (role === 'voter') {
            const newVoter = new Voter({ name, section, semester, usn, email });
            await newVoter.save();
            return res.json({ message: "Voter registration successful!" });
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }
    } catch (err) {
        console.error("Error saving data:", err.stack); // Log the stack trace
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/api/voters', async (req, res) => {
    try {
        const voters = await Voter.find();
        res.json(voters);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.get('/api/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});