export default {
  name: 'faq',
  type: 'document',
  title: 'FAQ',
  fields: [
    {name: 'q', type: 'string', title: 'Question', validation: R => R.required()},
    {name: 'a', type: 'text', title: 'Answer', validation: R => R.required()},
  ],
}