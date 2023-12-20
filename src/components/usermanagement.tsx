import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  access: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const [newUser, setNewUser] = useState<User>({
    id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
    access: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const editUser = (userId: string) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setNewUser(userToEdit);
      setIsEditing(true);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user");
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (isUsernameTaken(newUser.username)) {
      alert("Username is already taken.");
      return;
    }
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to add user.");
      }

      const addedUser: User = await response.json();
      setUsers([...users, addedUser]);
      setNewUser({
        id: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "",
        access: "",
      });
      setIsFormValid(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  const isUsernameTaken = (usernameToCheck: string, userIdToExclude: string | null = null) => {
    return users.some((user) => {
      return user.username === usernameToCheck && user.id !== userIdToExclude;
    });
  };
  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/user?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    validateForm();
  };

  const validateForm = () => {
    const requiredFields = [
      "username",
      "password",
      "firstName",
      "lastName",
      "role",
      "access",
    ];
    const isValid = requiredFields.every(
      (field) => newUser[field].trim() !== ""
    );
    setIsFormValid(isValid);
  };

  const updateUser = async () => {
    if (isUsernameTaken(newUser.username, editingUserId)) {
      alert("Username is already taken.");
      return;
    }
    try {
      const response = await fetch(`/api/user?id=${newUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      const updatedUser: User = await response.json();
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      setNewUser({
        id: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "",
        access: "",
      });
      setIsFormValid(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
 
  
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">User Management</h1>
      <div className="mb-8">
        {isEditing ? (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Edit User</h2>
            <div className=" p-4 w-full rounded-lg mt-2 grid grid-cols-1 md:grid-cols-4 gap-4 text-black">
              <div className="md:col-span-1 w-full">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="p-2 border rounded-lg w-full"
                  value={newUser.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-1">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="p-2 border rounded-lg w-full"
                  value={newUser.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-1">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="p-2 border rounded-lg w-full"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-1">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="p-2 border rounded-lg w-full"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-1">
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  className="p-2 border rounded-lg w-full"
                  value={newUser.role}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-1">
                <input
                  type="text"
                  name="access"
                  placeholder="Access"
                  className="p-2 border rounded-lg w-full"
                  value={newUser.access}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-4">
                <button
                  className={`${
                    isFormValid
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-300 cursor-not-allowed"
                  } text-white py-2 px-4 rounded-lg mr-2`}
                  onClick={updateUser}
                  disabled={!isFormValid}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                  onClick={() => {
                    setEditingUserId(null);
                    setIsEditing(false);
                    setNewUser({
                      id: "",
                      username: "",
                      password: "",
                      firstName: "",
                      lastName: "",
                      role: "",
                      access: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Add User</h2>
            <div className=" p-4 rounded-lg mt-2 grid grid-cols-1 md:grid-cols-4 gap-4 text-black">
              <div className="md:col-span-1">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="p-2 border rounded-lg w-full"
                  value={newUser.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-1">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="p-2 border rounded-lg w-full"
                  value={newUser.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-1">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="p-2 border rounded-lg w-full"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-1">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="p-2 border rounded-lg w-full"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-1">
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  className="p-2 border rounded-lg w-full"
                  value={newUser.role}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-1">
                <input
                  type="text"
                  name="access"
                  placeholder="Access"
                  className="p-2 border rounded-lg w-full"
                  value={newUser.access}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-4">
                <button
                  className={`${
                    isFormValid
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-300 cursor-not-allowed"
                  } text-white py-2 px-4 rounded-lg`}
                  onClick={addUser}
                  disabled={!isFormValid}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">User List</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className="rounded-lg shadow-md p-4 mb-4"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex-grow">
                  <p className="text-lg">{user.username}</p>
                  <p className="text-gray-600">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded-lg"
                  onClick={() => editUser(user.id)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default UserManagement;
