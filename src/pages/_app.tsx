import type { AppProps } from 'next/app';
import type { ColorScheme } from '@mantine/core';
import {
  MantineProvider,
  ColorSchemeProvider,
  createStyles,
  Header,
  Group,
  Breadcrumbs,
  Anchor,
} from '@mantine/core';
import React, { useState } from 'react';
import NavBar from '@/components/Navbar';
import NavBtn from '@/components/NavBtn';
import { useRouter } from 'next/router';
import '@/styles/global.css';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
  },

  headerInner: {
    height: 42,
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1',
    overflow: 'auto',
  },

  main: {
    flex: '1 1 0%',
  },

  nav: {
    flex: '0 0 200px',
  },
}));

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const { classes } = useStyles();
  const { pathname } = useRouter();

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
        }}
      >
        <div className={classes.root}>
          <Header height={'42'} className={classes.header}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {pathname.startsWith('/workspace/') && (
                <Breadcrumbs>
                  <Anchor component={Link} href={'/'}>
                    Home
                  </Anchor>

                  <Anchor>Next</Anchor>
                </Breadcrumbs>
              )}
            </div>

            <div style={{ margin: 'auto', textAlign: 'center' }}>
              {pathname.startsWith('/workspace/') && (
                <Group>
                  <NavBtn to='/workspace/'>Create</NavBtn>
                  <NavBtn to='/result'>Result</NavBtn>
                </Group>
              )}
            </div>
          </Header>

          <div className={classes.container}>
            {!pathname.startsWith('/workspace/') && (
              <div
                style={{
                  height: '100%',
                }}
              >
                <NavBar />
              </div>
            )}
            <main className={classes.main}>
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
