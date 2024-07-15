
// UUID
import { v4 as uuidv4 } from 'uuid';

// Components
import { InputLi, TextAreaLi } from "./CollectData.jsx"

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

  const jobListItems = jobInputs.map(job => {
    return(
    job.type != 'textarea'
    // Render a Input if the type isnt set as textarea 
    ? 
        <InputLi name={job.name} labelText={job.labelText} type={job.type} key={job.key} className={job.className} value={job.value}/>
      
    // Otherwise render a Textarea
    : 
        <TextAreaLi name={job.name} labelText={job.labelText} key={job.key} className={job.className} value={job.value} />        
    )
})




export {jobListItems}