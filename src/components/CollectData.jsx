/* eslint-disable react/prop-types */
import { useState } from 'react'

// Elements
import { InputLi, TextAreaLi, InputDropdown } from './ElementComponents.jsx';

// Unique Key
import { v4 as uuidv4 } from 'uuid';

//Styles
import "../styles/CollectData.css"

//Icon
import DeleteIcon from "../assets/delete.svg"

// Job Data
import {  jobInputs } from './JobData.jsx';
import { DataOverview } from './DataOverview.jsx';

function CollectDataApp() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Below is used for educational experience element
  const [isChecked, setIsChecked] = useState(false);
  const [jobCount, setJobCount] = useState(1);
  const [data, setData] = useState({
    generalInfo: [],
    educationalExperience: [],
    practicalExperience: [],
    containsData: false
  });
  // Stores the data entered in inputs
  const handleChange = (e) => {
    let newData = data;
    switch(activeIndex){
      case 0:
        newData.generalInfo = data.generalInfo.filter(dataChunk =>
          dataChunk[0] !== e.target.name
        )
        newData.generalInfo.push([e.target.name, e.target.value]);
        setData(newData);
        break;
      case 1:
        newData.educationalExperience = data.educationalExperience.filter(dataChunk => 
          dataChunk[0] !== e.target.name
        )
        newData.educationalExperience.push([e.target.name, e.target.value]);
        setData(newData);
        break;
    } 
  }

  // Handles Check box in educational experience
  const handleCheck = (e) => {
    console.log(e.target.checked)
    setIsChecked(e.target.checked)
  }
  
  const buttonPress = function(num, isPractical) {
    setActiveIndex(num);
    // Below is only used if the Practical Experience Section is being rendered
    // This section requires storing data differently because of the ability to add several jobs
    if (isPractical) {
      let inputItems = document.querySelectorAll('.inputItem');
      inputItems = Array.from(inputItems);
      let newData = data;
      inputItems.map(item => {
        newData.practicalExperience.push([item.name, item.value]);
      })
      setData(newData);
    }
  }
  console.log(data);
  return(
    <>
      {/*Clicking the next button in each section will set the active section to the next one*/}
      <GeneralInfo
      isActive={activeIndex === 0}
      buttonPress={() => buttonPress(1)}
      handleChange={handleChange}
       />
      <EducationalExperience
      isActive={activeIndex === 1}
      buttonPress={() => buttonPress(2)}
      handleChange={handleChange}
      handleCheck = {handleCheck}
      isChecked = {isChecked}
      />
      <PracticalExperience
      isActive={activeIndex === 2}
      buttonPress={() => buttonPress(3, true)}
      data={data}
      setData={setData}
      jobCount={jobCount}
      setJobCount={setJobCount}
      />
      <DataOverview 
      isActive={activeIndex === 3}
      data={data}
      setData={setData}
      isChecked = {isChecked}
      jobCount ={jobCount}
      />
    </>
  )
}

function GeneralInfo({ isActive, buttonPress, handleChange }) {
  // If isActive is true, will render this section
  return isActive && 
      <div className="generalInfoDiv">
        <form className="inputForm">
          <legend>General Info</legend>
          <ul className="list">
            <InputLi name="name"  labelText="Name" placeholder="Ex: John Doe" handleChange={handleChange} />
            <InputLi name="email" type="email" labelText="Email" placeholder="johndoe@gmail.com" handleChange={handleChange} />
            <InputLi name="phone" type="tel" labelText="Phone" placeholder="555-555-5555" handleChange={handleChange} />
          </ul>
        </form>
        <button className="nextBtn" onClick={buttonPress}>Next</button>
      </div>
    }


function EducationalExperience({ isActive, buttonPress, handleChange, handleCheck, isChecked }) {
  return isActive &&
      <div className="educationalExperienceDiv">
          <form className="inputForm" >
              <legend>Educational Experience</legend>
              <ul className="list">
                  <InputLi name="highSchoolName" labelText="Enter The Name of your High School" type="text" handleChange={handleChange} />
                  <InputLi name="highSchoolStartDate" labelText="Enter when you first went to high school" type="date" handleChange={handleChange} />
                  <InputLi name="highSchoolEndDate" labelText="Enter when you graduated from high school" type="date"handleChange={handleChange} />
                  <li className="listItem">
                      <label htmlFor='collegeCheck'>Check if you have a college degree 
                          <input className='inputItem' type="checkbox" name="collegeCheck" id="collegeCheck" onClick={handleCheck} />
                      </label>
                  </li>
                  {isChecked && (
                      <>
                        <InputDropdown handleChange={handleChange}/>
                        <InputLi name="collegeName" labelText="Enter your College Name" handleChange={handleChange} />
                        <InputLi name="collegeDegree" labelText="Enter your Degree" handleChange={handleChange} />
                        <InputLi name="collegeStartDate" labelText="When did you start College?" type="date" handleChange={handleChange} />
                        <InputLi name="collegeEndDate" labelText="When did you finish College?" type="date" handleChange={handleChange} />
                      </>
                  )}
              </ul>
          </form>
          <button className="nextBtn" onClick={buttonPress}>Next</button>
      </div>
}

function JobInput ({keyName, handleClick, index, handleChange}) {
  const jobListItems = jobInputs.map(job => {
    let jobName = job.name + index;
    return(
    job.type != 'textarea'
    // Render a Input if the type isnt set as textarea 
    ? 
        <InputLi name={jobName} labelText={job.labelText} type={job.type} key={job.key} className={job.className} value={job.value} handleChange={handleChange}/>
      
    // Otherwise render a Textarea
    : 
        <TextAreaLi name={jobName} labelText={job.labelText} key={job.key} className={job.className} value={job.value} handleChange={handleChange}/>        
    )
  })
  return (
    <div className="jobInputDiv" key={keyName} >
      <h6>{'Job '+ (index)}</h6>
      {jobListItems}
      <img src={DeleteIcon} className="deleteIcon" onClick={handleClick} />
    </div>
  )
}

function PracticalExperience({ isActive, buttonPress, jobCount, setJobCount }) {
  // This section has a List of jobs that you can add and subtractfrom
  // Press X button to delete a job
  // Click add job to add a job
  // This way you can set as many job experiences as you want in the resume
  const [jobData, setJobData] = useState([{id: 'jobData' + jobCount, key: uuidv4(), label: 'Job #' + jobCount}]);

  const addJob = () => {
    console.log('job added')
      setJobData([
        ...jobData,
        { id: 'jobData' + (jobCount + 1), key: uuidv4()}
      ]);
      setJobCount(jobData.length + 1);
  }

  const deleteJobDiv = (removedKey) => {
    //Remove the job div if the X icon is clicked
    setJobData(
      jobData.filter(job =>
        job.key !== removedKey
      )
    )
  }

  return isActive &&
      <div className="practicalExperienceDiv">
          <legend>Work History</legend>
          <ul className="list">
            {jobData.map((job, index) => (
              <JobInput key={job.key} index={index + 1} handleClick={ () => deleteJobDiv(job.key, (index + 1)) }/>
            ))}
          </ul>
      <div className='buttonsDiv'>
          <button className="addJobBtn" onClick={addJob}>Add Job</button>
      </div>
      <button className="nextBtn" onClick={buttonPress}>Next</button>
  </div>
}

  export { CollectDataApp }
  