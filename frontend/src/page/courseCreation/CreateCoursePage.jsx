// CreateCoursePage.jsx
import React, { useState } from "react";
import { Button, Typography, Container, Grid } from "@mui/material";
import CoursesForm from "./CourseForm";
import LessonForm from "./LessonForm";
import "./CreateCoursePage.styles.scss";

const CreateCoursePage = () => {
  const [courseData, setCourseData] = useState(null);
  const [lessons, setLessons] = useState([]);

  const handleCourseSubmit = (data) => {
    setCourseData(data);
  };

  const handleLessonSubmit = (data) => {
    setLessons((prevLessons) => [...prevLessons, data]);
  };

  const handleFinalSubmit = async () => {
    try {
      // Your API submission logic here
      console.log("Course Data:", courseData);
      console.log("Lessons:", lessons);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <div className="form-section">
            <Typography variant="h2">Course Information</Typography>
            <CoursesForm onSubmit={handleCourseSubmit} />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="form-section">
            <Typography variant="h2">Lesson Information</Typography>
            <LessonForm onSubmit={handleLessonSubmit} />
          </div>
        </Grid>
      </Grid>

      <div className="form-section">
        <Typography variant="h2">Final Submission</Typography>
        <Button variant="contained" color="primary" onClick={handleFinalSubmit}>
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default CreateCoursePage;
