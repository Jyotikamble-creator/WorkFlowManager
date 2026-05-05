
// Central place to manage user roles for the application
const ROLES = {
  ADMIN: 'admin',      // Admin role (full access)
  MANAGER: 'manager', // Manager role (can assign/manage tasks)
  EMPLOYEE: 'employee'// Employee role (can view/complete tasks)
};

// Export the roles object for use in access control and validation
module.exports = ROLES;
