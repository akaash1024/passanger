import { useAuth } from "../../../AuthContextStore";
import { Link } from "react-router-dom";

export const PassangerList = () => {
  const { passangerList } = useAuth();
  console.log("list",passangerList);
  

  return (
    <section className="passanger-section">
      <div className="container">
        <h2>Passenger List</h2>
        <button style={{ backgroundColor: "green" }}>
          <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
            Add Passenger
          </Link>
        </button>
      </div>

      <div className="container passanger-list">
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>ID Card</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {passangerList.map((passenger) => (
              <tr key={passenger._id}>
                <td>
                  <img
                    src={passenger.photo}
                    alt="Profile"
                    width="50"
                    height="50"
                    style={{ borderRadius: "50%" }}
                  />
                </td>
                <td>{passenger.name}</td>
                <td>{passenger.email}</td>
                <td>{passenger.age}</td>
                <td>{passenger.gender}</td>
                <td>{passenger.contact}</td>
                <td>
                  <a
                    href={passenger.id_card}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View ID
                  </a>
                </td>
                <td>
                  <Link
                    to={`/passanger/update/${passenger._id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deletePassenger(passenger._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
