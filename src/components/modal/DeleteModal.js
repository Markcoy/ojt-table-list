import React from "react";

const DeleteModal = ({ userData, onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-8 w-96 rounded-lg ">
        <div className="bg-red-100  shadow-lg rounded-md border mb-6 border-red-700 ">
          <h2 className="text-lg flex justify-center font-semibold  text-red-700">
            Delete User
          </h2>
        </div>
        <p className="italic text-red-500 text-sm">
          Are you sure you want to delete the following user?
        </p>
        <div className="mt-4 text-gray-600">
          <div className="mb-4 flex justify-between">
            <strong className="text-gray-900 mr-2">Name:</strong>
            <span className="text-red-700">{userData.name}</span>
          </div>
          <div className="mb-4 flex justify-between">
            <strong className="text-gray-900 mr-2">Birthdate:</strong>
            <span className="text-red-700">{userData.birthdate}</span>
          </div>
          <div className="mb-4 flex justify-between">
            <strong className="text-gray-900 mr-2">Gender:</strong>
            <span className="text-red-700">{userData.gender}</span>
          </div>
          <div className="mb-4 flex justify-between">
            <strong className="text-gray-900 mr-2">Address:</strong>
            <span className="text-red-700">{userData.address}</span>
          </div>
          <div className="mb-4 flex justify-between">
            <strong className="text-gray-900 mr-2">City:</strong>
            <span className="text-red-700">{userData.city}</span>
          </div>
          <div className="mb-4 flex justify-between">
            <strong className="text-gray-900 mr-2">Phone Number:</strong>
            <span className="text-red-700">{userData.phoneNumber}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onDelete}
            className="bg-red-500 transition duration-300 ease-in-out hover:shadow-lg text-white px-3 text-sm py-2 rounded-md mr-2 hover:opacity-80 "
          >
            Confirm Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 transition duration-300 ease-in-out hover:shadow-lg text-white px-3 py-2 text-sm rounded-md hover:opacity-80"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
