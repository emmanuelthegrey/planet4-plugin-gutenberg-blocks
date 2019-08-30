import {Articles} from './Articles.js';
import {shortCodeTag, shortcodeAttributes, gutenbergTag, gutenbergAttributes} from './ArticlesConfig.js';

export class ArticlesBlock {
  constructor() {
    const {registerBlockType} = wp.blocks;
    const {withSelect} = wp.data;

    registerBlockType(gutenbergTag, {
      title: 'Articles',
      icon: 'welcome-widgets-menus',
      category: 'planet4-blocks',

      // Transform the shortcode into a Gutenberg block
      // this is used when a user clicks "Convert to blocks"
      // on the "Classic Editor" block
      transforms: {
        from: [
          {
            type: 'shortcode',
            // Shortcode tag can also be an array of shortcode aliases
            tag: shortCodeTag,
            attributes: shortcodeAttributes,
          },
        ]
      },
      // This attributes definition mimics the one in the PHP side.
      attributes: gutenbergAttributes,
      // withSelect is a "Higher Order Component", it works as
      // a Decorator, it will provide some basic API functionality
      // through `select`.
      edit: withSelect((select) => {
        const tagsTaxonomy = 'post_tag';
        const postTypesTaxonomy = 'p4-page-type';
        const args = {
          hide_empty: false,
          per_page: 50,
        };
        const {getEntityRecords} = select('core');

        // We should probably wrap all these in a single call,
        // or maybe use our own way of retrieving data from the
        // API, I don't know how this scales.
        const tagsList = getEntityRecords('taxonomy', tagsTaxonomy, args);
        const postTypesList = getEntityRecords('taxonomy', postTypesTaxonomy, args);

        return {
          postTypesList,
          tagsList,
        };
      })(({
            postTypesList,
            tagsList,
            isSelected,
            attributes,
            setAttributes
          }) => {

        if (!tagsList || !postTypesList) {
          return "Populating block's fields...";
        }

        // TO-DO: Check for posts types and posts too...
        if ((tagsList && tagsList.length === 0) || (postTypesList && postTypesList.length === 0)) {
          return "Populating block's fields...";
        }

        // These methods are passed down to the
        // Articles component, they update the corresponding attribute.

        function onTitleChange(value) {
          setAttributes({article_heading: value});
        }

        function onDescriptionChange(value) {
          setAttributes({articles_description: value});
        }

        function onReadmoretextChange(value) {
          setAttributes({read_more_text: value});
        }

        function onCountChange(value) {
          setAttributes({article_count: Number(value)});
        }

        function onReadmorelinkChange(value) {
          setAttributes({read_more_link: value});
        }

        function onButtonLinkTabChange(value) {
          setAttributes({button_link_new_tab: value});
        }

        function onSelectedTagsChange(tagIds) {
          setAttributes({tags: tagIds});
        }

        function onSelectedPostsChange(value) {
          setAttributes({posts: value});
        }

        function onSelectedPostTypesChange(postTypeIds) {
          setAttributes({post_types: postTypeIds});
        }

        function onIgnoreCategoriesChange(value) {
          setAttributes({ignore_categories: value});
        }

        // We pass down all the attributes to Covers as props using
        // the spread operator. Then we selectively add more
        // props.
        return <Articles
          {...attributes}
          isSelected={isSelected}
          tagsList={tagsList}
          postTypesList={postTypesList}
          onSelectedTagsChange={onSelectedTagsChange}
          onTitleChange={onTitleChange}
          onDescriptionChange={onDescriptionChange}
          onCountChange={onCountChange}
          onSelectedPostsChange={onSelectedPostsChange}
          onSelectedPostTypesChange={onSelectedPostTypesChange}
          onReadmoretextChange={onReadmoretextChange}
          onReadmorelinkChange={onReadmorelinkChange}
          onButtonLinkTabChange={onButtonLinkTabChange}
          onIgnoreCategoriesChange={onIgnoreCategoriesChange}/>
      }),
      save() {
        return null;
      }
    });
  };
}

