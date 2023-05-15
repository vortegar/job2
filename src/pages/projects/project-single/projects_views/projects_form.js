import React from 'react';
//REACT IMPORTS
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// import { DeleteOutlined, FileAddOutlined, CloudUploadOutlined, OrderedListOutlined } from '@ant-design/icons';

// MATERIAL IMPORTS
import { DialogActions, DialogTitle, Box, OutlinedInput, Grid, Select, MenuItem, Snackbar, TextField, InputLabel, Checkbox, ListItemText } from '@mui/material';

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';

// tableGrid
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// react toolkit
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { postCreateProject, GetPtojectData, updatePtojectData } from '../project-single-services/projectSingleServices';
import { downloadExcel } from 'pages/projects/projects_services/projects_service';

import { getProvinceData, getCommuneData } from 'pages/providers/providers_services/providers_service';


import instance from 'services/axios_config';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import { useTheme } from '@mui/material/styles';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const FormDialog = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getProvinceData(dispatch);
    getCommuneData(dispatch);

  }, []);
  const formatObj = {
    "id": "",
    "project_number": "",
    "project_title": "",
    "principal_name": "",
    "address": "",
    "status": "",
    "mo": '',
    "gf": '',
    "gg": '',
    "utl": '',
    "province": {},
    "commune": {},
    "cubicator": [],
    "supervised_by": [],
    "files": [],
    "item_descriptions": [],
    "item_totals": [],
    "quantity_total": '',
    "unit_area_total": '',
    "total_surface_total": ''
  }
  const [open, setOpen] = useState(false);
  const [viewProject, Set_viewProject] = useState(formatObj);
  const [dataTable, Set_dataTable] = useState([]);
  const [formUpdate, Set_formUpdate] = useState(true);
  const [item_totals, Set_item_totals] = useState([]);

  var isNew = true;
  const [listSupervised, setListSupervised] = useState([]);
  const [listCubicator, setListCubicator] = useState([]);

  const [personName, setPersonName] = React.useState([]);

  const [listCommune, setListCommune] = useState([
    {
        "id": 52,
        "name": "Santiago",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 53,
        "name": "Cerrillos",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 54,
        "name": "Cerro Navia",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 55,
        "name": "Conchalí",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 56,
        "name": "El Bosque",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 57,
        "name": "Estación Central",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 58,
        "name": "Huechuraba",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 59,
        "name": "Independencia",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 60,
        "name": "La Cisterna",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 61,
        "name": "La Florida",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 62,
        "name": "La Granja",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 63,
        "name": "La Pintana",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 64,
        "name": "La Reina",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 65,
        "name": "Las Condes",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 66,
        "name": "Lo Barnechea",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 67,
        "name": "Lo Espejo",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 68,
        "name": "Lo Prado",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 69,
        "name": "Macul",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 70,
        "name": "Maipú",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 71,
        "name": "Ñuñoa",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 72,
        "name": "Pedro Aguirre Cerda",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 73,
        "name": "Peñalolén",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 74,
        "name": "Providencia",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 75,
        "name": "Pudahuel",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 76,
        "name": "Quilicura",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 77,
        "name": "Quinta Normal",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 78,
        "name": "Recoleta",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 79,
        "name": "Renca",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 80,
        "name": "San Joaquín",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 81,
        "name": "San Miguel",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 82,
        "name": "San Ramón",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    },
    {
        "id": 83,
        "name": "Vitacura",
        "province": {
            "id": 13,
            "name": "Santiago",
            "created_at": "24-11-2022 18:02:52",
            "updated_at": "24-11-2022 18:02:52",
            "region": {
                "id": 4,
                "name": "Región Metropolitana de Santiago",
                "created_at": "24-11-2022 18:02:52",
                "updated_at": "24-11-2022 18:02:52",
                "country": {
                    "id": 1,
                    "name": "Chile",
                    "code": "CL",
                    "created_at": "24-11-2022 18:02:48",
                    "updated_at": "24-11-2022 18:02:48"
                }
            }
        }
    }
])
  const [idProvince, setIdProvince] = useState(13)
  const { id } = useParams();
  const navigate = useNavigate()
  //const theme = useTheme();

  const handleChangeCubicator = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const generateListSupervised = () => {
    return listSupervised.map((supervised) => {
      return (
        <MenuItem key={supervised.id} value={supervised.id}>
          {' '}
          {supervised.first_name} {supervised.last_name}
        </MenuItem>
      );
    });
  };

  const generateListCubicator = () => {
    return listCubicator.map((cubicator) => {
      return (
        <MenuItem key={cubicator.id} value={cubicator.id}>
          {' '}
          {cubicator.first_name} {cubicator.last_name}
        </MenuItem>
      );
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const provinces = useSelector((store) => store.provinces);

  const generateProvinceOptions = () => {
    return provinces.map((province) => {
      return (
        <MenuItem key={province.id} value={province.id}>
          {' '}
          {province.name}{' '}
        </MenuItem>
      );
    });
  };

  const communes = useSelector((store) => store.communes);

  const generateCommuneOptions = () => {
    return listCommune.map((commune) => {
      return (
        <MenuItem key={commune.id} value={commune.id}>
          {' '}
          {commune.name}{' '}
        </MenuItem>
      );
    });
  };
  
  useEffect(() => {
    const aa = communes.filter(commune => commune?.province?.id == idProvince)
/*     console.log(communes)
    console.log(idProvince)
    console.log(aa) */
    !isNew && setListCommune(aa)
  }, [idProvince]);

  const handleBlur = (event) => {
    //console.log('problema', event)
    /*corregir*/
    setIdProvince(event)
  };

  const down_load_Excel = (id) => {
    downloadExcel(id);
  };

  const value = '';

  id ? (isNew = false) : (isNew = true);

  useEffect(() => {

    // get cubicator
    instance
      .get('users/?groups__name=cubicator')
      .then((res) => {
        setListCubicator(res.data.results);
      })
      .catch((error) => {
        console.error(error);
      });


    instance
      .get('users/?groups__name=supervisor')
      .then((res) => {
       setListSupervised(res.data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    if (id === undefined) isNew = true;

    if (!isNew) {
      instance
        .get('data_sheets/' + id + '/')
        .then((res) => {
          Set_viewProject(res.data);
          Set_dataTable(res.data.item_descriptions);
          Set_item_totals([]);
          let items_total_set = res.data.item_totals;
          reset({
            test: []
          });
          items_total_set.map((item, index) => {
            append({ label: item.label, value: 2 });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const styleInput = { borderRadius: '10px', width: '100%', textAlign: 'center', '& .css1eeicq0MuiButtonBaseRootMuiMenuItemRoot.MuiSelected': { backgroundColor: '#b5dfff' } };

  const Item = styled(Paper)(({ theme }) => ({
    border: 0,
    textAlign: 'center',
    boxShadow: 'none',
    paddingTop: '1px'
  }));

  const validationSchema = yup.object({
    project_title: yup.string().required('Requiere titulo de proyecto'),
    principal_name: yup.string().required('Requiere nombre de proyecto'),
    address: yup.string().required('Requiere dirección de proyecto'),
    province: yup.string().required('Requiere cuidad'),
    commune: yup.string().required('Requiere comuna'),
    cubicator: yup.array().min(1,'Requiere cubicador'),
    supervised_by: yup.array(),
    mo: yup.string(),
    gf: yup.string(),
    gg: yup.string(),
    utl: yup.string()
  });

  // --------------------------------usarFieldArray-----------------------
  const {
    register,
    control,
    handleSubmit: handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      item_totals
    }
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'item_totals'
  });

  if (!isNew) {
    setValue('project_title', viewProject.project_title);
    setValue('principal_name', viewProject.principal_name);
    setValue('address', viewProject.address);
    setValue('province', viewProject?.province?.id);
    setValue('commune', viewProject?.commune?.id);
    setValue('mo', viewProject?.mo);
    setValue('gf', viewProject?.gf);
    setValue('gg', viewProject?.gg);
    setValue('utl', viewProject?.utl);
  }

  // ------------------------------- dataTable-----------------------------
  const TableItems = () => {
    return (
      <TableContainer align="center" style={{ width: '100%' }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Piso Tipo</TableCell>
              <TableCell align="center">Total Piso Tipo</TableCell>
              <TableCell align="center">Superficie Unitaria (m2)</TableCell>
              <TableCell align="center">Superficie total (m2)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.unit_area}</TableCell>
                <TableCell align="center">{row.unit_area * row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  // ------------------------------finish dataTable-------------------------

  const itemsTemp = {
    description: '',
    quantity: '',
    unit_area: ''
  };

  const validateItems = (data) => {
    // if(data.description)
    // data.description.length ? itemsTemp.description = data.description : errorItems.description.status =true

    if (data.description) itemsTemp.description = data.description;

    if (data.quantity) itemsTemp.quantity = data.quantity;

    if (data.unit_area) itemsTemp.unit_area = data.unit_area;
  };

  const insertItmes = () => {
    Set_dataTable((dataTable) => [...dataTable, itemsTemp]);
  };

  const onSubmit = (data) => {
    data.item_descriptions = dataTable;
    //console.log({ data, id });
    isNew ? postCreateProject(data, navigate) : updatePtojectData(id, data, navigate);
    {
      //window.location = '/projects';
    }
  };

  return (
    <div>
      <DialogTitle sx={{ fontSize: 18, fontFamily: 'Roboto', fontWeight: 'bold', padding: '9px 12px' }}>
        {isNew ? 'Nuevo projecto' : 'Editar'}
      </DialogTitle>

      <DialogTitle sx={{ padding: '9px 12px' }}>
        {isNew ? 'Ingresa los datos para poder ingresar el proyectos' : 'Ingresa los datos nuevos para editar el proyectos'}
      </DialogTitle>

      <form
        sx={{ m: 1, minWidth: 120 }}
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="N° Proyecto"
                  style={styleInput}
                  type="text"
                  defaultValue={isNew ? viewProject.project_number : viewProject.project_number}
                  disabled
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Proyecto"
                  style={styleInput}
                  type="text"
                  defaultValue={isNew ? value : viewProject.project_title}
                  disabled={!formUpdate}
                  {...register('project_title')}
                />
                <p style={{ color: 'red' }}>{errors.project_title?.message}</p>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Mandate"
                  style={styleInput}
                  type="text"
                  defaultValue={isNew ? value : viewProject.principal_name}
                  {...register('principal_name')}
                  disabled={!formUpdate}
                />
                <p style={{ color: 'red' }}>{errors.principal_name?.message}</p>
              </Item>
            </Grid>

            <Grid item xs={4}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Dirección"
                  style={styleInput}
                  type="text"
                  defaultValue={isNew ? value : viewProject.address}
                  {...register('address')}
                  disabled={!formUpdate}
                />
                <p style={{ color: 'red' }}>{errors.address?.message}</p>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Controller
                  control={control}
                  name="province"
                  // defaultValue={value ? value : viewProject?.province?.id}
                  defaultValue={13}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      style={styleInput}
                      onChange={onChange}
                      onBlur={handleBlur(value)}
                      // onClick={()=>{handleChange(value)}}
                      sx={{ display: 'inline-flex', flexGrow: 1 }}
                      {...register('province')}
                      disabled={!formUpdate}
                      value={value ? value : viewProject?.province?.id}
                    >
                      {generateProvinceOptions()}
                    </Select>
                  )}
                />

                <p style={{ color: 'red' }}>{errors.province?.message}</p>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Controller
                  control={control}
                  name="commune"
                  defaultValue={isNew ? '' : viewProject?.commune?.id}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Select
                        style={styleInput}
                        onChange={onChange}
                        value={isNew ? value : viewProject?.commune?.id}
                        autowidth="true"
                        sx={{ display: 'inline-flex', flexGrow: 1 }}
                        {...register('commune')}
                        disabled={!formUpdate}
                      >
                        {generateCommuneOptions()}
                      </Select>
                    </>
                  )}
                />
                <p style={{ color: 'red' }}>{errors.commune?.message}</p>
              </Item>
            </Grid>
            
            <Grid item xs={3}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="MO"
                  style={styleInput}
                  type="number"
                  defaultValue={isNew ? value : viewProject.mo}
                  disabled={!formUpdate}
                  {...register('mo')}
                />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="GF %"
                  style={styleInput}
                  type="number"
                  defaultValue={isNew ? value : viewProject.gf}
                  disabled={!formUpdate}
                  {...register('gf')}
                />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="GG %"
                  style={styleInput}
                  type="number"
                  defaultValue={isNew ? value : viewProject.gg}
                  disabled={!formUpdate}
                  {...register('gg')}
                />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="UTL %"
                  style={styleInput}
                  type="number"
                  defaultValue={isNew ? value : viewProject.utl}
                  disabled={!formUpdate}
                  {...register('utl')}
                />
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item>
                <InputLabel id="demo-multiple-name-label" style={{ top:'3px', fontSize:'13px', textAlign:'left',marginLeft:' 10px' }}>Cubicador</InputLabel>
                <Controller
                  control={control}
                  name="cubicator"
                  defaultValue={isNew ? [] : viewProject?.cubicator.map(obj => { return obj.id })}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label="cubicator"
                      variant="outlined"
                      style={styleInput}
                      onChange={onChange}
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={ value }
                      // onChange={handleChange}
                      {...register('cubicator')}
                      input={<OutlinedInput label="Name" />}
                      MenuProps={MenuProps}
                    >
                      {listCubicator.map((cubicator) => (
                        <MenuItem
                          key={cubicator.id}
                          value={cubicator.id}
                        // style={getStyles(cubicator, personName, theme) }
                        >
                          {cubicator.first_name + ' ' + cubicator.last_name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <p style={{ color: 'red' }}>{errors.cubicator?.message}</p>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
              <InputLabel id="demo-multiple-name-label" style={{ top:'3px', fontSize:'13px', textAlign:'left', marginLeft:' 10px'}}>Supervisor</InputLabel>

                <Controller
                  control={control}
                  name="supervised_by"
                  defaultValue={isNew ? [] : viewProject?.supervised_by.map(obj => { return obj.id })}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Select
                        label="supervisor"
                        style={styleInput}
                        onChange={onChange}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        // value={isNew ? value : viewProject?.supervised_by.map(obj => { return obj.id })}
                        value={value }
                        // onChange={handleChange}
                        {...register('supervised_by')}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                      >
                        {listSupervised.map((supervisor) => (
                          <MenuItem
                            key={supervisor.id}
                            value={supervisor.id}
                          >
                            {supervisor.first_name + ' ' + supervisor.last_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                />
                <p style={{ color: 'red' }}>{errors.supervised_by?.message}</p>
              </Item>
            </Grid>

            <Grid item xs={12}>
              {/* ------------------------------add label--------------------- ----*/}
              <Item>
                <DialogTitle sx={{ padding: '9px 12px', textAlign: 'left' }}>
                  {/* Características principales &nbsp; */}
                  { fields.length >0 && 'Características principales'}

                  {/* {formUpdate ? (
                    <ButtonComponent
                      aria-label="delete"
                      type="submit"
                      variant="contained"
                      color="success"
                      onClick={() => append({ label: '', value: '' })}
                    >
                      <FileAddOutlined />
                    </ButtonComponent>
                  ) : (
                    ''
                  )} */}
                </DialogTitle>
              </Item>
            </Grid>
            {fields.map((item, index) => {
              return (
                <>
                  <Grid item key={index} xs={2}>
                    <Item key={item.id}>
                     {/*  <li key={item.id}> */}
                        <OutlinedInput
                          style={styleInput}
                          type="text"
                          placeholder="Label"
                          name={`item_totals[${index}].label`}
                          defaultValue={`${item.label}`}
                          disabled={true}
                          required
                          {...register(`item_totals.${index}.label`)}
                        />
                        <p style={{ color: 'red' }}> {errors?.['item_totals']?.[index]?.['label']?.['message']}</p>

                        <OutlinedInput
                          style={styleInput}
                          type="number"
                          placeholder="Value"
                          name={`item_totals[${index}].value`}
                          defaultValue={`${item.value}`}
                          disabled={true}
                          {...register(`item_totals.${index}.value`)}
                          required
                        // onBlur={()=>{
                        //   // console.log(fields)
                        //   console.log(item_totals.find(a=>a.label==item_totals[index].label))
                        //   console.log(item_totals.findIndex(a=>a.label==item_totals[index].label))
                        //   console.log(event.target.value)
                        //   // item_totals[item_totals.findIndex(a=>a.label==item_totals[index].label)].value = Number(event.target.value)
                        //   console.log(item_totals)
                        //   // dispatch(reducer_total_items_Default(item_totals))

                        // }}
                        />
                        {/* <p style={{ color: 'red' }}> {errors?.['item_totals']?.[index]?.['value']?.['message']}</p> */}
                        {/* {formUpdate ? (
                          <ButtonComponent onClick={() => remove(index)} variant="contained" color="error">
                            <DeleteOutlined />
                          </ButtonComponent>
                        ) : (
                          ''
                        )} */}
                      {/* </li> */}
                    </Item>
                  </Grid>
                </>
              );
            })}
            {/* ------------------------------finish add label--------------------- ----*/}

            <Grid item xs={12}>
              <Item>
              { dataTable.length>0 &&  <DialogTitle sx={{ padding: '9px 12px', textAlign: 'left' }}> Listado Items &nbsp;</DialogTitle>}
               
              </Item>
            </Grid>

            {/* {formUpdate ? (
              <>
                <Grid item xs={5}>
                  <Item>
                    <OutlinedInput
                      style={styleInput}
                      type="text"
                      placeholder="Piso Tipo"
                      onChange={(event) => validateItems({ description: event.target.value })}
                    />

                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    <OutlinedInput
                      style={styleInput}
                      type="number"
                      placeholder="Total Piso Tipo"
                      onChange={(event) => validateItems({ quantity: event.target.value })}
                    />

                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    <OutlinedInput
                      min="1"
                      style={styleInput}
                      type="number"
                      onChange={(event) => validateItems({ unit_area: event.target.value })}
                      placeholder="Superficie Unitaria (m2)"
                    />
                  </Item>
                </Grid>

                <Grid item xs={1}>
                  <Item>
                    <ButtonComponent
                      variant="contained"
                      color="success"
                      onClick={() => {
                        insertItmes();
                      }}
                    >
                      Agregar
                    </ButtonComponent>
                  </Item>
                </Grid>
              </>
            ) : (
              ''
            )} */}

            { dataTable.length>0 && <TableItems />}
          </Grid>
        </Box>
        <DialogActions>
          {formUpdate ? (
            <ButtonComponent type="submit" variant="contained" color={'success'}>
              {isNew ? 'Crear' : 'guardar'}
            </ButtonComponent>
          ) : (
            ''
          )}

{/*           {!isNew ? (
            <>
              <ButtonComponent
                onClick={() => {
                  Set_formUpdate(false), (isNew = false);
                  down_load_Excel(id);
                }}
                variant="contained"
                color={'primary'}
              >
                Generar Fichaa
              </ButtonComponent>
            </>
          ) : (
            ''
          )} */}
          <ButtonComponent
            onClick={() => {
              //window.location = '/projects';
              navigate('/projects');
            }}
            variant="contained"
            color="error"
          >
            Volver
          </ButtonComponent>
        </DialogActions>
      </form>
      <ToastContainer />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Upload Test...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FormDialog;
