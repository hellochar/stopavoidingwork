import React, { PureComponent } from 'react';
import classnames from 'classnames';
export class Entry extends PureComponent<{
  focusDelay: number | false;
  onEntry?: (value: string) => void;
} & React.HTMLProps<HTMLSpanElement>, {}> {
  private ref: HTMLSpanElement | null = null;
  handleRef = (ref: HTMLSpanElement | null) => {
    this.ref = ref;
    if (ref != null) {
      if (typeof this.props.focusDelay === "number") {
        setTimeout(() => {
          ref.focus();
        }, this.props.focusDelay);
      }
    }
  };
  handleKeyPress = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && this.props.onEntry) {
      e.preventDefault();
      this.props.onEntry(this.ref && this.ref.innerText || "");
    }
  };
  render() {
    return (<span {...this.props} contentEditable={true} className={classnames("entry", this.props.className)} onKeyPress={this.handleKeyPress} ref={this.handleRef} />);
  }
}
