import React, { PureComponent } from 'react';
import classnames from 'classnames';
export class EnterListener extends PureComponent<{ text?: string } & React.HTMLProps<HTMLDivElement>, {}> {
  private matchingEntry?: HTMLElement;
  handleRef = (ref: HTMLElement | null) => {
    if (ref != null) {
      // find the .entry sibling closest before this element
      const parent = ref.parentElement!;
      const siblings = Array.from(parent.children) as HTMLElement[];
      const myIndex = siblings.indexOf(ref);
      this.matchingEntry = siblings.slice(0, myIndex).reverse().find((e) => e.classList.contains("entry"));
      console.log(this.matchingEntry);
    }
  }

  render() {
    console.log(this.props.text);
    const visible = this.props.text != null;
    return (
      <div {...this.props} className={classnames("enter-listener", { "visible": visible })} ref={this.handleRef}>
        <span className="enter-listener-key">⮠ &nbsp;Enter</span> Continue
      </div>
    );
  }
}
