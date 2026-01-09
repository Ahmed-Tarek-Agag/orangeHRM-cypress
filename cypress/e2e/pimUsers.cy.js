/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import { routesHelper } from '../fixtures/routesHelper';
import { onNavigationToPages } from '../pages/navigationToPages';
import { onGeneralMethods } from '../pages/generalMethods';
import { onAddEmployeePage } from "../pages/PIM/addEmployeePage";
import { onPersonalDetailsPage } from '../pages/PIM/personalDetailsPage';
import { onContactDetailsPage } from '../pages/PIM/contactDetailsPage';
import { onEmergencyContactsPage } from '../pages/PIM/emergencyContactsPage';
import { onDependentsPage } from '../pages/PIM/dependentsPage';
import { onImmigrationPage } from '../pages/PIM/immigrationPage';
import { onJobPage } from '../pages/PIM/jobPage';
import { onSalaryPage } from '../pages/PIM/salaryPage';

const randomPhone = () => {
    const n = faker.number.int({ min: 1000000000, max: 9999999999 });
    return n.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

// Attachments file paths
const attachmentFilePath = 'cypress/fixtures/files/TestPDF.pdf';
const profileImagePath = 'cypress/fixtures/files/profileImage.jpg';

// Generate random data for the new employee
const firstName = faker.person.firstName();
const middleName = faker.person.middleName();
const lastName = faker.person.lastName();
const employeeID = faker.number.int({ min: 1000, max: 9999 }).toString();
const fullName = `${firstName} ${lastName}`;
const username = faker.internet.username({ firstName, lastName });
const password = faker.internet.password({ length: 8 }) + "A1!";

// Generate random data for personal details
const otherID = faker.string.alphanumeric(8);
const driverLicense = faker.string.alphanumeric(10);
const dateOfBirth = faker.date.birthdate().toISOString().split('T')[0]; // Format: YYYY-MM-DD
const licenseExpiryDate = faker.date.future().toISOString().split('T')[0]; // Format: YYYY-MM-DD
const testField = faker.word.noun();
const commentText = faker.lorem.sentence();

// Genereate random data for contact details
const streetOne = faker.location.streetAddress();
const streetTwo = faker.location.secondaryAddress();
const city = faker.location.city();
const state = faker.location.state();
const zipCode = faker.location.zipCode();
const homeTelephone = randomPhone();
const mobile = randomPhone();
const workTelephone = randomPhone();
const workEmail = faker.internet.email();
const otherEmail = faker.internet.email();

// Generate random data for emergency contacts
const emergencyContactName = faker.person.fullName();
const relationship = 'Friend';

// Generate random data for dependents
const dependentName = faker.person.fullName();
const dependentDateOfBirth = faker.date.birthdate().toISOString().split('T')[0]; // Format: YYYY-MM-DD

// Generate random data for immigration
const immigrationNumber = faker.string.alphanumeric(12);
const issuedDate = faker.date.past().toISOString().split('T')[0]; // Format: YYYY-MM-DD
const expiryDate = faker.date.future().toISOString().split('T')[0]; // Format: YYYY-MM-DD
const eligibleStatus = 'Citizen';
const elligableDate = faker.date.future().toISOString().split('T')[0]; // Format: YYYY-MM-DD

// Generate random data for job details
const joinedDate = faker.date.past().toISOString().split('T')[0]; // Format: YYYY-MM-DD
const contractStartDate = faker.date.past().toISOString().split('T')[0]; // Format: YYYY-MM-DD
const contractEndDate = faker.date.future().toISOString().split('T')[0]; // Format: YYYY-MM-DD
const note = faker.lorem.sentence();
const terminationDate = faker.date.future().toISOString().split('T')[0]; // Format: YYYY-MM-DD  

// Generate random data for salary details
const salaryComponent = 'Base Salary';
const amount = Math.floor(Math.random() * (50000 - 40000 + 1)) + 40000;
const accountNumber = faker.finance.accountNumber(10);
const routingNumber = faker.finance.routingNumber();
const directDepositAmount = faker.number.int({ min: 1000, max: 5000 }).toString();




let employeeNumber;
describe('PIM Users Management', () => {

    before(() => {
        cy.login();
    });

    beforeEach(() => {
        cy.login();
        const dashboardUrl = routesHelper.dashboard();
        if (!dashboardUrl) throw new Error('Dashboard URL is not defined in routesHelper');
        cy.visit(dashboardUrl);
    });


    it('Should add a new employee and create login details', () => {
        onNavigationToPages.navigateToPimPage();

        onAddEmployeePage.fillEmployeeDetails(
            firstName,
            middleName,
            lastName,
            employeeID,
            profileImagePath
        );

        onAddEmployeePage.createLoginDetails(
            username,
            password,
            password
        );

        cy.url().then((url) => {
            employeeNumber = url.split('/').pop();
            if (!employeeNumber) throw new Error('Failed to capture employee number from URL');
            cy.log('Captured Employee Number: ' + employeeNumber);
        });

    });

    it('Should navigate to Personal Details of the created employee and complete personal details', () => {
        cy.visit(routesHelper.personalDetails(employeeNumber), { failOnStatusCode: false });
        onPersonalDetailsPage.fillPersonalDetails(
            otherID,
            driverLicense,
            5,
            licenseExpiryDate,
            2,
            dateOfBirth
        );

        onPersonalDetailsPage.fillCustomFields(
            3,
            testField
        );

        onGeneralMethods.uploadAttachment(
            attachmentFilePath,
            commentText
        );

        onGeneralMethods.assertOnDescriptionOnAttachment(commentText);

        onGeneralMethods.editAddedAttachment(commentText);

        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    });


    it('Should navigate to Contact Details of the created employee and fill contact details', () => {
        cy.visit(routesHelper.contactDetails(employeeNumber), { failOnStatusCode: false });

        onContactDetailsPage.fillAddressDetails(
            streetOne,
            streetTwo,
            city,
            state,
            zipCode,
            5
        );
        onContactDetailsPage.fillTelephoneDetails(
            homeTelephone,
            mobile,
            workTelephone
        );
        onContactDetailsPage.fillEmailDetails(
            workEmail,
            otherEmail
        );
        onGeneralMethods.uploadAttachment(
            attachmentFilePath,
            commentText
        );

        onGeneralMethods.assertOnDescriptionOnAttachment(commentText);

        onGeneralMethods.editAddedAttachment(commentText);

        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();

    });

    it('Should navigate to Emergency Contacts and add an emergency contact', () => {
        cy.visit(routesHelper.emergencyContacts(employeeNumber), { failOnStatusCode: false });
        onEmergencyContactsPage.addEmergencyContact(
            emergencyContactName,
            relationship,
            homeTelephone,
            mobile,
            workTelephone
        );

        onEmergencyContactsPage.deleteEmergencyContact(emergencyContactName);

        onEmergencyContactsPage.uploadAttachment(
            attachmentFilePath,
            commentText
        );

        onGeneralMethods.assertOnDescriptionOnAttachment(commentText);

        onGeneralMethods.editAddedAttachment(commentText);

        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();

    });

    it('Should navigate to Dependents and add a dependent', () => {
        cy.visit(routesHelper.dependents(employeeNumber), { failOnStatusCode: false });
        onDependentsPage.addDependent(
            dependentName,
            1,
            dependentDateOfBirth
        );
        onDependentsPage.deleteDependent();
        onDependentsPage.uploadAttachment(
            attachmentFilePath,
            commentText
        );
        onDependentsPage.assertOnDescriptionOnAttachment(commentText);
        onGeneralMethods.editAddedAttachment(commentText);
        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    });

    it('Should navigate to Immigration and add an immigration record', () => {
        cy.visit(routesHelper.immigration(employeeNumber), { failOnStatusCode: false });
        onImmigrationPage.addImmigrationRecord(
            immigrationNumber,
            issuedDate,
            expiryDate,
            eligibleStatus,
            10,
            elligableDate,
            commentText
        );
        onImmigrationPage.deleteImmigrationRecord();
        onImmigrationPage.uploadAttachment(
            attachmentFilePath,
            commentText
        );
        onImmigrationPage.assertOnDescriptionOnAttachment(commentText);
        onGeneralMethods.editAddedAttachment(commentText);
        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    });

    it('Should navigate to Job and fill job details including termination', () => {
        cy.visit(routesHelper.job(employeeNumber), { failOnStatusCode: false });
        onJobPage.fillJobDetails(
            joinedDate,
            3,
            1,
            4,
            2,
            5,
            contractStartDate,
            contractEndDate,
            attachmentFilePath
        );
        onJobPage.terminateEmployment(
            terminationDate,
            2,
            note
        );
        onGeneralMethods.uploadAttachment(
            attachmentFilePath,
            commentText
        );

        onGeneralMethods.assertOnDescriptionOnAttachment(commentText);

        onGeneralMethods.editAddedAttachment(commentText);

        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    });

    it('Should navigate to Salary and add salary details', () => {
        cy.visit(routesHelper.salary(employeeNumber), { failOnStatusCode: false });
        onSalaryPage.addSalaryDetails(
            salaryComponent,
            2,
            3,
            1,
            amount.toString(),
            commentText,
            accountNumber,
            2,
            routingNumber,
            directDepositAmount
        );
        onSalaryPage.deleteAddedSalaryRecord();
        onSalaryPage.uploadAttachment(
            attachmentFilePath,
            commentText
        );
        onSalaryPage.assertOnDescriptionOnAttachment(commentText);
        onGeneralMethods.editAddedAttachment(commentText);
        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    });
});