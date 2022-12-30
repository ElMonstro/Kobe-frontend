import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OVER_VIEW } from '../../utils/constants';
import DashboardTab from '../dashboardsTab';

import "./index.scss"

const OverviewTab =  () => {

  const { setActiveCompMemberNav } = useOutletContext();

  useEffect(() => {
    setActiveCompMemberNav(OVER_VIEW);
  }, []);
  
  return (
    <div className="overview_tab">
        <DashboardTab loadedIn={ OVER_VIEW } personalData/>
    </div>
  );
}

export default OverviewTab;
