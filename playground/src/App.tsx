import { Navigation } from './components/Navigation/Navigation';
import { Content } from './components/Content/Content';
import { Layout } from './components/Layout/Layout';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Navigation />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default App;
