import { useDispatch, useSelector } from 'react-redux';
import { submitModifiedProfile } from 'src/actions/profile';
import { toggleProfileModal } from 'src/actions/header';
import { deleteUser } from 'src/actions/user';
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

const ProfileModal = () => {
  const dispatch = useDispatch();
  const opened = useSelector((state) => state.header.profileModalOpened);

  const {
    firstname, lastname, pseudo, mail,
  } = useSelector((state) => state.user);

  const handleProfileModalToggle = () => {
    const action = toggleProfileModal();
    dispatch(action);
  };

  const handleDeleteUser = () => {
    const action = deleteUser();
    dispatch(action);
  };

  const validationSchema = yup.object({
    firstname: yup
      .string('Entrez votre prénom')
      .required('Le champ "Prénom" est requis'),
    lastname: yup
      .string('Entrez votre nom')
      .required('Le champ "Nom" est requis'),
    pseudo: yup
      .string('Entrez votre pseudo')
      .required('Le champ "Pseudo" est requis'),
    mail: yup
      .string('Entrez votre email')
      .email('Entrez un email valide.')
      .required('Le champ "Email" est requis'),
    password: yup
      .string('Entrez votre mot de passe')
      .matches('^[a-zA-Z0-9\\W_]{5,30}$', 'Votre mot de passe doit contenir entre 5 et 30 caractères.')
      .required('Le champ "Mot de passe" est requis'),
    password_confirmation: yup
      .string('Entrez votre confirmation de mot de passe')
      .oneOf([yup.ref('password'), null], 'Confirmation et mot de passe non identiques')
      .required('Le champ "Confirmation de mot de passe" est requis'),
  });

  const formik = useFormik({
    initialValues: {
      firstname,
      lastname,
      mail,
      pseudo,
      password: '',
      password_confirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const action = submitModifiedProfile(values);
      dispatch(action);
      handleProfileModalToggle();
    },
  });

  return (
    <div>
      <Dialog open={opened} onClose={handleProfileModalToggle}>
        <DialogTitle>Mon profil</DialogTitle>
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
              name="lastname"
              id="lastname"
              label="Nom"
              type="text"
              fullWidth
              variant="standard"
              placeholder="Entrez votre nom"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            />
            <TextField
              margin="dense"
              name="firstname"
              id="firstname"
              label="Prénom"
              type="text"
              fullWidth
              variant="standard"
              placeholder="Entrez votre prénom"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
            />
            <TextField
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
              name="pseudo"
              id="pseudo"
              label="Pseudo"
              type="text"
              fullWidth
              variant="standard"
              placeholder="Entrez votre pseudo"
              value={formik.values.pseudo}
              onChange={formik.handleChange}
              error={formik.touched.pseudo && Boolean(formik.errors.pseudo)}
              helperText={formik.touched.pseudo && formik.errors.pseudo}
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
              autoComplete="off"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              margin="dense"
              name="password_confirmation"
              id="password_confirmation"
              label="Confirmation de mot de passe"
              type="password"
              fullWidth
              variant="standard"
              placeholder="Confirmez votre mot de passe"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
              helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
            />
            <DialogActions>
              <Button
                type="submit"
                className="button-green"
                onClick={formik.handleSubmit}
              >
                Enregistrer
              </Button>
              <Button
                className="button-red"
                onClick={() => {
                  handleProfileModalToggle();
                  handleDeleteUser();
                }}
              >
                Supprimer le compte
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
        <IconButton
          aria-label="close"
          onClick={handleProfileModalToggle}
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

export default ProfileModal;
