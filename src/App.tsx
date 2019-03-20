import React, { PureComponent } from 'react';
import { scrollToPage } from './page';
import { TypewriterText } from './typewriterText';
import { EnterListener } from './enterListener';
import { Divider } from './divider';
import { Entry } from './entry';

interface IAppState {
  what?: string;
  whys: string[];
  pasts: string[];
}

class App extends PureComponent<{}, IAppState> {
  state: IAppState  = {
    what: undefined,
    whys: [],
    pasts: [],
  };

  handleEntryWhat = (what: string) => {
    this.setState({ what });
    const firstWhyInput = document.querySelector("#why-0") as HTMLElement;
    firstWhyInput.focus();
  }

  handleEntryWhy = (why: string, entry: Entry) => {
    const index = entry.props.index!;
    const whys = this.state.whys.slice(); 
    whys[index] = why;
    this.setState({
      whys,
    }, () => console.log(this.state));
    const nextWhyEntry = document.querySelector(`#why-${index + 1}`) as HTMLElement;
    if (nextWhyEntry) {
      nextWhyEntry.focus();
    } else {
      // we're past the why's, move onto the next section
      const firstPastEntry = document.querySelector("#past-0") as HTMLElement;
      firstPastEntry.focus();
    }
  }

  handleEntryPast = (past: string, entry: Entry) => {
    const index = entry.props.index!;
    const pasts = this.state.pasts.slice(); 
    pasts[index] = past;
    this.setState({
      pasts,
    }, () => console.log(this.state));
    const nextWhyPast = document.querySelector(`#past-${index + 1}`) as HTMLElement;
    if (nextWhyPast) {
      nextWhyPast.focus();
    } else {
      // we're past the past, move onto the next section
      const insteadEntry = document.querySelector("#instead") as HTMLElement;
      insteadEntry.focus();
    }
  }

  render() {
    return (
      <div id="app">
        <div className="form">
          <Divider className="divider-intro" page={0} visible={true}>
            Use this five minute motivational exercise to get excited about doing that thing you've been putting off!
          </Divider>

          <Divider className="divider-what" page={1} visible={true}>
            I have been putting off <Entry focusDelay={500} id="what" onEntry={this.handleEntryWhat} /><span className="period">.</span>
            <EnterListener style={{marginTop: "2em"}} page={1} to={2} />
          </Divider>
          
          <Divider page={2} visible={this.state.what != null}>
            I haven't done this yet because
            <ol>
              <li><Entry index={0} id="why-0" onEntry={this.handleEntryWhy} />,</li>
              <li><Entry index={1} id="why-1" onEntry={this.handleEntryWhy} />,</li>
              <li><Entry index={2} id="why-2" onEntry={this.handleEntryWhy} />,</li>
              <li><Entry index={3} id="why-3" onEntry={this.handleEntryWhy} />, and</li>
              <li><Entry index={4} id="why-4" onEntry={this.handleEntryWhy} />.</li>
            </ol>
          </Divider>

          <Divider page={3} visible={this.state.whys.length >= 5}>
            In the past, doing this has been painful because
            <ol>
              <li><Entry index={0} id="past-0" onEntry={this.handleEntryPast} />,</li>
              <li><Entry index={1} id="past-1" onEntry={this.handleEntryPast} />,</li>
              <li><Entry index={2} id="past-2" onEntry={this.handleEntryPast} />,</li>
              <li><Entry index={3} id="past-3" onEntry={this.handleEntryPast} />, and</li>
              <li><Entry index={4} id="past-4" onEntry={this.handleEntryPast} />.</li>
            </ol>
          </Divider>

          <Divider page={4} visible={this.state.pasts.length >= 5}>
            By putting it off, I've instead been gaining pleasure from <Entry id="instead" />.
          </Divider>

          <Divider page={5}>
            If I keep putting it off, it will cost me <div className="entry" contentEditable={true}></div>, and I'll feel <div className="entry" contentEditable={true}></div>.
          </Divider>

          <Divider page={6}>
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
          </Divider>
        </div>

      </div>
    );
  }
}

export default App;
