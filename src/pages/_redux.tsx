import { setupStore } from '@/@redux/store';
import { Provider } from 'react-redux';

type ProviderReduxProps = {
  children: React.ReactNode;
};

export const ProviderRedux = ({ children }: ProviderReduxProps) => {
  const store = setupStore();
  return <Provider store={store}>{children}</Provider>;
};
