export default {
  name: 'team',
  type: 'document',
  title: 'Team Member',
  fields: [
    {name: 'name', type: 'string', title: 'Name', validation: R => R.required()},
    {name: 'title', type: 'string', title: 'Title'},
    {name: 'photo', type: 'image', title: 'Photo'},
    {name: 'bio', type: 'text', title: 'Bio'},
    {name: 'linkedIn', type: 'url', title: 'LinkedIn URL'},
  ],
}