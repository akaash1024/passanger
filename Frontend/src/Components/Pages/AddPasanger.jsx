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
    <div>
      <h2>Welcome, John Doe</h2>
      <p>Email: johndoe@example.com</p>

      <form onSubmit={handleSubmit}>
        <h3>Add Passengers</h3>
        {passengers.map((passenger, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Passenger Name"
              value={passenger.name}
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={passenger.age}
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={passenger.gender}
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={passenger.contact}
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={passenger.email}
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e)}
            />
            <input
              type="file"
              name="id_card"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e)}
            />
            {index > 0 && (
              <button type="button" onClick={() => removePassenger(index)}>
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
