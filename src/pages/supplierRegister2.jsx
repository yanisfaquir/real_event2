import React, { useState, useEffect, useContext } from 'react';
import GlobalButton from '@/components/globalButton';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { AccessibilityContext } from '@/contexts/acessibility';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../apiClient';

const SupplierRegister = () => {
  const { alignment } = useContext(AccessibilityContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [clientCount, setClientCount] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [photos, setPhotos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const serviceType_ = useSelector((state) => state.event.serviceType);
  const [serviceType, setServiceType] = useState(serviceType_);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const addressOptions = [
    { value: 'Aveiro', label: 'Aveiro' },
    { value: 'Beja', label: 'Beja' },
    { value: 'Braga', label: 'Braga' },
    { value: 'Bragança', label: 'Bragança' },
    { value: 'Castelo Branco', label: 'Castelo Branco' },
    { value: 'Coimbra', label: 'Coimbra' },
    { value: 'Évora', label: 'Évora' },
    { value: 'Faro', label: 'Faro' },
    { value: 'Guarda', label: 'Guarda' },
    { value: 'Leiria', label: 'Leiria' },
    { value: 'Lisboa', label: 'Lisboa' },
    { value: 'Portalegre', label: 'Portalegre' },
    { value: 'Porto', label: 'Porto' },
    { value: 'Santarém', label: 'Santarém' },
    { value: 'Setúbal', label: 'Setúbal' },
    { value: 'Viana do Castelo', label: 'Viana do Castelo' },
    { value: 'Vila Real', label: 'Vila Real' },
    { value: 'Viseu', label: 'Viseu' },
  ];

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    const serviceData = {
      supplierId: user._id,
      title,
      description,
      price,
      clientCount,
      address: selectedAddress,
      photos,
      serviceType,
    };

    const apiInstance = new ApiClient();
    try {
      const response = await apiInstance.createService(serviceData);
      console.log('Serviço criado com sucesso:', response);
    } catch (error) {
      setErrorMessage('Erro ao criar serviço. Tente novamente.');
    }
  };

  useEffect(() => {
    if (router.query && router.query.service) {
      setServiceType(router.query.service);
    }
  }, [router.query]);

  useEffect(() => {
    const allFieldsFilled =
      title &&
      description &&
      price &&
      clientCount &&
      selectedAddress &&
      photos.length > 0;
    setIsButtonDisabled(!allFieldsFilled);
  }, [title, description, price, clientCount, selectedAddress, photos]);

  const handleImageUpload = (event) => {
    const fileArray = Array.from(event.target.files);
    if (!fileArray || !fileArray.length) {
      return;
    }

    const processedFiles = [];
    fileArray.forEach((file) => {
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

            processedFiles.push(compressedDataUrl);

            setPhotos((prevPhotos) => [...prevPhotos, ...processedFiles]);
          };
        };

        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecione um arquivo JPEG, JPG, BMP ou PNG.');
      }
    });
  };

  const removePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-20 container mx-auto px-4">
      <section className="mb-10">
        <p
          className={`flex flex-col pt-20 px-5 text-[3rem] font-bold text-middle-home text-gray-900`}
          style={{ textAlign: `${alignment ? alignment : 'start'}` }}
        >
          INFORMAÇÕES - {serviceType}
        </p>
        <p
          className={`relative max-w-[90vw] px-5 mb-4 text-[1.2rem]`}
          style={{ textAlign: `${alignment ? alignment : 'start'}` }}
        >
          Queremos saber mais sobre o teu serviço de forma a conseguirmos
          partilhar com os nossos utilizadores.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="flex flex-col">
          <label className="mb-1">Nome do serviço:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Preço:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Quantidade de Clientes:</label>
          <input
            type="number"
            value={clientCount}
            onChange={(e) => setClientCount(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Localidade:</label>
          <Select
            value={addressOptions.find(option => option.value === selectedAddress)}
            onChange={(selectedOption) => setSelectedAddress(selectedOption.value)}
            options={addressOptions}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Fotos:</label>
          {photos.map((photoUrl, index) => (
            <div key={index} className="flex items-center mb-2">
              <img
                src={photoUrl}
                alt={`Foto ${index + 1}`}
                className="h-20 w-20 object-cover mr-2"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="ml-2 p-2 border rounded text-red-500"
              >
                Remover
              </button>
            </div>
          ))}
          {photos.length < 5 && (
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageUpload}
              multiple
              className="mt-2 p-2 border rounded text-blue-500"
            />
          )}
        </div>
      </form>

      {errorMessage && (
        <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
      )}

      <div className="flex justify-center mr-10 mb-10">
        <GlobalButton
          size="medium"
          type="primary"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
          text="Submeter"
        />
      </div>
    </div>
  );
};

export default SupplierRegister;
