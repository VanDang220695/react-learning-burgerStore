import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { auth, setAuthRedirectPath } from '../../store/actions/auth';

const schemasValidation = Yup.object({
  email: Yup.string().required('Email is required').email('Email is not valid.'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long.')
    .matches(/(?=.*[0-9])/g, 'Password must be contain at least one number.')
    .max(10, 'Password have a maximum limit of 16 characters only'),
  confirmationPassword: Yup.string().when(
    ['password', 'isSignup'],
    (password, isSignup, schema) => {
      if (isSignup) {
        return schema
          .required('Confirm password is required')
          .test(
            'check-match-password',
            'The confirm password does not match',
            (confirmPassword) => password === confirmPassword,
          );
      }
    },
  ),
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: !!state.auth.token,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
  isSignupSuccess: state.auth.isSingupSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
  onSetRedirectPath: () => dispatch(setAuthRedirectPath('/')),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('isSignup', 'setIsSignup', false),
  withFormik({
    displayName: 'formAuth',
    mapPropsToValues: () => {
      return {
        email: '',
        password: '',
        confirmationPassword: '',
        isSignup: false,
      };
    },
    validationSchema: () => schemasValidation,
    handleSubmit: async (values, formikBag) => {
      const { props } = formikBag;
      const { email, password, isSignup } = values;
      props.onAuth({ email, password, isSignup });
    },
  }),
  withHandlers({
    changeToLoginForm: (props) => () => {
      props.setFieldValue('isSignup', false);
    },
    switchAuthModeHandler: (props) => () => {
      const { values, setIsSignup, setFieldValue } = props;
      setFieldValue('confirmationPassword', '');
      setFieldValue('isSignup', !values.isSignup);
      setIsSignup((prevState) => !prevState);
    },
  }),
);
