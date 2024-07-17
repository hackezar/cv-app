
// UUID
import { v4 as uuidv4 } from 'uuid';

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

export {jobInputs}