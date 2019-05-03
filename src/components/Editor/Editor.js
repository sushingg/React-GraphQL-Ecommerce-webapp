import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { Container, Segment } from "semantic-ui-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty()
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
            onEditorStateChange={editorState =>{
              this.setState({
                editorState
              })
              if (this.props.htmltext) {
                this.props.htmltext(
                  draftToHtml(convertToRaw(editorState.getCurrentContent()))
                )
              }}
            }
            
            toolbar={{
              link: { inDropdown: false }
            }}
          />
        </Segment>
      </Container>
    );
  }
}
export default EditorConvertToHTML;
