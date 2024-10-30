import { Outlet } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Root;

