import React, { Component } from 'react';
import Element from "./Element";
import FlatButtonCompact from "./FlatButtonCompact";


/*
 * This code was found here: http://stackoverflow.com/a/30810322.
 * We should test this but it seems like the most elegant solution
 * as it is self contained and dosn't depend on external DOM element.
 * This is better because it reduces the chances of user error.
 * Just pass it the string you want to copy.
 *
 * I don't think there is a problem with performence or react as this
 * appends an element outside #app and removes onClick.
 */
function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
        // capture `execCommand` in a variable if offering feedback on failure
        document.execCommand('copy');
    } catch (err) {
        console.log(err);
    }

    document.body.removeChild(textArea);
}

export default class extends Component {
    state = {
            feedbackState: "WAIT",
            canCopy: false,
        }

    componentDidMount() {
        // Support for execCommand is good
        // http://caniuse.com/#search=document.execCommand

        // The assumption is that if we have the execCommand method
        // we also have "copy"
        try {
            var canCopy = document.execCommand;
            this.setState({
                canCopy,
            });
        } catch (err) {
            console.log(err);
            this.setState({
                canCopy: false,
            });
        }
    }

    onClick = () => {
        const { text } = this.props;
        copyTextToClipboard(text);

        this.setState({
            feedbackState: "FLOAT"
        }, () => {
            setTimeout(
                () => {
                    this.setState({
                        feedbackState: "FADEOUT"
                }, () => {
                    setTimeout(
                    () => {
                        this.setState({
                            feedbackState: "WAIT"
                        })
                    } , 300)
                })}, 300)
            }
        );
    }

    render() {
        const { feedbackState } = this.state;
        const { ...rest } = this.props;
        const style = this.style();
        const feedbackStyle = () => {
            switch (feedbackState) {
                case "WAIT":
                    return style.feedbackHidden
                case "FLOAT":
                    return style.feedbackShown
                case "FADEOUT":
                    return style.feedbackOut
            }
        };

        if (!this.state.canCopy) return <span/>;

        return (
            <Element
                { ...rest}
                stopPropagation
                style={ style.button }
               
            >
                <div
                    style={{
                        ...style.feedback,
                        ...feedbackStyle()
                    }}
                >
                    Copied!
                </div>
                <FlatButtonCompact  onClick = { this.onClick } primary label="Copy"/>
            </Element>
        )
    }

    style = () => {
        // Base styles
        const button = {
            position: "relative",
            display: "inline-block",
            fontSize: "12px",
            cursor: "pointer",
            color: "#0971ab",
            fontWeight: "600",
            marginLeft: "10px",
        };

        const feedback = {
            fontSize: "12px",
            position: "absolute",
        }

        // Animation step styles
        const feedbackHidden = {
            position: "absolute",
            opacity: "0",
            top: "0",
        };

        const feedbackShown = {
            opacity: "1",
            top: "-20px",
            transition: "opacity .2s ease, top .15s ease",
        };

        const feedbackOut = {
            opacity: "0",
            top: "-20px",
            transition: "opacity .2s ease",
        };

        return {
            button,
            feedback,
            feedbackHidden,
            feedbackShown,
            feedbackOut,
        }
    }
}