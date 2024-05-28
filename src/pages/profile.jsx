import React, { useState, useContext, useEffect } from 'react';
import GlobalButton from '@/components/globalButton';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AccessibilityContext } from '@/contexts/acessibility';
import ApiClient from '../../apiClient';

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

  const [profileImageUrl, setProfileImageUrl] = useState(user ? user.photo : '');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || '',
    contact: user?.contact || '',
    address: user?.address || '',
    postal_code: user?.postal_code || '',
    photo: user?.photo ||'',
    role: user?.role ||'',
  });

  useEffect(() => {
    if (email != '') {
      setEmailError('');
    }
    if (password != '') {
      setPasswordError('');
      setErrorMessage('');
    }
  }, [email, password]);

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
        className={`${highContrast ? 'text-[#FFF000]' : 'text-black'} cursosr-pointer`}
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

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      role: role == '' || role == 'Utilizador' ? 'user' : 'supplier',
    }));
  };

  // const handleImageUpload = (event) => {
  //   const fileArray = event?.target?.files;
  //   if (!fileArray || !fileArray.length) {
  //     return;
  //   }

  //   const file = fileArray[0];
  //   if (!file) {
  //     return;
  //   }

  //   if (/(\jpg|\jpeg|\png|\bmp)$/i.test(file.type)) {
  //     if (file.size <= 3145728) {
  //       const reader = new FileReader();

  //       reader.onloadend = function () {
  //         setProfileImageUrl(reader.result);
  //         setFormData((prevState) => ({
  //           ...prevState,
  //           photo: profileImageUrl,
  //         }));
  //       };

  //       reader.readAsDataURL(file);
  //     } else {
  //       alert('O arquivo deve ter menos de 3MB.');
  //     }
  //   } else {
  //     console.log(file.type);
  //     alert('Por favor, selecione um arquivo JPEG, JPG, BMP ou PNG.');
  //   }
  // };

  const handleImageUpload = (event) => {
    const fileArray = event?.target?.files;
    if (!fileArray ||!fileArray.length) {
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
        // Create a temporary canvas element
        const img = new Image();
        img.src = reader.result;
  
        img.onload = function () {
          // Calculate the scale factor based on the desired output size
          const scaleFactor = Math.min(1, 800 / img.width, 800 / img.height);
  
          // Create a canvas element and draw the scaled image onto it
          const canvas = document.createElement('canvas');
          canvas.width = img.width * scaleFactor;
          canvas.height = img.height * scaleFactor;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
          // Convert the canvas content to a data URL
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8); // 0.8 is the quality factor
  
          // Update the state with the compressed image
          setProfileImageUrl(compressedDataUrl);
          setFormData((prevState) => ({
           ...prevState,
            photo: compressedDataUrl,
          }));
        };
      };
  
      reader.readAsDataURL(file);
    } else {
      console.log(file.type);
      alert('Por favor, selecione um arquivo JPEG, JPG, BMP ou PNG.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event?.target;
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

    setFormData((prevState) => ({
      ...prevState,
      role: role == '' || role == 'Utilizador' ? 'user' : 'supplier',
      points: 0,
      discounts: 0,
    }));

    const apiInstance = new ApiClient();
    const response = apiInstance.registerUser(
      formData
    );

    console.log(response)

    console.log(formData);
  };

  return (
    <div className="sm:mt-32 md:mt-16">
      <div className="flex flex-col md:flex-row mt-16 p-6 md:pt-20 bg-cover bg-no-repeat mx-4 md:mt-20 md:mx-20 rounded-lg md:rounded-[40px]">
        <div
          className={`${highContrast ? 'bg-black border border-white' : 'bg-white'} text-white rounded-[40px] py-12 px-4 flex flex-col justify-between shadow-lg w-[100%]`}
        >
          <div className="flex items-center justify-center flex-col">
            <form className="px-4 py-8" onSubmit={handleSubmit}>
              {!user && (
                <div className="mb-4 mx-auto">
                  <div className="flex justify-bewteen gap-8">
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
              )}
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.bmp"
                id="upload-image-input"
                onChange={handleImageUpload}
                style={{ visibility: 'hidden' }}
              />
              <div className={`relative pb-8`}>
                {profileImageUrl && (
                  <img
                    src={`/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/edit-icon.svg`}
                    alt="Substituir imagem atual"
                    width={24}
                    height={24}
                    onClick={() =>
                      document.getElementById('upload-image-input').click()
                    }
                    className={`absolute top-0 right-0 cursor-pointer z-10`}
                  />
                )}

                <GlobalButton
                  image={
                    profileImageUrl
                      ? profileImageUrl
                      : `/assets/${highContrast ? 'high-contrast-icons' : 'icons'}/add-icon.svg`
                  }
                  onClick={() =>
                    document.getElementById('upload-image-input').click()
                  }
                  width="100"
                  text="Adicionar Imagem de Perfil"
                  id="add-profile-image"
                  customClass={`${profileImageUrl ? 'rounded-button' : ''}`}
                />
              </div>

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
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'}`}
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
                      width: '320px',
                    }}
                  />
                </div>
                {!isValidEmail && !emailError && (
                  <p
                    aria-live="polite"
                    className={` ${'text-red-600'}`}
                    style={{
                      fontSize: `${fontSize * 12}px`,
                      marginTop: '4px',
                      textAlign: `${alignment ? alignment : 'start'}`,
                    }}
                  >
                    Insira um email válido
                  </p>
                )}
                {errorMessage && (
                  <p
                    aria-live="polite"
                    className={` ${'text-red-600'}`}
                    style={{
                      fontSize: `${fontSize * 12}px`,
                      marginTop: '4px',
                      textAlign: `${alignment ? alignment : 'start'}`,
                    }}
                  >
                    {httpResponse || errorMessage}
                  </p>
                )}
                <p
                  aria-live="polite"
                  className={` ${
                    emailError ? 'visible text-red-600' : 'invisible'
                  }`}
                  style={{
                    marginTop: `${emailError ? '4px' : ''}`,
                    fontSize: `${fontSize * 12}px`,
                    textAlign: `${alignment ? alignment : 'start'}`,
                  }}
                >
                  Campo obrigatório
                </p>
              </label>

              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px`,
                }}
              >
                Senha:
                <div className="flex row" style={{ position: 'relative' }}>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    autoComplete="new-password"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'}`}
                    onChange={handleChange}
                    onBlur={() => handleInputBlur('password')}
                    placeholder="********"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                      width: '320px',
                    }}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                  />
                </div>
                {!errorMessage && !passwordError && (
                  <p
                    aria-live="polite"
                    style={{
                      marginTop: `4px`,
                      fontSize: `${fontSize * 12}px`,
                      textAlign: `${alignment ? alignment : 'start'}`,
                      width: '320px',
                    }}
                  >
                    Deve ter pelo menos 8 caracteres, incluindo 1 letra
                    maiúscula, 1 letra minúscula e 1 número
                  </p>
                )}
                {errorMessage && (
                  <p
                    aria-live="polite"
                    className={` ${'text-red-600'}`}
                    style={{
                      fontSize: `${fontSize * 12}px`,
                      marginTop: '4px',
                      textAlign: `${alignment ? alignment : 'start'}`,
                    }}
                  >
                    {httpResponse || errorMessage}
                  </p>
                )}
                <p
                  aria-live="polite"
                  className={` ${
                    passwordError ? 'visible text-red-600' : 'invisible'
                  }`}
                  style={{
                    marginTop: `${passwordError ? '4px' : ''}`,
                    fontSize: `${fontSize * 12}px`,
                    textAlign: `${alignment ? alignment : 'start'}`,
                  }}
                >
                  Campo obrigatório
                </p>
              </label>

              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold mb-4`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px`,
                }}
              >
                Confirmar Senha:
                <div className="flex row" style={{ position: 'relative' }}>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    autoComplete="new-password"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'}`}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => handleInputBlur('confirmPassword')}
                    placeholder="********"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                      width: '320px',
                    }}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                  />
                </div>
                <p
                  className={` ${'text-red-600'} ${
                    passwordConfirmError ? 'visible text-red-600' : 'invisible'
                  }`}
                  aria-live="polite"
                  style={{
                    marginTop: `4px`,
                    fontSize: `${fontSize * 12}px`,
                    textAlign: `${alignment ? alignment : 'start'}`,
                    width: '320px',
                  }}
                >
                  As senhas não conferem
                </p>
              </label>

              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px`,
                }}
              >
                {role == 'Utilizador' ? 'Nome' : 'Nome Fornecedor'}:
                <div className="flex row" style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    id={`input-rgister-name`}
                    autoComplete="off"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'}`}
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
                      width: '320px',
                    }}
                  />
                </div>
                <p
                  className={` ${'text-red-600'} ${
                    nameError ? 'visible text-red-600' : 'invisible'
                  }`}
                  aria-live="polite"
                  style={{
                    marginTop: `4px`,
                    fontSize: `${fontSize * 12}px`,
                    textAlign: `${alignment ? alignment : 'start'}`,
                    width: '320px',
                  }}
                >
                  Campo obrigatório
                </p>
              </label>

              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px`,
                }}
              >
                Contato:
                <div className="flex row" style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    value={formData.contact}
                    onChange={handleChange}
                    name="contact"
                    id="input-contact"
                    autoComplete="off"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'}`}
                    placeholder="+351 9xx xxx xxx"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                      width: '320px',
                    }}
                  />
                </div>
              </label>

              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px`,
                }}
              >
                Distrito:
                <div className="flex row" style={{ position: 'relative' }}>
                  <select
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    id="input-address"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'}`}
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                      width: '320px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="">Selecione um distrito</option>
                    {Object.entries(districtLocations).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <label
                className={`text-${highContrast ? '[#FFF000]' : 'black'} font-bold`}
                style={{
                  textAlign: `${alignment ? alignment : 'start'}`,
                  fontSize: `${fontSize * 20}px`,
                }}
              >
                Código Postal:
                <div className="flex row" style={{ position: 'relative' }}>
                  <input
                    type="number"
                    value={formData.postal_code}
                    onChange={handleChange}
                    name="postal_code"
                    id="input-postal_code"
                    autoComplete="off"
                    className={`${highContrast ? 'bg-black text-[#FFF000] input-high-contrast' : 'bg-white text-black'}`}
                    placeholder="+351 9xx xxx xxx"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginTop: '4px',
                      paddingRight: '30px',
                      width: '320px',
                    }}
                  />
                </div>
              </label>
              <GlobalButton
                size="medium"
                type="primary"
                onClick={handleSubmit}
                text="Criar conta"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
