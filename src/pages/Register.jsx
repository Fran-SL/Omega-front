import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { register } from '../services/authService';
import { getCroppedImg } from '../utils/cropImage';
import userImageDefault from '../assets/userdefect.png';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo_electronico: '',
    contrasena: '',
    confirmarContrasena: '',
    telefono: '',
    direccion: '',
    foto_perfil: null,
  });
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropArea, setCropArea] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hiddenFileInput = useRef(null);
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setShowCropper(true);
    }
  };

  const handleSaveCroppedImage = async () => {
    const croppedImg = await getCroppedImg(profileImage, cropArea);
    setCroppedImage(croppedImg);
    setShowCropper(false);
  };

  const handleCancelCrop = () => {
    setShowCropper(false);
    setProfileImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1 && formData.nombre && formData.apellido_paterno && formData.apellido_materno) {
      setError(null);
      setStep(2);
    } else if (step === 2 && formData.contrasena === formData.confirmarContrasena) {
      setError(null);
      setStep(3);
    } else if (step === 3) {
      try {
        setIsLoading(true);
        const formDataToSend = new FormData();
        for (let key in formData) {
          if (key === 'foto_perfil' && croppedImage) {
            const response = await fetch(croppedImage);
            const blob = await response.blob();
            formDataToSend.append('foto_perfil', blob, 'profile.jpg');
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
        await register(formDataToSend);
        setIsLoading(false);
        setIsRegistered(true);
      } catch (error) {
        setError('Error al registrar usuario.');
        setIsLoading(false);
      }
    } else {
      setError('Por favor, complete todos los campos correctamente.');
    }
  };

  useEffect(() => {
    if (isRegistered) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 0) {
        navigate('/login');
      }

      return () => clearInterval(timer);
    }
  }, [isRegistered, countdown, navigate]);

  const renderProgressIndicator = () => (
    <div className="flex justify-between items-center mb-6 space-x-2">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div
            className={`rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold ${
              step >= stepNum ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}
          >
            {stepNum}
          </div>
          {stepNum < 3 && (
            <div
              className={`h-1 w-6 sm:w-8 lg:w-10 ${
                step > stepNum ? 'bg-green-500' : 'bg-gray-300'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl w-full max-w-sm mt-4">
        {isRegistered ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¡Registro exitoso!</h2>
            <p>Te redirigiremos al inicio de sesión en {countdown} segundos...</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 bg-sgreen text-white px-4 py-2 rounded-2xl hover:bg-green-600"
            >
              Ir al Login ahora
            </button>
          </div>
        ) : (
          <>
            {renderProgressIndicator()}
            <h2 className="text-2xl font-bold text-center mb-2">Regístrate</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-3" encType="multipart/form-data" role="form">
              {step === 1 && (
                <>
                  <InputField label="Nombre" name="nombre" type="text" value={formData.nombre} onChange={handleChange} required />
                  <InputField label="Apellido Paterno" name="apellido_paterno" type="text" value={formData.apellido_paterno} onChange={handleChange} required />
                  <InputField label="Apellido Materno" name="apellido_materno" type="text" value={formData.apellido_materno} onChange={handleChange} required />
                  <button type="submit" className="w-full bg-sgreen text-white px-4 py-2 rounded-2xl hover:bg-green-600">
                    Siguiente
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <InputField label="Correo Electrónico" name="correo_electronico" type="email" value={formData.correo_electronico} onChange={handleChange} required />
                  <InputField label="Contraseña" name="contrasena" type="password" value={formData.contrasena} onChange={handleChange} required />
                  <InputField label="Confirmar Contraseña" name="confirmarContrasena" type="password" value={formData.confirmarContrasena} onChange={handleChange} required />
                  <button type="submit" className="w-full bg-sgreen text-white px-4 py-2 rounded-2xl hover:bg-green-600">
                    Siguiente
                  </button>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="flex justify-center mb-4">
                    <img
                      src={croppedImage ? croppedImage : profileImage ? profileImage : userImageDefault}
                      alt="User"
                      className="w-24 h-24 rounded-full border-2 border-gray-300 cursor-pointer"
                      onClick={() => hiddenFileInput.current.click()}
                      aria-label="User profile image"
                    />
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      accept="image/*"
                      aria-label="Upload profile image"
                    />
                  </div>

                  <InputField label="Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} placeholder="+56 X XXXX XXXX" required />
                  <InputField label="Dirección" name="direccion" type="text" value={formData.direccion} onChange={handleChange} />

                  <button type="submit" className="w-full bg-sgreen text-white px-4 py-2 rounded-2xl hover:bg-green-600" disabled={isLoading}>
                    {isLoading ? 'Registrando...' : 'Registrar'}
                  </button>
                </>
              )}
            </form>

            {showCropper && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded-lg w-80">
                  <h2 className="text-center font-bold mb-4">Recortar Imagen</h2>
                  <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                    <Cropper
                      image={profileImage}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={(croppedArea, croppedAreaPixels) => setCropArea(croppedAreaPixels)}
                    />
                  </div>
                  <div className="flex justify-center mt-4">
                    <button onClick={handleSaveCroppedImage} className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2">
                      Guardar
                    </button>
                    <button onClick={handleCancelCrop} className="bg-red-500 text-white py-2 px-4 rounded-lg">
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, name, type, value, onChange, placeholder = '', required = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 p-2 border border-gray-300 rounded-2xl w-full"
      placeholder={placeholder}
      required={required}
      aria-label={label}
    />
  </div>
);

export default Register;
