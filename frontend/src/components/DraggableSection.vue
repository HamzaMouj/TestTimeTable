<template>
  <div
    :style="draggableStyle"
    @mousedown="startDrag"
    @mouseup="stopDrag"
    class="draggable"
  >
    <slot></slot>
    <div class="resize-handle" @mousedown.stop="startResize"></div>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localWidth: this.block.width,
      isDragging: false,
      isResizing: false,
      position: { x: 0, y: 0 },
      initialMousePos: { x: 0, y: 0 },
      initialPosition: { x: 0, y: 0 },
      initialSize: { width: 0, height: 0 },
    };
  },
  watch: {
    'block.width': function(newWidth) {
      this.localWidth = newWidth;
    }
  },
  computed: {
    draggableStyle() {
      return {
        top: `${this.position.y}px`,
        left: `${this.position.x}px`,
        width: `${this.block.width}px`,
        height: `${this.block.height}px`,
        position: 'absolute',
        transition: this.isDragging || this.isResizing ? 'none' : 'top 0.2s, left 0.2s, width 0.2s, height 0.2s',
      };
    },
  },
  mounted() {
    this.position = { x: this.block.x, y: this.block.y };
    this.initialPosition = { x: this.block.x, y: this.block.y };
    this.initialSize = { width: this.block.width, height: this.block.height };
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.initialMousePos = { x: event.clientX, y: event.clientY };
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },
    stopDrag(event) {
      if (this.isDragging) {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('mouseup', this.stopDrag);

        const droppedElement = document.elementFromPoint(event.clientX, event.clientY);
        const validDrop = droppedElement && droppedElement.closest('td[data-day]:not([data-day="Sat"]):not([data-day="Sun"])');

        if (validDrop) {
          const newDay = validDrop.getAttribute('data-day');
          const newPersonId = droppedElement.closest('tr').getAttribute('data-person-id');

          this.$emit('dragend', { block: this.block, newDay, newPersonId });
        } else {
          this.$emit('dragend', { block: this.block, newDay: null, newPersonId: null });
        }
      }
    },
    onDrag(event) {
      if (this.isDragging) {
        const dx = event.clientX - this.initialMousePos.x;
        const dy = event.clientY - this.initialMousePos.y;
        const newX = this.initialPosition.x + dx;
        const newY = this.initialPosition.y + dy;

        const elementAtNewPosition = document.elementFromPoint(event.clientX, event.clientY);
        const isWithinValidCell = elementAtNewPosition && elementAtNewPosition.closest('td[data-day]:not([data-day="Sat"]):not([data-day="Sun"])');

        if (isWithinValidCell) {
          this.position.x = newX;
          this.position.y = newY;
        }
      }
    },
    startResize(event) {
      this.isResizing = true;
      this.initialMousePos = { x: event.clientX, y: event.clientY };
      this.initialSize = { width: this.block.width, height: this.block.height };
      document.addEventListener('mousemove', this.onResize);
      document.addEventListener('mouseup', this.stopResize);
    },
    stopResize() {
      if (this.isResizing) {
        this.isResizing = false;
        document.removeEventListener('mousemove', this.onResize);
        document.removeEventListener('mouseup', this.stopResize);
        this.$emit('resizeend', { block: this.block, width: this.block.width });
      }
    },
    onResize(event) {
      if (this.isResizing) {
        const dx = event.clientX - this.initialMousePos.x;
        this.localWidth = this.initialSize.width + dx;
        this.$emit('update-block-width', this.localWidth);
      }
    },
  },
};
</script>

<style scoped>
.draggable {
  cursor: grab;
}
.draggable:active {
  cursor: grabbing;
}
.resize-handle {
  width: 10px;
  height: 10px;
  background: #052479;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: se-resize;
}
</style>