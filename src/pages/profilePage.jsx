import React, { useState } from 'react';
import GlobalButton from '@/components/globalButton';

const Profile = () => {
  const [serviceProviderProfile, setServiceProviderProfile] = useState({
    name: 'Pedro Mindera',
    location: 'Porto, Portugal',
    description:
      'Oferecemos serviços de catering inesquecíveis para todo tipo de eventos. Especializados em cozinha mediterrânica.',
    services: 'Catering, Decoração, Planeamento de Eventos',
    experienceYears: 5,
    profilePictureUrl: 'https://via.placeholder.com/150',
    photos: [
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedPhotos, setEditedPhotos] = useState([
    ...serviceProviderProfile.photos,
  ]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPhotos([...serviceProviderProfile.photos]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setServiceProviderProfile((prev) => ({ ...prev, photos: editedPhotos }));
    console.log('Perfil atualizado:', serviceProviderProfile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceProviderProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newPhotosList = [
        ...editedPhotos,
        URL.createObjectURL(e.target.files[0]),
      ];
      setEditedPhotos(newPhotosList);
    }
  };

  const handleRemovePhoto = (index) => {
    const newPhotosList = editedPhotos.filter((_, idx) => idx !== index);
    setEditedPhotos(newPhotosList);
  };

  return (
    <div className="px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-md border-2 border-[#4A7D8B] max-w-4xl mx-auto mt-20 mb-10 space-y-6" style={{ padding: '2rem 4rem' }}>
        <div className="flex justify-between items-center">
          <img
            src={serviceProviderProfile.profilePictureUrl}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-[#4A7D8B]"
          />
          <GlobalButton
            size="small"
            type="primary"
            onClick={handleEdit}
            text="Editar Perfil"
          />
        </div>
        <div>
          <h5 className="text-2xl font-semibold text-[#4A7D8B]">
            {serviceProviderProfile.name}
          </h5>
          <p className="text-[#4A7D8B]">{serviceProviderProfile.location}</p>
          <h6 className="text-xl font-semibold mt-4">Sobre</h6>
          <p>{serviceProviderProfile.description}</p>
          <p>Serviços: {serviceProviderProfile.services}</p>
          <p>Experiência: {serviceProviderProfile.experienceYears} anos</p>
          <div className="flex space-x-2 mt-4">
            {serviceProviderProfile.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt="Service"
                className="w-24 h-24 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg space-y-4" style={{ width: 'auto', padding: '2rem' }}>
            <h2 className="font-bold text-lg">Editar Perfil</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={serviceProviderProfile.name}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Nome"
              />
              <input
                name="location"
                value={serviceProviderProfile.location}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Localização"
              />
              <textarea
                name="description"
                value={serviceProviderProfile.description}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Descrição"
              ></textarea>
              <input
                name="services"
                value={serviceProviderProfile.services}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Serviços"
              />
              <input
                name="experienceYears"
                type="number"
                value={serviceProviderProfile.experienceYears}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Anos de Experiência"
              />
              <div className="flex space-x-2 mt-4">
                {editedPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt="Service"
                      className="w-24 h-24 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      X
                    </button>
                  </div>
                ))}
                <label className="block">
                  <span className="sr-only">Adicionar foto</span>
                  <input
                    type="file"
                    onChange={handlePhotoChange}
                    className="block w-full text-sm text-[#4A7D8B]"
                  />
                </label>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded bg-gray-200
                  ">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#4A7D8B] text-white"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
