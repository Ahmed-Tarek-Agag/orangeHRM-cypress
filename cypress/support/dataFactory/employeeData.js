import { faker } from '@faker-js/faker';

const randomPhone = () => {
  const n = faker.number.int({ min: 1000000000, max: 9999999999 });
  return n.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

export const generateEmployeeData = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    employee: {
      firstName,
      middleName: faker.person.middleName(),
      lastName,
      employeeID: faker.number.int({ min: 1000, max: 9999 }).toString(),
      username: faker.internet.username({ firstName, lastName }),
      password: faker.internet.password({ length: 8 }) + 'A1!',
    },

    personalDetails: {
      otherID: faker.string.alphanumeric(8),
      driverLicense: faker.string.alphanumeric(10),
      dateOfBirth: faker.date.birthdate().toISOString().split('T')[0],
      licenseExpiryDate: faker.date.future().toISOString().split('T')[0],
      testField: faker.word.noun(),
      commentText: faker.lorem.sentence(),
    },

    contactDetails: {
      streetOne: faker.location.streetAddress(),
      streetTwo: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      homeTelephone: randomPhone(),
      mobile: randomPhone(),
      workTelephone: randomPhone(),
      workEmail: faker.internet.email(),
      otherEmail: faker.internet.email(),
      commentText: faker.lorem.sentence(),
    },

    emergencyContacts: {
        emergencyContactName: faker.person.fullName(),
        relationship: 'Friend',
        homeTelephone: randomPhone(),
        mobile: randomPhone(),
        workTelephone: randomPhone(),
        commentText: faker.lorem.sentence(),
    },

    dependents: {
        dependentName: faker.person.fullName(),
        dependentDateOfBirth: faker.date.birthdate().toISOString().split('T')[0],
        commentText: faker.lorem.sentence(),
    },

    immigration: {
        immigrationNumber: faker.string.alphanumeric(10),
        issuedDate: faker.date.past().toISOString().split('T')[0],
        expiryDate: faker.date.future().toISOString().split('T')[0],
        eligibleStatus: 'Citizen',
        elligableDate: faker.date.future().toISOString().split('T')[0],
        commentText: faker.lorem.sentence(),
    },

    jobDetails: {
        joinedDate: faker.date.past().toISOString().split('T')[0],
        contractStartDate: faker.date.past().toISOString().split('T')[0],
        contractEndDate: faker.date.future().toISOString().split('T')[0],
        notes: faker.lorem.sentence(),
        terminationDate: faker.date.future().toISOString().split('T')[0],
    },

    salaryDetails: {
        salaryComponent: 'Base Salary',
        amount: faker.number.int({ min: 40000, max: 50000 }).toString(),
        accountNumber: faker.finance.accountNumber(10),
        routingNumber: faker.finance.routingNumber(),
        directDepositAmount: faker.number.int({ min: 1000, max: 5000 }).toString(),
        commentText: faker.lorem.sentence(),
    },

    reportTo: {
        supervisorName: 'a',
        commentText: faker.lorem.sentence(),
    },

    qualifications: {
        //Work Experience
        companyName: faker.company.name(),
        jobTitle: faker.company.name(),
        fromDate: faker.date.past().toISOString().split('T')[0],
        toDate: faker.date.future().toISOString().split('T')[0],
        //Education
        instituteName: faker.company.name(),
        major: faker.company.name(),
        graduationYear: faker.number.int({ min: 2000, max: 2025 }).toString(),
        jpaScore: (Math.random() * (4.0 - 2.0) + 2.0).toFixed(2).toString(),
        startDate: faker.date.past().toISOString().split('T')[0],
        endDate: faker.date.future().toISOString().split('T')[0],
        //Skills
        yearsOfExperience: faker.number.int({ min: 1, max: 10 }).toString(),
        //licenses
        licenceNumber: faker.string.alphanumeric(10),
        issuedDateForLicense: faker.date.past().toISOString().split('T')[0],
        expiryDateForLicense: faker.date.future().toISOString().split('T')[0],
        commentText: faker.lorem.sentence(),
    },

    membership: {
        subscriptionAmount: faker.number.int({ min: 100, max: 1000 }).toString(),
        commenceDate: faker.date.past().toISOString().split('T')[0],
        renewalDate: faker.date.future().toISOString().split('T')[0],
        commentText: faker.lorem.sentence(),
    },

    salary: {
      component: 'Base Salary',
      amount: faker.number.int({ min: 40000, max: 50000 }).toString(),
      accountNumber: faker.finance.accountNumber(10),
      routingNumber: faker.finance.routingNumber(),
      directDepositAmount: faker.number.int({ min: 1000, max: 5000 }).toString(),
      commentText: faker.lorem.sentence(),
    }
  };
};
