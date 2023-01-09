import { type } from 'os';

interface Workspace {
  id: string;
  name: string;
  forms: Form[];
}

interface Form {
  id: string;
  name: string;
  fields: Field[];
  logic: Logic[];
}

interface Logic {
  id: string;
  name: string;
  conditions: Condition[];
}

interface Condition {
  id: string;
  field: string;
  operator: Operator;
  value: string;
}

type Operator = 'equals' | 'not-equals' | 'greater-than' | 'less-than';

interface Field {
  id: string;
  name: string;
  type: FieldType;
  properties: FieldProperties;
}

type FieldType = 'text' | 'textinput' | 'date' | 'search' | 'dropdown';

type Permission = {
  id: string;
  name: string;
  options: {
    view: boolean;
    edit: boolean;
    delete: boolean;
    create: boolean;
  };
}[];
