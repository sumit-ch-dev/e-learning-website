// LessonForm.jsx
import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./LessonForm.styles.scss";

const LessonForm = ({ onSubmit }) => {
  const [lessonData, setLessonData] = useState({
    title: "",
    videoUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(lessonData);
    // Optionally, clear the form or reset the state
    setLessonData({
      title: "",
      videoUrl: "",
    });
  };

  return (
    <div className="lesson-form">
      <div className="form-container">
        <div className="form-title">Add a New Lesson</div>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-field">
            <InputLabel>Title</InputLabel>
            <TextField
              className="lesson-input"
              name="title"
              value={lessonData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <InputLabel>Video URL</InputLabel>
            <TextField
              className="lesson-input"
              name="videoUrl"
              value={lessonData.videoUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-buttons">
            <Button type="submit" variant="contained" color="primary">
              Add Lesson
            </Button>
            {/* Optionally add a cancel button or other actions */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonForm;
