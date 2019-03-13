import React, { PureComponent } from 'react';
import styles from './App.module.scss';
import * as ScrollMagic from 'scrollmagic';
import classnames from 'classnames';

class TypewriterText extends PureComponent<{duration: number, children: string} & React.HTMLProps<HTMLDivElement>, {}> {
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
      <div {...this.props} className={className}>
        {this.state.currentText}
      </div>
    );
  }
}

class EnterListener extends PureComponent<{to: number}, {}> {
  private ref: HTMLDivElement | null = null;
  private page = 0;
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);   
  }

  handleRef = (ref: HTMLDivElement | null) => {
    this.ref = ref;
    if (ref != null) {
      this.page = Math.floor(ref.offsetTop / window.innerHeight);
      if (this.page < 0) {
         debugger;
      }
    }
  }

  handleKeyDown = (evt: KeyboardEvent) => {
    if (!this.isActive()) {
      return;
    }

    if (evt.key === 'Enter') {
      const top = window.innerHeight * this.props.to;
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: top,
      });
    }
  }

  isActive() {
    return Math.floor(window.scrollY / window.innerHeight) === this.page;
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <div className="enter-listener" ref={this.handleRef}>
        <span className="enter-listener-key">⮠ &nbsp;Enter</span> Continue
      </div>
    )
  }
}

class Divider extends React.Component<{className: string}, {}> {
  state = {
    loaded: false,
  }
  handleScroll = (evt: UIEvent) => {
    if (this.page) {
      const currentPage = Math.floor(window.scrollY / window.innerHeight);
      if (currentPage >= this.page) {
        this.setState({ loaded: true });
        window.removeEventListener("scroll", this.handleScroll);
      }
    }
  }

  private page?: number;
  handleRef = (ref: HTMLDivElement | null) => {
    if (ref != null) {
      this.page = Math.floor(ref.offsetTop / window.innerHeight);
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  render() {
    return (
      <div ref={this.handleRef} className={classnames("divider", this.props.className)}>
        { this.state.loaded ? this.props.children : null }
      </div>
    );
  }
}

class App extends PureComponent {

  handleIntroRef = (ref: HTMLDivElement | null) => {
    if (ref != null) {
      const controller = new ScrollMagic.Controller();

      // // create a scene
      // const scene = new ScrollMagic.Scene({
      //   duration: 1000,	// the scene should last for a scroll distance of 100px
      //   offset: 0	// start this scene after scrolling for 50px
      // }).setPin(ref); // pins the element for the the scene's duration
      
      // controller.addScene(scene);

      // console.log(controller);
      // console.log(scene);
    }
  }
  render() {
    return (
      <div id="app">
        <form className="form">
          <div className='divider divider-intro' ref={this.handleIntroRef}>
            <TypewriterText duration={4.5} className="intro">
              Use this five minute motivational exercise to get excited about doing that thing you've been putting off!
            </TypewriterText>

            <EnterListener to={1} />
          </div>

          <Divider className="divider-what">
            <TypewriterText duration={2}>I&nbsp;have&nbsp;been&nbsp;putting&nbsp;off&nbsp;</TypewriterText>
            <div className="entry" contentEditable={true} id="putting-off" ref={(r) => {
              if (r != null) {
                setTimeout(() => {
                  r.focus();
                }, 2000);
              }
            }}></div>
            <span className="period">.</span>
          </Divider>

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
