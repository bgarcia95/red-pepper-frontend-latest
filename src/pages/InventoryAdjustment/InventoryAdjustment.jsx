import React, {useEffect} from 'react';
import {
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { AddButton } from 'components/UI/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getSuppliesAction } from 'redux/actions/supplies/supplies';
import * as Yup from 'yup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik } from 'formik';
import httpService from 'services/httpService';
import Swal from 'sweetalert2';

const InventoryAdjustment = () => {

  const supplies = useSelector((state) => state.supplies.supplies);

  const dispatch = useDispatch();
  useEffect(() => {
    const getSupplies = () => dispatch(getSuppliesAction());
    getSupplies();
  }, [dispatch]);

  const suppliesSelect = supplies.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  return (
    <Formik
      initialValues={{
        // Supply input
        supplyId: null,
        supplyName: null,
        supplyInputName: '',
        quantity: '',
        comment: '',
        locale: 'es',
      }}
      validationSchema={Yup.object().shape({
        supplyInputName: Yup.string().required('Requerido'),
        quantity: Yup.number().required('Requerido'),
        comment: Yup.string().required('Por favor ingrese un comentario'),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
        } = props;

        const clearDetailHandler = () => {
          setFieldValue('supplyName', null);
          setFieldValue('supplyId', null);
          setFieldValue('supplyInputName', '');
          setFieldValue('quantity', '');
          setFieldValue('comment', '');

          setFieldTouched('supplyInputName', false);
          setFieldTouched('quantity', false);
          setFieldTouched('comment', false);
        };

        const onSubmit = (e) => {
          e.preventDefault();

					try {
						Swal.fire({
            title: '¿Estás seguro/a?',
            text: 'Se procederá con el ajuste de inventario ',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, confirmar!',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.value) {

              httpService.post('/inventory', {
								SupplyId: values.supplyId,
								Qty: values.quantity,
								Comments: values.comment
							});

              Swal.fire(
                '¡Completado!',
                'El ajuste de inventario se realizó satisfactoriamente.',
                'success'
              );

							clearDetailHandler();
            }
          });
					} catch (error) {
						throw new Error(error);
					}
        };

        return (
          <React.Fragment>
            <form className="form-control">
              <Divider style={{ margin: '1rem 0 2rem 0' }} />
              <Typography variant="h5" align="center">
                Ajute de Inventario
              </Typography>

              <Grid container spacing={2} style={{margin: '20px 0'}}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth={true}>
                    <Autocomplete
                      id="supplyInputName"
                      options={suppliesSelect}
                      getOptionLabel={(option) =>
                        typeof option === 'string' ? option : option.label
                      }
                      getOptionSelected={(option, value) =>
                        value === option.label
                      }
                      value={values.supplyName}
                      onChange={(event, newValue) => {
                        if (newValue !== null) {
                          setFieldValue('supplyName', newValue.label);
                          setFieldValue('supplyId', newValue.value);
                          setFieldValue('supplyInputName', newValue.label);
                        }
                      }}
                      inputValue={values.supplyInputName}
                      onInputChange={(event, newInputValue, reason) => {
                        setFieldValue('supplyInputName', newInputValue);

                        if (event?.target?.value === '') {
                          setFieldValue('supplyInputName', '');
                          setFieldValue('supplyName', null);
                          setFieldValue('supplyId', null);
                        }
                        if (reason === 'clear') {
                          setFieldValue('supplyName', null);
                          setFieldValue('supplyId', null);
                          setFieldValue('supplyInputName', '');
                        }
                      }}
                      className={
                        errors.supplyInputName && touched.supplyInputName
                          ? 'text-input error'
                          : 'text-input'
                      }
                      onBlur={handleBlur}
                      // disabled={!!payload}
                      noOptionsText="No hay opciones"
                      clearText="Limpiar"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Insumo"
                          variant="outlined"
                          error={
                            errors.supplyInputName && touched.supplyInputName
                          }
                        />
                      )}
                    />
                    {errors.supplyInputName && touched.supplyInputName && (
                      <div className="input-feedback">
                        {errors.supplyInputName}
                      </div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth={true}>
                    <TextField
                      required
                      name="quantity"
                      label="Cantidad"
                      error={errors.quantity && touched.quantity}
                      variant="outlined"
                      type="number"
                      inputProps={{ min: '1', step: '1' }}
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.quantity && touched.quantity
                          ? 'text-input error'
                          : 'text-input'
                      }
                      // disabled={!!payload}
                    />
                    {errors.quantity && touched.quantity && (
                      <div className="input-feedback">{errors.quantity}</div>
                    )}
                  </FormControl>
                </Grid>

								<Grid item xs={12} md={12}>
                  <FormControl fullWidth={true}>
                    <TextField
                      required
                      name="comment"
                      label="Justificación"
                      error={errors.comment && touched.comment}
                      variant="outlined"
											value={values.comment}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.comment && touched.comment
                          ? 'text-input error'
                          : 'text-input'
                      }
											multiline
											rows={4}
                      // disabled={!!payload}
                    />
                    {errors.comment && touched.comment && (
                      <div className="input-feedback">{errors.comment}</div>
                    )}
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  className="text-center"
                  style={{ marginTop: '5px' }}
                >
                  <AddButton
                    disabled={
                      !values.supplyName ||
                      !values.quantity ||
                      !values.comment
                    }
                    variant="contained"
                    onClick={(e) => {
                      onSubmit(e);
                    }}
                  >
                    Guardar
                  </AddButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            </form>
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

export default InventoryAdjustment;
