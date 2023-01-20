import { createStyles } from '@mantine/core';
import { IconCopy, IconTrash } from '@tabler/icons';
import { useRef } from 'react';
import useOnClickOutside from './useOnClickOutside';

const useStyles = createStyles((theme) => ({
  menu: {
    position: 'absolute',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[9]
        : theme.colors.gray[0],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.sm,
    zIndex: 300,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
  },

  item: {
    WebkitTapHighlightColor: 'transparent',
    fontSize: theme.fontSizes.sm,
    border: 0,
    backgroundColor: 'transparent',
    outline: 0,
    width: '100%',
    textAlign: 'left',
    textDecoration: 'none',
    boxSizing: 'border-box',
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    cursor: 'pointer',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    display: 'flex',
    alignItems: 'center',
    '&:disabled': {
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[5],
      pointerEvents: 'none',
      userSelect: 'none',
    },
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors.dark[3], 0.35)
          : theme.colors.gray[1],
    },
  },
  itemLabel: {
    flex: 1,
  },
  itemIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.xs,
  },
  itemRightSection: {},
}));

const ContextMenu = ({
  x,
  y,
  width,
  close,
  onDelete,
}: {
  x: number;
  y: number;
  close: () => void;
  width?: number;
  onDelete: () => void;
}) => {
  const { classes, theme } = useStyles();
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, close);

  return (
    <div
      className={classes.menu}
      style={{
        left: x,
        top: y,
        width,
      }}
      ref={ref}
    >
      <div className={`${classes.item}`}>
        <div className={classes.itemIcon}>
          <IconCopy size={16} />
        </div>
        <div className={`${classes.itemLabel} `}>Duplicate</div>
      </div>
      <div className={`${classes.item}`} style={{ color: theme.colors.red[6] }}>
        <div className={classes.itemIcon}>
          <IconTrash size={16} />
        </div>
        <div className={`${classes.itemLabel} `} onClick={onDelete}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default ContextMenu;
