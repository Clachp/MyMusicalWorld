import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import { toggleAddMusicModal } from 'src/actions/addMusic';
import { toggleSharingModal, getDashboardData } from 'src/actions/dashboard';
import { unsetActionLogged } from 'src/actions/user';

import DashboardCard from 'src/components/Dashboard/DashboardCard';
import AddMusicModal from 'src/components/AddMusicModal';
import SharingModal from 'src/components/Dashboard/SharingModal';
import Loading from 'src/components/Loading';

import './style.scss';
import style from 'src/styles/_exports.module.scss';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { pseudoSharedSpace } = useParams();

  const { isLogged } = useSelector((state) => state.user);
  const {
    pseudo, artists, albums, tracks, dashboardChanged, pseudoNotExist, loading,
  } = useSelector((state) => state.dashboard);

  const handleOpenAddMusicModal = () => {
    const action = toggleAddMusicModal();
    dispatch(action);
  };

  const handleToggleSharingModal = () => {
    const action = toggleSharingModal();
    dispatch(action);
  };

  useEffect(() => {
    const action = unsetActionLogged();
    dispatch(action);
  }, []);

  useEffect(() => {
    const action = getDashboardData(pseudoSharedSpace);
    dispatch(action);
  }, [dashboardChanged, pseudoSharedSpace]);

  if (pseudoNotExist) {
    return <Navigate to="/error" />;
  }

  return (
    <div className="dashboard">
      {loading ? (
        <div className="dashboard__loading">
          <Loading />
        </div>
      ) : (
        <main className="dashboard__content">
          <Container maxWidth="lg">
            <>
              <h2 className="dashboard__title">{isLogged ? 'Ma bibliothèque' : `Bibliothèque de ${pseudo}`}</h2>
              { artists[0] || albums[0] || tracks[0] ? (
                <>
                  {artists[0] && (
                  <Box sx={{ mb: '10px' }}>
                    <h3 className="dashboard__cat-title">
                      <PersonIcon sx={{ mr: '10px' }} fontSize="large" />
                      <span>Artistes</span>
                    </h3>
                    <Box className="dashboard__card-wrapper">
                      {artists.map((artist) => <DashboardCard type="artist" key={artist.api_id} {...artist} />)}
                    </Box>
                  </Box>
                  )}
                  {albums[0] && (
                  <Box sx={{ mb: '10px' }}>
                    <h3 className="dashboard__cat-title">
                      <AlbumIcon sx={{ mr: '10px' }} fontSize="large" />
                      <span>Albums</span>
                    </h3>
                    <Box className="dashboard__card-wrapper">
                      {albums.map((album) => <DashboardCard type="album" key={album.api_id} {...album} />)}
                    </Box>
                  </Box>
                  )}
                  {tracks[0] && (
                  <Box>
                    <h3 className="dashboard__cat-title">
                      <AudiotrackIcon sx={{ mr: '10px' }} fontSize="large" />
                      Titres
                    </h3>
                    <Box className="dashboard__card-wrapper">
                      {tracks.map((track) => <DashboardCard type="track" key={track.api_id} {...track} />)}
                    </Box>
                  </Box>
                  )}
                  {isLogged && (
                  <Fab size="medium" onClick={handleToggleSharingModal} className="dashboard__share-mobile" aria-label="share dashboard">
                    <ShareIcon sx={{ width: '35px', height: '35px' }} />
                  </Fab>
                  )}
                </>
              ) : (
                <Box className="dashboard__card-wrapper">
                  <DashboardCard />
                </Box>
              )}
              {isLogged && (
              <Fab size="medium" onClick={handleOpenAddMusicModal} sx={{ backgroundColor: style.blue }} className="dashboard__add-mobile" aria-label="add music">
                <MusicNoteIcon sx={{ fontSize: '30px' }} />
                <AddIcon sx={{ fontSize: '18px' }} />
              </Fab>
              )}
            </>
          </Container>
        </main>
      )}
      <AddMusicModal />
      <SharingModal />
    </div>
  );
};

export default Dashboard;
