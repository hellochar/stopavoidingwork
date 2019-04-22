import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { TypewriterText } from './typewriterText';
import { Divider } from './divider';
import { Entry } from './entry';
import { ShareButton } from './shareButton';

interface IAppState {
  shouldShowWhy?: boolean;
  what?: string;
  whys: string[];
  pasts: string[];
  instead: string[];
  ultimateCost?: string;
  badFeelings?: string;
  goodFeelings: string[];
  habitFeelings: string[];
}

class App extends PureComponent<{}, IAppState> {
  state: IAppState  = {
    shouldShowWhy: false,
    what: undefined,
    whys: [],
    pasts: [],
    instead: [],
    ultimateCost: undefined,
    badFeelings: undefined,
    goodFeelings: [],
    habitFeelings: [],
  };

  get isFinished() {
    return this.state.habitFeelings.length >= 6;
  }

  makeSingleEntryHandler(propName: keyof IAppState, callback?: () => void) {
    return (val: string) => {
      this.setState({ [propName]: val } as any, callback);
    }
  }

  makeMultiEntryHandler(propName: keyof IAppState) {
    return (why: string, entry: Entry) => {
      const index = entry.props.index;
      if (index == null) {
        throw new Error("index not defined on multi entry handler");
      }
      const entries = (this.state[propName]! as string[]).slice();
      entries[index] = why;
      this.setState({
        [propName]: entries,
      } as any);
    };
  }


  handleEntryWhat = this.makeSingleEntryHandler("what", () => {
    setTimeout(() => this.setState({ shouldShowWhy: true}), 1000);
  });

  handleEntryWhy = this.makeMultiEntryHandler("whys");

  handleEntryPast = this.makeMultiEntryHandler("pasts");

  handleEntryInstead = this.makeMultiEntryHandler("instead");

  handleEntryUltimateCost = this.makeSingleEntryHandler("ultimateCost");

  handleEntryBadFeelings = this.makeSingleEntryHandler("badFeelings");

  handleEntryGoodFeeling = this.makeMultiEntryHandler("goodFeelings");

  handleEntryHabitFeeling = this.makeMultiEntryHandler("habitFeelings");

  render() {
    const formClassName = classnames("form", { "finished": this.isFinished });
    const whatClassName = classnames("divider-what", {
      "empty": this.state.what == null
    });
    return (
      <div className={formClassName}>
        <Divider className={whatClassName} page={1} visible={true}>
          I have been putting off <Entry focusDelay={0} id="what" onEntry={this.handleEntryWhat} /><span className="period">.</span>
        </Divider>

        <Divider page={2} visible={this.state.shouldShowWhy}>
          I haven't done this yet because <Entry
            index={0} id="why-0" onEntry={this.handleEntryWhy} />
          , <Entry index={1} id="why-1" onEntry={this.handleEntryWhy} />
          , and <Entry index={2} id="why-2" onEntry={this.handleEntryWhy} />
          .
        </Divider>

        <Divider page={3} visible={this.state.whys.length >= 3}>
          In the past, doing this was painful because <Entry
            index={0} id="past-0" onEntry={this.handleEntryPast} />
          , <Entry index={1} id="past-1" onEntry={this.handleEntryPast} />
          , and <Entry index={2} id="past-2" onEntry={this.handleEntryPast} />
          .
        </Divider>

        <Divider page={4} visible={this.state.pasts.length >= 3}>
          Instead, I've been gaining pleasure from <Entry
            index={0} id="instead-0" onEntry={this.handleEntryInstead} /> and <Entry
            index={1} id="instead-1" onEntry={this.handleEntryInstead} />
          .
        </Divider>

        <Divider page={5} visible={this.state.instead.length >= 2}>
          Ultimately, if I keep putting it off, it will cost me <Entry id="ultimate-cost" onEntry={this.handleEntryUltimateCost} />, and I'll feel <Entry id="bad-feelings" onEntry={this.handleEntryBadFeelings} />.
        </Divider>

        <Divider page={6} visible={this.state.badFeelings != null}>
          But! If I do it right now, I'll feel these positive emotions: <Entry index={0} id="good-feeling-0" onEntry={this.handleEntryGoodFeeling} />
          , <Entry index={1} id="good-feeling-1" onEntry={this.handleEntryGoodFeeling} />
          , <Entry index={2} id="good-feeling-2" onEntry={this.handleEntryGoodFeeling} />
          , <Entry index={3} id="good-feeling-3" onEntry={this.handleEntryGoodFeeling} />
          , and <Entry index={4} id="good-feeling-4" onEntry={this.handleEntryGoodFeeling} />
          !
        </Divider>

        <Divider page={7} visible={this.state.goodFeelings.length >= 5}>
          Over the long term, making a habit of doing things like this will make me feel <Entry
              index={0} id="habit-feeling-0" onEntry={this.handleEntryHabitFeeling} />
          , <Entry index={1} id="habit-feeling-1" onEntry={this.handleEntryHabitFeeling} />
          , <Entry index={2} id="habit-feeling-2" onEntry={this.handleEntryHabitFeeling} />
          , <Entry index={3} id="habit-feeling-3" onEntry={this.handleEntryHabitFeeling} />
          , <Entry index={4} id="habit-feeling-4" onEntry={this.handleEntryHabitFeeling} />
          , and finally, <Entry index={5} id="habit-feeling-5" onEntry={this.handleEntryHabitFeeling} />
          !
        </Divider>

        <Divider
            className="divider-finished noprint"
            page={8}
            visible={this.isFinished}
            scrollTo={true}
            lazyRenderChildren={true}
        >
          <TypewriterText delay={1} duration={3} className="motivation">Amazing! Now get out there and crush it!</TypewriterText>
          <div className="details">
            <div className="buttons">
              <button className="button print" onClick={() => window.print()}>🖨 Print</button>
              <ShareButton />
            </div>
            <p className="footnote">Made by <a href="http://www.hellochar.com" target="_blank">Xiaohan Zhang</a>. <span className="secondary">Based off an exercise in Awaken the Giant Within, Ch. 3 by Tony Robbins.</span></p>
          </div>
        </Divider>
      </div>
    );
  }
}

export default App;
