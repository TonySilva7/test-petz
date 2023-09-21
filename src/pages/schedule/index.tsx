import { STYLES } from '@/@redux/features';
import * as S from '@/@redux/store';
import { ComponentProps, useEffect } from 'react';

type HomeProps = ComponentProps<'div'>;
import * as Fields from '@/components/Fields';
import * as Input from '@/components/Input';
import * as Select from '@/components/Select';

export default function Schedule({ ...props }: HomeProps) {
  const dispatch = S.useAppDispatch();

  useEffect(() => {
    dispatch(
      STYLES.setTitleHeader({
        title: 'Agendar Consulta',
        subTitle: 'Recupere sues pokémons em 5 segundos',
      }),
    );
  }, [dispatch]);

  return (
    <div {...props}>
      <h1>Preencha o formulário abaixo para agendar sua consulta</h1>
      <form>
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
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="1">1</Select.Option>
          </Select.Control>
          <Fields.Errors errors={['Erro aqui', 'Outro erro']} />
        </Fields.Root>
      </form>
    </div>
  );
}

export { type HomeProps };
