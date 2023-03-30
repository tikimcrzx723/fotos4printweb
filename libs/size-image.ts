export const returnImageSize = (imageURL: string, setImageSize: any) => {
  const image = new Image();
  image.src = imageURL;

  image.onload = () => {
    setImageSize({
      heigth: image.height,
      width: image.width,
    });
  };
  image.onerror = (err) => {
    console.log('image errors');
    console.error(err);
  };
};
