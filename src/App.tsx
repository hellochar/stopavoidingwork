import React, { PureComponent } from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';

class App extends PureComponent {
  render() {
    return (
      <div id="app">
        <form className="form">
          <div className='divider divider-intro'>
            <p className="intro">
              Use this five minute motivational exercise to get excited about doing that work you've been putting off!
            </p>
          </div>

          <div className="divider">
            I have been putting off
            <div className="entry" contentEditable={true} id="putting-off"></div>.
        </div>

          <div className="divider">
            <label htmlFor="why-not-yet">I haven't done this yet because</label>
            <ol>
              <li><div className="entry" contentEditable={true} id="why-not-yet"></div>,</li>
              <li><div className="entry" contentEditable={true} id="why-not-yet"></div>,</li>
              <li><div className="entry" contentEditable={true} id="why-not-yet"></div>,</li>
              <li><div className="entry" contentEditable={true} id="why-not-yet"></div>, and</li>
              <li><div className="entry" contentEditable={true} id="why-not-yet"></div>.</li>
            </ol>
          </div>

          <div className="divider">
            In the past, doing this has been painful because
      <ol>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>,</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>,</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>,</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>, and</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>.</li>
            </ol>
          </div>

          <div className="divider">
            By putting it off, I've instead been gaining pleasure from <div className="entry" contentEditable={true}></div>.
    </div>

          <div className="divider">
            If I keep putting it off, it will cost me <div className="entry" contentEditable={true}></div>, and I'll feel <div className="entry" contentEditable={true}></div>.
    </div>

          <div className="divider">
            But if I buckle down and really do it, I'll feel these positive emotions:
      <ol>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>,</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>,</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>,</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>,</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>,</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>,</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>,</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>,</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>, and finally,</li>
              <li><div className="entry" contentEditable={true} id="past-painful"></div>.</li>
            </ol>
          </div>
        </form>

      </div>
    );
  }
}

export default App;
