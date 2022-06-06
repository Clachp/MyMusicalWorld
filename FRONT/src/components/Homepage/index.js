import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { DialogActions, Button } from '@mui/material';
import { openSignUpModal } from 'src/actions/signup';

const Homepage = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.user);
  const handleSignupOpen = () => {
    const action = openSignUpModal();
    dispatch(action);
  };
  return (
    <div className="homepage">
      <div className="homepage__wrapper">
        <h2 className="homepage__title">Bienvenue</h2>
        <p className="homepage__text"> Partagez votre univers musical à vos amis et vos proches en créant votre bibliothèque musicale !</p>
        {!isLogged && (
        <DialogActions>
          <Button
            sx={{ mb: '60px' }}
            onClick={() => {
              handleSignupOpen();
            }}
            className="button-green homepage__button"
          >
            Commencer
          </Button>
        </DialogActions>
        ) }
      </div>
    </div>
  );
};
export default Homepage;
