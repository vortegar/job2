import axios_config from 'services/axios_config';
import { useDispatch } from 'react-redux';
import { reducerViewProject } from 'pages/projects/projects_slices/projects_slice';

// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const instance = axios_config;

const notify = () => toast.success('Proyecto creado exitomamente');
const notifyUpdate = () => toast.success('Proyecto Editado exitomamente');
const notifyError = () => toast.error('Error');
const notifyAsignation = () => toast.success('Asignación realizada exitomamente');
const notifyErrorAsignation = () => toast.error('Error');

export const postCreateProject = (formData, navigate) => {
 // console.log(formData);
  instance
    .post('data_sheets/', formData)
    .then((res) => {
      notify();
      //window.location = '/projects';
      navigate('/projects')
    })
    .catch((err) => {
      console.log(err);
      notifyError();
    });
};

export const postCreateProjectCubicator = (formData) => {
  //console.log(formData);
  instance
    .post('data_sheets/', formData)
    .then((res) => {
      notify();
      window.location = '/projects';
    })
    .catch((err) => {
      console.log(err);
      notifyError();
    });
};

export const GetPtojectData = (id) => {
  const dispatch = useDispatch();

  instance
    .get('data_sheets/' + id + '/')
    .then((res) => {
      dispatch(reducerViewProject(res.data));
      // const project = data.data?.results;
      // project.map((project) => {
      // let { id, name } = project;
      // dispatch(addCountry({
      //     id: id,
      //     name: name,
      // }))
      // });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updatePtojectData = (id, data, navigate) => {
  // const dispatch = useDispatch();
  data.item_totals = []
  //data.map(el => )
  instance
    .put('data_sheets/' + id + '/', data)
    .then((res) => {
      notifyUpdate();
      //window.location = '/projects';
      navigate('/projects');
    })
    .catch((error) => {
      notifyError();
      console.error(error);
    });
};

export const updatePtojectDataCubicator = (id, data, navigate) => {
  instance
    .put('data_sheets/' + id + '/', data)
    .then((res) => {
      notifyUpdate();
      return res;
      //navigate('/cubageList');
    })
    .catch((error) => {
      notifyError();
      console.error(error);
    });
};

export const updateAsignment = (id, FormData) => {
  instance
    .put(`data_sheets_assignation/` + id + '/', FormData)
    .then((response) => {
      //console.log(response);
      notifyAsignation();
      //window.location = '/projects';
    })
    .catch((error) => {
        notifyErrorAsignation();
        console.log(error);
    });
};
