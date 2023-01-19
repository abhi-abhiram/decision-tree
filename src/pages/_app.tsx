import type { AppProps } from 'next/app';
import type { ColorScheme } from '@mantine/core';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
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
import { Provider } from 'urql';
import client from '@/context/graphql';
import { RouterTransition } from '@/components/RouterTransition';
import { IconSun, IconMoonStars } from '@tabler/icons';
import { FormProvider } from '@/context/formContext';

const useStyles = createStyles((theme) => {
  return {
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

    dark: {
      backgroundColor: theme.colors.dark[8],
    },

    light: {
      backgroundColor: theme.colors.gray[0],
    },

    nav: {
      flex: '0 0 200px',
    },
  };
});

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const { pathname } = useRouter();

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <Provider value={client}>
        {pathname.startsWith('/form/') ? (
          <FormWrapper>
            <Component {...pageProps} />
          </FormWrapper>
        ) : (
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        )}
      </Provider>
    </ColorSchemeProvider>
  );
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes, cx } = useStyles();
  const { pathname } = useRouter();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme,
        primaryColor: 'blue',
      }}
    >
      <RouterTransition />
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

          <div>
            <Group position='right' m={5}>
              <ActionIcon
                onClick={() => toggleColorScheme()}
                size='lg'
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.yellow[4]
                      : theme.colors.blue[6],
                })}
              >
                {colorScheme === 'dark' ? (
                  <IconSun size={18} />
                ) : (
                  <IconMoonStars size={18} />
                )}
              </ActionIcon>
            </Group>
          </div>
        </Header>

        <div className={classes.container}>
          {!pathname.startsWith('/form/') && (
            <div
              style={{
                height: '100%',
              }}
            >
              <NavBar />
            </div>
          )}
          <main
            className={cx(classes.main, {
              [classes.dark]: colorScheme === 'dark',
              [classes.light]: colorScheme === 'light',
            })}
          >
            {children}
          </main>
        </div>
      </div>
    </MantineProvider>
  );
};

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <FormProvider>
      <Wrapper>{children}</Wrapper>
    </FormProvider>
  );
};
