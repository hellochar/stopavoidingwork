import React, { PureComponent } from 'react';
import { scrollToPage } from './page';
import { TypewriterText } from './typewriterText';
import { EnterListener } from './enterListener';
import { Divider } from './divider';
import { Entry } from './entry';

interface IAppState {
  what?: string;
}

class App extends PureComponent<{}, IAppState> {
  state = {
    what: undefined
  };

  handleEntryWhat = (what: string) => {
    this.setState({ what });
    scrollToPage(2);
  }

  render() {
    return (
      <div id="app">
        <div className="form">
          <div className="divider divider-intro">
            <div className="content">
              <TypewriterText duration={4.5} className="intro">
                Use this five minute motivational exercise to get excited about doing that thing you've been putting off!
              </TypewriterText>

              <div style={{
                marginTop: "2em"
              }}>
                <EnterListener page={0} to={1} />
              </div>
            </div>
          </div>

          <Divider className="divider-what" page={1}>
            <div className="content">
              <TypewriterText duration={2}>I&nbsp;have&nbsp;been&nbsp;putting&nbsp;off&nbsp;</TypewriterText>
              <Entry focusDelay={2000} id="what" onEntry={this.handleEntryWhat} />
              <span className="period">.</span>
              <EnterListener style={{marginTop: "2em"}} page={1} to={2} />
            </div>
          </Divider>
          
          <Divider page={2}>
            <div className="content">
              <TypewriterText duration={2}>I&nbsp;haven't&nbsp;done&nbsp;this&nbsp;yet&nbsp;because</TypewriterText>
              <ol>
                <li><div className="entry" contentEditable={true} id="why-not-yet"></div>,</li>
                <li><div className="entry" contentEditable={true} id="why-not-yet"></div>,</li>
                <li><div className="entry" contentEditable={true} id="why-not-yet"></div>,</li>
                <li><div className="entry" contentEditable={true} id="why-not-yet"></div>, and</li>
                <li><div className="entry" contentEditable={true} id="why-not-yet"></div>.</li>
              </ol>
            </div>
          </Divider>

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
        </div>

      </div>
    );
  }
}

export default App;
