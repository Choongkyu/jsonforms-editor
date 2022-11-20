/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { styled } from '@mui/system';
import React from 'react';

interface LayoutProps {
  HeaderComponent?: React.ComponentType;
  FooterComponent?: React.ComponentType;
  children: React.ReactNode;
}

const Main = styled('main')(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  minHeight: 0,
}));
const Container = styled('div')({
  display: 'grid',
  height: '100vh',
  gridTemplateAreas: 'header content footer',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
});

const Footer = styled('footer')(
  ({ theme }) =>
    console.log('them>>', theme) != null || {
      padding: theme.spacing(2, 2),
      backgroundColor:
        theme.palette.type === 'light' ? 'text.secondary' : 'text.disabled',
    }
);

export const Layout: React.FC<LayoutProps> = ({
  HeaderComponent,
  FooterComponent,
  children,
}) => {
  return (
    <Container>
      <header>{HeaderComponent ? <HeaderComponent /> : null}</header>
      <Main>{children}</Main>
      <Footer>{FooterComponent ? <FooterComponent /> : null}</Footer>
    </Container>
  );
};
