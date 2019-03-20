import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { scrollToPage, isPageActive } from './page';
export class EnterListener extends PureComponent<{
  page: number;
  to: number;
} & React.HTMLProps<HTMLDivElement>, {}> {
  state = { scrollY: window.scrollY };
  private ref: HTMLDivElement | null = null;
  handleRef = (ref: HTMLDivElement | null) => {
    this.ref = ref;
  };
  handleKeyDown = (evt: KeyboardEvent) => {
    if (!this.isActive()) {
      return;
    }
    if (evt.key === 'Enter') {
      scrollToPage(this.props.to);
    }
  };
  handleClick = (evt: React.MouseEvent) => {
    scrollToPage(this.props.to);
  };
  handleScroll = (evt: UIEvent) => {
    this.setState({ scrollY: window.scrollY });
  };
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
    return (<div {...this.props} className={classnames("enter-listener", { "active": this.isActive() })} ref={this.handleRef} onClick={this.handleClick}>
      <span className="enter-listener-key">⮠ &nbsp;Enter</span> Continue
      </div>);
  }
}
