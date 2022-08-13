import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
// import Headers from './Header';
import './styles.css';

type FormValues = {
  firstName: string;
  fieldArray: { name: string }[];
};

let renderCount = 0;

export default function App() {
  const { register, handleSubmit, control, watch } = useForm<FormValues>();
  const { fields, append } = useFieldArray({
    control,
    name: 'fieldArray',
  });
  const onSubmit = (data: FormValues) => console.log(data);
  renderCount++;
  const watchFieldArray = watch('fieldArray');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  console.log('updated', controlledFields);

  return (
    <div>
      {/* <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      /> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName')} placeholder="First Name" />

        {controlledFields.map((field, index) => {
          return <input {...register(`fieldArray.${index}.name` as const)} />;
        })}

        <button
          type="button"
          onClick={() =>
            append({
              name: 'bill',
            })
          }
        >
          Append
        </button>

        <input type="submit" />
      </form>
    </div>
  );
}
