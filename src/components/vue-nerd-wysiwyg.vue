<template>
  <div>
    <div class="toolbar">
      <p class="control has-addons">
        <a v-for="module in current_modules" class="button is-light" @click="clicked(module)">
          <span class="icon is-small"><i :class="moduleIcon(module)"></i></span>
        </a>
      </p>
    </div>
    <div class="content-wrapper" @click="hidePlaceholder">
      <div v-show="show_placeholder" class="content-placeholder">{{ placeholder }}</div>
      <div v-show="!show_placeholder" class="content-editor"
        @blur="showPlaceholder($event)"
        contenteditable="true" id="editor" ref="editor" @input="onInput($event)">&nbsp;
      </div>
    </div>
  </div>
</template>

<script>
  const default_modules = ['bold', 'italic'];

  export default {
    props: {
      placeholder: { type: String, default: '' }
    },
    data() {
      return {
        current_modules: default_modules,
        show_placeholder: true,
        content: ''
      };
    },
    methods: {
      onInput(e) {
        this.content = e.target.innerHTML;
      },
      moduleIcon(module) {
        return 'fa fa-' + module;
      },
      clicked(module) {
        let editor = this.$refs.editor;

        let selection = document.getSelection();
        let range = selection.getRangeAt(0);
        let sel_el = range.startContainer.parentNode;

        if (editor.id !== sel_el.id) { return; }

        let sel_len = range.toString().length;
        let sel_end = range.endOffset;
        let sel_start = sel_end - sel_len;

        switch(module) {
          case 'bold': {
            // TODO: Move into dynamic function handle multiple
            let first_part = editor.innerHTML.substring(0, sel_start);
            let sel_part = editor.innerHTML.substring(sel_start, sel_end);
            let last_part = editor.innerHTML.substring(sel_end);

            editor.innerHTML = first_part + '<b>' + sel_part + '</b>' + last_part;

            selection.removeAllRanges();
            selection.addRange(range);

            setTimeout(() => {
              this.$refs.editor.focus();
            }, 50);
            break;
          }
          case 'italic': {
            break;
          }
        }
      },
      hidePlaceholder() {
        if (!this.show_placeholder) { return; }

        this.show_placeholder = false;

        setTimeout(() => {
          this.$refs.editor.focus();
        }, 50);
      },
      showPlaceholder(e) {
        if (this.$refs.editor.innerHTML.length === 0) {
          this.show_placeholder = true;
        }
      }
    }
  };
</script>

<style>
  .toolbar {
    background-color: #eeeeee;
    border: 1px solid black;
    border-bottom: 0;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    padding: 5px;
  }

  .button .icon:last-child,
  .button .tag:last-child {
    margin-left: 0 !important;
  }

  .button.is-light {
    border-width: 1px !important;
  }

  .content-wrapper {
    display: flex;
    padding: 10px;
    border: 1px solid black;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    height: 150px;
    min-height: 150px;
    cursor: text;
  }

  .content-editor,
  .content-editor:focus {
    border: 0px solid transparent;
    outline: 0px solid transparent;
    margin: 0;
    padding: 0;
    display: flex;
    width: 100%;
    height: 100%;
  }

  .content-placeholder {
    color: #757575;
  }
</style>
