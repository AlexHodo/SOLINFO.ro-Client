import React from 'react';

export default class Ad extends React.Component {

  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render () {
    return (
      <div className='ad' {...this.props}>
        <ins 
          className='adsbygoogle'
          style={{ display: 'block' }}
          data-ad-client='ca-pub-9101356904433905'
          data-ad-slot={this.props.slot}
          data-ad-format='fluid' 
        />
      </div>
    );
  }
}