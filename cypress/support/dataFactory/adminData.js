import {faker} from '@faker-js/faker';

export const generateAdminData = () => {
    return {
        jobTitleDetails: {
            title: faker.person.jobTitle(),
            description: faker.lorem.paragraph(),
            note: faker.lorem.sentence(),
        }
    };
}