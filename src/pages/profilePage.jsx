import React, { useState } from 'react';
import GlobalButton from '@/components/globalButton';

const Profile = () => {
  const [serviceProviderProfile, setServiceProviderProfile] = useState({
    name: 'Pedro Mindera',
    location: 'Porto, Portugal',
    description: 'Oferecemos serviços de catering inesquecíveis para todo tipo de eventos. Especializados em cozinha mediterrânica.',
    services: 'Catering, Decoração, Planeamento de Eventos',
    experienceYears: 5,
    profilePictureUrl: 'https://via.placeholder.com/150',
    photos: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200', 'https://via.placeholder.com/200'],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedPhotos, setEditedPhotos] = useState([...serviceProviderProfile.photos]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPhotos([...serviceProviderProfile.photos]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setServiceProviderProfile((prev) => ({ ...prev, photos: editedPhotos }));
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
      const newPhotosList = [...editedPhotos, URL.createObjectURL(e.target.files[0])];
      setEditedPhotos(newPhotosList);
    }
  };

  const handleRemovePhoto = (index) => {
    const newPhotosList = editedPhotos.filter((_, idx) => idx !== index);
    setEditedPhotos(newPhotosList);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <div className="p-8">
          <div className="flex items-center space-x-6 mb-6">
            <img src={serviceProviderProfile.profilePictureUrl} alt="Profile" className="w-28 h-28 rounded-full border-4 border-[#4A7D8B]" />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-[#4A7D8B]">{serviceProviderProfile.name}</h2>
              <p className="text-lg text-[#4A7D8B]">{serviceProviderProfile.location}</p>
            </div>
            <GlobalButton size="small" type="primary" onClick={handleEdit} text="Editar Perfil" />
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Sobre</h3>
            <p className="mb-4">{serviceProviderProfile.description}</p>
            <p className="font-semibold">Serviços:</p>
            <p>{serviceProviderProfile.services}</p>
          </div>
        </div>
        <div className="px-8 py-4 bg-gray-100">
          <h3 className="font-semibold mb-2">Fotos</h3>
          <div className="flex space-x-2">
            {serviceProviderProfile.photos.map((photo, index) => (
              <img key={index} src={photo} alt="Service" className="w-24 h-24 object-cover rounded-lg" />
            ))}
          </div>
        </div>
      </div>
      {isEditing && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
    <div className="relative bg-white p-8 rounded-lg space-y-4 shadow-xl" style={{ width: '60%', maxHeight: '80%', overflowY: 'auto' }}>
      <button onClick={() => setIsEditing(false)} className="absolute top-0 right-0 mt-4 mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
            <h2 className="font-bold text-lg">Editar Perfil</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-[#4A7D8B] font-bold mb-0">Nome</label>
<input
  name="name"
  value={serviceProviderProfile.name}
  onChange={handleChange}
  className="p-2 rounded w-full"
  style={{ border: '1px solid #4A7D8B' }}
  placeholder="Nome"
/>

<label className="block text-[#4A7D8B] font-bold mb-0">Localização</label>
<input
  name="location" 
  value={serviceProviderProfile.location} 
  onChange={handleChange}
  className="p-2 rounded w-full"
  style={{ border: '1px solid #4A7D8B' }}
  placeholder="Localização"
/>

<label className="block text-[#4A7D8B] font-bold mb-0">Descrição</label>
<textarea
  name="description"
  value={serviceProviderProfile.description}
  onChange={handleChange}
  className="p-2 rounded w-full"
  style={{ border: '1px solid #4A7D8B' }}
  placeholder="Descrição"
></textarea>

<label className="block text-[#4A7D8B] font-bold mb-0">Serviços</label>
<input
  name="services" 
  value={serviceProviderProfile.services} 
  onChange={handleChange}
  className="p-2 rounded w-full"
  style={{ border: '1px solid #4A7D8B' }}
  placeholder="Serviços"
/>



              <div className="flex flex-wrap gap-2 mt-4">
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
                <label className="block w-24 h-24 flex justify-center items-center rounded-lg bg-gray-200 cursor-pointer">
                  <span className="sr-only">Adicionar foto</span>
                  <input
                    type="file"
                    onChange={handlePhotoChange}
                    className="opacity-0 absolute"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4A7D8B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </label>
              </div>
              
              <div className="flex justify-end space-x-4 mt-4" >
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
        </div>
      )}
    </div>
  );
};

export default Profile;

