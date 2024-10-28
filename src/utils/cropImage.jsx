export const getCroppedImg = async (imageSrc, crop, outputFormat = 'image/jpeg') => {
  if (!imageSrc || !crop) {
    throw new Error('Los parámetros imageSrc y crop son requeridos');
  }

  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Configuración del tamaño del lienzo
  const { width, height } = crop;
  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  // Dibujar la imagen recortada en el lienzo
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    width,
    height
  );

  // Retornar la imagen como Blob en el formato deseado
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob)); // Devolvemos el blob como URL
        } else {
          reject(new Error('Error al crear el Blob de la imagen.'));
        }
      },
      outputFormat,
      1
    );
  });
};

// Función auxiliar para crear una imagen
function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(new Error('Error al cargar la imagen')));
    image.src = url;
  });
}
