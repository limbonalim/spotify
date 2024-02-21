import {Route, Routes} from 'react-router-dom';
import Layout from './components/UI/Layout/Layout.tsx';
import Home from './containers/Home/Home.tsx';
import NotFound from './components/UI/Not-Found/NotFound.tsx';
import AlbumsPage from './containers/ArtistPage/AlbumsPage.tsx';


const App = () => {

  return (
    <>
     <Layout>
       <Routes>
         <Route path='/' element={(<Home/>)}/>
         <Route path='/albums/:id' element={(<AlbumsPage/>)}/>
         <Route path='*' element={(<NotFound/>)}/>
       </Routes>
     </Layout>
    </>
  );
};

export default App;
