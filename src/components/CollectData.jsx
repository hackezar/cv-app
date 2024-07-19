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
import {  jobInputs, collegeInputs } from './EducationAndJobData.jsx';
import { DataOverview } from './DataOverview.jsx';
import { render } from 'react-dom';
import { getDefaultValue } from './storage.js';

function CollectDataApp() {
  // Stores data entered in session storage
  let storedData = sessionStorage.getItem('storedData')
  storedData = JSON.parse(storedData);
  // If this is the first session, create the storedData object
  if (storedData === null)
      storedData = {
        generalInfo: {},
        educationalExperience: {collegeCheck: false},
        collegeCount: 1,
        practicalExperience: {},
        jobCount: 1,
      }
  
  const [activeIndex, setActiveIndex] = useState(0);
  // Below is used for educational experience element
  const [jobCount, setJobCount] = useState(storedData.jobCount);
  const [collegeCount, setCollegeCount] = useState(storedData.collegeCount)
  const [data, setData] = useState(storedData);
  const [isChecked, setIsChecked] = useState(storedData.educationalExperience.collegeCheck)
  // Stores the data entered in inputs
  const handleChange = (e) => {
    let newData = data;
    console.log(e.target, newData)
    switch(activeIndex){
      case 0:
        newData.generalInfo[e.target.name] = e.target.value
        setData(newData);
        break;
      case 1:
        // Special case for checkbox, Sets true if box is checked, sets false if unchecked
        if (e.target.name === 'collegeCheck'){
          if(newData.educationalExperience.collegeCheck){
            newData.educationalExperience.collegeCheck = false
            setIsChecked(false)
          }else{
            newData.educationalExperience.collegeCheck = true
            setIsChecked(true)
          } 
        }
        else {
        newData.educationalExperience[e.target.name] = e.target.value
        }
        setData(newData);
        break;
      case 2:
        newData.practicalExperience[e.target.name] = e.target.value
        setData(newData)
        break
    } 
    console.log(data);
  }
  
  const buttonPress = function(num) {
    // Changes the displayed component
    setActiveIndex(num);
    // Stores data in session storage if all inputs are entered
    sessionStorage.setItem('storedData', JSON.stringify(data))
  }

  return(
    <>
      {/*Clicking the next button in each section will set the active section to the next one*/}
      <GeneralInfo
      isActive={activeIndex === 0}
      buttonPress={() => buttonPress(1)}
      handleChange={handleChange}
      data={data}
       />
      <EducationalExperience
      isActive={activeIndex === 1}
      buttonPress={() => buttonPress(2)}
      handleChange={handleChange}
      data ={data}
      setData = {setData}
      collegeCount={collegeCount}
      setCollegeCount = {setCollegeCount}
      isChecked={isChecked}
      />
      <PracticalExperience
      isActive={activeIndex === 2}
      buttonPress={() => buttonPress(3)}
      data={data}
      setData={setData}
      jobCount={jobCount}
      setJobCount={setJobCount}
      handleChange={handleChange}
      />
      <DataOverview 
      isActive={activeIndex === 3}
      data={data}
      setData={setData}
      jobCount ={jobCount}
      collegeCount={collegeCount}
      setActiveIndex={setActiveIndex}
      />
    </>
  )
}

function GeneralInfo({ isActive, buttonPress, handleChange, data }) {
  console.log(data)
  // If isActive is true, will render this section
  return isActive && 
      <div className="generalInfoDiv">
        <form className="inputForm">
          <legend>General Info</legend>
          <ul className="list">
            <InputLi name="name"  labelText="Name" placeholder="Ex: John Doe" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'name')} />
            <InputLi name="email" type="email" labelText="Email" placeholder="johndoe@gmail.com" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'email')} />
            <InputLi name="phone" type="tel" labelText="Phone" placeholder="555-555-5555" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'phone')}/>
            <InputLi name="address" type="text" labelText="Address" placeholder="7562 Lakeshore Dr" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'address')}/>
            <InputLi name="state" type="text" labelText="State" placeholder="FL" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'state')}/>
            <InputLi name="address" type="number" labelText="Zip Code" placeholder="33710" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'zipCode')}/>

          </ul>
        </form>
        <button className="nextBtn" onClick={buttonPress}>Next</button>
      </div>
    }


