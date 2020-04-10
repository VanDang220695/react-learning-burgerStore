import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import { getProfile, updateProfile } from '../../store/actions/profile';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name must be required'),
  address: Yup.string().required('Address must be required'),
  dob: Yup.string().required('Day of birth must be required'),
});

const mapStateToProps = (state) => {
  return {
    idToken: state.auth.token,
    email: state.auth.email,
    profile: state.profile.profile,
    loading: state.profile.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFullProfile: () => dispatch(getProfile()),
    updateProfile: (payload) => dispatch(updateProfile(payload)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    displayName: 'formProfile',
    enableReinitialize: true,
    mapPropsToValues: (props) => {
      const {
        profile: { fullName, address, note, imageUrl, dob, email },
      } = props;
      return {
        fullName: fullName || '',
        email,
        address: address || '',
        note: note || '',
        imageUrl: imageUrl || '',
        dob: (dob && moment(dob)) || '',
      };
    },
    validationSchema: () => validationSchema,
    handleSubmit: async (values, formikBag) => {
      const { props } = formikBag;
      const { dob, ...restParams } = values;
      const { updateProfile } = props;
      await updateProfile({
        dob: moment(dob).toISOString(),
        updatedTime: moment().toISOString(),
        ...restParams,
      });
      props.history.goBack();
    },
  }),
);
