import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { listEmployees } from "../service/EmployeeService";
import { deleteEmployee } from "../service/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployee = () => {
  const [listEmployee, setListEmployee] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setListEmployee(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then(() => {
        getAllEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSearch(){

  }

  return (
    <div className="container">
      <h2 className="text-center">List Employees</h2>

      <div className="mt-3 mb-3">
        <input type="text" className="form-control" onChange={handleSearch}/>
      </div>  

      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add new employee
      </button>

      <table className="table table-bordered ">
        <thead>
          <tr>
            <th>Employee code</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listEmployee.map((employee) => (
            <tr key="employee.id">
              <td>{employee.employeeCode}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-info "
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeEmployee(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
