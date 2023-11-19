import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import apiInstance from "../../api/apiInstance";

const CourseCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiInstance.get("/categories"); // Replace with your actual API endpoint
        console.log(response);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="category-card-container">
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Link to={`/courses/${category.id}`} className="category-link">
              <Card className="category-card">
                <CardContent className="card-content">
                  <Typography variant="h6">{category.name}</Typography>
                  <Typography variant="body2">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CourseCategories;
