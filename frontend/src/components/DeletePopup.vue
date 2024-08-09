<template>
  <div class="popup-overlay" @click="$emit('close')">
    <div class="delete-popup" @click.stop>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this block?</p>
      <div class="buttons">
        <button class="cancel" @click.prevent="$emit('close')">Cancel</button>
        <button class="delete" @click="confirmDelete">Delete</button>
      </div>
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
  
  <style scoped>/* Blurred background overlay */
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px); /* Blurs everything behind the popup */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  
  /* Delete Popup Styling */
  .delete-popup {
    background: rgba(255, 255, 255, 0.85);
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    max-width: 350px;
    width: 100%;
    text-align: center;
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .delete-popup h2 {
    margin-bottom: 15px;
    font-size: 20px;
    color: #333;
  }
  
  .delete-popup p {
    margin-bottom: 20px;
    font-size: 16px;
    color: #666;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  .cancel {
    padding: 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    flex: 1;
    transition: background-color 0.3s ease;
  }
  
  .cancel:hover {
    background-color: #3b8b3e;
  }
  
  .delete {
    padding: 12px;
    background-color: #ff0404;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    flex: 1;
    transition: background-color 0.3s ease;
  }
  
  .delete:hover {
    background-color: #e53935;
  }
  
  /* Popup fade-in animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  </style>