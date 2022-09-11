import { appApi } from '../api';

export const downLoadImage = async (image: string) => {
  const arrFile = image.toString().split('/');
  const name = arrFile[arrFile.length - 1];

  const { data } = await appApi({
    url: '/admin/orders/download',
    data: { url: image },
    method: 'POST',
    responseType: 'blob',
  });
  const urlImage = await window.URL.createObjectURL(new Blob([data]));
  const link = await document.createElement('a');
  link.href = urlImage;
  await link.setAttribute('download', name); //or any other extension
  await document.body.appendChild(link);
  await link.click();
};
