import { FormContext } from '@/context/formContext';
import type { FormField } from '@/gql/graphql';
import { InputFieldType } from '@/gql/graphql';
import { Group, Badge, Center, ActionIcon, createStyles } from '@mantine/core';
import {
  IconForms,
  IconDotsVertical,
  IconAlignRight,
  IconCalendar,
  IconCaretDown,
  IconListSearch,
} from '@tabler/icons';
import { useContext, useRef } from 'react';
import Truncate from './Truncate';
import { TypeBadge } from './TypeBadge';

const useStyles = createStyles((theme) => ({
  nodeItem: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    marginBottom: theme.spacing.xs,
    cursor: 'pointer',
  },

  nodeItemActive: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[9]
        : theme.colors.gray[2],
  },
}));

export const getIcon = (type: InputFieldType) => {
  switch (type) {
    case InputFieldType.Textinput:
      return <IconForms size={20} />;
    case InputFieldType.Textarea:
      return <IconAlignRight size={20} />;
    case InputFieldType.Date:
      return <IconCalendar size={20} />;
    case InputFieldType.Dropdown:
      return <IconCaretDown size={20} />;
    case InputFieldType.Search:
      return <IconListSearch size={20} />;
    default:
      return <IconForms size={20} />;
  }
};

const NodeItem = ({
  node,
  onClickMenu,
  onClick,
}: {
  node: FormField;
  onClickMenu: (x: number, y: number) => void;
  onClick: () => void;
}) => {
  const { classes, cx } = useStyles();
  const ref = useRef<HTMLButtonElement>(null);
  const { state } = useContext(FormContext);

  return (
    <div
      className={cx(classes.nodeItem, {
        [classes.nodeItemActive]: node.id === state.head?.id,
      })}
      style={{ position: 'relative' }}
      onClick={onClick}
    >
      <Group>
        <TypeBadge type={node.type} />

        <div style={{ flex: 1 }}>
          <Truncate
            maxLength={40}
            text={node.question || '...'}
            textProps={{ size: 'sm' }}
          />
        </div>

        <ActionIcon
          color={'blue'}
          size='xs'
          variant='transparent'
          onContextMenu={(e) => {
            e.preventDefault();
            onClickMenu(e.clientX, e.clientY);
          }}
          onClick={(e) => {
            e.preventDefault();
            if (ref.current) {
              const buttonRect = ref.current.getBoundingClientRect();
              onClickMenu(buttonRect.x + 15, buttonRect.y);
            }
          }}
          ref={ref}
        >
          <IconDotsVertical size={16} stroke={1.5} />
        </ActionIcon>
      </Group>
    </div>
  );
};

export default NodeItem;
