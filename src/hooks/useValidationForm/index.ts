import * as Yup from 'yup';

export const useValidationForm = () => {
  return Yup.object({
    firstName: Yup.string().required(`Nome é obrigatório`),
    lastName: Yup.string().required(`Sobrenome é obrigatório`),
    region: Yup.string().required(`Região é obrigatório`),
    city: Yup.string().required(`Cidade é obrigatório`),

    pokemonTeam: Yup.array().of(
      Yup.object().shape({
        pokemon: Yup.string().required('Pokémon é obrigatório'),
      }),
    ),

    schedulingDate: Yup.string().required(`Data é obrigatório`),
    schedulingTime: Yup.string().required(`Hora é obrigatório`),
  }).required();
};