function EducationalExperience({ isActive, buttonPress, handleChange, data, setData, collegeCount, setCollegeCount, isChecked }) {

  function CollegeInput({index, keyName, name}){
    return (
      <div className="collegeInputDiv" key={keyName} id={name} >
        <h6>{'College ' + index}</h6>
        {collegeInputs.map(input => {
        let collegeName = input.name + index;
        return (
          input.type === 'dropdown' ?
          <InputDropdown handleChange={handleChange} key={input.key} name={collegeName} getDefaultValue={getDefaultValue(data, 'educationalExperience', collegeName)} />
          :
          <InputLi name={collegeName} key={input.key} handleChange={handleChange} labelText={input.labelText} type={input.type} getDefaultValue={getDefaultValue(data, 'educationalExperience', collegeName)} />
          )
        })}
      </div>
    )
  }
  
  const collegeData = []
  for (let i=1; i<=collegeCount; i++){
    collegeData.push(<CollegeInput key={'college' + i} index={i} name={'collegeSection' + i}/>)
  }

  const addCollege = () => {
    console.log('college added')
    collegeCount++
    setCollegeCount(collegeCount)
    let newData = data
    newData.collegeCount = collegeCount
    setData(newData)
  }

  const deleteLastCollegeDiv = () => {
    //Remove the last college div if the button is clicked
    let newData = data
    delete newData.educationalExperience['collegeName' + collegeCount]
    delete newData.educationalExperience['degreeType' + collegeCount]
    delete newData.educationalExperience['degreeName' + collegeCount]
    delete newData.educationalExperience['collegeStartDate' + collegeCount]
    delete newData.educationalExperience['collegeEndDate' + collegeCount]
    collegeCount--
    newData.collegeCount = collegeCount
    setData(newData)
    setCollegeCount(collegeCount)
  }


  return isActive &&
      <div className="educationalExperienceDiv">
          <form className="inputForm" >
              <legend>Educational Experience</legend>
              <ul className="list">
                  <InputLi name="highSchoolName" labelText="Enter The Name of your High School" type="text" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'educationalExperience', 'highSchoolName')}/>
                  <InputLi name="highSchoolStartDate" labelText="Enter when you first went to high school" type="date" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'educationalExperience', 'highSchoolStartData')}/>
                  <InputLi name="highSchoolEndDate" labelText="Enter when you graduated from high school" type="date"handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'educationalExperience', 'highSchoolEndDate')}/>
                  <li className="listItem">
                      <label htmlFor='collegeCheck'>Check if you have a college degree 
                          <input className='inputItem' type="checkbox" name="collegeCheck" id="collegeCheck" onChange={handleChange} defaultChecked={getDefaultValue(data, 'educationalExperience', 'collegeCheck')} />
                      </label>
                  </li>
                  {isChecked && 
                    <div className="collegeDiv" key="collegeInputsDiv" >
                      {collegeData}
                      <button type="button" className="removeBtn" onClick={deleteLastCollegeDiv}>
                        Delete Last College
                      </button>
                      <button type="button" className="addBtn" onClick={addCollege}>
                        Add College
                      </button>
                    </div>
                  }

              </ul>
          </form>
          <button className="nextBtn" onClick={buttonPress}>Next</button>
      </div>
}



function PracticalExperience({ isActive, buttonPress, handleChange, jobCount, setJobCount, data, setData }) {
  // This section has a List of jobs that you can add and subtractfrom
  // Press X button to delete a job
  // Click add job to add a job
  // This way you can set as many job experiences as you want in the resume'

  function JobInput ({keyName, index}) {
    const jobListItems = jobInputs.map(job => {
      let jobName = job.name + index;
      return(
      job.type !== 'textarea'
      // Render a Input if the type isnt set as textarea 
      ? 
          <InputLi name={jobName} labelText={job.labelText} type={job.type} key={job.key} className={job.className} handleChange={handleChange} value={data.practicalExperience[jobName]}/>
      // Otherwise render a Textarea
      : 
          <TextAreaLi name={jobName} labelText={job.labelText} key={job.key} className={job.className} handleChange={handleChange} value={data.practicalExperience[jobName]} />        
      )
    })
    return (
      <div className="jobInputDiv" key={keyName} >
        <h6>{'Job '+ (index)}</h6>
        {jobListItems}
      </div>
    )
  }

  const [jobData, setJobData] = useState([{id: 'jobData' + jobCount, key: uuidv4(), label: 'Job #' + jobCount}]);
  const addJob = () => {
    console.log('job added')
      setJobData([
        ...jobData,
        { id: 'jobData' + (jobCount + 1), key: uuidv4()}
      ]);
      setJobCount(jobCount + 1);
  }

  const deleteLastJobDiv = () => {
    //Remove the job div if the button is clicked
    setJobData(
      jobData.filter(job =>
        job.id !== ('jobData' + jobCount) 
      )
    )
    // delete data of last job div
    let newData = data;
    delete newData.practicalExperience['companyName' + jobCount]
    delete newData.practicalExperience['positionTitle' + jobCount]
    delete newData.practicalExperience['jobRespons' + jobCount]
    delete newData.practicalExperience['dateFrom' + jobCount]
    delete newData.practicalExperience['dateTo' + jobCount]
    setData(newData)
    setJobCount(jobCount - 1)
  }

  return isActive &&
      <div className="practicalExperienceDiv">
          <legend>Work History</legend>
          <ul className="list">
            {jobData.map((job, index) => (
              <JobInput key={job.key} index={index + 1} />
            ))}
          </ul>
      <div className='buttonsDiv'>
        <button className="removeBtn" onClick={deleteLastJobDiv}>Remove Last Job</button>
        <button className="addBtn" onClick={addJob}>Add Job</button>
      </div>
      <button className="nextBtn" onClick={buttonPress}>Next</button>
  </div>
}

  export { CollectDataApp }
  