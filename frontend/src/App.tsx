import {Route, Routes} from 'react-router-dom';
import Layout from './components/UI/Layout/Layout.tsx';
import Home from './containers/Home/Home.tsx';
import NotFound from './components/UI/Not-Found/NotFound.tsx';
import ArtistPage from './containers/ArtistPage/ArtistPage.tsx';
import AlbumPage from './containers/AlbumPage/AlbumPage.tsx';


const App = () => {

  return (
    <>
     <Layout>
       <Routes>
         <Route path='/' element={(<Home/>)}/>
         <Route path='/albums/:id' element={(<ArtistPage/>)}/>
         <Route path='/tracks/:artistId/:id' element={(<AlbumPage/>)}/>
         <Route path='*' element={(<NotFound/>)}/>
       </Routes>
     </Layout>
    </>
  );
};

export default App;
