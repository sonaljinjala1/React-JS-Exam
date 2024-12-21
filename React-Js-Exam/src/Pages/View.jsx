import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./View.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function View() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem("registeredUser"));
        if (!userLogin) {
            navigate("/login");
        } else {
            const savedUsers = localStorage.getItem("addedUsers")
                ? JSON.parse(localStorage.getItem("addedUsers"))
                : [];
            setUsers(savedUsers);
        }
    }, [navigate]);

    const toggleStatus = (id) => {
        const updatedUsers = users.map((user) =>
            user.id === id ? { ...user, active: !user.active } : user
        );
        localStorage.setItem("addedUsers", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        alert("User status updated successfully!");
    };

    const deleteFunction = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        localStorage.setItem("addedUsers", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        alert("Record deleted successfully!");
    };

    return (
        <div className="view-container">
            <header className="view-header">
                <h1>React JS CRUD</h1>
                <Link to="/add">
                    <button className="add-user-btn">Add User</button>
                </Link>
            </header>

            <div className="view-content">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            const { id, name, username, email, phone, active } = user;
                            return (
                                <tr key={id}>
                                    <td>{index + 1}</td>
                                    <td>{name}</td>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>{phone}</td>
                                    <td>
                                        <button
                                            className={`status-btn ${active ? "active" : "inactive"}`}
                                            onClick={() => toggleStatus(id)}
                                        >
                                            {active ? "Active" : "Inactive"}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{ marginRight: "30px" }}
                                            className="edit-btn"
                                            onClick={() =>
                                                navigate("/edit", {
                                                    state: { id, name, username, email, phone, active }
                                                })
                                            }
                                        >
                                            <MdEdit style={{ fontSize: "20px", border: "0 !important", marginRight: "0px" }} />
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteFunction(id)}
                                        >
                                            <MdDelete style={{ fontSize: "20px", border: "0 !important", marginRight: "0px" }} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default View;
