export const employeesReducer = (
  state = {
    employees: [],
  },
  action
) => {
  switch (action.type) {
    case "FETCH_EMPLOYEES":
      return { employees: action.payload };
    case "INSERT_EMPLOYEE":
      return { employees: [...state.employees, action.payload] };
    case "UPDATE_EMPLOYEE":
      return state.employees;
    case "DELETE_EMPLOYEE":
      const copyEmployeesList = [...state.employees];
      const indexToDelete = copyEmployeesList.findIndex(
        (emp) => emp._id === action.payload
      );
      return {
        employees: [
          ...copyEmployeesList.slice(0, indexToDelete),
          ...copyEmployeesList.slice(indexToDelete + 1),
        ],
      };
    default:
      return state;
  }
};
