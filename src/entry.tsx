import React, { PureComponent } from 'react';
import classnames from 'classnames';

export function entryRank(entry: HTMLElement) {
  return allEntries().indexOf(entry);
}

let entriesCache: HTMLElement[];
export function allEntries() {
  if (entriesCache == null) {
    entriesCache = Array.from(document.querySelectorAll(".entry") as NodeListOf<HTMLElement>);
  }
  return entriesCache;
}

// we cut the all entries array into "filled", going from [0...some index],
// to "unfilled", going from [some index + 1 ... end], where
// every entry in "unfilled" is empty
export function getFirstUnfilledEntry() {
  let lastFilledEntryIndex = allEntries().length - 1;
  while(lastFilledEntryIndex >= 0 && allEntries()[lastFilledEntryIndex].innerText == "") {
    lastFilledEntryIndex--;
  }
  return allEntries()[lastFilledEntryIndex + 1] as HTMLElement | undefined;
}

// document.addEventListener("mousedown", (e) => {
//   console.log((e as any).path);
//   const target = e.target as HTMLElement;
//   // if (target && target.classList.contains("form")) {
//   //   const entry = getFirstUnfilledEntry();
//   //   entry && entry.focus();
//   // }
// });

// document.addEventListener("focus", (e) => {
//   const entry = getFirstUnfilledEntry();
//   if (entry) {
//     entry.focus();
//   }
// });

export class Entry extends PureComponent<{
  focusDelay?: number;
  onEntry: (value: string, element: Entry) => void;
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
    if (e.key === "Enter") {
      // don't put a newline
      e.preventDefault();
      const text = this.ref && this.ref.innerText;
      if (this.props.onEntry && text) {
        this.props.onEntry(text, this);
      }
      this.focusNextEntry();
    }
  };

  handleBlur = (e: React.FocusEvent) => {
    const text = this.ref && this.ref.innerText;
    if (this.props.onEntry && text) {
      this.props.onEntry(text, this);
    }
  };

  handleFocus = (e: React.FocusEvent) => {
    const firstUnfilled = getFirstUnfilledEntry();
    if (firstUnfilled && this.ref) {
      const firstUnfilledRank = entryRank(firstUnfilled);
      const myRank = entryRank(this.ref);
      // e.g. first empty is rank 2, i'm rank 3 - we should go back to rank 2
      if (firstUnfilledRank < myRank) {
        firstUnfilled.focus();
      }
    }
  }

  focusNextEntry() {
    if(this.ref) {
      const nextEntry = allEntries()[entryRank(this.ref) + 1];
      if (nextEntry) {
        nextEntry.focus();
      }
    }
  }

  render() {
    return <span
        {...this.props}
        contentEditable={true}
        autoCapitalize="off"
        className={classnames("entry", this.props.className)}
        onKeyPress={this.handleKeyPress}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={this.handleRef}
    />;
  }
}
