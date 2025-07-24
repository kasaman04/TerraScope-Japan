export default {
  name: 'caseStudy',
  type: 'document',
  title: 'Case Study',
  fields: [
    {name: 'title', type: 'string', title: 'Title', validation: R => R.required()},
    {name: 'service', type: 'reference', title: 'Service', to: [{type: 'service'}]},
    {name: 'date', type: 'date', title: 'Date'},
    {name: 'location', type: 'string', title: 'Location'},
    {name: 'summary', type: 'text', title: 'Summary'},
    {name: 'metrics', type: 'array', title: 'Metrics', of: [{type: 'string'}]},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}},
  ],
}