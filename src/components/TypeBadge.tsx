import { InputFieldType } from '@/gql/graphql';
import { Badge, Center } from '@mantine/core';
import {
  IconForms,
  IconAlignRight,
  IconCalendar,
  IconCaretDown,
  IconListSearch,
  IconListNumbers,
} from '@tabler/icons';

const icon = {
  [InputFieldType.Textinput]: {
    icon: <IconForms size={20} />,
    color: 'blue',
  },

  [InputFieldType.Textarea]: {
    icon: <IconAlignRight size={20} />,
    color: 'grape',
  },

  [InputFieldType.Date]: {
    icon: <IconCalendar size={20} />,
    color: 'green',
  },

  [InputFieldType.Dropdown]: {
    icon: <IconCaretDown size={20} />,
    color: 'red',
  },

  [InputFieldType.Search]: {
    icon: <IconListSearch size={20} />,
    color: 'cyan',
  },

  [InputFieldType.Number]: {
    icon: <IconListNumbers size={20} />,
    color: 'orange',
  },
};

export const TypeBadge = ({ type }: { type: InputFieldType }) => {
  return (
    <Badge radius={'sm'} size='lg' pl={'xs'} pr={'xs'} color={icon[type].color}>
      <Center>{icon[type].icon}</Center>
    </Badge>
  );
};
