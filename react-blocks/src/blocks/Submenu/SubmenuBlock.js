import {Submenu} from './Submenu.js';
import submenuConfig from './SubmenuConfig';

export class SubmenuBlock {
  constructor() {
    const {registerBlockType} = wp.blocks;
    const {withSelect} = wp.data;

    registerBlockType(submenuConfig.gutenbergTag, {
      title: 'Submenu',
      icon: 'welcome-widgets-menus',
      category: 'planet4-blocks',
      supports: {
        multiple: false, // Use the block just once per post.
      },
      /**
       * Transforms old 'shortcake' shortcode to new gutenberg block.
       *
       * old block-shortcode:
       * [shortcake_submenu submenu_style="3" title="title22" heading1="2"
       *                    link1="true" style1="bullet" heading2="3" link2="true" style2="number"
       *                    heading3="4" link3="false"
       * /]
       *
       * new block-gutenberg:
       * <!-- wp:planet4-blocks/submenu {"submenu_style":3,"title":"title22","levels":[{"heading":"2","link":"true","style":"bullet"},
       *    {"heading":"3","link":"true","style":"number"},{"heading":"4","link":"false","style":"none"}]} /-->
       *
       */
      transforms: {
        from: [
          {
            type: 'shortcode',
            // Shortcode tag can also be an array of shortcode aliases
            // This `shortcode` definition will be used as a callback,
            // it is a function which expects an object with at least
            // a `named` key with `cover_type` property whose default value is 1.
            // See: https://simonsmith.io/destructuring-objects-as-function-parameters-in-es6
            tag: submenuConfig.shortCodeTag,
            attributes: submenuConfig.shortCodeAttributes,
          },
        ]
      },
      attributes: submenuConfig.gutenbergAttributes,
      edit: withSelect((select) => {

      })(({
            isSelected,
            attributes,
            setAttributes
          }) => {

        function addLevel() {
          setAttributes({levels: attributes.levels.concat({heading: 0, link: false, style: 'none'})});
        }

        function onTitleChange(value) {
          setAttributes({title: value});
        }

        function onHeadingChange(index, value) {
          let levels = JSON.parse(JSON.stringify(attributes.levels));
          levels[index].heading = Number(value);
          setAttributes({levels: levels});
        }

        function onLayoutChange(value) {
          setAttributes({submenu_style: Number(value)});
        }

        function onLinkChange(index, value) {
          let levels = JSON.parse(JSON.stringify(attributes.levels));
          levels[index].link = value;
          setAttributes({levels: levels});
        }

        function onStyleChange(index, value) {
          let levels = JSON.parse(JSON.stringify(attributes.levels));
          levels[index].style = value;
          setAttributes({levels: levels});
        }

        function removeLevel() {
          setAttributes({levels: attributes.levels.slice(0, -1)});
        }

        return <Submenu
          {...attributes}
          isSelected={isSelected}
          onSelectedLayoutChange={onLayoutChange}
          onTitleChange={onTitleChange}
          onHeadingChange={onHeadingChange}
          onLinkChange={onLinkChange}
          onStyleChange={onStyleChange}
          addLevel={addLevel}
          removeLevel={removeLevel}
        />
      }),
      save() {
        return null;
      }
    });
  };
}

