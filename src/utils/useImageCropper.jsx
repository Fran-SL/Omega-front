import { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';

export const useImageCropper = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropArea, setCropArea] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageClick = () => {
    hiddenFileInput.current.click();
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setShowCropper(true);
    }
  };

  const onSaveCroppedImage = async () => {
    const croppedImg = await getCroppedImg(profileImage, cropArea);
    setCroppedImage(croppedImg);
    setShowCropper(false);
    URL.revokeObjectURL(profileImage); // Limpieza de memoria
  };

  const onCancelCrop = () => {
    setShowCropper(false);
    setProfileImage(null);
  };

  const CropperComponent = (
    <div className="mb-4">
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
      <div className="flex justify-center mt-2">
        <button type="button" onClick={onSaveCroppedImage} className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2">
          Guardar Recorte
        </button>
        <button type="button" onClick={onCancelCrop} className="bg-red-500 text-white py-2 px-4 rounded-lg">
          Cancelar
        </button>
      </div>
    </div>
  );

  return {
    profileImage,
    croppedImage,
    showCropper,
    handleImageClick,
    hiddenFileInput,
    onImageChange,
    CropperComponent,
  };
};
