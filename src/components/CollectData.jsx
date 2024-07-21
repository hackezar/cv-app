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
import { getDefaultValue } from './storage.js';

function CollectDataApp({activeApp, createResume, startingSection}) {
  console.log(createResume)
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
  const [activeIndex, setActiveIndex] = useState(startingSection);
  // Below is used for educational experience element
  const [jobCount, setJobCount] = useState(storedData.jobCount);
  const [collegeCount, setCollegeCount] = useState(storedData.collegeCount)
  const [data, setData] = useState(storedData);
  const [isChecked, setIsChecked] = useState(storedData.educationalExperience.collegeCheck)
  // Stores the data entered in inputs
  const handleChange = (e) => {
    let newData = data;
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
  console.log(activeApp)
  if (activeApp){
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
        createResume={createResume}
        />
      </>
    )
  }
}

function GeneralInfo({ isActive, buttonPress, handleChange, data }) {
  console.log(data)
  // If isActive is true, will render this section
  return isActive && 
      <div className="generalInfoDiv">
        <div className="collectDataHeaders">
          General Info
        </div>
        <form className="inputForm">
          <ul className="list">
            <InputLi name="name"  labelText="Name" placeholder="Ex: John Doe" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'name')} />
            <InputLi name="email" type="email" labelText="Email" placeholder="johndoe@gmail.com" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'email')} />
            <InputLi name="phone" type="tel" labelText="Phone" placeholder="555-555-5555" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'phone')}/>
            <InputLi name="address" type="text" labelText="Address" placeholder="7562 Lakeshore Dr" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'address')}/>
            <InputLi name="state" type="text" labelText="State" placeholder="FL" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'state')}/>
            <InputLi name="zipCode" type="number" labelText="Zip Code" placeholder="33710" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'zipCode')}/>
            <TextAreaLi name="aboutMe" labelText="Write a Breif Summary About Yourself" placeholder="blah blah blah blah I am so very important" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'generalInfo', 'aboutMe')}/>
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
          <div className="collectDataHeaders">
            Educational Experience
          </div>
          <form className="inputForm" >
              <ul className="list">
                  <InputLi name="highSchoolName" labelText="Enter The Name of your High School" type="text" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'educationalExperience', 'highSchoolName')}/>
                  <InputLi name="highSchoolStartDate" labelText="Enter when you first went to high school" type="date" handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'educationalExperience', 'highSchoolStartDate')}/>
                  <InputLi name="highSchoolEndDate" labelText="Enter when you graduated from high school" type="date"handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'educationalExperience', 'highSchoolEndDate')}/>
                  <li className="listItem">
                      <label htmlFor='collegeCheck'>Check if you have a college degree 
                          <input className='inputItem' type="checkbox" name="collegeCheck" id="collegeCheck" onChange={handleChange} defaultChecked={getDefaultValue(data, 'educationalExperience', 'collegeCheck')} />
                      </label>
                  </li>
                  {isChecked && 
                  <>
                    <div className="collegeDiv" key="collegeInputsDiv" >
                      {collegeData}
                    </div>
                    <div className="addDeleteBtnsDiv">
                      <button type="button" className="removeBtn" onClick={deleteLastCollegeDiv}>
                        Delete Last College
                      </button>
                      <button type="button" className="addBtn" onClick={addCollege}>
                        Add College
                      </button>
                    </div>
                  </>
                  }
              </ul>
          </form>
          <div className="nextBtnDiv nextBtnEducation">
            <button className="nextBtn" onClick={buttonPress}>Confirm Data</button>
          </div>
      </div>
}



function PracticalExperience({ isActive, buttonPress, handleChange, jobCount, setJobCount, data, setData }) {
  // This section has a List of jobs that you can add and subtractfrom
  // Press X button to delete a job
  // Click add job to add a job
  // This way you can set as many job experiences as you want in the resume'

  function JobInput ({keyName, index, name}) {
      return(
      <div className="jobInputDiv" key={keyName} id={name}>
        <h6>{'Job ' + index}</h6>
        {jobInputs.map(input => {
          let jobName = input.name + index
          return (
            input.type !== 'textarea'
            // Render a Input if the type isnt set as textarea 
            ? 
                <InputLi name={jobName} labelText={input.labelText} type={input.type} key={input.key} className={input.className} handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'practicalExperience', jobName)} />
            // Otherwise render a Textarea
            : 
                <TextAreaLi name={jobName} labelText={input.labelText} key={input.key} className={input.className} handleChange={handleChange} getDefaultValue={getDefaultValue(data, 'practicalExperience', jobName)}  />   
          )
        })}
      </div>
      )
    }

  const jobData = []
  for (let i=1; i<= jobCount; i++) {
    jobData.push(<JobInput key={'college' + i} index={i} name={'jobSection' + i} />)
  }

  const addJob = () => {
    console.log('job added')
      jobCount++
      setJobCount(jobCount);
      let newData = data
      newData.jobCount = jobCount
      setData(newData)
  }

  const deleteLastJobDiv = () => {
    //Remove the job div if the button is clicked

    // delete data of last job div
    let newData = data;
    delete newData.practicalExperience['companyName' + jobCount]
    delete newData.practicalExperience['positionTitle' + jobCount]
    delete newData.practicalExperience['jobRespons' + jobCount]
    delete newData.practicalExperience['dateFrom' + jobCount]
    delete newData.practicalExperience['dateTo' + jobCount]
    jobCount--
    newData.jobCount = jobCount
    setData(newData)
    setJobCount(jobCount)
  }

  return isActive &&
    <div className="practicalExperienceDiv">
      <div className="collectDataHeaders">Work History</div>
      <ul className="list">
        {jobData}
      </ul>
      <div className='buttonsDiv'>
        <button className="removeBtn" onClick={deleteLastJobDiv}>Remove Last Job</button>
        <button className="addBtn" onClick={addJob}>Add Job</button>
      </div>
      <button className="nextBtn" onClick={buttonPress}>Next</button>
    </div>
}

  export { CollectDataApp }
  