import {Columns} from './Columns.js';
import columnsConfig from './ColumnsConfig';

const {__} = wp.i18n;

export class ColumnsBlock {
    constructor() {
      const {registerBlockType} = wp.blocks;

      registerBlockType(columnsConfig.gutenbergTag, {
        title: __('Columns', 'p4ge'),
        icon: "grid-view",
        category: 'planet4-blocks',
        /**
         * Transforms old 'shortcake' shortcode to new gutenberg block.
         *
         * old block-shortcode:
         * [shortcake_columns columns_block_style="image" columns_title="Lorem Ipsum" columns_description="Lorem Ipsum"
         *                    title_1="col1" description_1="col1 body" attachment_1="5096" link_1="cta link1" link_new_tab_1="true" cta_text_1="cta text"
         *                    title_2="col2" description_2="col2 body" attachment_2="5186" link_2="cta link2" link_new_tab_2="true" cta_text_2="cta text 2" link_new_tab_3="false" link_new_tab_4="false" /]
         * /]
         *
         * new block-gutenberg:
         * <!-- wp:planet4-blocks/columns {"columns_block_style":"image","columns_title":"Lorem Ipsum","columns_description":"Lorem Ipsum",
         *      "columns":[{"title":"col1","description":"col1 body","attachment":5096,"cta_link":"cta link1","cta_text":"cta text 1","link_new_tab":true},{"title":"col2","description":"col2 body","attachment":5186,"cta_link":"cta link2","cta_text":"cta text 2","link_new_tab":true}]} /-->
         *
         */
        transforms: {
          from: [
            {
              type: 'shortcode',
              // Shortcode tag can also be an array of shortcode aliases
              tag: columnsConfig.shortCodeTag,
              attributes: columnsConfig.shortCodeAttributes
            },
          ]
        },
        attributes: columnsConfig.gutenbergAttributes,
        edit: ({isSelected, attributes, setAttributes}) => {

          function onTitleChange(value) {
            setAttributes({columns_title: value});
          }

          function onDescriptionChange(value) {
            setAttributes({columns_description: value});
          }

          function onSelectImage(index, value) {
            const {columns} = attributes;
            let {id}          = value;
            let new_columns   = [...columns];
            new_columns[index]['attachment'] = id;
            setAttributes({columns: new_columns});
          }

          function onSelectURL(index, value) {
            const {columns} = attributes;
            let {id} = null;
            let new_columns = [...columns];
            new_columns[index]['attachment'] = id;
            setAttributes({columns: new_columns});
          }

          function onUploadError({message}) {
            console.log(message);
          }

          function onSelectedLayoutChange( value ) {
            setAttributes({columns_block_style: value});

            if ( 'no_image' == value ) {
              const {columns} = attributes;
              if ( 0 < columns.length ) {
                let new_columns = [...columns];
                let i;
                for ( i = 0; i < columns.length; i++ ) {
                  new_columns[i]['attachment'] = '';
                }
                setAttributes({columns: new_columns});
              }
            }
          }

          function addColumn() {
            const {columns} = attributes;

            if ( columns.length < 4 ) {
              setAttributes({
                columns: [...columns, {
                  title:'',
                  description:'',
                  attachment:'',
                  cta_link:'',
                  cta_text:'',
                  link_new_tab:'',
                }]
              });
            }
          }

          function removeColumn() {
            setAttributes({columns: attributes.columns.slice(0, -1) });
          }

          function onColumnHeaderChange(index, value) {
            let columns = JSON.parse(JSON.stringify(attributes.columns));
            columns[index].title = value;
            setAttributes({columns});
          }

          function onColumnDescriptionChange(index, value) {
            let columns = JSON.parse(JSON.stringify(attributes.columns));
            columns[index].description = value;
            setAttributes({columns});
          }

          function onCTALinkChange(index, value) {
            let columns = JSON.parse(JSON.stringify(attributes.columns));
            columns[index].cta_link = value;
            setAttributes({columns});
          }

          function onLinkNewTabChange(index, value) {
            let columns = JSON.parse(JSON.stringify(attributes.columns));
            columns[index].link_new_tab = value;
            setAttributes({columns});
          }

          function onCTAButtonTextChange(index, value) {
            let columns = JSON.parse(JSON.stringify(attributes.columns));
            columns[index].cta_text = value;
            setAttributes({columns});
          }

          return <Columns
            {...attributes}
            isSelected={isSelected}
            onSelectedLayoutChange={onSelectedLayoutChange}
            onTitleChange={onTitleChange}
            onDescriptionChange={onDescriptionChange}
            onSelectImage={onSelectImage}
            onSelectURL={onSelectURL}
            addColumn={addColumn}
            removeColumn={removeColumn}
            onUploadError={onUploadError}
            onColumnHeaderChange={onColumnHeaderChange}
            onColumnDescriptionChange={onColumnDescriptionChange}
            onCTALinkChange={onCTALinkChange}
            onLinkNewTabChange={onLinkNewTabChange}
            onCTAButtonTextChange={onCTAButtonTextChange}
          />
        },
        save() {
          return null;
        }
      });
    };
}
