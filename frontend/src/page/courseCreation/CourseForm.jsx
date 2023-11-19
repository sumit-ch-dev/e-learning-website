import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import "./CourseForm.styles.scss";
import apiInstance from "../../api/apiInstance";

// // Demo categories
// const demoCategories = [
//   { id: "1", name: "Mathematics" },
//   { id: "2", name: "History" },
//   { id: "3", name: "Science" },
// ];

const CoursesForm = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
    },
  });

  // State to store form data
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFormSubmit = (data) => {
    const formDataWithCategory = { ...data, category: selectedCategory };
    onSubmit(formDataWithCategory);
    // console.log("Form Data:", formDataWithCategory);
  };

  const fetchCategories = async () => {
    const response = await apiInstance.get("/categories");
    console.log(response);
    setCategories(response.data);
  };

  const handleAddCategoryOpen = () => {
    setIsAddingCategory(true);
  };

  const handleAddCategoryClose = () => {
    setIsAddingCategory(false);
    setNewCategoryName("");
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === "") {
      // You can add validation or display an error message
      return;
    }

    // Make a request to the server to create a new category
    const response = await apiInstance.post("/categories", {
      name: newCategoryName,
    });

    // Update the categories state with the new category
    fetchCategories();

    // Set the newly created category as the selected category
    setSelectedCategory(response.data._id);

    // Update the form with the new category value
    setValue("categoryId", response.data._id);

    // Close the modal
    handleAddCategoryClose();
  };

  return (
    <div className="course-form">
      <div className="form-container">
        <div className="form-title">Create a New Course</div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
          <div className="form-field">
            <InputLabel>Title</InputLabel>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => <input type="text" {...field} />}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </div>

          <div className="form-field">
            <InputLabel>Description</InputLabel>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => <input type="text" {...field} />}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>

          <div className="form-field">
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="category-label"
                    id="category"
                    value={selectedCategory}
                    label="Category"
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      field.onChange(e);
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>

          <div>
            <Button
              type="button"
              variant="outlined"
              onClick={handleAddCategoryOpen}
            >
              Add New Category
            </Button>
          </div>

          {/* Add New Category Modal */}
          <Dialog open={isAddingCategory} onClose={handleAddCategoryClose}>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
              <TextField
                label="Category Name"
                fullWidth
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddCategoryClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddCategory} color="primary">
                Add Category
              </Button>
            </DialogActions>
          </Dialog>

          <div className="form-buttons">
            <Button type="submit" variant="contained" color="primary">
              Create Course
            </Button>
            <Button type="button" variant="outlined">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoursesForm;
