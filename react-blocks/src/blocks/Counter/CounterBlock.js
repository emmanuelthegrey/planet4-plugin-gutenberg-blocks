import { Counter } from './Counter.js';
import counterConfig from './CounterConfig';

export class CounterBlock {
  constructor() {
    const { registerBlockType } = wp.blocks;
    const { withSelect } = wp.data;

    registerBlockType(counterConfig.gutenbergTag, {
      title: 'Counter',
      icon: 'dashboard',
      category: 'planet4-blocks',

      // Transform the shortcode into a Gutenberg block
      // this is used when a user clicks "Convert to blocks"
      // on the "Classic Editor" block
      transforms: {
        from: [
          {
            type: 'shortcode',
            // Shortcode tag can also be an array of shortcode aliases
            tag: counterConfig.shortCodeTag,
            attributes: counterConfig.shortCodeAttributes,
          },
        ]
      },
      attributes: counterConfig.gutenbergAttributes,
      // withSelect is a "Higher Order Component", it works as
      // a Decorator, it will provide some basic API functionality
      // through `select`.
      edit: ({ isSelected, attributes, setAttributes }) => {
        function onTitleChange( value ) {
          setAttributes( { title: value } );
        }

        function onDescriptionChange( value ) {
          setAttributes( { description: value } );
        }

        function onSelectedLayoutChange( value ) {
          setAttributes( { style: value } );
        }

        function onCompletedChange( value ) {
          setAttributes( { completed: Number(value) } );
        }

        function onCompletedAPIChange( value ) {
          setAttributes( { completed_api: value } );
        }

        function onTargetChange( value ) {
          setAttributes( { target: Number(value) } );
        }

        function onTextChange( value ) {
          setAttributes( { text: value } );
        }

        // We pass down all the attributes to Covers as props using
        // the spread operator. Then we selectively add more
        // props.
        return <Counter
          { ...attributes }
          isSelected={ isSelected }
          onTitleChange={ onTitleChange }
          onDescriptionChange={ onDescriptionChange }
          onSelectedLayoutChange={ onSelectedLayoutChange }
          onCompletedChange={ onCompletedChange }
          onCompletedAPIChange={ onCompletedAPIChange }
          onTargetChange={ onTargetChange }
          onTextChange={ onTextChange }   />
      },
      save() {
        return null;
      }
    } );
  };
}

