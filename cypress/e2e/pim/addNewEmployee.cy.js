/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import { routesHelper } from '../../fixtures/routesHelper';
import { onNavigationToPages } from '../../pages/navigationToPages';
import { onGeneralMethods } from '../../pages/generalMethods';
import { onAddEmployeePage } from "../../pages/PIM/addEmployeePage";
import { onPersonalDetailsPage } from '../../pages/PIM/personalDetailsPage';
import { onContactDetailsPage } from '../../pages/PIM/contactDetailsPage';
import { onEmergencyContactsPage } from '../../pages/PIM/emergencyContactsPage';
import { onDependentsPage } from '../../pages/PIM/dependentsPage';
import { onImmigrationPage } from '../../pages/PIM/immigrationPage';
import { onJobPage } from '../../pages/PIM/jobPage';
import { onSalaryPage } from '../../pages/PIM/salaryPage';
import { onReportToPage } from '../../pages/PIM/reportToPage'; 
import { onQualificationsPage } from '../../pages/PIM/qualificationsPage';
import { onMembershipsPage } from '../../pages/PIM/membershipsPage';
import { generateEmployeeData } from '../../support/dataFactory/employeeData';

const data = generateEmployeeData();
const {employee, personalDetails, contactDetails, emergencyContacts, dependents, immigration, jobDetails, salaryDetails, reportTo, qualifications, membership, salary} = data;


// Attachments file paths
const attachmentFilePath = 'cypress/fixtures/files/TestPDF.pdf';
const profileImagePath = 'cypress/fixtures/files/profileImage.jpg';

