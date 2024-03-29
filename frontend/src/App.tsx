import { Route, Routes, useNavigate } from 'react-router-dom';
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
import AlbumForm from './containers/ArtistPage/AlbumForm.tsx';
import TrackForm from './containers/AlbumPage/TrackForm.tsx';
import AdminPage from './containers/AdminPage/AdminPage.tsx';
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { selectCurrentTrack } from './containers/AlbumPage/tracksSlice.ts';
import { useEffect } from 'react';
import { gitHubLogin } from './containers/Users/usersThunks.ts';


const App = () => {
  const currentTrack = useAppSelector(selectCurrentTrack);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = window.location.search;

  useEffect(() => {
    const params = new URLSearchParams(query);
    const code = params.get('code');
    if (code) {
      dispatch(gitHubLogin(code)).unwrap();
    }
    navigate('/');
  }, [dispatch, query]);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={(<Home/>)}/>
          <Route path="/register" element={(<Register/>)}/>
          <Route path="/login" element={(<Login/>)}/>
          <Route path="/admin" element={(<AdminPage/>)}/>
          <Route path="/create_artist" element={(<ArtistForm/>)}/>
          <Route path="/create_album" element={(<AlbumForm/>)}/>
          <Route path="/create_track" element={(<TrackForm/>)}/>
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
