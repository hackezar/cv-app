
// UUID
import { v4 as uuidv4 } from 'uuid';

const mockData = {
    generalInfo: {name: 'Jack Halcisak',
                phone: '443-356-9130',
                email: 'jackhalcisak@outlook.com'},
    educationalExperience: {highSchoolName: 'fallston',
                highSchoolStartDate: '5/21/1998',
                highSchoolEndDate: '6/12/2021',
                collegeName: 'SUNY Maritime',
                degreeType: 'Bachelors',
                collegeDegree: 'Marine Transportation',
                collegeStartDate: '5/2/2000',
                collegeEndDate: '5/3/2001'},
    practicalExperience: {companyName1: 'Subcom',
                positionTitle1: '3rd Mate',
                jobRespons1: 'Stand a watch',
                dateFrom1: '5/8/2003',
                dateTo1: '5/9/2004',
                companyName2: 'Subcomee',
                positionTitle2: '2nd Mate',
                jobRespons2: 'Stand a watch and plot courses',
                dateFrom2: '5/8/2005',
                dateTo2: '5/9/2006'},
    containsData: true 
}

const jobInputs = [
    {
        name: 'companyName',
        labelText: 'Company Name',
        type: 'text',
        className: 'jobInputItem',
        key: uuidv4(),
        value: null
    },
    {
        name: 'positionTitle',
        labelText: 'Position Title',
        type: 'text',
        className: 'jobInputItem',
        key: uuidv4(),
        value: null 
    },
    {
        name: 'jobRespons',
        labelText: 'Job Responsibilities',
        type: 'textarea',
        className: 'jobinputItem',
        key: uuidv4(),
        value: null
    },
    {
        name: 'dateFrom',
        labelText: 'Date Started',
        type: 'date',
        className: 'jobInputItem',
        key: uuidv4(),
        value: null
    },
    {
        name: 'dateTo',
        labelText: 'Date Stopped Working',
        type: 'date',
        className: 'jobInputItem',
        key: uuidv4(),
        value: null
    }
];

const collegeInputs = [
    {
        name: 'collegeName',
        labelText: 'Enter Your College Name',
        type: 'text',
        key: uuidv4(),
        value: null
    },
    {
        name: 'degreeType',
        labelText: 'Select Type of Degree',
        type: 'dropdown',
        key: uuidv4(),
        value: 'Bachelors'
    },
    {
        name: 'degreeName',
        labelText: 'Enter the Study of Degree,',
        type: 'text',
        key: uuidv4(),
        value: null
    },
    {
        name: 'collegeStartDate',
        labelText: 'When Did You Start Studying?',
        type: 'date',
        key: uuidv4(),
        value: null
    },
    {
        name: 'collegeEndDate',
        labelText: 'Date You Finished Degree',
        type: 'date',
        key: uuidv4(),
        value: null
    }
]

export {jobInputs, collegeInputs, mockData}