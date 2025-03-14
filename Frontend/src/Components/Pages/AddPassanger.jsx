import { useState } from "react";
import axios from "axios";

const AddPassengers = () => {
  const [passengers, setPassengers] = useState([
    {
      name: "akash",
      age: "24",
      gender: "Male",
      contact: "961022772",
      email: "akash@gmail.com",
      photo: null,
      id_card: null,
    },
  ]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index][name] = value;
    setPassengers(updatedPassengers);
  };

  const handleFileChange = (index, event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const updatedPassengers = [...passengers];
      updatedPassengers[index][name] = files[0];
      setPassengers(updatedPassengers);
    }
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        name: "",
        age: "",
        gender: "",
        contact: "",
        email: "",
        photo: null,
        id_card: null,
      },
    ]);
  };

  const removePassenger = (index) => {
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    passengers.forEach((passenger, index) => {
      Object.keys(passenger).forEach((key) => {
        if (key === "photo" || key === "id_card") {
          if (passenger[key]) {
            formData.append(`passengers[${index}][${key}]`, passenger[key]);
          }
        } else {
          formData.append(`passengers[${index}][${key}]`, passenger[key]);
        }
      });
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/passenger/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        alert("Passengers added successfully!");
        setPassengers([
          {
            name: "",
            age: "",
            gender: "",
            contact: "",
            email: "",
            photo: null,
            id_card: null,
          },
        ]);
      }
    } catch (error) {
      console.error("Error adding passengers:", error);
      alert("Failed to add passengers. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Welcome, User</h2>
      <p>Email: user@gmail.com</p>

      <form onSubmit={handleSubmit}>
        <h3>Add Passengers</h3>

        {passengers.map((passenger, index) => (
          <div key={index} className="passenger-box">
            <div className="input-grid">
              <div className="input">
                <label htmlFor={`name-${index}`}>Name</label>
                <input
                  type="text"
                  name="name"
                  id={`name-${index}`}
                  placeholder="Passenger Name"
                  value={passenger.name}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </div>

              <div className="input">
                <label htmlFor={`age-${index}`}>Age</label>
                <input
                  type="number"
                  id={`age-${index}`}
                  name="age"
                  placeholder="Age"
                  value={passenger.age}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </div>
              <div className="input">
                <label htmlFor={`gender-${index}`}>Gender</label>
                <select
                  name="gender"
                  id={`gender-${index}`}
                  value={passenger.gender}
                  onChange={(e) => handleChange(index, e)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input">
                <label htmlFor={`contact-${index}`}>Contact</label>
                <input
                  type="text"
                  name="contact"
                  id={`contact-${index}`}
                  placeholder="Contact Number"
                  value={passenger.contact}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </div>

              <div className="input">
                <label htmlFor={`email-${index}`}>Email</label>
                <input
                  type="email"
                  id={`email-${index}`}
                  name="email"
                  placeholder="Email"
                  value={passenger.email}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </div>
            </div>

            <div className="input-flex">
              <div className="input">
                <label htmlFor={`photo-${index}`}>Photo</label>
                <input
                  type="file"
                  id={`photo-${index}`}
                  name="photo"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e)}
                />
              </div>

              <div className="input">
                <label htmlFor={`id_card-${index}`}>ID</label>
                <input
                  type="file"
                  name="id_card"
                  id={`id_card-${index}`}
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(index, e)}
                />
              </div>
            </div>

            {index > 0 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removePassenger(index)}
              >
                ❌ Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addPassenger}>
          ➕ Add More
        </button>
        <button type="submit">Submit Passengers</button>
      </form>
    </div>
  );
};

export default AddPassengers;
