import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../components/Layout";

const AddCategory = () => {
  const [category, setCategory] = useState({
    //auto increment categoryId
    name: "",
  });
  const storedUser = localStorage.getItem("user");
  const datauser = JSON.parse(storedUser);

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const inputStyle = {
    marginBottom: "10px",
  };

  class NewCategory {
    constructor(name, userId) {
      this.name = name;
      this.userId = userId;
    }
  }

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newCategory = new NewCategory(category.name, datauser.userId);
      await axios.post("http://localhost:3003/categories", newCategory);
      navigate("/");
      toast.success("Category added successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error adding Category!");
    }
  };

  return (
    <div>
      <Layout />
      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <div style={{ flex: "1", marginLeft: "10px", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Category</h2>
          <form style={formStyle} onSubmit={handleSubmit}>
            <div style={inputStyle}>
              <label>Category Name:</label>
              <input
                type="text"
                name="categoryName"
                value={category.name}
                onChange={(event) =>
                  setCategory({
                    ...category,
                    name: event.target.value,
                  })
                }
                required
                style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
            </div>
            <button type="submit" style={{ padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}>
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
