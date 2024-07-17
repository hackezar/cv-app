/* eslint-disable react/prop-types */
function DataOverview({isActive, isChecked, data, setData, jobCount}) {
    // Render the Practical Experience List Items
    console.log(jobCount);
    function PracticalItems(){
        for (let i=1; i<=jobCount; i++){
            console.log(i)
            let jobTitle = 'Job #' + i;
            return (
                <div>
                    <h4>{jobTitle}</h4>
                    <ul>
                        <li>Company Name: {data.practicalExperience.filter(info => info[0] === ('companyName' + i))[0][1]}</li>
                        <li>Position Title: {data.practicalExperience.filter(info => info[0] === ('positionTitle' + i))[0][1]}</li>
                        <li>Job Responsibilities: {data.practicalExperience.filter(info => info[0] === ('jobRespons' + i))[0][1]}</li>
                        <li>Date Started: {data.practicalExperience.filter(info => info[0] === ('dateFrom' + i))[0][1]}</li>
                        <li>Last Date of Employment: {data.practicalExperience.filter(info => info[0] === ('dateTo' + i))[0][1]}</li>
                    </ul>
                </div>
            )
        }
    }
    console.log(data.generalInfo.filter(info => info[0] === 'name'))
    
    return isActive &&
        <div className="dataOverview">
            <h3>Review your information</h3>
            <h4>General Information</h4>
            <ul>
                <li>
                    Name: {data.generalInfo.filter(info => info[0] === 'name')[0][1]}
                </li>
                <li>
                    Email: {data.generalInfo.filter(info => info[0] === 'email')[0][1]}
                </li>
                <li>
                    Phone #: {data.generalInfo.filter(info => info[0] === 'phone')[0][1]}
                </li>
            </ul>
            <h4>Educational Experience</h4>
                <ul>
                    <li>
                        High School: {data.educationalExperience.filter(info => info[0] === 'highSchoolName')[0][1]}
                    </li>
                    <li>
                        Date Started: {data.educationalExperience.filter(info => info[0] === 'highSchoolStartDate')[0][1]}
                    </li>
                    <li>
                        Date Finished: {data.educationalExperience.filter(info => info[0] === 'highSchoolEndDate')[0][1]}
                    </li>
                    {isChecked && 
                    <>
                        <li>
                            College Name: {data.educationalExperience.filter(info => info[0] === 'collegeName')[0][1]}
                        </li>
                        <li>
                            Level of Study: {data.educationalExperience.filter(info => info[0] === 'degreeType')[0][1]}
                        </li>
                        <li>
                            College Degree{data.educationalExperience.filter(info => info[0] === 'collegeDegree')[0][1]}
                        </li>
                        <li>
                            Date Started: {data.educationalExperience.filter(info => info[0] === 'collegeStartDate')[0][1]}
                        </li>
                        <li>
                            Date Finished: {data.educationalExperience.filter(info => info[0] === 'collegeEndDate')[0][1]}
                        </li>
                    </>
                    }
                </ul>
            <h4>Practical Experience</h4>
            <PracticalItems />
            <div>
                <button>Edit</button>
                <button>Create</button>
            </div>
        </div>
}

export {DataOverview}