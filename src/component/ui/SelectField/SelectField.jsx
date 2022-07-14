import { useState, useEffect } from "react";
import { fetchCategories } from "../../../api/category";
import "./SelectField.scss";

const SelectField = ({ forFilter, onChange, value }) => {
  const [categories, setCategories] = useState(
    forFilter ? [{ id: 0, name: "All" }] : []
  );
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetchCategories();
        const data = await res.json();
        setCategories([...categories,... data]);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);
  
  return (
    <>
      <label htmlFor="category">Category:</label>
      <select id="category" name="category" value={value} onChange={onChange}>
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectField;
