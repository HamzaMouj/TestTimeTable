<template>
    <div class="delete-popup">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this block?</p>
      <div class="buttons">
        <button class="cancel" @click.prevent="$emit('close')">Cancel</button>
        <button class="delete" @click="confirmDelete">Delete</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      blockId: String,
    },
    methods: {
      confirmDelete() {
        this.$emit('delete', this.blockId);
      }
    }
  };
  </script>
  
  <style scoped>
  .delete-popup {

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Blur effect */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
  
  
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  .cancel{
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .cancel:hover {
    background-color: #3b8b3e;
  }

  .delete {
    padding: 10px 20px;
    background-color: #ff0404;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
 .delete:hover {
    background-color: #f14949;
  }
  </style>