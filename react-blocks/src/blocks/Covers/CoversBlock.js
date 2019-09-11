import { CoversIcon } from './CoversIcon.js';
import { Covers } from './Covers.js';
import { coversConfig } from './CoversConfig.js';

export class CoversBlock {
    constructor() {
      const { registerBlockType } = wp.blocks;
      const { withSelect } = wp.data;

      registerBlockType(coversConfig.gutenbergTag, {
        title: 'Covers',
        icon: CoversIcon,
        category: 'planet4-blocks',

        // Transform the shortcode into a Gutenberg block
        // this is used when a user clicks "Convert to blocks"
        // on the "Classic Editor" block
        transforms: {
          from: [
            {
              type: 'shortcode',
              // Shortcode tag can also be an array of shortcode aliases
              tag: coversConfig.shortCodeTag,
              attributes: coversConfig.shortCodeAttributes,
            },
          ]
        },
        // This attributes definition mimics the one in the PHP side.
        attributes: coversConfig.gutenbergAttributes,
        // withSelect is a "Higher Order Component", it works as
        // a Decorator, it will provide some basic API functionality
        // through `select`.
        edit: withSelect( ( select ) => {
          const tagsTaxonomy = 'post_tag';
          const postTypesTaxonomy = 'p4-page-type';
          const args = {
            hide_empty: false,
            per_page: -1,
          };

          const { getEntityRecords } = select( 'core' );

          // We should probably wrap all these in a single call,
          // or maybe use our own way of retrieving data from the
          // API, I don't know how this scales.
          const tagsList = getEntityRecords( 'taxonomy', tagsTaxonomy, args );
          const postTypesList = getEntityRecords( 'taxonomy', postTypesTaxonomy );

          return {
            postTypesList,
            tagsList,
          };
        } )( ( {
          postTypesList,
          tagsList,
          isSelected,
          attributes,
          setAttributes
        } ) => {

            if ( !tagsList || !postTypesList ) {
                return "Populating block's fields...";
            }

            // TO-DO: Check for posts types and posts too...
            if ( !tagsList && !tagsList.length === 0 ) {
                return "No tags...";
            }

            // These methods are passed down to the
            // Covers component, they update the corresponding attribute.

            function onRowsChange( value ) {
              setAttributes( { covers_view: value } );
            }

            function onTitleChange( value ) {
              setAttributes( { title: value } );
            }

            function onDescriptionChange( value ) {
              setAttributes( { description: value } );
            }

            function onSelectedTagsChange( tagIds ) {
              setAttributes( { tags: tagIds } );
            }

            function onSelectedPostsChange(value) {
              setAttributes({posts: value});
            }

            function onSelectedPostTypesChange( postTypeIds ) {
              setAttributes( { post_types: postTypeIds } );
            }

            function onSelectedLayoutChange( value ) {

              // Post types are available only on cover_type 3, so we reset the post_types attribute in the other 2 cases.
              if ( '1' === value) {
                setAttributes( { post_types: [] } );
              }
              if ( '2' === value) {
                setAttributes( { post_types: []} );
              }
              // Reset posts attribute when changing layout also.
              setAttributes({cover_type: value, posts: []});
            }

            // We pass down all the attributes to Covers as props using
            // the spread operator. Then we selectively add more
            // props.
            return <Covers
              { ...attributes }
              isSelected={ isSelected }
              tagsList={ tagsList }
              postTypesList={ postTypesList }
              onSelectedTagsChange={ onSelectedTagsChange }
              onSelectedLayoutChange={ onSelectedLayoutChange }
              onTitleChange={ onTitleChange }
              onDescriptionChange={ onDescriptionChange }
              onSelectedPostsChange={ onSelectedPostsChange }
              onSelectedPostTypesChange={ onSelectedPostTypesChange }
              onRowsChange={ onRowsChange } />
        } ),
        save() {
          return null;
        }
      } );
    };
}

