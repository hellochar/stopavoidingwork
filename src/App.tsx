import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { scrollToPage, isPageActive } from './page';

class TypewriterText extends PureComponent<{duration: number, children: string} & React.HTMLProps<HTMLSpanElement>, {}> {
  state = {
    currentText: ""
  };
  private intervalId = -1;

  isTyping() {
    return this.state.currentText !== this.props.children;
  }

  componentDidMount() {
    const startTime = performance.now();
    this.intervalId = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const lettersPerSecond = this.props.children.length / this.props.duration;
      const length = Math.floor(elapsed / 1000 * lettersPerSecond);
      const currentText = this.props.children.substr(0, length);
      this.setState({
        currentText
      });
      if (!this.isTyping()) {
        clearInterval(this.intervalId);
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const className = classnames(this.props.className, "typewriter-text", { typing: this.isTyping() });
    return (
      <span {...this.props} className={className}>
        {this.state.currentText}
      </span>
    );
  }
}

class EnterListener extends PureComponent<{page: number, to: number} & React.HTMLProps<HTMLDivElement>, {}> {
  state = { scrollY: window.scrollY };
  private ref: HTMLDivElement | null = null;
  handleRef = (ref: HTMLDivElement | null) => {
    this.ref = ref;
  }

  handleKeyDown = (evt: KeyboardEvent) => {
    if (!this.isActive()) {
      return;
    }

    if (evt.key === 'Enter') {
      scrollToPage(this.props.to);
    }
  }

  handleClick = (evt: React.MouseEvent) => {
    scrollToPage(this.props.to);
  }

  handleScroll = (evt: UIEvent) => {
    this.setState({ scrollY: window.scrollY });
  }

  isActive() {
    return isPageActive(this.props.page);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);   
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div
          {...this.props}
          className={classnames("enter-listener", {"active": this.isActive()})}
          ref={this.handleRef}
          onClick={this.handleClick}
      >
        <span className="enter-listener-key">⮠ &nbsp;Enter</span> Continue
      </div>
    )
  }
}

class Divider extends React.Component<{className?: string, page: number}, {isLoaded: boolean, isActive: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoaded: this.shouldLoad(),
      isActive: isPageActive(this.props.page),
    }
  }

  shouldLoad() {
    return window.scrollY / window.innerHeight > this.props.page - 0.05;
  }

  handleScroll = (evt: UIEvent) => {
    if (this.shouldLoad() && !this.state.isLoaded) {
      this.setState({ isLoaded: true });
    }
    this.setState({
      isActive: isPageActive(this.props.page),
    });
  }
  private dividerRef: HTMLDivElement | null = null;
  
  handleDividerRef = (ref: HTMLDivElement | null) => {
    this.dividerRef = ref;
  }

  handleClick = (evt: React.MouseEvent) => {
    if (this.dividerRef != null && evt.target === this.dividerRef) {
      const inputs = Array.from(this.dividerRef.querySelectorAll("input").values());
      inputs[0] && inputs[0].focus();
      // for (const inputElement of inputs) {
      //   // find first empty input
      //   if (inputElement.value.length === 0) {
          
      //     break;
      //   }
      // }
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  render() {
    const classNames = classnames(
      "divider",
      this.props.className,
      {
        "active": this.state.isActive,
        "passed": !this.state.isActive && this.shouldLoad()
     });
    return (
      <div ref={this.handleDividerRef} className={classNames} onClick={this.handleClick}>
        { this.state.isLoaded ? this.props.children : null }
      </div>
    );
  }
}

class Entry extends PureComponent<{ focusDelay: number | false, onEntry?: (value: string) => void } & React.HTMLProps<HTMLSpanElement>, {}> {
  private ref: HTMLSpanElement | null = null;
  handleRef = (ref: HTMLSpanElement | null) => {
    this.ref = ref;
    if (ref != null) {
      if (typeof this.props.focusDelay === "number") {
        setTimeout(() => {
          ref.focus();
        },
        this.props.focusDelay);
      }
    }
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && this.props.onEntry) {
      e.preventDefault();
      this.props.onEntry(this.ref && this.ref.innerText || "");
    }
  }

  render() {
    return (
      <span
          {...this.props}
          contentEditable={true}
          className={classnames("entry", this.props.className)}
          onKeyPress={this.handleKeyPress}
          ref={this.handleRef}
      />
    );
  }
}

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
