import React, { useState, useEffect } from "react";

function UserTable() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerStyle = {
    background: "black",
    color: "white",
    padding: "20px",
  };

  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    border: "1px solid white",
  };

  const thStyle = {
    borderBottom: "1px solid white",
    padding: "8px",
  };

  const tdStyle = {
    padding: "8px",
  };

  const imgStyle = {
    maxWidth: "100px",
    maxHeight: "100px",
  };

  const tdPlusStyle = {
    borderLeft: "5px solid black",
  };

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.users)) {
          setUserData(data.users);
        } else {
          console.error("Data is not in the expected format:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <h1>Dummy Data</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : userData && userData.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>S.No</th>
              <th style={thStyle}>Profile Pic</th>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>Gender</th>
              <th style={thStyle}>E-mail</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Domain</th>
              <th style={thStyle}>University</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td style={tdStyle}>{index + 1}</td>
                <td>
                  <img src={user.image} alt="Profile Pic" style={imgStyle} />
                </td>
                <td style={tdStyle}>{user.firstName}</td>
                <td style={tdStyle}>{user.lastName}</td>
                <td style={tdStyle}>{user.gender}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.username}</td>
                <td style={tdStyle}>{user.domain}</td>
                <td style={{ ...tdStyle, ...tdPlusStyle }}>
                  {user.university}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Data is not available or in the wrong format.</p>
      )}
    </div>
  );
}

export default UserTable;
