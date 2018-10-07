/**
 * @Author: JoseMunoz
 * @Date:   2018-08-31T16:15:18-06:00
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-10-06T12:10:04-06:00
 */
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import throttle from 'lodash/throttle';
import styled from 'styled-components';
import React, { PureComponent } from 'react';

const containerStyles = {
  width: '100%',
  height: '100%',
  perspective: '40px',
};

const initialState = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  offsetX: 0,
  offsetY: 0,
  centerX: 0,
  centerY: 0,
};

class TiltContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.reset = this.reset.bind(this);
    this.setOrigin = this.setOrigin.bind(this);
    this.update = throttle(this.update.bind(this), 150);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  setOrigin(container) {
    let {
      centerY,
      centerX,
    } = this.state;

    const {
      top,
      left,
      width,
      height,
    } = container.getBoundingClientRect();

    centerY = top + (height / 2);
    centerX = left + (width / 2);

    this.setState({
      width,
      height,
      centerY,
      centerX,
    });
  }

  update(currentX, currentY) {
    let {
      x,
      y,
      offsetX,
      offsetY,
    } = this.state;

    const {
      width,
      height,
      centerX,
      centerY,
    } = this.state;

    offsetX = currentX - centerX;
    offsetY = ((currentY - centerY) + 150) * -1;
    x = (offsetX / width / 2).toFixed(2);
    y = (offsetY / height / 2).toFixed(2);

    this.setState({
      x,
      y,
      offsetX,
      offsetY,
    });
  }

  reset() {
    const x = 0;
    const y = 0;
    const offsetX = 0;
    const offsetY = 0;

    this.setState({
      x,
      y,
      offsetX,
      offsetY,
    });
  }

  handleMouseMove(evt) {
    const { clientX, clientY } = evt;

    evt.persist();
    this.update(clientX, clientY);
  }

  render() {
    const { x, y } = this.state;
    const { children } = this.props;

    const Hoverable = styled.div`
        height: 100% !important;
        transition: all 0.25s !important;
        transform: rotateX(${y}deg) rotateY(${x}deg) !important;
    `;

    return (
      <div
        style={containerStyles}
        onMouseLeave={this.reset}
        onMouseMove={this.handleMouseMove}
        onMouseEnter={this.handleMouseMove}
        ref={ref => {
          if (!isEmpty(ref)) {
            this.setOrigin(ref);
          }
        }}
      >
        <Hoverable>
          {children}
        </Hoverable>
      </div>
    );
  }
}

TiltContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TiltContainer;
