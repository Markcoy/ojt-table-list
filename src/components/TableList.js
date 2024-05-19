import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import DeleteModal from "./modal/DeleteModal";
import ViewModal from "./modal/ViewModal";
import EditModal from "./modal/EditModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LiaSortNumericUpAltSolid,
  LiaSortNumericUpSolid,
} from "react-icons/lia";
import { LuFilter } from "react-icons/lu";
import TitleFont from "../components/assets/title.gif";

const TableList = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedUserData, setDeletedUserData] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [newUserData, setNewUserData] = useState({
    name: "",
    birthdate: "",
    gender: "",
    address: "",
    city: "",
    phoneNumber: "",
  });
  const [viewUserData, setViewUserData] = useState(null); // State to manage view modal data
  const [showViewModal, setShowViewModal] = useState(false); // State to manage view modal visibility
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const handleGenderChange = (event) => {
    // Update the newUserData.gender state when the selection changes
    setNewUserData({ ...newUserData, gender: event.target.value });
  };
  const handleEdit = (userData) => {
    setEditedUserData(userData);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => {
        const existingUser = res.data.find(
          (user) =>
            user.name.toLowerCase() === editedUserData.name.toLowerCase() &&
            user.id !== editedUserData.id
        );
        if (existingUser) {
          toast.error("A user with this name already exists.");
        } else {
          axios
            .put(
              `http://localhost:8000/users/${editedUserData.id}`,
              editedUserData
            )
            .then((response) => {
              // Handle successful response
              console.log("Edit saved successfully:", response.data);
              toast.success("Edit saved successfully:");
              setShowEditModal(false); // Close the edit modal
              fetchData(); // Fetch updated data
            })
            .catch((error) => {
              // Handle error
              console.error("Error saving edit:", error);
              // Optionally, you can show an error message to the user
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        // Optionally, you can show an error message to the user
      });
  };
  // Function to handle changes in edit modal inputs
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const fetchData = () => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => {
        let filteredData = res.data;

        // Filter by city if selected
        if (selectedCity) {
          filteredData = filteredData.filter(
            (user) => user.city.toLowerCase() === selectedCity.toLowerCase()
          );
        }

        // Filter by search query
        if (searchQuery) {
          filteredData = filteredData.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Sort the data based on the sortOrder state
        filteredData.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });

        // Set the filtered data to state
        setData(filteredData);

        // Get unique cities for dropdown, case-insensitive
        const uniqueCities = [
          ...new Set(res.data.map((user) => user.city.toLowerCase())),
        ];
        setCities(uniqueCities);
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { name, birthdate, gender, address, city, phoneNumber } = newUserData;

    // Check if all fields are filled
    if (!name || !birthdate || !gender || !address || !city || !phoneNumber) {
      toast.error("All input fields are required.");
      return;
    }

    axios
      .get("http://localhost:8000/users")
      .then((res) => {
        const existingUser = res.data.find(
          (user) => user.name.toLowerCase() === newUserData.name.toLowerCase()
        );
        if (existingUser) {
          toast.error("A user with this name already exists.");
        } else {
          axios
            .post("http://localhost:8000/users", newUserData)
            .then((res) => {
              setShowModal(false);
              setNewUserData({
                name: "",
                birthdate: "",
                gender: "",
                address: "",
                city: "",
                phoneNumber: "",
              });
              fetchData();
              toast.success("User Added!");
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, sortOrder, selectedCity]);

  const handleDelete = (userData) => {
    setDeletedUserData(userData);
    setShowDeleteModal(true);
  };

  const onDeleteConfirmed = () => {
    axios
      .delete(`http://localhost:8000/users/${deletedUserData.id}`)
      .then(() => {
        setShowDeleteModal(false);
        setDeletedUserData(null);
        fetchData();
      })
      .catch((error) => console.log(error));
  };

  const onCancelDelete = () => {
    setShowDeleteModal(false);
    setDeletedUserData(null);
  };
  const handleView = (userData) => {
    setViewUserData(userData); // Set the user data to be viewed
    setShowViewModal(true); // Open the view modal
  };
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const onCloseViewModal = () => {
    setShowViewModal(false); // Close the view modal
    setViewUserData(null); // Clear the user data being viewed
  };
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  return (
    <div className="py-10 text-white bg-[@232325] h-auto flex justify-center">
      <div className="overflow-x-auto ">
        <div className="flex justify-center mb-5">
          <img
            src={TitleFont}
            style={{ width: "500px", height: "auto" }}
            alt="Naruto Run"
          />
        </div>
        <div className="flex justify-center">
          <div className="px-5 py-5  mb-6">
            <div className="flex justify-center mb-4 ">
              <div className="relative shadow-lg shadow-black rounded-md">
                <HiOutlineSearch
                  fontSize={20}
                  className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
                />
                <input
                  type="text"
                  placeholder="Search by 'Name'"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="text-sm text-gray-500 focus:outline-none active:outline-none h-10 w-[24rem] pl-11 border rounded-md border-gray-600  px-4"
                />
              </div>
            </div>
            <div className="flex justify-center gap-1">
              <div className="relative">
                <button
                  onClick={() => setShowModal(true)}
                  className="text-sm shadow-md shadow-black text-gray-500 bg-white  duration-300 ease-in-out  focus:outline-none active:outline-none h-10 w-auto mt-4 border rounded-md border-gray-600 px-4 flex items-center transition-all hover:opacity-60"
                >
                  <div className="flex items-center">
                    <MdOutlinePlaylistAdd
                      fontSize={20}
                      className="text-gray-500"
                      style={{ marginLeft: "-0.25rem", marginRight: "0.25rem" }}
                    />
                    <span>New Data</span>
                  </div>
                </button>
              </div>

              <div className="relative shadow-md rounded-lg shadow-black h-10 mt-4 duration-300 ease-in-out focus:outline-none transition-all hover:opacity-60">
                <LuFilter
                  fontSize={16}
                  className="text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2"
                />
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="text-sm pl-8 pr-4 cursor-pointer text-gray-500 duration-300 ease-in-out focus:outline-none transition-all hover:opacity-60 active:outline-none h-full w-auto border rounded-md border-gray-600"
                >
                  <option value="">Filter by City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <button
                  onClick={handleSort}
                  className="text-sm shadow-md shadow-black text-gray-500 bg-white  duration-300 ease-in-out  focus:outline-none active:outline-none h-10 w-auto mt-4 border rounded-md border-gray-600 px-4 flex items-center transition-all hover:opacity-60"
                >
                  <div className="flex items-center">
                    {sortOrder === "asc" ? (
                      <LiaSortNumericUpSolid
                        fontSize={20}
                        className="text-gray-500"
                        style={{
                          marginLeft: "-0.25rem",
                          marginRight: "0.25rem",
                        }}
                      />
                    ) : (
                      <LiaSortNumericUpAltSolid
                        fontSize={20}
                        className="text-gray-500"
                        style={{
                          marginLeft: "-0.25rem",
                          marginRight: "0.25rem",
                        }}
                      />
                    )}

                    <span> Sort by Birthdate</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table-auto border-collapse border  border-yellow-600 ">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-yellow-200 text-yellow-700 border border-yellow-600">
                ID
              </th>
              <th className="px-4 py-2 bg-yellow-200 text-yellow-700 border border-yellow-600">
                Name
              </th>
              <th className="px-4 py-2 bg-yellow-200 text-yellow-700 border border-yellow-600">
                Birthdate
              </th>
              <th className="px-4 py-2 bg-yellow-200 text-yellow-700 border border-yellow-600">
                Gender
              </th>
              <th className="px-4 py-2 bg-yellow-200 text-yellow-700 border border-yellow-600">
                Address
              </th>
              <th className="px-4 py-2 bg-yellow-200 text-yellow-700 border border-yellow-600">
                City
              </th>
              <th className="px-4 py-2 bg-yellow-200 text-yellow-700 border border-yellow-600">
                Phone Number
              </th>
              <th className="px-4 py-2 bg-yellow-200 text-yellow-700 border border-yellow-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td className="px-4 py-2  text-white border  border-yellow-600 text-center">
                  {user.id}
                </td>
                <td className="px-4 py-2  text-white border  border-yellow-600 text-center">
                  {user.name}
                </td>
                <td className="px-4 py-2  text-white border  border-yellow-600 text-center">
                  {user.birthdate}
                </td>
                <td className="px-4 py-2  text-white border border-yellow-600 text-center">
                  {user.gender}
                </td>
                <td className="px-4 py-2  text-white border border-yellow-600 text-center">
                  {user.address}
                </td>
                <td className="px-4 py-2  text-white border border-yellow-600 text-center">
                  {user.city}
                </td>
                <td className="px-4 py-2  text-white border border-yellow-600 text-center">
                  {user.phoneNumber}
                </td>
                <td className="px-4 py-2 border border-yellow-600">
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleEdit(user)} // Call handleEdit function when Edit button is clicked
                      className="transition duration-300 ease-in-out hover:shadow-lg hover:opacity-80 px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="transition duration-300 ease-in-out hover:shadow-lg hover:opacity-80 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleView(user)} // Call handleView function with user data
                      className="transition duration-300 ease-in-out hover:shadow-lg hover:opacity-80 px-4 py-2 ml-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding new user */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-8 w-96 rounded-lg">
            <div className="bg-gray-100  rounded-md shadow-lg border mb-6 border-gray-700 ">
              <h2 className="text-lg flex justify-center font-semibold  text-gray-700">
                Add New User
              </h2>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-900 mb-1 mr-9 text-sm">Name:</label>
              <input
                type="text"
                name="name"
                value={newUserData.name}
                placeholder="Name"
                onChange={handleInputChange}
                className="input-field  text-xs py-1 px-2 rounded-md mb-2 text-gray-500  border border-gray-400 "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-900 mb-1 mr-5 text-sm">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={newUserData.address}
                placeholder="Address"
                onChange={handleInputChange}
                className="input-field  text-xs py-1 px-2 rounded-md mb-2 text-gray-500 border border-gray-400 "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-900 mb-1 mr-14 text-sm">City:</label>
              <input
                type="text"
                name="city"
                value={newUserData.city}
                placeholder="City"
                onChange={handleInputChange}
                className="input-field  text-xs py-1 px-2 rounded-md mb-2 text-gray-500 border border-gray-400 "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-900 mb-1 mr-14 text-sm">
                Mobile:
              </label>
              <input
                type="number"
                name="phoneNumber"
                value={newUserData.phoneNumber}
                placeholder="Mobile"
                onChange={handleInputChange}
                className="input-field text-xs py-1 px-2 rounded-md mb-2 text-gray-500 border border-gray-400"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <label className="text-gray-900 mb-1 mr-14 text-sm">
                  Birthdate:
                </label>
                <input
                  type="date"
                  name="birthdate"
                  value={newUserData.birthdate}
                  onChange={handleInputChange}
                  className="input-field  text-xs py-1 px-2 rounded-md mb-4 text-gray-500 border border-gray-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-900 mb-1 mr-14 text-sm">
                  Gender:
                </label>
                <select
                  id="gender"
                  value={newUserData.gender}
                  onChange={handleGenderChange}
                  className="input-field  text-xs py-1 px-2 rounded-md mb-4 text-gray-500 border border-gray-400"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-1 mt-2">
              <button
                onClick={handleSubmit}
                className="bg-green-500 transition duration-300 ease-in-out hover:shadow-lg text-white text-sm px-3 py-2 hover:opacity-80 rounded-md"
              >
                Add User
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="ml-2 bg-gray-500 transition duration-300 ease-in-out hover:shadow-lg text-white px-3 py-2 text-sm hover:opacity-80 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && deletedUserData && (
        <DeleteModal
          userData={deletedUserData}
          onDelete={onDeleteConfirmed}
          onCancel={onCancelDelete}
        />
      )}
      {showViewModal && viewUserData && (
        <ViewModal userData={viewUserData} onClose={onCloseViewModal} />
      )}
      {showEditModal && (
        <EditModal
          userData={editedUserData}
          onSave={handleSaveEdit}
          onCancel={() => setShowEditModal(false)}
          onChange={handleEditInputChange}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default TableList;
