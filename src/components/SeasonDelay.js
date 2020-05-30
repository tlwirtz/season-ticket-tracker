import { connect } from 'react-redux';
import React, { Component, PropTypes as T } from 'react';

export class SeasonDelay extends Component {
  render() {
    return (
      <section>
        <div style={{ display: 'block', marginBottom: '50vh' }}>
          <h1 className="centered nav-bar-title">{this.props.messageHeader}</h1>
          <h3 className="centered extra-left-margin nav-bar-subheading cool-grey-text">
            {this.props.messageText}
          </h3>
        </div>
      </section>
    );
  }
}

SeasonDelay.propTypes = {
  messageText: T.string.isRequired,
  messageHeader: T.string.isRequired,
};

const mapStateToProps = (state) => {
  const { messageHeader, messageText } = state.seasonStatus.data;
  return {
    messageHeader,
    messageText,
  };
};

const SeasonDelayContainer = connect(mapStateToProps)(SeasonDelay);
export default SeasonDelayContainer;
