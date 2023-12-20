import React from "react";

interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  access: string;
}

interface InputUserProps {
  user: User;
  onChange: (updatedUser: User) => void;
}

const InputUser: React.FC<InputUserProps> = ({ user, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...user, [name]: value });
  };

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <div className="col-span-1 relative">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-2 border rounded-lg text-black w-full"
          value={user.username}
          onChange={handleInputChange}
        />
        {user.username.trim() !== "" && (
          <div className="absolute top-0 left-0 bg-dark-blue text-white text-[9px] ml-1 rounded border mt-1 border-dark-blue px-1 py-0.5">
            Username
          </div>
        )}
      </div>

      <div className="col-span-1 relative">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border rounded-lg text-black w-full"
          value={user.password}
          onChange={handleInputChange}
        />
        {user.password.trim() !== "" && (
          <div className="absolute top-0 left-0 bg-dark-blue text-white text-[9px] ml-1 rounded border mt-1 border-dark-blue px-1 py-0.5">
            Password
          </div>
        )}
      </div>

      <div className="col-span-1 relative">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="p-2 border rounded-lg text-black w-full"
          value={user.firstName}
          onChange={handleInputChange}
        />
        {user.firstName.trim() !== "" && (
          <div className="absolute top-0 left-0 bg-dark-blue text-white text-[9px] ml-1 rounded border mt-1 border-dark-blue px-1 py-0.5">
            First Name
          </div>
        )}
      </div>

      <div className="col-span-1 relative">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="p-2 border rounded-lg text-black w-full"
          value={user.lastName}
          onChange={handleInputChange}
        />
        {user.lastName.trim() !== "" && (
          <div className="absolute top-0 left-0 bg-dark-blue text-white text-[9px] ml-1 rounded border mt-1 border-dark-blue px-1 py-0.5">
            Last Name
          </div>
        )}
      </div>

      <div className="col-span-1 relative">
        <input
          type="text"
          name="role"
          placeholder="Role"
          className="p-2 border rounded-lg text-black w-full"
          value={user.role}
          onChange={handleInputChange}
        />
        {user.role.trim() !== "" && (
          <div className="absolute top-0 left-0 bg-dark-blue text-white text-[9px] ml-1 rounded border mt-1 border-dark-blue px-1 py-0.5">
            Role
          </div>
        )}
      </div>

      <div className="col-span-1 relative">
        <input
          type="text"
          name="access"
          placeholder="Access"
          className="p-2 border rounded-lg text-black w-full"
          value={user.access}
          onChange={handleInputChange}
        />
        {user.access.trim() !== "" && (
          <div className="absolute top-0 left-0 bg-dark-blue text-white text-[9px] ml-1 rounded border mt-1 border-dark-blue px-1 py-0.5">
            Access
          </div>
        )}
      </div>
    </div>
  );
};

export default InputUser;
