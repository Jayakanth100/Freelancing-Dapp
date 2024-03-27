import { useState } from 'react';
import FreelancerList from './FreelancerList.jsx';
import MyProposals from './MyProposals.jsx';
import PostJob from './PostJob.jsx';

const tabs = ["list_freelancer", "my_proposals", "post_job"];
function Employer() {
  const [tab, setTab] = useState(0); //0-list_freelancer 1-my_proposals 2-post_job
  const onTabClick = (tabId) => {
    return () => setTab(tabId);
  }
  return (
    <div>
      <div className='nav' >
        {tabs.map((tabName, idx) => (
          <span style={{paddingLeft: "3em"}} onClick={onTabClick(idx)} key={idx}>
          {tab===idx?"*":""}{tabName}
          </span>
        ))}

      </div>
    <hr/>
      {tab === 0 ?
        <FreelancerList />
        : tab === 1? 
        <MyProposals/>
        : tab === 2?
        <PostJob/>
        :
        null
      }
    </div>
  );
}

export default Employer;
