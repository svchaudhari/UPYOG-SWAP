// import common css 
import './plugins/fontawesome-free/css/all.min.css';
import './dist/css/adminlte.min.css?v=3.2.0';
import './dist/css/custom.css';
import './plugins/overlayScrollbars/css/OverlayScrollbars.min.css';
// import common js files
import $ from 'jquery';
import './plugins/sparklines/sparkline.js';
import './plugins/moment/moment.min.js';
import './plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js';
import './dist/js/adminlte.js';

// import files
import Header from './pages/Header';
import Meenu from './pages/Meenu';
import Footer from './pages/Footer';
import Dashboard from './pages/Dashboard';
window.$ = $;

const App = () => {    
  return (
    <>
       <Meenu></Meenu>
       <Header></Header>
       <Dashboard></Dashboard>
       <Footer></Footer>
    </>
  );
};

export default App;
