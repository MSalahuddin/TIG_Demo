import * as yup from 'yup';
import { TENANCY_DURATION_OPTIONS, FLAWED_BOOLEAN_OPTIONS, TENANT_OPTION, stringifyEnumValue } from 'constants/enums';
import StepOne from './StepOne';
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import StepSeven from "./StepSeven";
import React from 'react';
import Review from './Review';

const requiredStep = step => (currStep, schema) =>
    currStep >= step ? schema.required() : schema;

export const schema = yup.object().shape({
    step: yup.number().default(0),
    tenancyYears: yup
        .number()
        .required()
        .label('How long was the tenant residing here?'),
    payRent: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('DOES THE TENANT PAY RENT?'),
    paysOnTime: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('Do they pay rent on time?'),
    lateFrequency: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('HOW OFTEN ARE PAYMENTS LATE?'),
    isLateJustified: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('Is there communication with management upon a late rent payment?'),
    isLateCommunicated: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('Is their reason for a late rent payment justified?'),
    // step three
    compliesToTerms: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('Does the tenant comply with the lease terms?'),
    followsBuildingRules: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('Does the tenant follow the rules of the buildings?'),
    subletsWithoutPermission: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('Does the tenant sublet the unit without permission?'),
    notifiesUpgrades: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('Does the tenant notify management of any upgrades made to his unit?'),
    disposesGarbageAppropriately: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('Does the tenant dispose of the garbage properly?'),
    notifiesHonestly: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('Does the tenant honestly disclose guests, sublets, repairs, and other incidents?'),
    terminatedEarly: yup
        .number()
        .required()
        .default(3)
        .round()
        .label('Did the tenant try to terminate the lease early with or without cause?'),
    terminatedEarlyWithViableCause: yup
        .number()
        .required()
        .default(3)
        .round()
        .label('Did the tenant have a viable cause?'),
    //step four
    reportsIssuesProperly: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant go through the proper channels to report problems in the apartment?"),
    makesLegitimateRequests: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant make legitimate requests?"),
    doesThreatenManagement: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant threaten management to make the necessary repair?"),
    givesSufficientTime: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant give sufficient time for management to deal with the repair?"),
    replicatesComplaints: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant make the same complaints repeatedly?"),
    providesAccess: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant provide access to the apartment when necessary?"),
    cooperatesWithInstructions: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant cooperate with notices and other instructions?"),
    contactsManagementExcessively: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Is management contacted excessively?"),
    difficultyRating: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Generally, is this tenant difficult to deal with?"),
    // step five
    filesFormalComplaints: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant file formal complaints with city agencies?"),
    contactsManagementFirst: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant reach out to management to correct the issue first?"),
    givesManagementSufficientTimeToFix: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Did the tenant give management enough time to fix the issue before making a formal complaint?"),
    historyOfFiling: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant have a history of filing complaints?"),
    areComplaintsLegitimate: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant file legitimate complaints?"),
    complainProvidesAccess: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant provide the access necessary to make the repairs required?"),
    //step six
    damagesBuilding: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant damage the building?"),
    damagesUnit: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant cause damage to their unit?"),
    maintainsUnit: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant maintain its unit in an orderly clean fashion?"),
    exceededSecurityDeposit: yup
        .number()
        .required()
        .default(3)
        .round()
        .label("Upon move out, did the tenant leave the apartment damaged more than the wear and tear and exceeded the security deposit?"),
    // step seven
    cooperates: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant cooperate with notices and other instructions?"),
    politenessRating: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Is the tenant polite and respectful to management?"),
    isNoisy: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('IS TENANT NOISY?'),
    fightsWithTenants: yup
        .number()
        .required()
        .default(0)
        .round()
        .label('Does the tenant fight with other tenants?'),
    fightsWithStaff: yup
        .number()
        .required()
        .default(0)
        .round()
        .label("Does the tenant fight with staff members?"),
    score: yup
        .number()
        .label('Score'),
    comment: yup
        .string()
        .label('Review')
});

