import { STYLES } from '@/@redux/features';
import * as S from '@/@redux/store';
import * as Fields from '@/components/Fields';
import * as Input from '@/components/Input';
import * as Select from '@/components/Select';
import CustomSelect from '@/components/Select/custom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentProps, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

type HomeProps = ComponentProps<'div'>;

export default function Schedule({ ...props }: HomeProps) {
  const dispatch = S.useAppDispatch();
  const fnSchema = () => {
    return Yup.object({
      'my-input': Yup.string()
        .required(`id_region_property>>Nome é obrigatório`)
        .min(5, 'Máximo de 2 caracteres'),
    }).required();
  };
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(fnSchema()),
  });

  useEffect(() => {
    dispatch(
      STYLES.setTitleHeader({
        title: 'Agendar Consulta',
        subTitle: 'Recupere sues pokémons em 5 segundos',
      }),
    );
  }, [dispatch]);

  const submit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <div {...props}>
      <h1>Preencha o formulário abaixo para agendar sua consulta</h1>
      <form onSubmit={handleSubmit(submit)}>
        <CustomSelect setValue={setValue} {...register('my-input')}>
          <option value="1">Um</option>
          <option value="2">Dois</option>
          <option value="3">Tres</option>
          <option value="4">Quatro</option>
        </CustomSelect>
        <Fields.Root>
          <Fields.Legend htmlFor="username">Nome</Fields.Legend>
          <Input.Control id="username" placeholder="Digite seu nome" />
          <Fields.Errors errors={[]} />
        </Fields.Root>
        <Fields.Root>
          <Fields.Legend htmlFor="username">Nome</Fields.Legend>
          <Input.Control id="username" placeholder="Digite seu nome" />
          <Fields.Errors errors={[]} />
        </Fields.Root>
        <Fields.Root>
          <Fields.Legend htmlFor="username">Nome</Fields.Legend>
          <Select.Control id="username" placeholder="Digite seu nome">
            <Select.Option value="1">Ovo</Select.Option>
            <Select.Option value="2">Laranja</Select.Option>
            <Select.Option value="3">Maçã</Select.Option>
            <Select.Option value="4">Banana</Select.Option>
          </Select.Control>
          <Fields.Errors errors={['Erro aqui', 'Outro erro']} />
        </Fields.Root>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export { type HomeProps };
