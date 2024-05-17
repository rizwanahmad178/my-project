// permissions.js

const permissions = {
    // admin: ['users/add', 'users/edit', 'users/delete', 'roles/manage', 'permissions/manage'],
    subAdmin: ['users/edit', 'users/delete'],
    photographer: ['photos/upload', 'photos/view']
  };
  
  module.exports = permissions;
  