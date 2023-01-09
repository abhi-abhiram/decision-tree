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

const permissions: Permission = [
  {
    id: '1',
    name: 'User',
    options: {
      view: true,
      edit: true,
      delete: true,
      create: true,
    },
  },
  {
    id: '2',
    name: 'Admin',
    options: {
      view: true,
      edit: true,
      delete: true,
      create: true,
    },
  },
];

const Permission = () => {
  permissions.map((permission) => {
    return (
      <div key={permission.id}>
        <h1>{permission.name}</h1>
        <div>
          <input type='checkbox' checked={permission.options.view} />
          <label>View</label>
        </div>
        <div>
          <input type='checkbox' checked={permission.options.edit} />
          <label>Edit</label>
        </div>
        <div>
          <input type='checkbox' checked={permission.options.delete} />
          <label>Delete</label>
        </div>
        <div>
          <input type='checkbox' checked={permission.options.create} />
          <label>Create</label>
        </div>
      </div>
    );
  });
};
