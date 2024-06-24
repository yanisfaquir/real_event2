import React, { useState, useContext, useEffect } from 'react';
import GlobalButton from '@/components/globalButton';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AccessibilityContext } from '@/contexts/acessibility';
import ApiClient from '../../apiClient';
import Image from 'next/image';
import { login } from '@/redux/reducers/userReducer';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { alignment, highContrast, fontSize } =
    useContext(AccessibilityContext);
  const user = useSelector((state) => state.user.user);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [httpResponse, setResponseValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Utilizador');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emptyServiceMessage, setEmptyServiceMessage] = useState('');
  const [loadingServices, setLoadingServices] = useState(false);

  const [profileImageUrl, setProfileImageUrl] = useState(
    user ? user.photo : ''
  );
  const [formData, setFormData] = useState({
    role: user?.role || '',
    name:
      user?.role === 'Fornecedor' || user?.role === 'supplier'
        ? user?.name_company || ''
        : user?.name || '',
    email: user?.email || '',
    password: user?.password || '',
    contact: user?.contact || '',
    address: user?.address || '',
    postal_code: user?.postal_code || '',
    photo: user?.photo || '',
  });

  useEffect(() => {
    if (email !== '') {
      setEmailError('');
    }
    if (password !== '') {
      setPasswordError('');
      setErrorMessage('');
    }
  }, [email, password]);

  useEffect(() => {
    if (user?.role === 'supplier') {
      getSupplierServices();
    }
  }, []);

  const getSupplierServices = async () => {
    const apiClient = new ApiClient();
    setLoadingServices(true);
    try {
      const response = await apiClient.getAllServicesBySupplierId(user._id);
      console.log(response);
      setLoadingServices(false);
      setEmptyServiceMessage('');
    } catch (error) {
      setLoadingServices(false);
      setEmptyServiceMessage(
        'Você ainda não possui serviços cadastrados. Inicie agora seu primeiro serviço clicando abaixo em Criar Serviço'
      );
    } finally {
      setLoadingServices(false);
    }
  };

  const handleInputBlur = (field) => {
    switch (field) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(formData.email));
        setEmailError(
          !emailRegex.test(formData.email) ? 'Insira um email válido' : ''
        );
        break;
      case 'password':
        setPasswordError(
          formData.password.trim() === '' ? 'Campo obrigatório' : ''
        );
        break;
      case 'name':
        setNameError(formData.name.trim() === '' ? 'Campo obrigatório' : '');
        break;
      case 'confirmPassword':
        setConfirmPasswordError(
          confirmPassword !== formData.password ? 'As senhas não conferem' : ''
        );
        break;
      default:
        break;
    }
  };

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
        className={`${highContrast ? 'text-[#FFF000]' : 'text-black'} cursor-pointer`}
        style={{
          marginTop: '4px',
          fontSize: `${fontSize * 20}px`,
          textAlign: `${alignment ? alignment : 'start'}`,
        }}
      >
        {value}
      </span>
    </label>
  );

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      role: e.target.value === 'Utilizador' ? 'user' : 'supplier',
    }));
  };

  const handleImageUpload = (event) => {
    const fileArray = event.target.files;
    if (!fileArray || !fileArray.length) {
      return;
    }

    const file = fileArray[0];
    if (!file) {
      return;
    }

    if (/(\jpg|\jpeg|\png|\bmp)$/i.test(file.type)) {
      if (file.size > 3145728) {
        alert('O arquivo deve ter menos de 3MB.');
        return;
      }

      const reader = new FileReader();

      reader.onloadend = function () {
        const img = new window.Image();
        img.src = reader.result;

        img.onload = function () {
          const scaleFactor = Math.min(1, 800 / img.width, 800 / img.height);

          const canvas = document.createElement('canvas');
          canvas.width = img.width * scaleFactor;
          canvas.height = img.height * scaleFactor;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);

          setProfileImageUrl(compressedDataUrl);
          setFormData((prevState) => ({
            ...prevState,
            photo: compressedDataUrl,
          }));
        };
      };

      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione um arquivo JPEG, JPG, BMP ou PNG.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const districtLocations = {
    Aveiro: 'Aveiro',
    Beja: 'Beja',
    Braga: 'Braga',
    Bragança: 'Bragança',
    'Castelo Branco': 'Castelo Branco',
    Coimbra: 'Coimbra',
    Estarreja: 'Estarreja',
    Faro: 'Faro',
    Guarda: 'Guarda',
    Leiria: 'Leiria',
    Lisboa: 'Lisboa',
    Porto: 'Porto',
    'São João da Madeira': 'São João da Madeira',
    'São Roque': 'São Roque',
    Setubal: 'Setubal',
    'Viana do Castelo': 'Viana do Castelo',
    'Vila Real': 'Vila Real',
    Viseu: 'Viseu',
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (role === 'Utilizador') {
      setFormData((prevState) => ({
        ...prevState,
        role: 'user',
        points: 0,
        discounts: 0,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        role: 'supplier',
        name_company: formData.name,
        popularity_seal: false,
        highlight_start_date: 0,
        highlight_end_date: 0,
        highlight_status: false,
      }));
    }

    const apiInstance = new ApiClient();
    if (user == null) {
      if (role === 'Fornecedor') {
        console.log(formData);
        const response = apiInstance.registerSupplier(formData);
        console.log(response);
      } else {
        const response = apiInstance.registerUser(formData);
        console.log(response);
      }
    } else {
      if (role === 'Fornecedor') {
        handleUpdateSupplier(apiInstance);
      } else {
        handleUpdateUser(apiInstance);
      }
    }
  };

  const handleUpdateUser = async (apiInstance) => {
    try {
      const currentUser = await apiInstance.getUserById(user._id);
      if (
        (currentUser && formData.password == '') ||
        formData.confirmPassword == ''
      ) {
        delete formData.password;
        console.log(formData);
        const response = await apiInstance.updateUser(
          currentUser.data.data._id,
          formData
        );
        if (response.status == 200) {
          dispatch(login(response.data));
        }
      }
      if (
        currentUser &&
        currentUser.data.data.password === formData.currentPassword
      ) {
        const response = await apiInstance.updateUser(
          currentUser.data.data._id,
          formData
        );
        if (response.status == 200) {
          dispatch(login(response.data));
        }
      }
    } catch (error) {
      console.error('Erro ao buscar utilizador ou atualizar senha:', error);
    }
  };

  const handleUpdateSupplier = async (apiInstance) => {
    try {
      const currentSupplier = await apiInstance.getSupplierById(user._id);
      if (
        (currentSupplier && formData.password == '') ||
        formData.confirmPassword == ''
      ) {
        delete formData.password;
        console.log(formData);
        const response = await apiInstance.updateSupplier(
          currentSupplier.data.data._id,
          formData
        );
        if (response.status == 200) {
          dispatch(login(response.data));
        }
      }
      if (
        currentSupplier &&
        currentSupplier.data.data.password === formData.currentPassword
      ) {
        const response = await apiInstance.updateSupplier(
          currentSupplier.data.data._id,
          formData
        );
        if (response.status == 200) {
          dispatch(login(response.data));
        }
      }
    } catch (error) {
      console.error('Erro ao buscar fornecedor ou atualizar senha:', error);
    }
  };

  return (
    <div className="mt-20 container mx-auto px-4 md:h-[80vh] h-fullscreen">
      <div className="flex flex-col md:flex-row mt-16 p-6 md:pt-20 bg-cover bg-no-repeat mx-4 md:mt-20 md:mx-20 rounded-lg md:rounded-[40px]">
        <div
          className={`flex flex-col md:flex-row w-full  ${highContrast ? 'bg-black' : 'bg-white'} shadow-lg rounded-[40px]`}
        >
          <div
            className={`flex justify-center items-center w-full md:w-1/4 ${highContrast ? 'bg-gray-400' : 'bg-gray-200'}  rounded-tl-[40px] rounded-bl-[40px] py-12`}
          >
            <div className="relative text-center">
              {profileImageUrl ? (
                <>
                  <Image
                    src={profileImageUrl}
                    alt="Utilizador"
                    width={80}
                    height={80}
                    className="cursor-pointer rounded-full w-40 h-40 object-cover mx-auto"
                    onClick={() => document.getElementById('fileInput').click()}
                  />
                  <h1
                    className={`mt-2 bold ${highContrast ? 'text-white' : 'text-black'}`}
                  >
                    {user?.role == 'user' ? 'Utilizador' : 'Fornecedor'}
                  </h1>

                  {loadingServices ? (
                    <p className="text-center mt-10 px-4">Carregando dados...</p>
                  ) : (
                    emptyServiceMessage !== '' && (
                      <>
                        <h1 className="my-2 bold text-red-600 px-4">
                          {emptyServiceMessage}
                        </h1>
                        <GlobalButton
                          size="medium"
                          type="primary"
                          path="/supplierRegister1"
                          text={'Criar Serviço'}
                        />
                      </>
                    )
                  )}
                </>
              ) : (
                <>
                  <Image
                    src={`/assets/icons/user-${highContrast ? 'white' : 'black'}.svg`}
                    alt="Utilizador"
                    className="cursor-pointer mx-auto"
                    width={80}
                    height={80}
                    onClick={() => document.getElementById('fileInput').click()}
                  />
                  <p className="mt-2 text-center">Carregar imagem</p>
                </>
              )}
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="w-full md:w-3/4 p-6 md:p-10">
            {user == null && (
              <div className="col-span-1 flex justify-center space-x-4 mt-10">
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
            )}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
            >
              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px`,
                }}
              >
                Nome:
                <div className="flex row" style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    autoComplete="off"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'} w-full`}
                    onChange={handleChange}
                    onBlur={() => handleInputBlur('name')}
                    placeholder="Digite aqui"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                    }}
                  />
                </div>
                {nameError && <p className="text-red-500">{nameError}</p>}
              </label>

              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px`,
                }}
              >
                Email:
                <div className="flex row" style={{ position: 'relative' }}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    autoComplete="off"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'} w-full`}
                    onChange={handleChange}
                    onBlur={() => handleInputBlur('email')}
                    placeholder="Digite aqui"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                    }}
                  />
                </div>
                {emailError && <p className="text-red-500">{emailError}</p>}
              </label>

              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px}`,
                }}
              >
                {user == null ? 'Senha' : 'Nova Senha'}
                <div className="flex row" style={{ position: 'relative' }}>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    autoComplete="off"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'} w-full`}
                    onChange={handleChange}
                    onBlur={() => handleInputBlur('password')}
                    placeholder="Digite aqui"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                    }}
                  />
                </div>
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}
              </label>

              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px}`,
                }}
              >
                {user == null ? 'Confirmar Senha' : 'Confirmar Nova Senha'}
                <div className="flex row" style={{ position: 'relative' }}>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    autoComplete="off"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'} w-full`}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => handleInputBlur('confirmPassword')}
                    placeholder="Digite aqui"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                    }}
                  />
                </div>
                {passwordConfirmError && (
                  <p className="text-red-500">{passwordConfirmError}</p>
                )}
              </label>

              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px}`,
                }}
              >
                Contato:
                <div className="flex row" style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    autoComplete="off"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'} w-full`}
                    onChange={handleChange}
                    onBlur={() => handleInputBlur('contact')}
                    placeholder="Digite aqui"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                    }}
                  />
                </div>
              </label>

              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px}`,
                }}
              >
                Endereço:
                <div className="flex row" style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    autoComplete="off"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'} w-full`}
                    onChange={handleChange}
                    onBlur={() => handleInputBlur('address')}
                    placeholder="Digite aqui"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                    }}
                  />
                </div>
              </label>

              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px}`,
                }}
              >
                Distrito:
                <div className="flex row" style={{ position: 'relative' }}>
                  <select
                    name="district"
                    value={formData.district}
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'} w-full`}
                    onChange={handleChange}
                    placeholder="Digite aqui"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                    }}
                  >
                    <option value="" disabled>
                      Selecione um distrito
                    </option>
                    {Object.keys(districtLocations).map((district) => (
                      <option
                        key={district}
                        value={districtLocations[district]}
                      >
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px}`,
                }}
              >
                Código Postal:
                <div className="flex row" style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    autoComplete="off"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'} w-full`}
                    onChange={handleChange}
                    onBlur={() => handleInputBlur('postal_code')}
                    placeholder="Digite aqui"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                    }}
                  />
                </div>
              </label>

              {httpResponse && (
                <div className="mt-4">
                  <p>{httpResponse}</p>
                </div>
              )}
              <div className="flex items-center justify-center mx-auto mb-5 mt-10">
                <GlobalButton
                  size="medium"
                  type="primary"
                  onClick={handleSubmit}
                  text={user == null ? 'Criar Conta' : 'Atualizar Conta'}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
