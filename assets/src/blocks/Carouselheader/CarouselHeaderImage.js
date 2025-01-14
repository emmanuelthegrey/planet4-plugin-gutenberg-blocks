import {React, Component, Fragment} from 'react';
import {
  Dashicon,
  FocalPointPicker
} from '@wordpress/components';
import {MediaUpload} from "@wordpress/editor";
import ImagePlaceholder from './ImagePlaceholder';

export class CarouselHeaderImage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onChange, onRemove, image_id, image_url, onFocalPointsChange, focal_points} = this.props;
    let   hasRemove = true;

    let imageClass = [];
    if (!image_url) {
      imageClass.push('ch-image-upload-placeholder');
      imageClass.push('ch-image-upload-has-placeholder');
    } else {
      imageClass.push('carousel-header-image-container');
    }
    imageClass = imageClass.join(' ');


    return (
      <Fragment>
        <MediaUpload
          onSelect={onChange}
          allowedTypes={['image']}
          value={image_id}
          render={obj => {
            if (image_url) {
              return (
                <div
                  className={imageClass}
                  tabIndex={0}
                >
                  {image_url && onRemove && hasRemove && (
                    <button className="ch-image-upload-remove" onClick={ev => {
                      onRemove();
                      ev.stopPropagation()
                    }}><Dashicon icon="no"/></button>
                  )}
                  <FocalPointPicker
                    url={image_url}
                    value={focal_points}
                    onChange={(focalPoints) => onFocalPointsChange(focalPoints)}
                  />

                </div>
              )
            }
            return (
              <div
                className={imageClass}
                onClick={obj.open}
                onKeyDown={event => {
                  if (event.keyCode === 13) {
                    obj.open()
                  }
                }}
                role="button"
                tabIndex={0}
                >
                {image_url && onRemove && hasRemove && (
                  <button className="ch-image-upload-remove" onClick={ev => {
                    onRemove();
                    ev.stopPropagation()
                  }}><Dashicon icon="no"/></button>
                )}
                <ImagePlaceholder/>
              </div>
            )
          }}
        />

      </Fragment>
    );
  };
}
