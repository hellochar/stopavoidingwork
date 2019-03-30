import React, { PureComponent } from 'react';
import classnames from 'classnames';
export class TypewriterText extends PureComponent<{
  duration: number;
  delay?: number;
  children: string;
} & React.HTMLProps<HTMLSpanElement>, {}> {
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
      const elapsed = Math.max(0, performance.now() - (this.props.delay || 0) - startTime);
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
    return (<span {...this.props} className={className}>
      {this.state.currentText}
    </span>);
  }
}
