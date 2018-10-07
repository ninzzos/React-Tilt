/**
 * @Author: JoseMunoz
 * @Date:   2018-10-06T12:32:24-06:00
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-10-06T22:16:11-06:00
 */
import React from 'react';
import { render } from 'react-dom';
import Tilt from '../../dist';
import backgroundImage from './background.jpg';
import repoImage from './repo.jpg';

const itemStyle = {
  flexGrow: 0,
  width: '30vw',
  height: '30vw',
  display: 'flex',
  minWidth: '33vh',
  minHeight: '33vh',
  flexBasis: 'content',
  alignItems: 'center',
};

const contentStyles = {
  height: '100%',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  alignItems: 'center',
  borderRadius: '1rem',
  backgroundSize: 'cover',
  justifyContent: 'center',
  backgroundPosition: 'center',
  boxShadow: ' 0 2px 3px rgba(0,0,0, 0.1)',
};

const App = () => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}
  >
    <div
      style={itemStyle}
    >
      <Tilt>
        <div
          style={{
            ...contentStyles,
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <h1
            style={{
              color: 'white',
            }}
          >
              React Tilt Container
          </h1>
        </div>
      </Tilt>
    </div>
    <div style={itemStyle}>
      <Tilt>
        <div
          style={{
            ...contentStyles,
            backgroundImage: `url(${repoImage})`,
          }}
        >
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/jdmg94/react-tilt"
            style={{
              fontSize: '35px',
              color: 'white',
            }}
          >
              Github Repo
          </a>
        </div>
      </Tilt>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
