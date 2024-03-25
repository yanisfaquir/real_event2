import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedService, setErrorMessage } from '../reducers/supplierReducer1'; // Importe as actions do reducer

const SupplierRegister = () => {
  const selectedService = useSelector((state) => state.supplier.selectedService);
  const errorMessage = useSelector((state) => state.supplier.errorMessage);
  const dispatch = useDispatch();

  const handleServiceChange = (event) => {
    dispatch(setSelectedService(event.target.value));
    dispatch(setErrorMessage('')); 
  };

  const handleSubmit = () => {
    if (!selectedService) {
      dispatch(setErrorMessage('Por favor, selecione um tipo de serviço.'));
    } else {
      dispatch(setErrorMessage(''));
      // Lógica para enviar dados ou navegar para a próxima página
    }
  };


};

export default SupplierRegister;
