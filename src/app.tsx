import React, { PureComponent } from 'react';
import { scrollToPage } from './page';
import classnames from 'classnames';
import { TypewriterText } from './typewriterText';
import { EnterListener } from './enterListener';
import { Divider } from './divider';
import { Entry } from './entry';

interface IAppState {
  isWhatVisible: boolean;
  what?: string;
  whys: string[];
  pasts: string[];
  instead: string[];
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
    instead: [],
    ultimateCost: undefined,
    badFeelings: undefined,
    goodFeelings: [],
  };

  get isFinished() {
    return this.state.goodFeelings.length >= 10;
  }

  makeSingleEntryHandler(propName: keyof IAppState) {
    return (val: string) => {
      this.setState({ [propName]: val } as any);
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


  handleEntryWhat = this.makeSingleEntryHandler("what");

  handleEntryWhy = this.makeMultiEntryHandler("whys");

  handleEntryPast = this.makeMultiEntryHandler("pasts");

  handleEntryInstead = this.makeMultiEntryHandler("instead");

  handleEntryUltimateCost = this.makeSingleEntryHandler("ultimateCost");

  handleEntryBadFeelings = this.makeSingleEntryHandler("badFeelings");
  handleEntryGoodFeeling = this.makeMultiEntryHandler("goodFeelings");

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isWhatVisible: true
      });
    }, 5000);
  }

  render() {
    const formClassName = classnames("form", { "finished": this.isFinished });
    return (
      <div className={formClassName}>
        <Divider className="divider-intro" page={0} visible={true}>
          <TypewriterText duration={3}>Use this five minute motivational exercise to get excited about doing that thing you've been putting off!</TypewriterText>
        </Divider>

        <Divider className="divider-what" page={1} visible={this.state.isWhatVisible}>
          I have been putting off <Entry focusDelay={500} id="what" onEntry={this.handleEntryWhat} /><span className="period">.</span>
          <EnterListener style={{ marginTop: "2em" }} page={1} to={2} />
        </Divider>

        <Divider page={2} visible={this.state.what != null}>
          I haven't done this yet because <Entry
            index={0} id="why-0" onEntry={this.handleEntryWhy} />
          , <Entry index={1} id="why-1" onEntry={this.handleEntryWhy} />
          , and <Entry index={2} id="why-2" onEntry={this.handleEntryWhy} />
          .
          </Divider>

        <Divider page={3} visible={this.state.whys.length >= 3}>
          In the past, doing this has been painful because <Entry
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
          But if I buckle down and really do it, I'll feel these positive emotions
              : <Entry index={0} id="good-feeling-0" onEntry={this.handleEntryGoodFeeling} />
          , <Entry index={1} id="good-feeling-1" onEntry={this.handleEntryGoodFeeling} />
          , <Entry index={2} id="good-feeling-2" onEntry={this.handleEntryGoodFeeling} />
          , <Entry index={3} id="good-feeling-3" onEntry={this.handleEntryGoodFeeling} />
          , <Entry index={4} id="good-feeling-4" onEntry={this.handleEntryGoodFeeling} />
          , <Entry index={5} id="good-feeling-5" onEntry={this.handleEntryGoodFeeling} />
          , <Entry index={6} id="good-feeling-6" onEntry={this.handleEntryGoodFeeling} />
          , <Entry index={7} id="good-feeling-7" onEntry={this.handleEntryGoodFeeling} />
          , <Entry index={8} id="good-feeling-8" onEntry={this.handleEntryGoodFeeling} />
          , and finally, <Entry index={9} id="good-feeling-9" onEntry={this.handleEntryGoodFeeling} />
          !
          </Divider>

        <Divider className="divider-finished noprint" page={7} visible={this.isFinished} scrollTo={true}>
          <p className="motivation">Now get out there and crush it!</p>
          <button className="print" onClick={() => window.print()}>🖨 Print</button>
          { this.renderSharingButtons() }
          <small>
            <p>Made with &lt;3 by <a href="http://www.hellochar.com" target="_blank">Xiaohan Zhang</a>.</p>
            <p>Based off Awaken the Giant Within, Ch. 3 by Tony Robbins.</p>
          </small>
        </Divider>
      </div>
    );
  }

  renderSharingButtons() {
    // https://sharingbuttons.io/
    return (
      <>
{/* Facebook */}
<a className="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fstopavoiding.work" target="_blank" rel="noopener" aria-label="">
  <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
    </div>
  </div>
</a>

{/* Twitter */}
<a className="resp-sharing-button__link" href="https://twitter.com/intent/tweet/?text=Get%20excited%20about%20finally%20doing%20that%20thing%20you&#x27;ve%20been%20putting%20off!&amp;url=http%3A%2F%2Fstopavoiding.work" target="_blank" rel="noopener" aria-label="">
  <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg>
    </div>
  </div>
</a>

{/* E-Mail */}
<a className="resp-sharing-button__link" href="mailto:?subject=Get%20excited%20about%20finally%20doing%20that%20thing%20you&#x27;ve%20been%20putting%20off!&amp;body=http%3A%2F%2Fstopavoiding.work" target="_self" rel="noopener" aria-label="">
  <div className="resp-sharing-button resp-sharing-button--email resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z"/></svg>
    </div>
  </div>
</a>
      </>
    );
  }
}

export default App;
