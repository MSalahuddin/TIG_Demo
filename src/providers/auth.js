import React from 'react';
import StorageProvider from './storage';
import getProfileQuery from 'queries/profile/getProfile.gql';
import {useQuery} from 'urql';
import {GraphQLContext} from './graphql';

const AuthContext = React.createContext({});

const AuthContextProvider = AuthContext.Provider;

export const tokenRef = React.createRef();

const anonymousUser = {};
const AuthProvider = props => {
  const storage = React.useContext(StorageProvider);
  const graphql = React.useContext(GraphQLContext);
  const [user, setUser] = React.useState(anonymousUser);
  const [token, setToken] = React.useState(null);
  const [tfa, setTFA] = React.useState(false);
  const [onboarding, setOnboarding] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [profileRes, getProfile] = useQuery({
    query: getProfileQuery,
    requestPolicy: 'cache-and-network',
    pause: !user?.id,
  });

  React.useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  React.useEffect(() => {
    const loadData = async () => {
      const userToken = await storage.getItem('auth.userToken');
      const userData = await storage.getItem('auth.userData');
      const tfaDone = await storage.getItem('auth.tfaDone');
      const onboardingDone = await storage.getItem('auth.onboardingDone');
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(userData);
      }
      try {
        setTFA(JSON.parse(tfaDone));
      } catch {
        setTFA(tfaDone);
      }
      try {
        setOnboarding(JSON.parse(onboardingDone));
      } catch {
        setOnboarding(onboardingDone);
      }
      setToken(userToken);
      setLoaded(true);
    };
    loadData();
  }, [storage]);

  const AuthDataSetter = React.useCallback(
    (setter, storageKey, parse = false) => async value => {
      if (value === null || value === undefined) {
        await storage.removeItem(storageKey);
      } else {
        await storage.setItem(
          storageKey,
          typeof value === 'string' && !parse ? value : JSON.stringify(value),
        );
      }
      setter(value);
    },
    [storage],
  );

  const value = React.useMemo(
    () => ({
      user: tfa ? user : {},
      token: tfa ? token : null,
      tfa,
      onboarding: onboarding,
      setTFA: AuthDataSetter(setTFA, 'auth.tfaDone', true),
      setUser: AuthDataSetter(setUser, 'auth.userData', true),
      setToken: AuthDataSetter(setToken, 'auth.userToken'),
      setOnboarding: AuthDataSetter(setOnboarding, 'auth.onboardingDone'),
      logout() {
        graphql?.resetClient();
        AuthDataSetter(setTFA, 'auth.tfaDone', true)(false);
        AuthDataSetter(setUser, 'auth.userData', true)({});
        AuthDataSetter(setToken, 'auth.userToken')(null);
      },
      loading: !loaded,
    }),
    [AuthDataSetter, graphql, loaded, onboarding, tfa, token, user],
  );
  console.log(token)
    
  React.useEffect(() => {
    if (
      profileRes.error?.message &&
      profileRes.error.message.indexOf(
        'You do not have permission to perform this action',
      ) !== -1
    ) {
      value.logout?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileRes.error]);

  return <AuthContextProvider {...props} value={value} />;
};

AuthContext.Provider = AuthProvider;

export default AuthContext;
