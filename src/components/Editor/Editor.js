import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { Container, Header, Form, Segment, TextArea } from "semantic-ui-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
var HtmlToReactParser = require("html-to-react").Parser;
var htmlInput = "<div><h1>Title</h1><p>A paragraph</p></div>";
var htmlToReactParser = new HtmlToReactParser();
class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onEditorStateChange = Function = editorState => {
    this.setState({
      editorState
    });
    if (this.props.htmltext) {
      this.props.htmltext(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
    }
  };

  render() {
    const { editorState } = this.state;
    return (
      <Container>
        <Segment className="editor">
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              link: { inDropdown: false }
            }}
          />
        </Segment>
        <Segment>
          <Form>
            <TextArea
              disabled
              value={draftToHtml(convertToRaw(editorState.getCurrentContent())).replace(/"/g, "'")}
              placeholder="Tell us more"
            />
          </Form>
          {htmlToReactParser.parse(
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
          )}
        </Segment>
      </Container>
    );
  }
}
export default EditorConvertToHTML;
