export default {
  name: 'service',
  type: 'document',
  title: 'Service',
  fields: [
    {name: 'key',    type: 'string', title: 'Key', validation: R => R.required()},
    {name: 'title',  type: 'string', title: 'Title'},
    {name: 'price',  type: 'string', title: 'Price'},
    {name: 'bullets',type: 'array',  title: 'Bullets', of: [{type: 'string'}]},
    {name: 'slug',   type: 'slug',   options: {source: 'title', maxLength: 96}},
  ],
}