import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../service/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [employeeCode, setEmployeeCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    employeeCode: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((res) => {
          setEmployeeCode(res.data.employeeCode);
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    const employee = { employeeCode, firstName, lastName, email };

    if (validateForm()) {
      if (id) {
        updateEmployee(id, employee)
          .then(() => {
            navigator("/employees");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        createEmployee(employee)
          .then(() => {
            navigator("/employees");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (employeeCode.trim()) {
      errorsCopy.employeeCode = "";
    } else {
      errorsCopy.employeeCode = "First name is required";
      valid = false;
    }

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center mt-3 fw-bold ">Update Employee</h2>;
    } else {
      return <h2 className="text-center mt-3 fw-bold ">Add Employee</h2>;
    }
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
            <div className="form-group mb-2">

                <label htmlFor="employeeCode" className="form-label; fw-bold ">
                  Employee code:
                </label>
                <input
                  id="employeeCode"
                  type="text"
                  className={`form-control ${
                    errors.employeeCode ? "is-invalid" : ""
                  }`}
                  placeholder="Enter employee employee code ..."
                  value={employeeCode}
                  onChange={(e) => setEmployeeCode(e.target.value)}
                />
                {errors.employeeCode && (
                  <div className="invalid-feedback">{errors.employeeCode}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="firstName" className="form-label; fw-bold ">
                  First name:
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter employee fisrt name ..."
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="lastName" className="form-label; fw-bold ">
                  Last name:
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter employee last name ..."
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="email" className="form-label; fw-bold ">
                  Email:
                </label>
                <input
                  id="email"
                  type="text"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter employee email ..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
