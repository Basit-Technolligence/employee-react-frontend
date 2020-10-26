import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { deleteEmployee, fetchEmployees } from "../actions/employee-actions";
import MaterialTableComponent from "./materialTable";

function MaterialTableDemo(props) {
  useEffect(() => {
    props.fetchEmployees();
  }, []);
  const data = props.employeesState.map((emp) => {
    return {
      id: emp._id,
      name: emp.name,
      email: emp.email,
      department: emp.department,
      designation: emp.designation,
      status: emp.status,
    };
  });
  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Department", field: "department" },
    { title: "Designation", field: "designation" },
    { title: "Status", field: "status" },
  ];
  const actions = [
    {
      icon: "check",
      tooltip: "Approve Leave",
      onClick: (event, rowData) => {
        // props.updateLeave(rowData.id, {
        //   status: "Approved by " + designation,
        // });
      },
    },
  ];
  return (
    <MaterialTableComponent
      title="Manage Employees"
      columns={columns}
      data={data}
      // actions={actions}
      list={props.employeesState}
      delete={props.deleteEmployee}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    employeesState: state.employeesReducer.employees,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEmployee: (id) => dispatch(deleteEmployee(id)),
    fetchEmployees: () => {
      dispatch(fetchEmployees());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableDemo);
