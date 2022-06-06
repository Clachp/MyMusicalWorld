import { useDispatch, useSelector } from 'react-redux';
import { closeLoginModal, submitLogin } from 'src/actions/login';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';

const LoginModal = () => {
  const dispatch = useDispatch();
  const { modalOpened } = useSelector((state) => state.login);
  const { error } = useSelector((state) => state.errors);
  const handleClose = () => {
    const action = closeLoginModal();
    dispatch(action);
  };

  const validationSchema = yup.object({
    mail: yup
      .string('Entrez votre email')
      .email('Entrez un email valide.')
      .required('Le champ "Email" est requis'),
    password: yup
      .string('Entrez votre mot de passe')
      .matches('^[a-zA-Z0-9\\W_]{5,30}$', 'Votre mot de passe doit contenir entre 5 et 30 caractères.')
      .required('Le champ "Mot de passe" est requis'),
  });

  const formik = useFormik({
    initialValues: {
      mail: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const action = submitLogin(values);
      dispatch(action);
      handleClose();
    },
  });

  return (
    <div>
      <Dialog open={modalOpened} onClose={handleClose}>
        <DialogTitle>Connexion</DialogTitle>
        <DialogContent>
          <Box
            component="div"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus
              margin="dense"
              name="mail"
              id="mail"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              placeholder="Entrez votre email"
              value={formik.values.mail}
              onChange={formik.handleChange}
              error={formik.touched.mail && Boolean(formik.errors.mail)}
              helperText={formik.touched.mail && formik.errors.mail}
            />
            <TextField
              margin="dense"
              name="password"
              id="password"
              label="Mot de passe"
              type="password"
              fullWidth
              variant="standard"
              placeholder="Entrez votre mot de passe"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <DialogActions sx={{ display: 'flex', alignContent: 'space-between', flexWrap: 'wrap' }}>
              {error && (
                <Alert className="signupModal__error" severity="error">{error}</Alert>
              )}
              <Button
                sx={{ ml: 'auto', mt: '10px' }}
                onClick={formik.handleSubmit}
                className="button-green"
                type="submit"
              >
                Se connecter
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </div>
  );
};

export default LoginModal;
