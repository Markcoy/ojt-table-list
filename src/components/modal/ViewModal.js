import React from "react";

const ViewModal = ({ userData, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-8 w-96 rounded-lg ">
        <div className="bg-green-100  rounded-md shadow-lg border mb-6 border-green-700 ">
          <h2 className="text-lg flex justify-center font-semibold  text-green-700">
            User Details
          </h2>
        </div>
        <div className="mb-4 flex justify-between">
          <strong className="text-gray-900 mr-2">Name:</strong>
          <span className="text-green-700">{userData.name}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <strong className="text-gray-900 mr-2">Birthdate:</strong>
          <span className="text-green-700">{userData.birthdate}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <strong className="text-gray-900 mr-2">Gender:</strong>
          <span className="text-green-700">{userData.gender}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <strong className="text-gray-900 mr-2">Address:</strong>
          <span className="text-green-700">{userData.address}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <strong className="text-gray-900 mr-2">City:</strong>
          <span className="text-green-700">{userData.city}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <strong className="text-gray-900 mr-2">Phone Number:</strong>
          <span className="text-green-700">{userData.phoneNumber}</span>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 transition duration-300 ease-in-out hover:shadow-lg text-white text-sm px-3 py-2 hover:opacity-80 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
