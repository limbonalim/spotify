import { Route, Routes } from 'react-router-dom';
import Layout from './components/UI/Layout/Layout.tsx';
import Home from './containers/Home/Home.tsx';
import NotFound from './components/UI/Not-Found/NotFound.tsx';
import ArtistPage from './containers/ArtistPage/ArtistPage.tsx';
import AlbumPage from './containers/AlbumPage/AlbumPage.tsx';
import Register from './containers/Users/Register.tsx';
import Login from './containers/Users/Login.tsx';
import TrackHistoryPage from './containers/TrackHistoryPage/TrackHistoryPage.tsx';
import Player from './components/UI/Player/Player.tsx';
import ArtistForm from './containers/Home/ArtistForm.tsx';
import { useAppSelector } from './app/hooks.ts';
import { selectCurrentTrack } from './containers/AlbumPage/tracksSlice.ts';


const App = () => {
  const currentTrack = useAppSelector(selectCurrentTrack);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={(<Home/>)}/>
          <Route path="/register" element={(<Register/>)}/>
          <Route path="/login" element={(<Login/>)}/>
          <Route path="/create_artist" element={(<ArtistForm/>)}/>
          <Route path="/tracks_history" element={(<TrackHistoryPage/>)}/>
          <Route path="/albums/:id" element={(<ArtistPage/>)}/>
          <Route path="/tracks/:artistId/:id" element={(<AlbumPage/>)}/>
          <Route path="*" element={(<NotFound/>)}/>
        </Routes>
        {currentTrack && <Player url={currentTrack ? currentTrack : ''}/>}
      </Layout>
    </>
  );
};

export default App;
