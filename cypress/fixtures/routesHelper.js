export const routesHelper = {
  login: () => Cypress.env('routes').login,
  dashboard: () => Cypress.env('routes').dashboard,
  pim: () => Cypress.env('routes').pim,

  personalDetails: (empNumber) =>
    `/web/index.php/pim/viewPersonalDetails/empNumber/${empNumber}`,

  contactDetails: (empNumber) =>
    `/web/index.php/pim/contactDetails/empNumber/${empNumber}`,

  emergencyContacts: (empNumber) =>
    `/web/index.php/pim/viewEmergencyContacts/empNumber/${empNumber}`,

  dependents: (empNumber) =>
    `/web/index.php/pim/viewDependents/empNumber/${empNumber}`,

  immigration: (empNumber) =>
    `/web/index.php/pim/viewImmigration/empNumber/${empNumber}`,

  job: (empNumber) =>
    `/web/index.php/pim/viewJobDetails/empNumber/${empNumber}`,

  salary: (empNumber) =>
    `/web/index.php/pim/viewSalaryList/empNumber/${empNumber}`,

  reportTo: (empNumber) =>
    `/web/index.php/pim/viewReportToDetails/empNumber/${empNumber}`,

  qualifications: (empNumber) =>
    `/web/index.php/pim/viewQualifications/empNumber/${empNumber}`,

  memberships: (empNumber) =>
    `/web/index.php/pim/viewMemberships/empNumber/${empNumber}`
};