import React from "react";

const EditModal = ({ userData, onSave, onCancel, onChange }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-8 w-96 rounded-lg">
        <div className="bg-blue-100  rounded-md shadow-lg border mb-6 border-blue-700 ">
          <h2 className="text-lg flex justify-center font-semibold  text-blue-700">
            Edit User
          </h2>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex flex-col">
            <label className="text-gray-900 text-sm mb-1 font-bold">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={onChange}
              className="input-field text-xs py-1 px-2 rounded-md mb-2 text-gray-500 border border-gray-400"
            />
          </div>

          <div className="mb-1 flex flex-col">
            <label className="text-gray-900 text-sm mb-1 font-bold">
              Address:
            </label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={onChange}
              className="input-field text-xs py-1 px-2 rounded-md mb-2 text-gray-500 border border-gray-400"
            />
          </div>
          <div className="mb-1 flex flex-col">
            <label className="text-gray-900 text-sm mb-1 font-bold">
              City:
            </label>
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={onChange}
              className="input-field text-xs py-1 px-2 rounded-md mb-2 text-gray-500 border border-gray-400"
            />
          </div>
          <div className="mb-1 flex flex-col">
            <label className="text-gray-900 text-sm mb-1 font-bold">
              Phone Number:
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={onChange}
              className="input-field text-xs py-1 px-2 rounded-md mb-2 text-gray-500 border border-gray-400"
            />
          </div>
          <div className="flex justify-between gap-1">
            <div className="mb-1 flex flex-col">
              <label className="text-gray-900 text-sm mb-1 font-bold">
                Birthdate:
              </label>
              <input
                type="date"
                name="birthdate"
                value={userData.birthdate}
                onChange={onChange}
                className="input-field text-xs py-1 px-2 rounded-md mb-2 text-gray-500 border border-gray-400"
              />
            </div>
            <div className="mb-1 flex flex-col">
              <label className="text-gray-900 text-sm mb-1 font-bold">
                Gender:
              </label>
              <select
                name="gender"
                value={userData.gender}
                onChange={onChange}
                className="input-field text-xs py-1 px-2 rounded-md mb-2 text-gray-500 border border-gray-400"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onSave}
            className="bg-blue-500 transition duration-300 ease-in-out hover:shadow-lg text-white px-3 text-sm py-2 rounded-md mr-2 hover:opacity-80 "
          >
            Save Changes
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

export default EditModal;
