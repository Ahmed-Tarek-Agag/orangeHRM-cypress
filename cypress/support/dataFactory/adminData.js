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
        }
    };
}