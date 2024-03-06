import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../containers/Users/usersSlice.ts';

const Protected: React.FC<PropsWithChildren> = ({children}) => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <>
      {children}
    </>
  );
};

export default Protected;