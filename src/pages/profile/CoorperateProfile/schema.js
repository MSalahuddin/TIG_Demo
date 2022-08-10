import Personal from "./Personal";
import Work from "./Work";
import Files from "./Files";
import Activity from "./Activity";

export const tabs = [
    {
        text: "Personal",
        value: "isPersonal",

    },
    {
        text: "Work",
        value: "isWork",
    },
    {
        text: "Files",
        value: "isFiles",
    },
    {
        text: "Activity",
        value: "isActivity",
    }
];

export const steps = [Personal, Work, Files, Activity];


export const userTypes = {
    2: "landlord",
    3: "managementUser",
}

export const getUserProfileQuery = (userType) => ` query ViewLanlord($id: ID!){
    user:${userTypes[userType]}(id: $id){
          lastName
          firstName
          fullName
          id
          pk
          email
          address
          userType
          phone
          birthday
          picture
          title
          identificationNumber
          workHours{
            startDay
            endDay
            start
            end
          }
          buildings{
            edges{
              node{
                address
                state
                zip
                id
              }
            }
          }
          workingDetails{
            email
            phone
            address
          }
    }
  }`

