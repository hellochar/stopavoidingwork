import React, { PureComponent } from 'react';
import classnames from 'classnames';
export class Entry extends PureComponent<{
  focusDelay?: number;
  onEntry: (value: string, element: Entry) => void;
  extraEntryKeys?: string;
  index?: number;
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
    if (e.key === "Enter" || this.props.extraEntryKeys && this.props.extraEntryKeys.includes(e.key)) {
      if (this.props.onEntry) {
        e.preventDefault();
        this.props.onEntry(this.ref && this.ref.innerText || "", this);
      }
      this.focusNextEntry();
    }
  };

  handleBlur = (e: React.FocusEvent) => {
    if (this.props.onEntry) {
      this.props.onEntry(this.ref && this.ref.innerText || "", this);
    }
  };

  focusNextEntry() {
    if(this.ref) {
      const entries = Array.from(document.querySelectorAll(".entry") as NodeListOf<HTMLElement>);
      const myIndex = entries.indexOf(this.ref);
      const nextEntry = entries[myIndex + 1];
      if (nextEntry) {
        nextEntry.focus();
      }
    }
  }

  render() {
    return <span
        {...this.props}
        contentEditable={true}
        className={classnames("entry", this.props.className)}
        onKeyPress={this.handleKeyPress}
        onBlur={this.handleBlur}
        ref={this.handleRef}
    />;
  }
}
