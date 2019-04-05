import React from 'react';
import classnames from 'classnames';

interface IDividerProps {
  className?: string;
  page: number;
  visible?: boolean;
  scrollTo?: boolean;
  lazyRenderChildren?: boolean;
}

export class Divider extends React.Component<IDividerProps, {}> {
  constructor(props: any) {
    super(props);
  }
  private dividerRef: HTMLDivElement | null = null;
  handleDividerRef = (ref: HTMLDivElement | null) => {
    this.dividerRef = ref;
  };
  handleClick = (evt: React.MouseEvent) => {
    if (this.dividerRef != null && evt.target === this.dividerRef) {
      const inputs = Array.from(this.dividerRef.querySelectorAll("input").values());
      inputs[0] && inputs[0].focus();
    }
  };

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
      "visible": this.props.visible,
    });
    return (
      <div ref={this.handleDividerRef} className={classNames} onClick={this.handleClick}>
        {this.props.visible || !this.props.lazyRenderChildren ? this.props.children : null}
      </div>
    );
  }
}