export const getFormatedReview = (watching) => ([
    {
        heading: "1. TENANCY",
        step: 0,
        reviews: [{ label: "How long was the tenant residing here?", content: stringifyEnumValue(TENANCY_DURATION_OPTIONS, watching?.tenancyYears) }]
    },
    {
        heading: "2. PAYMENT",
        step: 1,
        reviews: [
            { label: "DOES THE TENANT PAY RENT?", content: stringifyEnumValue(TENANT_OPTION, watching?.payRent) },
            { label: "Do they pay rent on time?", content: stringifyEnumValue(TENANT_OPTION, watching?.paysOnTime) },
            { label: "HOW OFTEN ARE PAYMENTS LATE?", content: formatedNA(watching?.paysOnTime, 1) ? "NA" : stringifyEnumValue(TENANT_OPTION, watching?.lateFrequency) },
            { label: "Is there communication with management upon a late rent payment?", content: formatedNA(watching?.paysOnTime, 1) ? "NA" : stringifyEnumValue(TENANT_OPTION, watching?.isLateJustified) },
            { label: "Is their reason for a late rent payment justified?", content: formatedNA(watching?.paysOnTime, 1) ? "NA" : stringifyEnumValue(TENANT_OPTION, watching?.isLateCommunicated) },
        ]
    },
    {
        heading: "3. LEASE TERM",
        step: 2,
        reviews: [
            { label: "Does the tenant comply with the lease terms?", content: stringifyEnumValue(TENANT_OPTION, watching?.compliesToTerms) },
            { label: "Does the tenant follow the rules of the buildings?", content: stringifyEnumValue(TENANT_OPTION, watching?.followsBuildingRules) },
            { label: "Does the tenant sublet the unit without permission?", content: stringifyEnumValue(TENANT_OPTION, watching?.subletsWithoutPermission) },
            { label: "Does the tenant notify management of any upgrades made to his unit?", content: stringifyEnumValue(TENANT_OPTION, watching?.notifiesUpgrades) },
            { label: "Does the tenant dispose of the garbage properly?", content: stringifyEnumValue(TENANT_OPTION, watching?.disposesGarbageAppropriately) },
            { label: "Does the tenant honestly disclose guests, sublets, repairs, and other incidents?", content: stringifyEnumValue(TENANT_OPTION, watching?.notifiesHonestly) },
            { label: "Did the tenant try to terminate the lease early?", content: stringifyEnumValue(FLAWED_BOOLEAN_OPTIONS, watching?.terminatedEarly) },
            { label: "Did the tenant have a viable cause?", content: stringifyEnumValue(FLAWED_BOOLEAN_OPTIONS, watching?.terminatedEarlyWithViableCause) },
        ]
    },
    {
        heading: `4. Service & Maintenance Request`,
        step: 3,
        reviews: [
            { label: "Does the tenant go through the proper channels to report problems in the apartment?", content: stringifyEnumValue(TENANT_OPTION, watching?.reportsIssuesProperly) },
            { label: "Does the tenant make legitimate requests?", content: stringifyEnumValue(TENANT_OPTION, watching?.makesLegitimateRequests) },
            { label: "Does the tenant threaten management to make the necessary repair?", content: stringifyEnumValue(TENANT_OPTION, watching?.doesThreatenManagement) },
            { label: "Does the tenant give sufficient time for management to deal with the repair?", content: stringifyEnumValue(TENANT_OPTION, watching?.givesSufficientTime) },
            { label: "Does the tenant make the same complaints repeatedly?", content: stringifyEnumValue(TENANT_OPTION, watching?.replicatesComplaints) },
            { label: "Does the tenant provide access to the apartment when necessary?", content: stringifyEnumValue(TENANT_OPTION, watching?.providesAccess) },
            { label: "Does the tenant cooperate with notices and other instructions?", content: stringifyEnumValue(TENANT_OPTION, watching?.cooperatesWithInstructions) },
            { label: "Is management contacted excessively?", content: stringifyEnumValue(TENANT_OPTION, watching?.contactsManagementExcessively) },
            { label: "Generally, is this tenant difficult to deal with?", content: Math.round(watching?.difficultyRating) }
        ]
    },
    {
        heading: `5. Complaints & Violations`,
        step: 4,
        reviews: [
            { label: "Does the tenant file formal complaints with city agencies?", content: stringifyEnumValue(TENANT_OPTION, watching?.filesFormalComplaints) },
            { label: "Does the tenant reach out to management to correct the issue first?", content: stringifyEnumValue(TENANT_OPTION, watching?.contactsManagementFirst) },
            { label: "Did the tenant give management enough time to fix the issue before making a formal complaint?", content: stringifyEnumValue(TENANT_OPTION, watching?.givesManagementSufficientTimeToFix) },
            { label: "Does the tenant have a history of filing complaints?", content: stringifyEnumValue(TENANT_OPTION, watching?.historyOfFiling) },
            { label: "Does the tenant provide the access necessary to make the repairs required?", content: stringifyEnumValue(TENANT_OPTION, watching?.complainProvidesAccess) },
            { label: "Does the tenant file legitimate complaints?", content: stringifyEnumValue(TENANT_OPTION, watching?.areComplaintsLegitimate) },
        ]
    },
    {
        heading: "6. tenant damages",
        step: 5,
        reviews: [
            { label: "Does the tenant damage the building?", content: stringifyEnumValue(TENANT_OPTION, watching?.damagesBuilding) },
            { label: "Does the tenant cause damage to their unit?", content: stringifyEnumValue(TENANT_OPTION, watching?.damagesUnit) },
            { label: "Does the tenant maintain its unit in an orderly clean fashion?", content: stringifyEnumValue(TENANT_OPTION, watching?.maintainsUnit) },
            { label: "Upon move out, did the tenant leave the apartment damaged more than the wear and tear and exceeded the security deposit?", content: stringifyEnumValue(FLAWED_BOOLEAN_OPTIONS, watching?.exceededSecurityDeposit) }
        ]
    },
    {
        heading: "7. tenant behavior",
        step: 6,
        reviews: [
            { label: "Does the tenant cooperate with notices and other instructions?", content: stringifyEnumValue(TENANT_OPTION, watching?.cooperates) },
            { label: "Is the tenant polite and respectful to management?", content: stringifyEnumValue(TENANT_OPTION, watching?.politenessRating) },
            { label: "IS TENANT NOISY?", content: stringifyEnumValue(TENANT_OPTION, watching?.isNoisy) },
            { label: "Does the tenant fight with other tenants?", content: stringifyEnumValue(TENANT_OPTION, watching?.fightsWithTenants) },
            { label: "Does the tenant fight with staff members?", content: stringifyEnumValue(TENANT_OPTION, watching?.fightsWithStaff) },
            { label: "If you were to give the tenant a score from 0-100 with 100 being the best, what would you rate them?", content: `${watching?.score}` },
            { label: "Additional Comments", content: watching?.comment },
        ]
    }
]);

