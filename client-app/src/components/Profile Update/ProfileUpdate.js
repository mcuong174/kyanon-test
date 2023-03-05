import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./profileUpdateStyle.scss";

const ProfileUpdate = () => {
  const [fullName, setFullName] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        fullName,
        dayOfBirth,
        email,
        phone,
      });
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async (e) => {
    const res = await axios.get(`http://localhost:5000/users/${id}`);

    setFullName(res.data.data[0].fullName);

    const date = new Date(res.data.data[0].dayOfBirth)
      /* Converting the date to a string and then splitting it at the T and taking the first part of
      the array. */
      .toISOString()
      .split("T")[0];
      // .toLocaleDateString('en-GB')
    setDayOfBirth(date);

    setEmail(res.data.data[0].email);
    setPhone(res.data.data[0].phone);
  };

  return (
    <form onSubmit={updateUser} className="profile-form">
      <h3 className="heading">Profile</h3>

      <div className="form-group">
        <label htmlFor="text" className="form-label">
          Full name:
        </label>
        <input
          id="fullName"
          name="fullName"
          required
          type="text"
          onChange={(e) => setFullName(e.target.value)}
          className="form-control"
          value={fullName}
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group">
        <label htmlFor="date" className="form-label">
          Date Of Birth:
        </label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          required
          type="date"
          onChange={(e) => setDayOfBirth(e.target.value)}
          className="form-control"
          value={dayOfBirth}
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          id="email"
          name="email"
          required
          type="text"
          pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          value={email}
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Phone:
        </label>
        <input
          id="phone"
          name="phone"
          required
          type="tel"
          maxLength="9"

          onChange={(e) => setPhone(e.target.value)}
          className="form-control"
          value={phone}
        />
        <span className="form-message"></span>
      </div>

      <div className="footer-form">
        <button className="form-submit">Update</button>
        <button className="form-submit">Cancel</button>
      </div>
    </form>
  );
};

export default ProfileUpdate;
