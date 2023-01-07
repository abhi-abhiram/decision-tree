import { createStyles } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: 42,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 400,
    fontSize: theme.fontSizes.sm,
    borderBottom: `2px solid transparent`,
    transition: 'border-bottom-color 0.35s ease-in-out 0s',

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
  },

  linkHover: {
    ...theme.fn.hover({
      borderBottom: `2px solid ${
        theme.colors.gray[theme.colorScheme === 'dark' ? 7 : 5]
      }`,
      transition: 'border-bottom-color 0.35s ease-in-out 0s',
    }),
  },

  linkActive: {
    borderBottomColor: theme.colors[theme.primaryColor]![7],
  },
}));

const NavBtn = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  const { classes, cx } = useStyles();
  const { pathname } = useRouter();

  return (
    <Link
      href={to}
      className={cx(classes.link, {
        [classes.linkActive]: pathname.startsWith(to),
        [classes.linkHover]: !pathname.startsWith(to),
      })}
    >
      {children}
    </Link>
  );
};

export default NavBtn;