const fullName = `${employee.firstName} ${employee.lastName}`;

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
            employee.firstName,
            employee.middleName,
            employee.lastName,
            employee.employeeID,
            profileImagePath
        );

        onAddEmployeePage.createLoginDetails(
            employee.username,
            employee.password,
            employee.password
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
            personalDetails.otherID,
            personalDetails.driverLicense,
            5,
            personalDetails.licenseExpiryDate,
            2,
            personalDetails.dateOfBirth
        );

        onPersonalDetailsPage.fillCustomFields(
            3,
            personalDetails.testField
        );

        onGeneralMethods.uploadAttachment(
            attachmentFilePath,
            personalDetails.commentText
        );

        onGeneralMethods.assertOnDescriptionOnAttachment(personalDetails.commentText);

        onGeneralMethods.editAddedAttachment(personalDetails.commentText);

        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    });


    it('Should navigate to Contact Details of the created employee and fill contact details', () => {
        cy.visit(routesHelper.contactDetails(employeeNumber), { failOnStatusCode: false });

        onContactDetailsPage.fillAddressDetails(
            contactDetails.streetOne,
            contactDetails.streetTwo,
            contactDetails.city,
            contactDetails.state,
            contactDetails.zipCode,
            5
        );
        onContactDetailsPage.fillTelephoneDetails(
            contactDetails.homeTelephone,
            contactDetails.mobile,
            contactDetails.workTelephone
        );
        onContactDetailsPage.fillEmailDetails(
            contactDetails.workEmail,
            contactDetails.otherEmail
        );
        onGeneralMethods.uploadAttachment(
            attachmentFilePath,
            contactDetails.commentText
        );

        onGeneralMethods.assertOnDescriptionOnAttachment(contactDetails.commentText);

        onGeneralMethods.editAddedAttachment(contactDetails.commentText);

        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();

    });

    it('Should navigate to Emergency Contacts and add an emergency contact', () => {
        cy.visit(routesHelper.emergencyContacts(employeeNumber), { failOnStatusCode: false });
        onEmergencyContactsPage.addEmergencyContact(
            emergencyContacts.emergencyContactName,
            emergencyContacts.relationship,
            emergencyContacts.homeTelephone,
            emergencyContacts.mobile,
            emergencyContacts.workTelephone
        );

        onEmergencyContactsPage.deleteEmergencyContact(emergencyContacts.emergencyContactName);

        onEmergencyContactsPage.uploadAttachment(
            attachmentFilePath,
            emergencyContacts.commentText
        );

        onGeneralMethods.assertOnDescriptionOnAttachment(emergencyContacts.commentText);

        onGeneralMethods.editAddedAttachment(emergencyContacts.commentText);

        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();

    });

    it('Should navigate to Dependents and add a dependent', () => {
        cy.visit(routesHelper.dependents(employeeNumber), { failOnStatusCode: false });
        onDependentsPage.addDependent(
            dependents.dependentName,
            1,
            dependents.dependentDateOfBirth
        );
        onDependentsPage.deleteDependent();
        onDependentsPage.uploadAttachment(
            attachmentFilePath,
            dependents.commentText
        );
        onDependentsPage.assertOnDescriptionOnAttachment(dependents.commentText);
        onGeneralMethods.editAddedAttachment(dependents.commentText);
        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    });

    it('Should navigate to Immigration and add an immigration record', () => {
        cy.visit(routesHelper.immigration(employeeNumber), { failOnStatusCode: false });
        onImmigrationPage.addImmigrationRecord(
            immigration.immigrationNumber,
            immigration.issuedDate,
            immigration.expiryDate,
            immigration.eligibleStatus,
            10,
            immigration.elligableDate,
            immigration.commentText
        );
        onImmigrationPage.deleteImmigrationRecord();
        onImmigrationPage.uploadAttachment(
            attachmentFilePath,
            immigration.commentText
        );
        onImmigrationPage.assertOnDescriptionOnAttachment(immigration.commentText);
        onGeneralMethods.editAddedAttachment(immigration.commentText);
        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    });

    it('Should navigate to Job and fill job details including termination', () => {
        cy.visit(routesHelper.job(employeeNumber), { failOnStatusCode: false });
        onJobPage.fillJobDetails(
            jobDetails.joinedDate,
            3,
            1,
            4,
            1,
            5,
            jobDetails.contractStartDate,
            jobDetails.contractEndDate,
            attachmentFilePath
        );
        onJobPage.terminateEmployment(
            jobDetails.terminationDate,
            2,
            jobDetails.notes
        );
        onGeneralMethods.uploadAttachment(
            attachmentFilePath,
            jobDetails.notes
        );

        onGeneralMethods.assertOnDescriptionOnAttachment(jobDetails.notes);
        onGeneralMethods.editAddedAttachment(jobDetails.notes);

        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    });

    it('Should navigate to Salary and add salary details', () => {
        cy.visit(routesHelper.salary(employeeNumber), { failOnStatusCode: false });
        onSalaryPage.addSalaryDetails(
            salaryDetails.salaryComponent,
            2,
            3,
            1,
            salaryDetails.amount.toString(),
            salaryDetails.commentText,
            salaryDetails.accountNumber,
            2,
            salaryDetails.routingNumber,
            salaryDetails.directDepositAmount
        );
        onSalaryPage.deleteAddedSalaryRecord();
        onSalaryPage.uploadAttachment(
            attachmentFilePath,
            salaryDetails.commentText
        );
        onSalaryPage.assertOnDescriptionOnAttachment(salaryDetails.commentText);
        onGeneralMethods.editAddedAttachment(salaryDetails.commentText);
        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    });

    it('Should navigate to Report To and assign a supervisor', () => {
        cy.visit(routesHelper.reportTo(employeeNumber), { failOnStatusCode: false });
        onReportToPage.assignSupervisor(
            reportTo.supervisorName,
            1
        );
        onReportToPage.deleteSupervisor();
        onReportToPage.uploadAttachment(
            attachmentFilePath,
            reportTo.commentText
        );
        onReportToPage.assertOnDescriptionOnAttachment(reportTo.commentText);
        onGeneralMethods.editAddedAttachment(reportTo.commentText);
        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    });

    it('Should navigate to Qualifications and add qualification records', () => {
        cy.visit(routesHelper.qualifications(employeeNumber), { failOnStatusCode: false });
        onQualificationsPage.addWorkExperience(
            qualifications.companyName,
            qualifications.jobTitle,
            qualifications.fromDate,
            qualifications.toDate,
            qualifications.commentText
        );
        onQualificationsPage.deleteworkExperienceRecord();   
        // onQualificationsPage.addEducation(
        //     3,
        //     qualifications.instituteName,
        //     qualifications.major,
        //     qualifications.graduationYear,
        //     qualifications.jpaScore,
        //     qualifications.startDate,
        //     qualifications.endDate,
        //     qualifications.commentText
        // );
        // onQualificationsPage.deleteEducationRecord();   
        onQualificationsPage.addSkill(
            4,
            qualifications.yearsOfExperience,
            qualifications.commentText
        );
        onQualificationsPage.deleteSkillRecord();   
        onQualificationsPage.addLanguage(
            2, 
            3,
            1,
            qualifications.commentText
        );
        onQualificationsPage.deleteLanguageRecord();   
        onQualificationsPage.addLicense(
            5,
            qualifications.licenceNumber,
            qualifications.issuedDateForLicense,
            qualifications.expiryDateForLicense
        );
        onQualificationsPage.deleteLicenseRecord(); 
        onQualificationsPage.uploadAttachment(
            attachmentFilePath,
            qualifications.commentText
        );
        onQualificationsPage.assertOnDescriptionOnAttachment(qualifications.commentText);
        onGeneralMethods.editAddedAttachment(qualifications.commentText);
        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    }); 

    it('Should navigate to Memberships and add membership records', () => {
        cy.visit(routesHelper.memberships(employeeNumber), { failOnStatusCode: false });
        onMembershipsPage.addMembership(
            3,
            1,
            membership.subscriptionAmount, 
            1,
            membership.commenceDate,
            membership.renewalDate
        );
        onMembershipsPage.deleteMembershipRecord(); 
        onMembershipsPage.uploadAttachment(
            attachmentFilePath,
            membership.commentText
        );
        onMembershipsPage.assertOnDescriptionOnAttachment(membership.commentText);
        onGeneralMethods.editAddedAttachment(membership.commentText);
        onGeneralMethods.downloadAttachment();
        onGeneralMethods.deleteAddedRecord();
    });
});