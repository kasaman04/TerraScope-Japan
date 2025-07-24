export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {name: 'title', type: 'string', title: 'Title', validation: R => R.required()},
    {name: 'cover', type: 'image', title: 'Cover Image'},
    {name: 'date', type: 'date', title: 'Date'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}},
    {name: 'body', type: 'blockContent', title: 'Body'},
  ],
}