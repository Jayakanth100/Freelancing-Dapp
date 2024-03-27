import { useState } from 'react';
import JobListing from './JobListing.jsx';
import MyJobs from './MyJobs.jsx';

const tabs = ["job_listing", "my_jobs"];
function Freelancer() {
  const [tab, setTab] = useState(0); //0-joblisting 1-myjobs
  const onTabClick = (tabId) => {
    return () => setTab(tabId);
  }
  return (
    <div>
      <div className='nav' >
        {tabs.map((tabName, idx) => (
          <span style={{paddingLeft: "3em"}} onClick={onTabClick(idx)} key={idx}>{tab===idx?"*":""}{tabName}</span>
        ))}

      </div>
    <hr/>
      {tab === 0 ?
        <JobListing />
        : tab ===1?
        <MyJobs/>:null
      }
    </div>
  );
}

export default Freelancer;
