import {
  ChangeEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { useFieldArray, useForm } from 'react-hook-form';

import {
  AddCircleOutline,
  DeleteOutlined,
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  capitalize,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import { AdminLayout } from '../../../components/layouts';
import { IAdded, IProduct } from '../../../interfaces';
import { dbProducts } from '../../../database';
import { appApi } from '../../../api';
import { Product } from '../../../models';
import { converters } from '../../../libs';
import { ShowListImages } from '../../../components/uploads';
import { AddYardSignComplement } from '../../../components/orders/yardsigns/AddYardSignComplement';

const validTypes = ['photo', 'press', 'gift'];
const validNeedImages = ['yes', 'no'];

interface FormData {
  _id?: string;
  description: string;
  needImages?: boolean;
  minIMages?: number;
  images: string[];
  price: {
    size: string;
    priceClient: number;
    priceFerderal: number;
    priceFrequnt: number;
    added?: IAdded[];
  }[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
}

interface Props {
  product: IProduct;
}

const ProductAdminPage: NextPage<PropsWithChildren<Props>> = ({ product }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newTagValue, setNewTagValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [imageOrSize, setImageOrSize] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: product,
  });

  const { control } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'price',
  });

  const {
    fields: addedFields,
    append: appendAdded,
    remove: removeAdded,
  } = useFieldArray({ control, name: 'added' });

  useEffect(() => {
    getValues('price').map(() => {
      append({ size: '', priceClient: 0, priceFrequnt: 0, priceFerderal: 0 });
    });
    if (product.needImages) {
      setImageOrSize(true);
    }
  }, [append, getValues]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
            .toLowerCase() || '';

        setValue('slug', newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase();
    setNewTagValue('');
    const currentTags = getValues('tags');

    if (currentTags.includes(newTag)) {
      return;
    }

    currentTags.push(newTag);
  };

  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues('tags').filter((t) => t !== tag);
    setValue('tags', updatedTags, { shouldValidate: true });
  };

  const addComplement = (index: number) => {
    product.price[index].added = [
      { client: 5, frequent: 5, federal: 5, complement: '4/4' },
    ];
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }
    let i = 1;

    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        const base64: any = await converters.returnBase64(file);

        const sendDataFile = {
          base64,
          path: getValues('type'),
          fileName: `${getValues('title')}-${i}`,
          fileType: file.type.split('/')[0],
          extension: file.type.split('/')[1],
        };
        i++;

        const { data } = await appApi.post<{ message: string }>(
          `/uploaders/admin/images/upload`,
          sendDataFile
        );
        setValue('images', [...getValues('images'), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onDeleteImage = async (image: string) => {
    setValue(
      'images',
      getValues('images').filter((img) => img !== image),
      { shouldValidate: true }
    );
    await appApi.post('/uploaders/admin/images/delete', { url: image });
  };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 1) return alert('Mínimo 1 imagenes');
    setIsSaving(true);

    if (form.needImages === false || form.needImages === ('false' as any)) {
      const sizeImg = form.price.map(
        ({ priceClient, priceFrequnt, priceFerderal, added }, index) => {
          return {
            size: form.images[index + 1],
            priceClient,
            priceFrequnt,
            priceFerderal,
            added,
          };
        }
      );

      form.price = sizeImg;
    }

    console.log(form);

    try {
      const { data } = await appApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST',
        data: form,
      });
      if (!form._id) {
        router.replace(`/admin/products/${form.slug}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };
  return (
    <AdminLayout
      title={'Product'}
      subTitle={
        product.title ? `${product.title}: editing` : 'Create a new product'
      }
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
            disabled={isSaving}
          >
            Save
          </Button>
          {/* <Fab color='secondary' aria-label='add'>
            <SaveOutlined />
          </Fab> */}
        </Box>
        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Description"
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register('description', {
                required: 'This field is required',
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <FormControl sx={{ mt: 5 }}>
              <FormLabel>
                <Typography variant="h5">Need Images</Typography>
              </FormLabel>
              <RadioGroup
                row
                value={getValues('needImages')}
                onChange={({ target }) => {
                  setImageOrSize(target.value as any);
                  setValue('needImages', target.value as any, {
                    shouldValidate: true,
                  });
                }}
              >
                {validNeedImages.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option === 'yes' ? true : false}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <TextField
              label="Min Images"
              type="number"
              variant="filled"
              fullWidth
              sx={{
                mb: 1,
                display:
                  Boolean(getValues('needImages')) === true ? '' : 'none',
              }}
              {...register(`minIMages`, {})}
              error={!!errors.price}
              helperText={errors.title?.message}
            />

            <Divider sx={{ my: 1 }} />
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug', {
                required: 'This field is required',
                validate: (val) =>
                  val.trim().includes(' ')
                    ? 'You cannot have blank spaces'
                    : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Tags"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Press [spacebar] to add"
              value={newTagValue}
              onChange={({ target }) => setNewTagValue(target.value)}
              onKeyUp={({ code }) =>
                code === 'Space' ? onNewTag() : undefined
              }
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {getValues('tags').map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                onClick={() => fileInputRef.current?.click()}
                sx={{ mb: 3 }}
              >
                Upload Images
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".png, .jpg, .jpeg"
                style={{ display: 'none' }}
                onChange={onFilesSelected}
              />

              <Chip
                label="It is necessary to 1 images"
                color="error"
                variant="outlined"
                sx={{
                  display: getValues('images').length < 1 ? 'flex' : 'none',
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <ShowListImages
          images={getValues('images')}
          spacing={2}
          sm={3}
          xs={4}
          onDeleteImage={onDeleteImage}
        />
        <FormControl sx={{ mt: 5 }}>
          <FormLabel>
            <Typography variant="h4">Type</Typography>
          </FormLabel>
          <RadioGroup
            row
            value={getValues('type')}
            onChange={({ target }) =>
              setValue('type', target.value as any, {
                shouldValidate: true,
              })
            }
          >
            {validTypes.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio color="secondary" />}
                label={capitalize(option)}
              />
            ))}
          </RadioGroup>
        </FormControl>
        {imageOrSize}
        {fields.map((field, index) => (
          <div key={'index' + index}>
            <Grid key={index} container spacing={2} marginTop={5}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="size"
                    variant="filled"
                    fullWidth
                    sx={{ mb: 1 }}
                    {...register(`price.${index}.size`, {
                      required: 'This field is required',
                      minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                    })}
                    error={!!errors.price}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Price Client"
                    type="number"
                    InputProps={{
                      inputProps: { min: '0', max: '10000', step: '0.01' },
                    }}
                    variant="filled"
                    fullWidth
                    sx={{ mb: 1 }}
                    {...register(`price.${index}.priceClient`, {
                      required: 'This field is required',
                      min: {
                        value: 0,
                        message: 'The price cannot be less than 0',
                      },
                    })}
                    error={!!errors.price}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Price Frequnt"
                    type="number"
                    InputProps={{
                      inputProps: { min: '0', max: '10000', step: '0.01' },
                    }}
                    variant="filled"
                    fullWidth
                    sx={{ mb: 1 }}
                    {...register(`price.${index}.priceFrequnt`, {
                      required: 'This field is required',
                      min: {
                        value: 0,
                        message: 'The price cannot be less than 0',
                      },
                    })}
                    error={!!errors.price}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Price Federal"
                    type="number"
                    InputProps={{
                      inputProps: { min: '0', max: '10000', step: '0.01' },
                    }}
                    variant="filled"
                    fullWidth
                    sx={{ mb: 1 }}
                    {...register(`price.${index}.priceFerderal`, {
                      required: 'This field is required',
                      min: {
                        value: 0,
                        message: 'The price cannot be less than 0',
                      },
                    })}
                    error={!!errors.price}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => remove(index)}
                    color="error"
                  >
                    <DeleteOutlined />
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button color="primary" onClick={() => appendAdded({})}>
                    Complement
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {addedFields.map((addedField, subIndex) => (
              <Grid key={`${subIndex}-complement`} container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="complement"
                    variant="filled"
                    fullWidth
                    sx={{ mb: 1 }}
                    {...register(
                      `price.${index}.added.${subIndex}.complement`,
                      {
                        required: 'This field is required',
                        minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                      }
                    )}
                    error={!!errors.price}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Client"
                    type="number"
                    InputProps={{
                      inputProps: { min: '0', max: '10000', step: '0.01' },
                    }}
                    variant="filled"
                    fullWidth
                    sx={{ mb: 1 }}
                    {...register(`price.${index}.added.${subIndex}.client`, {
                      required: 'This field is required',
                      min: {
                        value: 0,
                        message: 'The price cannot be less than 0',
                      },
                    })}
                    error={!!errors.price}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Frequent"
                    type="number"
                    InputProps={{
                      inputProps: { min: '0', max: '10000', step: '0.01' },
                    }}
                    variant="filled"
                    fullWidth
                    sx={{ mb: 1 }}
                    {...register(`price.${index}.added.${subIndex}.frequent`, {
                      required: 'This field is required',
                      min: {
                        value: 0,
                        message: 'The price cannot be less than 0',
                      },
                    })}
                    error={!!errors.price}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    label="Federal"
                    type="number"
                    InputProps={{
                      inputProps: { min: '0', max: '10000', step: '0.01' },
                    }}
                    variant="filled"
                    fullWidth
                    sx={{ mb: 1 }}
                    {...register(`price.${index}.added.${subIndex}.federal`, {
                      required: 'This field is required',
                      min: {
                        value: 0,
                        message: 'The price cannot be less than 0',
                      },
                    })}
                    error={!!errors.price}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeAdded(index)}
                    color="error"
                  >
                    <DeleteOutlined />
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm={2}></Grid>
              </Grid>
            ))}
          </div>
        ))}
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<AddCircleOutline />}
            sx={{
              width: '150px',
              display: 'flex',
              marginRight: 2,
            }}
            type="submit"
            onClick={() => append({ size: '24x35in', price: 25 })}
            disabled={isSaving}
          >
            Add prices
          </Button>
        </Box>
      </form>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  let product: IProduct | null;

  if (slug === 'new') {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
