import {faker} from '@faker-js/faker';

export const generateAdminData = () => {
    return {
        jobTitleDetails: {
            title: faker.person.jobTitle(),
            description: faker.lorem.paragraph(),
            note: faker.lorem.sentence(),
        },
        payGradeDetails: {
            name: faker.finance.currencyName(),
            currencyIndex: 'USD - United States Dollar',
            minSalary: faker.number.int({ min: 1000, max: 5000 }),
            maxSalary: faker.number.int({ min: 5001, max: 10000 }),
        },
        employmentStatusDetails: {
            name: faker.person.jobType(),
        },
        jobCategoryDetails: {
            name: faker.person.jobTitle(),
        },
        workShiftDetails: {
            name: faker.company.name(),
            hoursInput: faker.number.int({ min: 1, max: 12 }).toString(),
            minutesInput: faker.number.int({ min: 0, max: 59 }).toString(),
            assignedEmployees: 'a',
        },
        skillsDetails: {
            name: faker.hacker.noun(),
            description: faker.lorem.sentence(),
        },
        educationDetails: {
            name: faker.company.name(),
        },
        licenceDetails: {
            name: faker.word.sample(),
        },
        languageDetails: {
            name: faker.person.jobType(),
        },
        membershipDetails: {
            name: faker.company.name(),
        },
        nationalityDetails: {
            name: faker.location.country(),
        },
    };
}