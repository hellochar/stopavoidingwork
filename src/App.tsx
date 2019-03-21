import React, { PureComponent } from 'react';
import { scrollToPage } from './page';
import { TypewriterText } from './typewriterText';
import { EnterListener } from './enterListener';
import { Divider } from './divider';
import { Entry } from './entry';

interface IAppState {
  isWhatVisible: boolean;
  what?: string;
  whys: string[];
  pasts: string[];
  instead?: string;
  ultimateCost?: string;
  badFeelings?: string;
  goodFeelings: string[];
}

class App extends PureComponent<{}, IAppState> {
  state: IAppState  = {
    isWhatVisible: false,
    what: undefined,
    whys: [],
    pasts: [],
    instead: undefined,
    ultimateCost: undefined,
    badFeelings: undefined,
    goodFeelings: [],
  };

  focusNextInput(selector: string) {
    const nextInput = document.querySelector(selector) as HTMLElement;
    nextInput.focus();
  }

  makeSingleEntryHandler(propName: keyof IAppState, nextInputSelector: string) {
    return (val: string) => {
      this.setState({ [propName]: val } as any, () => {
        this.focusNextInput(nextInputSelector);
      });
    }
  }

  makeMultiEntryHandler(propName: keyof IAppState, entriesPrefix: string, nextInputSelector?: string) {
    return (why: string, entry: Entry) => {
      const index = entry.props.index!;
      const entries = (this.state[propName]! as string[]).slice();
      entries[index] = why;
      this.setState({
        [propName]: entries,
      } as any, () => {
        const nextEntry = document.querySelector(`${entriesPrefix}${index + 1}`) as HTMLElement;
        if (nextEntry) {
          nextEntry.focus();
        } else if (nextInputSelector) {
          // we're past the entries, move onto the next section
          this.focusNextInput(nextInputSelector);
        }
      });
    }
  }


  handleEntryWhat = this.makeSingleEntryHandler("what", "#why-0");

  handleEntryWhy = this.makeMultiEntryHandler("whys", "#why-", "#past-0");

  handleEntryPast = this.makeMultiEntryHandler("pasts", "#past-", "#instead");

  handleEntryInstead = this.makeSingleEntryHandler("instead", "#ultimate-cost");

  handleEntryUltimateCost = this.makeSingleEntryHandler("ultimateCost", "#bad-feelings")

  handleEntryBadFeelings = this.makeSingleEntryHandler("badFeelings", "#good-feeling-0");
  handleEntryGoodFeeling = this.makeMultiEntryHandler("goodFeelings", "#good-feeling-");

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isWhatVisible: true
      });
    }, 5000);
  }

  render() {
    return (
      <div id="app">
        <div className="form">
          <Divider className="divider-intro" page={0} visible={true}>
            <TypewriterText duration={3}>Use this five minute motivational exercise to get excited about doing that thing you've been putting off!</TypewriterText>
          </Divider>

          <Divider className="divider-what" page={1} visible={this.state.isWhatVisible}>
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
            Instead, I've been gaining pleasure from <Entry id="instead" onEntry={this.handleEntryInstead} />.
          </Divider>

          <Divider page={5} visible={this.state.instead != null}>
            Ultimately, if I keep putting it off, it will cost me <Entry id="ultimate-cost" onEntry={this.handleEntryUltimateCost} />, and I'll feel <Entry id="bad-feelings" onEntry={this.handleEntryBadFeelings} />.
          </Divider>

          <Divider page={6} visible={this.state.badFeelings != null}>
            But if I buckle down and really do it, I'll feel these positive emotions:
            <ol>
              <li><Entry index={0} id="good-feeling-0" onEntry={this.handleEntryGoodFeeling} />,</li>
              <li><Entry index={1} id="good-feeling-1" onEntry={this.handleEntryGoodFeeling} />,</li>
              <li><Entry index={2} id="good-feeling-2" onEntry={this.handleEntryGoodFeeling} />,</li>
              <li><Entry index={3} id="good-feeling-3" onEntry={this.handleEntryGoodFeeling} />,</li>
              <li><Entry index={4} id="good-feeling-4" onEntry={this.handleEntryGoodFeeling} />,</li>
              <li><Entry index={5} id="good-feeling-5" onEntry={this.handleEntryGoodFeeling} />,</li>
              <li><Entry index={6} id="good-feeling-6" onEntry={this.handleEntryGoodFeeling} />,</li>
              <li><Entry index={7} id="good-feeling-7" onEntry={this.handleEntryGoodFeeling} />,</li>
              <li><Entry index={8} id="good-feeling-8" onEntry={this.handleEntryGoodFeeling} />, and finally,</li>
              <li><Entry index={9} id="good-feeling-9" onEntry={this.handleEntryGoodFeeling} />.</li>
            </ol>
          </Divider>
        </div>

      </div>
    );
  }
}

export default App;
