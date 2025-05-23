<script setup>
const { $api } = useNuxtApp();
const config = useRuntimeConfig();
const repo = repository($api);
const props = defineProps({
  modelValue: String,
});

const emits = defineEmits(["update:modelValue"]);
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { url } = await repo.uploadImage(formData);
    return url;
  } catch (err) {
    return handleApiError(err);
  }
};

const addImage = () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.onchange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        if (url) {
          editor.value
            .chain()
            .focus()
            .setImage({ src: `${config.public.storageURL}/${url}` })
            .run();
        }
      } catch (error) {
        console.error("Failed to add image:", error);
        setToast("error", err.value.data.message);
      }
    }
  };
  fileInput.click();
};

const lowlight = createLowlight(allLanguages);
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    TiptapStarterKit.configure({
      codeBlock: false,
    }),
    CustomTableCell,
    CustomTableHeader,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TiptapCodeBlockLowlight.configure({ lowlight }),
    TiptapPlaceholder.configure({
      emptyEditorClass: "is-editor-empty",
      placeholder: "Write your post content here",
    }),
    ImageResize.configure({
      inline: true,
      allowBase64: true,
    }),
  ],
  onUpdate: ({ editor }) => {
    emits("update:modelValue", editor.getHTML());
  },
  editorProps: {
    attributes: {
      class: "prose prose-sm focus:outline-none py-5 dark:text-white ",
    },
    transformPastedText(text) {
      return text.toUpperCase();
    },
    handleDrop: (view, event) => {
      const files = event.dataTransfer?.files;
      if (!files || !files.length) return false;

      const file = files[0];
      if (!file.type.startsWith("image/")) return false;

      uploadImage(file).then((url) => {
        const { schema } = view.state;
        const node = schema.nodes.image.create({ src: url });
        const transaction = view.state.tr.replaceSelectionWith(node);
        view.dispatch(transaction);
      });

      return true;
    },
  },
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (editor.value && newVal !== editor.value.getHTML()) {
      editor.value.commands.setContent(newVal);
    }
  }
);

onBeforeUnmount(() => {
  unref(editor.value).destroy();
});
</script>

<template>
  <div class="container mx-auto max-w-4xl my-2">
    <div
      v-if="editor"
      class="flex items-center flex-wrap gap-2 border overflow-hidden font-thin bg-gray-100 text-gray-600 p-3 text-md dark:bg-darken dark:border-gray-700 dark:text-white dark:border-t rounded-t-md"
    >
      <button
        type="button"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'text-primary': editor.isActive('bold') }"
        class=""
      >
        <i-tabler-bold />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'text-primary': editor.isActive('italic') }"
        class=""
      >
        <i-tabler-italic />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'text-primary': editor.isActive('strike') }"
      >
        <i-tabler-strikethrough />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'text-primary': editor.isActive('code') }"
      >
        <i-tabler-code />
      </button>
      <button type="button" @click="editor.chain().focus().unsetAllMarks().run()">
        <i-tabler-clear-formatting />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'text-primary': editor.isActive('paragraph') }"
      >
        <i-bx-paragraph />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'text-primary': editor.isActive('heading', { level: 1 }) }"
      >
        <i-ci-heading-h1 />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'text-primary': editor.isActive('heading', { level: 2 }) }"
      >
        <i-ci-heading-h2 />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'text-primary': editor.isActive('heading', { level: 3 }) }"
      >
        <i-ci-heading-h3 />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'text-primary': editor.isActive('heading', { level: 4 }) }"
      >
        <i-ci-heading-h4 />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'text-primary': editor.isActive('heading', { level: 5 }) }"
      >
        <i-ci-heading-h5 />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'text-primary': editor.isActive('heading', { level: 6 }) }"
      >
        <i-ci-heading-h6 />
      </button>

      <button
        type="button"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'text-primary': editor.isActive('bulletList') }"
      >
        <i-fluent-mdl2-radio-bullet />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'text-primary': editor.isActive('orderedList') }"
      >
        <i-fe-list-bullet />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'text-primary': editor.isActive('codeBlock') }"
      >
        <i-fluent-code-block-48-regular />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'text-primary': editor.isActive('blockquote') }"
      >
        <i-tabler-blockquote />
      </button>
      <button type="button" @click="editor.chain().focus().setHorizontalRule().run()">
        <i-codicon-horizontal-rule />
      </button>
      <button type="button" @click="editor.chain().focus().setHardBreak().run()">
        <i-tabler-page-break />
      </button>

      <button
        type="button"
        @click="
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        "
      >
        <i-tabler-table-plus />
      </button>
      <button type="button" @click="editor.chain().focus().addColumnBefore().run()">
        <i-tabler-column-insert-left />
      </button>
      <button type="button" @click="editor.chain().focus().addColumnAfter().run()">
        <i-tabler-column-insert-right />
      </button>
      <button type="button" @click="editor.chain().focus().deleteColumn().run()">
        <i-tabler-column-remove />
      </button>
      <button type="button" @click="editor.chain().focus().addRowBefore().run()">
        <i-tabler-row-insert-top />
      </button>
      <button type="button" @click="editor.chain().focus().addRowAfter().run()">
        <i-tabler-row-insert-bottom />
      </button>
      <button type="button" @click="editor.chain().focus().deleteRow().run()">
        <i-tabler-row-remove />
      </button>
      <button type="button" @click="editor.chain().focus().deleteTable().run()">
        <i-tabler-table-down />
      </button>
      <button type="button" @click="editor.chain().focus().fixTables().run()">
        <i-tabler-table-down />
      </button>
      <button type="button" @click="addImage">
        <i-mdi-light-image />
      </button>
      <button type="button" @click="editor.chain().focus().mergeCells().run()">
        <i-material-symbols-cell-merge-rounded />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        <i-fad-undo />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        <i-fad-redo />
      </button>
    </div>

    <TiptapEditorContent
      class="w-full h-52 overflow-auto border-x border-b px-2 rounded-b-md dark:border-gray-700 dark:bg-gray-800"
      :editor="editor"
    />
  </div>
</template>
