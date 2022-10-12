import { PropsWithChildren, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { IMaterial } from '../../../../interfaces';
import { AdminLayout } from '../../../../components/layouts';
import { Inventory2Outlined, SaveOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Material } from '../../../../models';
import { dbInventory } from '../../../../database';
import { appApi } from '../../../../api';
import { useProducts } from '../../../../hooks';
import { IProduct } from '../../../../interfaces/product';

interface FormData {
  _id?: string;
  name: string;
  quantity: number;
  description: string;
  heavy?: string;
  area?: number;
  package: number;
  size: string;
  products: IProduct[];
}

interface Props {
  material: IMaterial;
}

const MaterialPage: NextPage<PropsWithChildren<Props>> = ({ material }) => {
  const { products, isLoading } = useProducts('products');

  const [personName, setPersonName] = useState<any[]>(
    material.products.length === 0 ? [] : material.products
  );

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
    setValue('products', personName as any);
  };

  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: material,
  });

  const onSubmit = async (form: FormData) => {
    try {
      const { data } = await appApi({
        url: '/admin/inventory',
        method: form._id ? 'PUT' : 'POST',
        data: form,
      });
      if (!form._id) {
        router.replace(`/admin/inventory/material/${form._id}`);
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
      title="Material"
      subTitle={
        material.name ? `${material.name}: editing` : 'Create a new material'
      }
      icon={<Inventory2Outlined />}
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
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  // MenuProps={MenuProps}
                >
                  {products.map(({ _id, title }) => (
                    <MenuItem key={_id} value={_id}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              sx={{ mb: 1, mt: 1 }}
              {...register('name', {
                required: true,
                minLength: { value: 3, message: '2 characters minimun' },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Size"
              variant="filled"
              multiline
              fullWidth
              sx={{ mb: 1 }}
              {...register('size', {
                required: true,
              })}
              error={!!errors.size}
              helperText={errors.size?.message}
            />
            <TextField
              label="Description"
              variant="filled"
              multiline
              fullWidth
              sx={{ mb: 1 }}
              {...register('description', {
                required: true,
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Quantity"
              fullWidth
              variant="filled"
              sx={{ mb: 1 }}
              {...register('quantity', {
                required: 'This field is required',
              })}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
            <TextField
              label="Heavy"
              fullWidth
              variant="filled"
              sx={{ mb: 1 }}
              {...register('heavy', {
                required: 'This field is required',
              })}
              error={!!errors.heavy}
              helperText={errors.heavy?.message}
            />
            <TextField
              label="Area"
              type="number"
              fullWidth
              variant="filled"
              sx={{ mb: 1 }}
              {...register('area', { min: 1 })}
            />
            <TextField
              type="number"
              label="Package"
              fullWidth
              variant="filled"
              sx={{ mb: 1 }}
              {...register('package', {
                min: 1,
              })}
              error={!!errors.package}
              helperText={errors.package?.message}
            />
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = '' } = query;

  let material: IMaterial | null;

  if (id === 'new') {
    const tempMaterial = JSON.parse(JSON.stringify(new Material()));
    delete tempMaterial._id;
    material = tempMaterial;
  } else {
    material = await dbInventory.getMaterialById(id.toString());
  }

  if (!material) {
    return {
      redirect: {
        destination: '/admin/inventory',
        permanent: false,
      },
    };
  }

  return {
    props: {
      material,
    },
  };
};

export default MaterialPage;
