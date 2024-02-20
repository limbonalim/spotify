import React, { PropsWithChildren } from 'react';
import { Container } from '@mui/material';





const Layout:React.FC<PropsWithChildren> = ({children}) => {


  return (
    <>
      <header>
      </header>
      <main>
        <Container>
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;