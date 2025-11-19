import { useState } from 'react';
import {
  Users,
  Calendar,
  FileText,
  FolderOpen,
  Award,
  Activity,
  Menu,
  X,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PartyMemberManagement from './components/PartyMemberManagement';
import MonthlyMeetings from './components/MonthlyMeetings';
import FormsProcedures from './components/FormsProcedures';
import DocumentRepository from './components/DocumentRepository';
import SpecialActivities from './components/SpecialActivities';
import Recognition from './components/Recognition';

export type Section = 'members' | 'meetings' | 'forms' | 'documents' | 'activities' | 'recognition';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('members');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case 'members':
        return <PartyMemberManagement />;
      case 'meetings':
        return <MonthlyMeetings />;
      case 'forms':
        return <FormsProcedures />;
      case 'documents':
        return <DocumentRepository />;
      case 'activities':
        return <SpecialActivities />;
      case 'recognition':
        return <Recognition />;
      default:
        return <PartyMemberManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sidebarOpen={sidebarOpen}
        />

        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
