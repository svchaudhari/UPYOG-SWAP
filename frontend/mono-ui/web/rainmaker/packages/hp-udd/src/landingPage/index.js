import './assets/css/base.css';
import './assets/css/style1.css';
import './assets/css/custom.css';
import './assets/css/flexslider.min.css';
import './assets/css/custom-flexslider.css';


// import JS
import './assets/js/jquery-migrate.min.js';
// import './assets/js/bootstrap-tooltip.js';
import './assets/js/jquery.flexslider.js'
import './assets/js/jquery.fancybox.js';
import './assets/js/menu.js';
import './assets/js/extra.js';

// import files
import Header from './pages/Header';
import MainContainer from './pages/MainContainer';
// import Footer from './pages/Footer';
// import Dashboard from './pages/Dashboard';


const LandingPage = () => {    
    return (
      <>
         <Header />
         <MainContainer />
      </>
    );
  };
  
  export default LandingPage;