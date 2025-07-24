export default {
  name: 'lead',
  type: 'document',
  title: 'Lead',
  fields: [
    {name: 'name', type: 'string', title: 'Name', validation: R => R.required()},
    {name: 'email', type: 'string', title: 'Email', validation: R => R.required()},
    {name: 'service', type: 'string', title: 'Service'},
    {name: 'msg', type: 'text', title: 'Message'},
    {name: 'createdAt', type: 'datetime', title: 'Created At', initialValue: () => new Date()},
  ],
  readOnly: true
}