const formatedNA = (key, value) => key === value ? true : false


export const formatReviewFormDataToMutation = (form) => ({
    score: form?.score,
    comment: form?.comment,
    tenancyYears: form?.tenancyYears,
    paymentSection: {
        paysRent: form?.payRent,
        paysOnTime: form?.paysOnTime,
        lateFrequency: formatedNA(form?.paysOnTime, 1) ? 6 : form?.lateFrequency,
        isLateJustified: formatedNA(form?.paysOnTime, 1) ? 6 : form?.isLateJustified,
        isLateCommunicated: formatedNA(form?.paysOnTime, 1) ? 6 : form?.isLateCommunicated
    },
    leaseSection: {
        compliesToTerms: form?.compliesToTerms,
        followsBuildingRules: form?.followsBuildingRules,
        subletsWithoutPermission: form?.subletsWithoutPermission,
        notifiesUpgrades: form?.notifiesUpgrades,
        disposesGarbageAppropriately: form?.disposesGarbageAppropriately,
        notifiesHonestly: form?.notifiesHonestly,
        terminatedEarly: form?.terminatedEarly,
        terminatedEarlyWithViableCause: form?.terminatedEarlyWithViableCause
    },
    maintenanceSection: {
        reportsIssuesProperly: form?.reportsIssuesProperly,
        makesLegitimateRequests: form?.makesLegitimateRequests,
        doesThreatenManagement: form?.doesThreatenManagement,
        givesSufficientTime: form?.givesSufficientTime,
        replicatesComplaints: form?.replicatesComplaints,
        providesAccess: form?.providesAccess,
        contactsManagementExcessively: form?.contactsManagementExcessively,
        cooperatesWithInstructions: form?.cooperatesWithInstructions,
        difficultyRating: form?.difficultyRating
    },
    complaintsSection: {
        filesFormalComplaints: form?.filesFormalComplaints,
        contactsManagementFirst: form?.contactsManagementFirst,
        givesManagementSufficientTimeToFix: form?.givesManagementSufficientTimeToFix,
        historyOfFiling: form?.historyOfFiling,
        areComplaintsLegitimate: form?.areComplaintsLegitimate,
        providesAccess: form?.complainProvidesAccess
    },
    damagesSection: {
        damagesBuilding: form?.damagesBuilding,
        damagesUnit: form?.damagesUnit,
        maintainsUnit: form?.maintainsUnit,
        exceededSecurityDeposit: form?.exceededSecurityDeposit
    },
    behaviourSection: {
        cooperates: form?.cooperates,
        politenessRating: form?.politenessRating,
        isNoisy: form?.isNoisy,
        fightsWithTenants: form?.fightsWithTenants,
        fightsWithStaff: form?.fightsWithStaff
    }
})
export const steps = [StepOne, StepTwo, StepThree, StepFour, StepFive, StepSix, StepSeven, Review]

export const getSteps = ({ errors, setValue, watching }) => ([
    {
        number: 0,
        component: <StepOne errors={errors} setValue={setValue} watching={watching} />
    },
    {
        number: 1,
        component: <StepTwo errors={errors} setValue={setValue} watching={watching} />,
    },
    {
        number: 2,
        component: <StepThree errors={errors} setValue={setValue} watching={watching} />,
    },
    {
        number: 3,
        component: <StepFour errors={errors} setValue={setValue} watching={watching} />,

    },
    {
        number: 4,
        component: <StepFive errors={errors} setValue={setValue} watching={watching} />,
    },
    {
        number: 5,
        component: <StepSix errors={errors} setValue={setValue} watching={watching} />,
    },
    {
        number: 6,
        component: <StepSeven errors={errors} setValue={setValue} watching={watching} />,
    },
    {
        number: 7,
        component: <Review errors={errors} setValue={setValue} watching={watching} />
    },
]);
