import React from 'react'

const AddBook: React.FC = () => (
  <div className="screen screen-add">
    <div className="header-bar" />
    <h2>Add a new book</h2>
    <label className="label">Title</label>
    <div className="input-card" />
    <button className="cta">Add book</button>
  </div>
)

export default AddBook
