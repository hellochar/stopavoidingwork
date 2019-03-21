import React from 'react';
import classnames from 'classnames';
import { isPageActive } from './page';

interface IDividerProps {
  className?: string;
  page: number;
  visible?: boolean;
  scrollTo?: boolean;

  secondary?: boolean;
}

export class Divider extends React.Component<IDividerProps, {
  isLoaded: boolean;
  isActive: boolean;
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoaded: this.shouldLoad(),
      isActive: isPageActive(this.props.page),
    };
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
  };
  private dividerRef: HTMLDivElement | null = null;
  handleDividerRef = (ref: HTMLDivElement | null) => {
    this.dividerRef = ref;
  };
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
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps: IDividerProps) {
    if (!prevProps.visible && this.props.visible && this.props.scrollTo) {
      this.dividerRef && this.dividerRef.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }

  render() {
    const classNames = classnames("divider", this.props.className, {
      "active": this.state.isActive,
      "passed": !this.state.isActive && this.shouldLoad(),
      "visible": this.props.visible,
      "secondary": this.props.secondary,
    });
    return (
      <div ref={this.handleDividerRef} className={classNames} onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}
