import { useState } from 'react';
import DashboardShell from '../components/DashboardShell';
import DashboardHome from './DashboardHome';
import SQLLessons from './SQLLessons';
import Practice from './Practice';
import Quiz from './Quiz';
import Profile from './Profile';

const pageComponents = {
  dashboard: DashboardHome,
  lessons: SQLLessons,
  practice: Practice,
  quiz: Quiz,
  profile: Profile,
};

const Dashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const PageComponent = pageComponents[activePage] || DashboardHome;

  return (
    <DashboardShell activePage={activePage} onPageChange={setActivePage}>
      <PageComponent onNavigate={setActivePage} />
    </DashboardShell>
  );
};

export default Dashboard;
