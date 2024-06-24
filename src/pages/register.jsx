import React, { useState, useContext } from 'react';
import GlobalButton from '@/components/globalButton';
import { useDispatch } from 'react-redux';
import { AccessibilityContext } from '@/contexts/acessibility';

const Register = () => {
  const [role, setRole] = useState('Utilizador');
  const { alignment, highContrast, fontSize } =
    useContext(AccessibilityContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    postal_code: '',
    photo: '',
    role: '',
    // supplierDetails: {
    //   name_company: '',
    //   email: '',
    //   password: '',
    //   contact: '',
    //   address: [],
    //   postal_code: '',
    //   photo: '',
    //   highlight_start_date: null,
    //   highlight_end_date: null,
    //   highlight_status: false,
    //   availability: {
    //     dates: [],
    //     weekdays: [],
    //     start_time: ''
    //   }
    // }
  });

  const RoleRadioButton = ({ value, checked, onChange }) => (
    <label className="flex flex-col justify-center items-center">
      <input
        type="radio"
        name="role"
        value={value}
        checked={checked}
        onChange={onChange}
        className={`date-checkbox ${highContrast ? 'high-contrast' : ''}`}
      />
      <span
        style={{
          marginTop: `4px`,
          fontSize: `${fontSize * 20}px`,
          textAlign: `${alignment ? alignment : 'start'}`,
        }}
      >
        {value}
      </span>
    </label>
  );

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSupplierChange = (e, field) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      supplierDetails: {
        ...prevState.supplierDetails,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Aqui você pode enviar os dados para o backend
    setIsEditing(false);
  };

  const handleRoleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      role: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-[#4A7D8B] font-bold mb-0">Nome</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 rounded w-full"
            style={{ border: '1px solid #4A7D8B' }}
            placeholder="Nome"
          />

          {/* Outros campos do usuário */}
          <label className="block text-[#4A7D8B] font-bold mb-0">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 rounded w-full"
            style={{ border: '1px solid #4A7D8B' }}
            placeholder="Email"
          />

          {/* Campos do fornecedor */}
          {/* <label className="block text-[#4A7D8B] font-bold mb-0">
            Nome da Empresa
          </label>
          <input
            name="supplierDetails.name_company"
            value={formData?.supplierDetails?.name_company}
            onChange={(e) => handleSupplierChange(e, 'name_company')}
            className="p-2 rounded w-full"
            style={{ border: '1px solid #4A7D8B' }}
            placeholder="Nome da Empresa"
          /> */}

          {/* Continue adicionando campos conforme necessário */}

          <div className="flex justify-end space-x-4 mt-4">
            <GlobalButton
              type="terciary"
              onClick={() => setIsEditing(false)}
              text="Cancelar"
              size="small"
            />
            <GlobalButton
              type="primary"
              submitType="submit"
              text="Salvar"
              size="small"
            />
          </div>
        </form>
      </div>
      <div className="mb-4 mx-auto">
        <div className="flex justify-center gap-8">
          <RoleRadioButton
            value="Utilizador"
            checked={role === 'Utilizador'}
            onChange={handleRoleChange}
          />
          <RoleRadioButton
            value="Fornecedor"
            checked={role === 'Fornecedor'}
            onChange={handleRoleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
