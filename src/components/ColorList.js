import React, { useState } from "react";
import Color from "./Color";
import EditMenu from "./EditMenu";
import { axiosWithAuth } from "../helpers/axiosWithAuth"

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    const id = colorToEdit.id;
    axiosWithAuth()
      .put(`/colors/${id}`, colorToEdit)
      .then(() => { 
        updateColors(colors.map((color) => color.id === colorToEdit.id ? colorToEdit : color ) ); 
        setEditing(false) 
        })
      .catch(err=>{
        console.log(err.response)
      })
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res=>{
        updateColors(colors.filter((item) => {return color.id !== item.id}))
      })
      .catch(err=>{
        console.log(err.response)
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} editing={editing} color={color} editColor={editColor} deleteColor={deleteColor}/>)}
      </ul>
      
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.